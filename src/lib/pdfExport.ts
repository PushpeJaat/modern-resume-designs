import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;
const PAGE_MARGIN_MM = 10;
const CONTENT_WIDTH_MM = A4_WIDTH_MM - PAGE_MARGIN_MM * 2;
const CONTENT_HEIGHT_MM = A4_HEIGHT_MM - PAGE_MARGIN_MM * 2;
const EXPORT_WIDTH_PX = 794;

type PageRange = {
  start: number;
  end: number;
};

type Boundary = {
  top: number;
  bottom: number;
};

const waitForNextPaint = () =>
  new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve());
    });
  });

const waitForAssets = async (root: HTMLElement) => {
  const images = Array.from(root.querySelectorAll("img"));

  await Promise.all(
    images.map(
      (img) =>
        new Promise<void>((resolve) => {
          if (img.complete) {
            resolve();
            return;
          }

          const done = () => {
            img.removeEventListener("load", done);
            img.removeEventListener("error", done);
            resolve();
          };

          img.addEventListener("load", done, { once: true });
          img.addEventListener("error", done, { once: true });
        })
    )
  );

  if ("fonts" in document) {
    await document.fonts.ready;
  }

  await waitForNextPaint();
};

const uniqueSorted = (values: number[]) =>
  Array.from(new Set(values.map((value) => Math.round(value)).filter((value) => value >= 0))).sort((a, b) => a - b);

const findLastInRange = (values: number[], min: number, max: number) => {
  for (let index = values.length - 1; index >= 0; index -= 1) {
    const value = values[index];
    if (value > max) continue;
    if (value >= min) return value;
    break;
  }

  return null;
};

const findFirstInRange = (values: number[], min: number, max: number) => {
  for (const value of values) {
    if (value < min) continue;
    if (value <= max) return value;
    break;
  }

  return null;
};

const isBoundaryCandidate = (element: HTMLElement, rootWidth: number) => {
  const style = window.getComputedStyle(element);
  const rect = element.getBoundingClientRect();

  if (
    style.display === "inline" ||
    style.display === "contents" ||
    style.position === "absolute" ||
    style.position === "fixed" ||
    style.visibility === "hidden" ||
    Number(style.opacity) === 0
  ) {
    return false;
  }

  if (rect.height < 18 || rect.width < rootWidth * 0.18) {
    return false;
  }

  return true;
};

const collectBoundaries = (root: HTMLElement) => {
  const rootRect = root.getBoundingClientRect();
  const totalHeight = Math.ceil(root.scrollHeight);
  const rootWidth = rootRect.width;
  const elements = [root, ...Array.from(root.querySelectorAll<HTMLElement>("*"))];
  const boundaries: Boundary[] = [];

  for (const element of elements) {
    if (!isBoundaryCandidate(element, rootWidth)) continue;

    const rect = element.getBoundingClientRect();
    const top = Math.max(0, rect.top - rootRect.top);
    const bottom = Math.min(totalHeight, rect.bottom - rootRect.top);

    if (bottom - top < 18) continue;
    boundaries.push({ top, bottom });
  }

  return boundaries;
};

const buildPageRanges = (totalHeight: number, pageHeightPx: number, boundaries: Boundary[]): PageRange[] => {
  const topBreaks = uniqueSorted(boundaries.map((boundary) => boundary.top));
  const bottomBreaks = uniqueSorted(boundaries.map((boundary) => boundary.bottom));
  const ranges: PageRange[] = [];
  const minFillPx = pageHeightPx * 0.68;
  const maxOverflowPx = pageHeightPx * 0.12;
  const minStepPx = 96;

  let currentStart = 0;

  while (currentStart < totalHeight - 1) {
    if (currentStart + pageHeightPx >= totalHeight) {
      ranges.push({ start: currentStart, end: totalHeight });
      break;
    }

    const idealBreak = currentStart + pageHeightPx;
    const minBreak = currentStart + minFillPx;
    const overflowLimit = Math.min(totalHeight, idealBreak + maxOverflowPx);

    let nextBreak =
      findLastInRange(topBreaks, minBreak, idealBreak) ??
      findLastInRange(bottomBreaks, minBreak, idealBreak) ??
      findFirstInRange(topBreaks, idealBreak, overflowLimit) ??
      findFirstInRange(bottomBreaks, idealBreak, overflowLimit) ??
      Math.min(totalHeight, idealBreak);

    if (nextBreak - currentStart < minStepPx) {
      nextBreak = Math.min(totalHeight, currentStart + pageHeightPx);
    }

    if (totalHeight - nextBreak < 48) {
      nextBreak = totalHeight;
    }

    ranges.push({ start: currentStart, end: nextBreak });
    currentStart = nextBreak;
  }

  return ranges;
};

export const buildResumePdfFromNode = async (sourceNode: HTMLElement) => {
  const host = document.createElement("div");
  host.style.cssText = `position:fixed;left:-100000px;top:0;width:${EXPORT_WIDTH_PX}px;background:white;pointer-events:none;z-index:-1;`;

  const viewport = document.createElement("div");
  viewport.style.cssText = `position:relative;width:${EXPORT_WIDTH_PX}px;overflow:hidden;background:white;`;

  const clone = sourceNode.cloneNode(true) as HTMLElement;
  clone.style.width = `${EXPORT_WIDTH_PX}px`;
  clone.style.transformOrigin = "top left";
  clone.style.willChange = "transform";

  viewport.appendChild(clone);
  host.appendChild(viewport);
  document.body.appendChild(host);

  try {
    await waitForAssets(clone);

    const totalHeight = Math.ceil(clone.scrollHeight);
    const pageHeightPx = Math.floor((CONTENT_HEIGHT_MM * EXPORT_WIDTH_PX) / CONTENT_WIDTH_MM);
    const boundaries = collectBoundaries(clone);
    const pageRanges = buildPageRanges(totalHeight, pageHeightPx, boundaries);
    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

    for (const [pageIndex, range] of pageRanges.entries()) {
      const sliceHeightPx = range.end - range.start;

      viewport.style.height = `${sliceHeightPx}px`;
      clone.style.transform = `translateY(-${range.start}px)`;

      await waitForNextPaint();

      const canvas = await html2canvas(viewport, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        width: EXPORT_WIDTH_PX,
        height: sliceHeightPx,
        windowWidth: EXPORT_WIDTH_PX,
        windowHeight: sliceHeightPx,
        scrollX: 0,
        scrollY: 0,
      });

      const renderedHeightMm = (canvas.height * CONTENT_WIDTH_MM) / canvas.width;

      if (pageIndex > 0) {
        pdf.addPage();
      }

      pdf.addImage(
        canvas.toDataURL("image/png"),
        "PNG",
        PAGE_MARGIN_MM,
        PAGE_MARGIN_MM,
        CONTENT_WIDTH_MM,
        renderedHeightMm,
        undefined,
        "FAST"
      );
    }

    return pdf;
  } finally {
    host.remove();
  }
};