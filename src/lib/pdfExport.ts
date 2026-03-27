import { printResumeFromNode } from "@/lib/pdfPrint";

type PrintableResumePdf = {
  save: (fileName: string) => Promise<void>;
};

export const buildResumePdfFromNode = async (sourceNode: HTMLElement): Promise<PrintableResumePdf> => ({
  save: (fileName: string) => printResumeFromNode(sourceNode, fileName),
});