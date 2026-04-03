import { pdf } from "@react-pdf/renderer";
import { ResumeData } from "@/types/resume";
import { pdfTemplates } from "@/components/pdf-templates";
import { isPremiumTemplate, premiumHtmlTemplates } from "@/lib/htmlTemplates";
import { supabase } from "@/integrations/supabase/client";
import React from "react";

/**
 * Generate a PDF blob using @react-pdf/renderer (free templates).
 */
const generateReactPdf = async (
  data: ResumeData,
  templateId: string
): Promise<Blob> => {
  const TemplateComponent = pdfTemplates[templateId];
  if (!TemplateComponent) {
    throw new Error(`PDF template not found for: ${templateId}`);
  }
  const element = React.createElement(TemplateComponent, { data });
  return await pdf(element as any).toBlob();
};

/**
 * Generate a PDF blob via Browserless edge function (premium templates).
 */
const generatePremiumPdf = async (
  data: ResumeData,
  templateId: string
): Promise<Blob> => {
  const htmlGenerator = premiumHtmlTemplates[templateId];
  if (!htmlGenerator) {
    throw new Error(`Premium HTML template not found for: ${templateId}`);
  }

  const html = htmlGenerator(data);

  const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
  const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  const response = await fetch(
    `https://${projectId}.supabase.co/functions/v1/generate-pdf`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${anonKey}`,
        "apikey": anonKey,
      },
      body: JSON.stringify({ html }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `PDF generation failed (${response.status})`);
  }

  return await response.blob();
};

/**
 * Generate a PDF blob — automatically routes to the correct system.
 */
export const generateResumePdf = async (
  data: ResumeData,
  templateId: string
): Promise<Blob> => {
  if (isPremiumTemplate(templateId)) {
    return generatePremiumPdf(data, templateId);
  }
  return generateReactPdf(data, templateId);
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
