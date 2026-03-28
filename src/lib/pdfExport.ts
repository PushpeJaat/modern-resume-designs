import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const A4_W_MM = 210;
const A4_H_MM = 297;
const A4_W_PX = 794;
const MARGIN_MM = 10;
const CONTENT_W_MM = A4_W_MM - MARGIN_MM * 2;
const CONTENT_H_MM = A4_H_MM - MARGIN_MM * 2;
const SECTION_GAP_MM = 2;
const SCALE = 2;

/**
 * Walk DOM and collect visible text nodes with bounding rects relative to a container.
 */
const collectTextFromElement = (
  el: HTMLElement,
  containerRect: DOMRect
): { text: string; x: number; y: number; h: number }[] => {
  const items: { text: string; x: number; y: number; h: number }[] = [];
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) => {
      const txt = node.textContent?.trim();
      if (!txt) return NodeFilter.FILTER_REJECT;
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      const style = getComputedStyle(parent);
      if (style.display === "none" || style.visibility === "hidden" || style.opacity === "0")
        return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  while (walker.nextNode()) {
    const node = walker.currentNode as Text;
    const range = document.createRange();
    range.selectNodeContents(node);
    const rects = range.getClientRects();
    for (let i = 0; i < rects.length; i++) {
      const r = rects[i];
      if (r.width === 0 || r.height === 0) continue;
      items.push({
        text: node.textContent!.trim(),
        x: r.left - containerRect.left,
        y: r.top - containerRect.top,
        h: r.height,
      });
      break;
    }
  }
  return items;
};

/**
 * Section-based PDF builder.
 * Captures each [data-pdf-section] independently and places them on pages
 * without ever splitting an element across a page boundary.
 * Falls back to capturing the whole node if no sections are found.
 * Overlays invisible selectable text for "true PDF" capability.
 */
export const buildResumePdfFromNode = async (
  sourceNode: HTMLElement
): Promise<{ save: (fileName: string) => Promise<void> }> => {
  return {
    save: async (fileName: string) => {
      // 1. Clone into offscreen container
      const container = document.createElement("div");
      container.style.position = "absolute";
      container.style.left = "-9999px";
      container.style.top = "0";
      container.style.width = `${A4_W_PX}px`;
      container.style.background = "white";
      container.style.zIndex = "-1";

      const clone = sourceNode.cloneNode(true) as HTMLElement;
      clone.style.width = `${A4_W_PX}px`;
      clone.style.maxWidth = "none";
      clone.style.margin = "0";
      clone.style.padding = clone.style.padding || "0";
      clone.style.transform = "none";
      clone.style.transformOrigin = "top left";

      container.appendChild(clone);
      document.body.appendChild(container);

      if ("fonts" in document) await document.fonts.ready;
      await new Promise((r) => setTimeout(r, 300));

      try {
        const sections = Array.from(
          clone.querySelectorAll("[data-pdf-section]")
        ) as HTMLElement[];

        // If no sections marked, treat whole clone as one big section
        const captureTargets = sections.length > 0 ? sections : [clone];

        const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });

        let currentY = MARGIN_MM;
        let pageIndex = 0;

        for (const section of captureTargets) {
          // Capture section
          const canvas = await html2canvas(section, {
            scale: SCALE,
            useCORS: true,
            allowTaint: true,
            backgroundColor: null, // preserve transparency
            logging: false,
          });

          const widthPx = canvas.width;
          const heightPx = canvas.height;
          const scaleFactor = CONTENT_W_MM / widthPx;
          const sectionHeightMM = heightPx * scaleFactor;

          // Check if section fits on current page
          const remainingSpace = A4_H_MM - MARGIN_MM - currentY;
          if (sectionHeightMM > remainingSpace && currentY > MARGIN_MM + 1) {
            // Doesn't fit — move to next page
            pdf.addPage();
            pageIndex++;
            currentY = MARGIN_MM;
          }

          // If a single section is taller than one full page, we still place it
          // (it will overflow, but at least we don't split mid-line)
          const imgData = canvas.toDataURL("image/jpeg", 0.95);
          pdf.addImage(imgData, "JPEG", MARGIN_MM, currentY, CONTENT_W_MM, sectionHeightMM);

          // Overlay invisible text for this section
          const sectionRect = section.getBoundingClientRect();
          const textItems = collectTextFromElement(section, sectionRect);

          for (const item of textItems) {
            const xFrac = item.x / sectionRect.width;
            const yFrac = item.y / sectionRect.height;
            const fontSizePt = Math.max(1, (item.h / sectionRect.height) * sectionHeightMM * 2.3);

            const xMM = MARGIN_MM + xFrac * CONTENT_W_MM;
            const yMM = currentY + yFrac * sectionHeightMM + fontSizePt * 0.35;

            pdf.setFontSize(fontSizePt);
            // @ts-ignore - internal API for invisible text rendering
            pdf.internal.write("3 Tr");
            pdf.text(item.text, xMM, yMM, {
              maxWidth: CONTENT_W_MM - (xMM - MARGIN_MM),
            });
            // @ts-ignore
            pdf.internal.write("0 Tr");
          }

          currentY += sectionHeightMM + SECTION_GAP_MM;
        }

        pdf.save(fileName);
      } finally {
        container.remove();
      }
    },
  };
};
