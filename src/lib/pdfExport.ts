import { pdf } from "@react-pdf/renderer";
import { ResumeData } from "@/types/resume";
import { pdfTemplates } from "@/components/pdf-templates";
import React from "react";

/**
 * Generate a PDF blob using @react-pdf/renderer.
 * No html2canvas — produces true native PDF with selectable text,
 * proper A4 pagination, and no line cutting.
 */
export const generateResumePdf = async (
  data: ResumeData,
  templateId: string
): Promise<Blob> => {
  const TemplateComponent = pdfTemplates[templateId];

  if (!TemplateComponent) {
    throw new Error(`PDF template not found for: ${templateId}`);
  }

  const element = React.createElement(TemplateComponent, { data });
  const blob = await pdf(element as any).toBlob();
  return blob;
};

/**
 * Generate and immediately download a resume PDF.
 */
export const downloadResumePdf = async (
  data: ResumeData,
  templateId: string,
  fileName: string
): Promise<void> => {
  const blob = await generateResumePdf(data, templateId);
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
