import * as pdfjsLib from "pdfjs-dist";
import { ResumeData } from "@/types/resume";

// Set worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs`;

export async function extractTextFromPDF(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let fullText = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const strings = content.items
      .filter((item: any) => "str" in item)
      .map((item: any) => item.str);
    fullText += strings.join(" ") + "\n";
  }

  return fullText;
}

export function parseResumeText(text: string): ResumeData {
  const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
  
  // Extract email
  const emailMatch = text.match(/[\w.+-]+@[\w-]+\.[\w.]+/);
  const email = emailMatch ? emailMatch[0] : "";

  // Extract phone
  const phoneMatch = text.match(/(\+?\d[\d\s\-().]{7,}\d)/);
  const phone = phoneMatch ? phoneMatch[1].trim() : "";

  // Extract LinkedIn
  const linkedinMatch = text.match(/linkedin\.com\/in\/[\w-]+/i);
  const linkedin = linkedinMatch ? linkedinMatch[0] : "";

  // Extract GitHub  
  const githubMatch = text.match(/github\.com\/[\w-]+/i);
  const github = githubMatch ? githubMatch[0] : "";

  // Extract website
  const websiteMatch = text.match(/(?:https?:\/\/)?(?:www\.)?(?!linkedin|github)[\w-]+\.[\w.]+/i);
  const website = websiteMatch && !websiteMatch[0].includes("@") ? websiteMatch[0] : "";

  // First line is typically name
  const name = lines[0] || "";
  
  // Try to find job title (usually near the top, after name)
  let title = "";
  const titleKeywords = ["engineer", "developer", "designer", "manager", "director", "analyst", "consultant", "architect", "lead", "specialist", "coordinator", "officer", "executive", "intern"];
  for (let i = 1; i < Math.min(5, lines.length); i++) {
    if (titleKeywords.some(k => lines[i].toLowerCase().includes(k))) {
      title = lines[i];
      break;
    }
  }

  // Extract location
  const locationMatch = text.match(/([A-Z][a-z]+(?:\s[A-Z][a-z]+)*,\s*[A-Z]{2})/);
  const location = locationMatch ? locationMatch[1] : "";

  // Extract summary - look for keywords
  let summary = "";
  const summaryHeaders = ["summary", "profile", "objective", "about"];
  const sectionHeaders = ["experience", "education", "skills", "projects", "work", "employment", "certifications", "awards", "achievements"];

  const textLower = text.toLowerCase();
  for (const header of summaryHeaders) {
    const idx = textLower.indexOf(header);
    if (idx !== -1) {
      const afterHeader = text.substring(idx + header.length).trim();
      const nextSection = sectionHeaders.reduce((min, sh) => {
        const pos = afterHeader.toLowerCase().indexOf(sh);
        return pos !== -1 && pos < min ? pos : min;
      }, afterHeader.length);
      summary = afterHeader.substring(0, Math.min(nextSection, 500)).trim();
      break;
    }
  }

  // Extract experience sections
  const experience: ResumeData["experience"] = [];
  const expIdx = textLower.search(/\b(experience|employment|work history)\b/);
  if (expIdx !== -1) {
    const expText = text.substring(expIdx);
    const nextSectionIdx = sectionHeaders.filter(s => !["experience", "work", "employment"].includes(s))
      .reduce((min, sh) => {
        const pos = expText.toLowerCase().indexOf(sh, 20);
        return pos !== -1 && pos < min ? pos : min;
      }, expText.length);
    
    const expBlock = expText.substring(0, nextSectionIdx);
    const expLines = expBlock.split("\n").map(l => l.trim()).filter(Boolean).slice(1);
    
    let currentExp: any = null;
    for (const line of expLines) {
      const dateMatch = line.match(/(\w+\.?\s*\d{4})\s*[-–—to]+\s*(\w+\.?\s*\d{4}|present|current)/i);
      if (dateMatch) {
        if (currentExp) experience.push(currentExp);
        currentExp = {
          id: String(experience.length + 1),
          company: "",
          position: "",
          startDate: dateMatch[1],
          endDate: dateMatch[2],
          current: /present|current/i.test(dateMatch[2]),
          responsibilities: [],
        };
        const beforeDate = line.substring(0, line.indexOf(dateMatch[0])).trim();
        if (beforeDate) {
          if (titleKeywords.some(k => beforeDate.toLowerCase().includes(k))) {
            currentExp.position = beforeDate;
          } else {
            currentExp.company = beforeDate;
          }
        }
      } else if (currentExp) {
        if (line.startsWith("•") || line.startsWith("-") || line.startsWith("●") || line.startsWith("▪")) {
          currentExp.responsibilities.push(line.replace(/^[•\-●▪]\s*/, ""));
        } else if (!currentExp.position && titleKeywords.some(k => line.toLowerCase().includes(k))) {
          currentExp.position = line;
        } else if (!currentExp.company && line.length < 60) {
          currentExp.company = line;
        } else if (line.length > 20) {
          currentExp.responsibilities.push(line);
        }
      }
    }
    if (currentExp) experience.push(currentExp);
  }

  // Extract education
  const education: ResumeData["education"] = [];
  const eduIdx = textLower.search(/\beducation\b/);
  if (eduIdx !== -1) {
    const eduText = text.substring(eduIdx);
    const nextSectionIdx = sectionHeaders.filter(s => s !== "education")
      .reduce((min, sh) => {
        const pos = eduText.toLowerCase().indexOf(sh, 15);
        return pos !== -1 && pos < min ? pos : min;
      }, eduText.length);
    
    const eduBlock = eduText.substring(0, nextSectionIdx);
    const eduLines = eduBlock.split("\n").map(l => l.trim()).filter(Boolean).slice(1);
    
    let currentEdu: any = null;
    for (const line of eduLines) {
      const degreeMatch = line.match(/\b(bachelor|master|phd|bs|ba|ms|ma|mba|b\.s|m\.s|b\.a|m\.a|associate|diploma|certificate)\b/i);
      if (degreeMatch) {
        if (currentEdu) education.push(currentEdu);
        currentEdu = {
          id: String(education.length + 1),
          institution: "",
          degree: line,
          field: "",
          startDate: "",
          endDate: "",
        };
      } else if (currentEdu) {
        const yearMatch = line.match(/(\d{4})\s*[-–—to]+\s*(\d{4}|present|current)/i);
        if (yearMatch) {
          currentEdu.startDate = yearMatch[1];
          currentEdu.endDate = yearMatch[2];
        } else if (!currentEdu.institution && line.length < 80) {
          currentEdu.institution = line;
        }
      }
    }
    if (currentEdu) education.push(currentEdu);
  }

  // Extract skills
  const skills: ResumeData["skills"] = [];
  const skillsIdx = textLower.search(/\bskills\b/);
  if (skillsIdx !== -1) {
    const skillsText = text.substring(skillsIdx);
    const nextSectionIdx = sectionHeaders.filter(s => s !== "skills")
      .reduce((min, sh) => {
        const pos = skillsText.toLowerCase().indexOf(sh, 10);
        return pos !== -1 && pos < min ? pos : min;
      }, skillsText.length);
    
    const skillBlock = skillsText.substring(0, Math.min(nextSectionIdx, 500));
    const skillLines = skillBlock.split("\n").map(l => l.trim()).filter(Boolean).slice(1);
    
    const allSkills: string[] = [];
    for (const line of skillLines) {
      const items = line.split(/[,|•●▪·]/).map(s => s.trim()).filter(s => s && s.length < 30);
      allSkills.push(...items);
    }
    
    if (allSkills.length > 0) {
      skills.push({ category: "Skills", skills: allSkills });
    }
  }

  // Fallback: if no skills found, look for common tech terms
  if (skills.length === 0) {
    const techTerms = ["JavaScript", "TypeScript", "React", "Angular", "Vue", "Node.js", "Python", "Java", "C++", "C#", "SQL", "AWS", "Docker", "Kubernetes", "Git", "HTML", "CSS", "MongoDB", "PostgreSQL", "Redis", "GraphQL", "REST", "Agile", "Scrum"];
    const foundSkills = techTerms.filter(t => text.includes(t));
    if (foundSkills.length > 0) {
      skills.push({ category: "Technical", skills: foundSkills });
    }
  }

  return {
    personalInfo: {
      name: name.length > 40 ? name.substring(0, 40) : name,
      title,
      email,
      phone,
      location,
      linkedin,
      website,
      github,
    },
    summary,
    experience: experience.length > 0 ? experience : [{
      id: "1", company: "", position: "", startDate: "", endDate: "", current: false, responsibilities: [""]
    }],
    education: education.length > 0 ? education : [{
      id: "1", institution: "", degree: "", field: "", startDate: "", endDate: ""
    }],
    skills: skills.length > 0 ? skills : [{ category: "Skills", skills: [] }],
  };
}
