import { ResumeData } from "@/types/resume";
import { generateSapphireBloomHtml } from "./sapphireBloomHtml";

/** Map of template IDs to their HTML generator functions */
export const premiumHtmlTemplates: Record<string, (data: ResumeData) => string> = {
  "sapphire-bloom": generateSapphireBloomHtml,
};

/** Check if a template ID is a premium template (uses Browserless) */
export const isPremiumTemplate = (templateId: string): boolean => {
  return templateId in premiumHtmlTemplates;
};
