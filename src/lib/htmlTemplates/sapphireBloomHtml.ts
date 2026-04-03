import { ResumeData } from "@/types/resume";

/**
 * Generates a full HTML document for the Sapphire Bloom template,
 * designed to be rendered by a headless browser (Browserless/Playwright).
 * Supports full CSS: gradients, shadows, border-radius, etc.
 */
export const generateSapphireBloomHtml = (data: ResumeData): string => {
  const p = data.personalInfo;

  const contactItems = [
    p.email && `<span class="contact-item">✉ ${esc(p.email)}</span>`,
    p.phone && `<span class="contact-item">☎ ${esc(p.phone)}</span>`,
    p.location && `<span class="contact-item">📍 ${esc(p.location)}</span>`,
    p.linkedin && `<span class="contact-item">🔗 ${esc(p.linkedin)}</span>`,
    p.website && `<span class="contact-item">🌐 ${esc(p.website)}</span>`,
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
    : `<div class="photo-placeholder">📷</div>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  @page {
    size: A4;
    margin: 0;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    color: #2d3748;
    background: #fff;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* --- Header --- */
  .header {
    position: relative;
    overflow: hidden;
    background: linear-gradient(135deg, hsl(215, 85%, 35%), hsl(215, 80%, 45%), hsl(200, 75%, 50%));
    padding: 40px 48px;
    display: flex;
    align-items: center;
    gap: 32px;
  }

  /* Decorative circles */
  .header::before {
    content: '';
    position: absolute;
    top: -40px;
    right: -40px;
    width: 160px;
    height: 160px;
    border: 2px solid rgba(255,255,255,0.1);
    border-radius: 50%;
  }
  .header::after {
    content: '';
    position: absolute;
    bottom: -64px;
    left: -64px;
    width: 208px;
    height: 208px;
    border: 2px solid rgba(255,255,255,0.1);
    border-radius: 50%;
  }
  .header .circle-sm {
    position: absolute;
    top: 16px;
    right: 112px;
    width: 80px;
    height: 80px;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 50%;
  }

  .photo {
    width: 96px;
    height: 96px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid rgba(255,255,255,0.3);
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    flex-shrink: 0;
  }
  .photo-placeholder {
    width: 96px;
    height: 96px;
    border-radius: 50%;
    background: rgba(255,255,255,0.2);
    border: 4px solid rgba(255,255,255,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    flex-shrink: 0;
  }

  .header-text { position: relative; z-index: 1; }
  .header-name {
    font-size: 28px;
    font-weight: 700;
    color: #fff;
    letter-spacing: 0.5px;
    margin-bottom: 4px;
  }
  .header-title {
    font-size: 16px;
    color: rgba(255,255,255,0.8);
    font-weight: 300;
    letter-spacing: 0.5px;
  }
  .contact-row {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin-top: 12px;
  }
  .contact-item {
    font-size: 11px;
    color: rgba(255,255,255,0.7);
  }

  /* --- Body --- */
  .body {
    padding: 32px 48px;
    position: relative;
  }

  /* Decorative background blobs */
  .body::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 288px;
    height: 288px;
    border-radius: 50%;
    opacity: 0.04;
    background: hsl(215, 85%, 45%);
    filter: blur(48px);
    pointer-events: none;
  }

  /* --- Sections --- */
  .section {
    margin-bottom: 24px;
    page-break-inside: avoid;
  }
  .section-title {
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: hsl(215, 85%, 35%);
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .section-title::before {
    content: '';
    width: 32px;
    height: 3px;
    border-radius: 2px;
    background: linear-gradient(90deg, hsl(215, 85%, 45%), hsl(200, 75%, 50%));
    flex-shrink: 0;
  }

  .summary-text {
    font-size: 13px;
    line-height: 1.7;
    color: hsl(215, 15%, 30%);
  }

  /* Experience */
  .exp-item {
    position: relative;
    padding-left: 20px;
    border-left: 2px solid hsl(215, 20%, 88%);
    margin-bottom: 20px;
    page-break-inside: avoid;
  }
  .dot {
    position: absolute;
    left: -5px;
    top: 6px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: hsl(215, 85%, 45%);
  }
  .exp-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 6px;
  }
  .exp-position {
    font-size: 13px;
    font-weight: 700;
    color: hsl(215, 20%, 20%);
  }
  .exp-company {
    font-size: 12px;
    font-weight: 500;
    color: hsl(215, 85%, 45%);
  }
  .exp-date {
    font-size: 11px;
    color: hsl(215, 10%, 55%);
    white-space: nowrap;
    margin-left: 16px;
  }
  .resp-list {
    list-style: disc;
    padding-left: 18px;
    margin-top: 6px;
  }
  .resp-list li {
    font-size: 12px;
    color: hsl(215, 15%, 30%);
    line-height: 1.6;
    margin-bottom: 2px;
  }

  /* Two-column bottom */
  .two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }

  /* Skills */
  .skill-category { margin-bottom: 12px; }
  .skill-cat-title {
    font-size: 11px;
    font-weight: 600;
    color: hsl(215, 20%, 25%);
    margin-bottom: 6px;
  }
  .skill-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  .skill-tag {
    padding: 4px 10px;
    font-size: 11px;
    border-radius: 999px;
    background: hsl(215, 85%, 95%);
    color: hsl(215, 85%, 35%);
    font-weight: 500;
  }

  /* Education */
  .edu-item { margin-bottom: 12px; }
  .edu-degree {
    font-size: 13px;
    font-weight: 700;
    color: hsl(215, 20%, 20%);
  }
  .edu-institution {
    font-size: 11px;
    color: hsl(215, 10%, 55%);
    margin-top: 2px;
  }
  .edu-date {
    font-size: 11px;
    color: hsl(215, 10%, 65%);
  }
</style>
</head>
<body>
  <div class="header">
    <div class="circle-sm"></div>
    ${photoHtml}
    <div class="header-text">
      <div class="header-name">${esc(p.name || "Your Name")}</div>
      <div class="header-title">${esc(p.title || "Your Title")}</div>
      <div class="contact-row">${contactItems}</div>
    </div>
  </div>

  <div class="body">
    ${
      data.summary
        ? `<div class="section">
            <div class="section-title">Professional Summary</div>
            <p class="summary-text">${esc(data.summary)}</p>
          </div>`
        : ""
    }

    ${
      experienceHtml
        ? `<div class="section">
            <div class="section-title">Work Experience</div>
            ${experienceHtml}
          </div>`
        : ""
    }

    <div class="two-col">
      ${
        skillsHtml
          ? `<div class="section">
              <div class="section-title">Skills</div>
              ${skillsHtml}
            </div>`
          : ""
      }
      ${
        educationHtml
          ? `<div class="section">
              <div class="section-title">Education</div>
              ${educationHtml}
            </div>`
          : ""
      }
    </div>
  </div>
</body>
</html>`;
};

function esc(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
