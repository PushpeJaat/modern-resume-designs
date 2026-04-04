import { ResumeData } from "@/types/resume";

export const generateCoralSunsetHtml = (data: ResumeData): string => {
  const p = data.personalInfo;

  const contactItems = [
    p.email && `<span class="contact-item">&#9993; ${esc(p.email)}</span>`,
    p.phone && `<span class="contact-item">&#9742; ${esc(p.phone)}</span>`,
    p.location && `<span class="contact-item">&#128205; ${esc(p.location)}</span>`,
    p.linkedin && `<span class="contact-item">&#128279; ${esc(p.linkedin)}</span>`,
    p.website && `<span class="contact-item">&#127760; ${esc(p.website)}</span>`,
  ].filter(Boolean).join("");

  const experienceHtml = data.experience
    .filter((e) => e.position)
    .map(
      (exp) => `
      <div class="exp-item">
        <div class="dot"></div>
        <div class="exp-header">
          <div>
            <h3 class="exp-position">${esc(exp.position)}</h3>
            <p class="exp-company">${esc(exp.company)}</p>
          </div>
          <span class="exp-date">${esc(exp.startDate)} — ${exp.current ? "Present" : esc(exp.endDate)}</span>
        </div>
        ${
          exp.responsibilities.filter((r) => r.trim()).length > 0
            ? `<ul class="resp-list">${exp.responsibilities
                .filter((r) => r.trim())
                .map((r) => `<li>${esc(r)}</li>`)
                .join("")}</ul>`
            : ""
        }
      </div>`
    )
    .join("");

  const skillsHtml = data.skills
    .map(
      (cat) => `
      <div class="skill-category">
        <h3 class="skill-cat-title">${esc(cat.category)}</h3>
        <div class="skill-tags">
          ${cat.skills
            .filter((s) => s.trim())
            .map((s) => `<span class="skill-tag">${esc(s)}</span>`)
            .join("")}
        </div>
      </div>`
    )
    .join("");

  const educationHtml = data.education
    .filter((e) => e.institution)
    .map(
      (edu) => `
      <div class="edu-item">
        <h3 class="edu-degree">${esc(edu.degree)} ${esc(edu.field)}</h3>
        <p class="edu-institution">${esc(edu.institution)}</p>
        <p class="edu-date">${esc(edu.startDate)} — ${esc(edu.endDate)}</p>
      </div>`
    )
    .join("");

  const photoHtml = p.photoUrl
    ? `<img src="${esc(p.photoUrl)}" class="photo" alt="Profile" />`
    : `<div class="photo-placeholder">&#128247;</div>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  @page { size: A4; margin: 0; }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    color: #2d3748;
    background: #fff;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .page-bg {
    position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 0;
  }
  .blob1 { position: absolute; top: -64px; left: -64px; width: 288px; height: 288px; border-radius: 50%; opacity: 0.05; background: hsl(15,90%,55%); filter: blur(48px); }
  .blob2 { position: absolute; bottom: 80px; right: 0; width: 240px; height: 240px; border-radius: 50%; opacity: 0.04; background: hsl(35,95%,55%); filter: blur(48px); }
  .blob3 { position: absolute; top: 50%; left: 40px; width: 128px; height: 128px; border-radius: 50%; opacity: 0.04; background: hsl(5,85%,60%); filter: blur(32px); }

  .header {
    position: relative; overflow: hidden;
    background: linear-gradient(135deg, hsl(15,80%,45%), hsl(25,85%,50%), hsl(35,90%,55%));
    padding: 40px 48px; display: flex; align-items: center; gap: 32px;
  }
  .header::before { content: ''; position: absolute; top: -24px; right: -24px; width: 128px; height: 128px; border: 2px solid rgba(255,255,255,0.1); border-radius: 50%; }
  .header::after { content: ''; position: absolute; bottom: -40px; left: -40px; width: 176px; height: 176px; border: 2px solid rgba(255,255,255,0.1); border-radius: 50%; }
  .header .circle-sm { position: absolute; top: 16px; right: 96px; width: 56px; height: 56px; border: 1px solid rgba(255,255,255,0.1); border-radius: 50%; }
  .header .circle-md { position: absolute; bottom: 24px; right: 160px; width: 80px; height: 80px; border: 1px solid rgba(255,255,255,0.07); border-radius: 50%; }
  .header .wave-strip { position: absolute; bottom: 0; left: 0; width: 100%; height: 12px; background: linear-gradient(90deg, rgba(255,255,255,0.1), rgba(255,255,255,0.2), rgba(255,255,255,0.1)); }

  .photo { width: 96px; height: 96px; border-radius: 50%; object-fit: cover; border: 4px solid rgba(255,255,255,0.3); box-shadow: 0 4px 12px rgba(0,0,0,0.2); flex-shrink: 0; }
  .photo-placeholder { width: 96px; height: 96px; border-radius: 50%; background: rgba(255,255,255,0.2); border: 4px solid rgba(255,255,255,0.3); display: flex; align-items: center; justify-content: center; font-size: 32px; flex-shrink: 0; }

  .header-text { position: relative; z-index: 1; }
  .header-name { font-size: 28px; font-weight: 700; color: #fff; letter-spacing: 0.5px; margin-bottom: 4px; }
  .header-title { font-size: 16px; color: rgba(255,255,255,0.8); font-weight: 300; letter-spacing: 0.5px; }
  .contact-row { display: flex; flex-wrap: wrap; gap: 16px; margin-top: 12px; }
  .contact-item { font-size: 11px; color: rgba(255,255,255,0.7); }

  .body { padding: 32px 48px; position: relative; z-index: 1; }

  .section { margin-bottom: 24px; page-break-inside: avoid; }
  .section-title {
    font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px;
    color: hsl(15,80%,40%); margin-bottom: 12px; display: flex; align-items: center; gap: 8px;
  }
  .section-title::before {
    content: ''; width: 32px; height: 3px; border-radius: 2px;
    background: linear-gradient(90deg, hsl(15,80%,45%), hsl(35,90%,55%)); flex-shrink: 0;
  }
  .summary-text { font-size: 13px; line-height: 1.7; color: hsl(15,10%,30%); }

  .exp-item { position: relative; padding-left: 20px; border-left: 2px solid hsl(15,15%,87%); margin-bottom: 20px; page-break-inside: avoid; }
  .dot { position: absolute; left: -5px; top: 6px; width: 8px; height: 8px; border-radius: 50%; background: hsl(25,85%,50%); }
  .exp-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px; }
  .exp-position { font-size: 13px; font-weight: 700; color: hsl(15,20%,20%); }
  .exp-company { font-size: 12px; font-weight: 500; color: hsl(25,85%,45%); }
  .exp-date { font-size: 11px; color: hsl(15,10%,55%); white-space: nowrap; margin-left: 16px; }
  .resp-list { list-style: disc; padding-left: 18px; margin-top: 6px; }
  .resp-list li { font-size: 12px; color: hsl(15,15%,30%); line-height: 1.6; margin-bottom: 2px; }

  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }

  .skill-category { margin-bottom: 12px; }
  .skill-cat-title { font-size: 11px; font-weight: 600; color: hsl(15,20%,25%); margin-bottom: 6px; }
  .skill-tags { display: flex; flex-wrap: wrap; gap: 6px; }
  .skill-tag { padding: 4px 10px; font-size: 11px; border-radius: 999px; background: hsl(25,80%,94%); color: hsl(15,80%,35%); font-weight: 500; }

  .edu-item { margin-bottom: 12px; }
  .edu-degree { font-size: 13px; font-weight: 700; color: hsl(15,20%,20%); }
  .edu-institution { font-size: 11px; color: hsl(15,10%,55%); margin-top: 2px; }
  .edu-date { font-size: 11px; color: hsl(15,10%,65%); }
</style>
</head>
<body>
  <div class="page-bg"><div class="blob1"></div><div class="blob2"></div><div class="blob3"></div></div>

  <div class="header">
    <div class="circle-sm"></div>
    <div class="circle-md"></div>
    <div class="wave-strip"></div>
    ${photoHtml}
    <div class="header-text">
      <div class="header-name">${esc(p.name || "Your Name")}</div>
      <div class="header-title">${esc(p.title || "Your Title")}</div>
      <div class="contact-row">${contactItems}</div>
    </div>
  </div>

  <div class="body">
    ${data.summary ? `<div class="section"><div class="section-title">Professional Summary</div><p class="summary-text">${esc(data.summary)}</p></div>` : ""}
    ${experienceHtml ? `<div class="section"><div class="section-title">Work Experience</div>${experienceHtml}</div>` : ""}
    <div class="two-col">
      ${skillsHtml ? `<div class="section"><div class="section-title">Skills</div>${skillsHtml}</div>` : ""}
      ${educationHtml ? `<div class="section"><div class="section-title">Education</div>${educationHtml}</div>` : ""}
    </div>
  </div>
</body>
</html>`;
};

function esc(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
