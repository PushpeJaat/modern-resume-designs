import { ResumeData } from "@/types/resume";
import ModernProfessionalPdf from "./ModernProfessionalPdf";
import CreativeMinimalPdf from "./CreativeMinimalPdf";
import ExecutiveClassicPdf from "./ExecutiveClassicPdf";
import GeometricModernPdf from "./GeometricModernPdf";
import GradientWavePdf from "./GradientWavePdf";
import DottedPatternPdf from "./DottedPatternPdf";
import DarkSidebarPdf from "./DarkSidebarPdf";
import PhotoModernPdf from "./PhotoModernPdf";
import SapphireBloomPdf from "./SapphireBloomPdf";
import EmeraldElegancePdf from "./EmeraldElegancePdf";
import CoralSunsetPdf from "./CoralSunsetPdf";

export const pdfTemplates: Record<string, React.ComponentType<{ data: ResumeData }>> = {
  "modern-professional": ModernProfessionalPdf,
  "creative-minimal": CreativeMinimalPdf,
  "executive-classic": ExecutiveClassicPdf,
  "geometric-modern": GeometricModernPdf,
  "gradient-wave": GradientWavePdf,
  "dotted-pattern": DottedPatternPdf,
  "dark-sidebar": DarkSidebarPdf,
  "photo-modern": PhotoModernPdf,
  "sapphire-bloom": SapphireBloomPdf,
  "emerald-elegance": EmeraldElegancePdf,
  "coral-sunset": CoralSunsetPdf,
};
