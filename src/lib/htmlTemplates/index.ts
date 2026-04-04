import { ResumeData } from "@/types/resume";
import { generateSapphireBloomHtml } from "./sapphireBloomHtml";
import { generateEmeraldEleganceHtml } from "./emeraldEleganceHtml";
import { generateCoralSunsetHtml } from "./coralSunsetHtml";

/** Map of template IDs to their HTML generator functions */
export const premiumHtmlTemplates: Record<string, (data: ResumeData) => string> = {
  "sapphire-bloom": generateSapphireBloomHtml,
  "emerald-elegance": generateEmeraldEleganceHtml,
  "coral-sunset": generateCoralSunsetHtml,
};

/** Check if a template ID is a premium template (uses Browserless) */
export const isPremiumTemplate = (templateId: string): boolean => {
  return templateId in premiumHtmlTemplates;
};
