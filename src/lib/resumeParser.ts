import { supabase } from "@/integrations/supabase/client";
import { ResumeData } from "@/types/resume";

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

export async function extractResumeFromPDF(file: File): Promise<ResumeData> {
  const arrayBuffer = await file.arrayBuffer();
  const base64 = arrayBufferToBase64(arrayBuffer);

  const { data, error } = await supabase.functions.invoke("parse-resume", {
    body: { pdfBase64: base64 },
  });

  if (error) {
    console.error("Edge function error:", error);
    throw new Error(error.message || "Failed to parse resume");
  }

  if (data?.error) {
    throw new Error(data.error);
  }

  const resumeData = data?.data as ResumeData;

  // Ensure all required fields exist with defaults
  return {
    personalInfo: {
      name: resumeData?.personalInfo?.name || "",
      title: resumeData?.personalInfo?.title || "",
      email: resumeData?.personalInfo?.email || "",
      phone: resumeData?.personalInfo?.phone || "",
      location: resumeData?.personalInfo?.location || "",
      linkedin: resumeData?.personalInfo?.linkedin || "",
      website: resumeData?.personalInfo?.website || "",
      github: resumeData?.personalInfo?.github || "",
      photoUrl: resumeData?.personalInfo?.photoUrl || "",
    },
    summary: resumeData?.summary || "",
    experience: resumeData?.experience?.length
      ? resumeData.experience.map((e, i) => ({
          id: e.id || String(i + 1),
          company: e.company || "",
          position: e.position || "",
          startDate: e.startDate || "",
          endDate: e.endDate || "",
          current: e.current || false,
          responsibilities: e.responsibilities || [""],
        }))
      : [{ id: "1", company: "", position: "", startDate: "", endDate: "", current: false, responsibilities: [""] }],
    education: resumeData?.education?.length
      ? resumeData.education.map((e, i) => ({
          id: e.id || String(i + 1),
          institution: e.institution || "",
          degree: e.degree || "",
          field: e.field || "",
          startDate: e.startDate || "",
          endDate: e.endDate || "",
        }))
      : [{ id: "1", institution: "", degree: "", field: "", startDate: "", endDate: "" }],
    skills: resumeData?.skills?.length
      ? resumeData.skills
      : [{ category: "Skills", skills: [] }],
  };
}
