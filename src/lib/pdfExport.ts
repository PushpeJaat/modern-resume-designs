import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const A4_W_MM = 210;
const A4_H_MM = 297;
const A4_W_PX = 794; // 210mm at 96dpi
const A4_H_PX = 1123; // 297mm at 96dpi
const SCALE = 2; // render quality

interface TextItem {
  text: string;
  x: number; // fraction of page width  (0-1)
  y: number; // fraction of page height (0-1)
  fontSize: number; // in pt for PDF
  width: number; // fraction of page width
}

/**
 * Walk the DOM tree and collect every visible text node with its bounding rect
 * relative to the given container.
 */
const collectTextNodes = (root: HTMLElement): { text: string; rect: DOMRect }[] => {
  const items: { text: string; rect: DOMRect }[] = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
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
      const parent = node.parentElement!;
      const fontSize = parseFloat(getComputedStyle(parent).fontSize);
      items.push({ text: node.textContent!.trim(), rect: r });
      break; // one rect per text node is enough
    }
  }
  return items;
};

/**
 * Build a multi-page PDF from a resume DOM node.
 * - Uses html2canvas for pixel-perfect visuals (background image layer)
 * - Overlays invisible selectable text so the PDF is a "true PDF"
 * - Downloads directly — no print dialog
 */
export const buildResumePdfFromNode = async (
  sourceNode: HTMLElement
): Promise<{ save: (fileName: string) => Promise<void> }> => {
  return {
    save: async (fileName: string) => {
      // 1. Clone the node into an offscreen container so we can
      //    measure + render without affecting the page.
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

      // Wait for fonts + images
      if ("fonts" in document) await document.fonts.ready;
      await new Promise((r) => setTimeout(r, 300));

      try {
        const totalHeight = clone.scrollHeight;
        const pageCount = Math.max(1, Math.ceil(totalHeight / A4_H_PX));

        const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });

        // Collect text positions relative to clone
        const cloneRect = clone.getBoundingClientRect();
        const allText = collectTextNodes(clone);

        for (let page = 0; page < pageCount; page++) {
          if (page > 0) pdf.addPage();

          const yOffset = page * A4_H_PX;
          const captureHeight = Math.min(A4_H_PX, totalHeight - yOffset);

          // Render this page slice as canvas
          const canvas = await html2canvas(clone, {
            scale: SCALE,
            width: A4_W_PX,
            height: captureHeight,
            x: 0,
            y: yOffset,
            windowWidth: A4_W_PX,
            windowHeight: captureHeight,
            useCORS: true,
            allowTaint: true,
            backgroundColor: "#ffffff",
            logging: false,
          });

          const imgData = canvas.toDataURL("image/jpeg", 0.95);
          const imgHeightMM = (captureHeight / A4_H_PX) * A4_H_MM;
          pdf.addImage(imgData, "JPEG", 0, 0, A4_W_MM, imgHeightMM);

          // Overlay invisible text for this page
          pdf.setTextColor(0, 0, 0);

          for (const item of allText) {
            const textTop = item.rect.top - cloneRect.top;
            const textBottom = textTop + item.rect.height;
            const textLeft = item.rect.left - cloneRect.left;

            // Check if text falls within this page
            if (textBottom <= yOffset || textTop >= yOffset + captureHeight) continue;

            const relX = textLeft / A4_W_PX;
            const relY = (textTop - yOffset) / A4_H_PX;
            const fontSizePt = Math.max(1, (item.rect.height / A4_H_PX) * A4_H_MM * 2.3);

            const xMM = relX * A4_W_MM;
            const yMM = relY * A4_H_MM + fontSizePt * 0.35; // baseline offset

            // Set font as invisible (rendering mode 3 = invisible)
            pdf.setFontSize(fontSizePt);
            // @ts-ignore - internal API for text rendering mode
            pdf.internal.write("3 Tr"); // invisible text rendering mode
            pdf.text(item.text, xMM, yMM, { maxWidth: A4_W_MM - xMM });
            // @ts-ignore
            pdf.internal.write("0 Tr"); // reset to normal
          }
        }

        pdf.save(fileName);
      } finally {
        container.remove();
      }
    },
  };
};
