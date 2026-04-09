import { Mail, Phone, MapPin, Linkedin, Globe, Github, Camera, Star, Award, Code2 } from "lucide-react";
import { ResumeData } from "@/types/resume";

interface PurplePeakProps {
  data?: ResumeData;
}

const defaultData: ResumeData = {
  personalInfo: {
    name: "Alexandra Rivera",
    title: "Lead Full-Stack Engineer",
    email: "alex.rivera@techmail.io",
    phone: "+1 (415) 867-5309",
    location: "Austin, TX",
    linkedin: "linkedin.com/in/alexrivera",
    website: "alexrivera.dev",
    github: "github.com/alexrivera",
  },
  summary:
    "Visionary full-stack engineer with 10+ years of experience architecting cloud-native systems and leading cross-functional teams. Expert in React, Node.js, and AWS with a proven record of shipping products used by millions. Passionate about developer experience, code quality, and building inclusive engineering cultures.",
  experience: [
    {
      id: "1",
      company: "Nexus Cloud",
      position: "Lead Full-Stack Engineer",
      startDate: "Mar 2021",
      endDate: "Present",
      current: true,
      responsibilities: [
        "Architected a multi-tenant SaaS platform handling 5M+ monthly active users across 40+ enterprise clients",
        "Led a team of 12 engineers; introduced quarterly OKRs that increased sprint velocity by 35%",
        "Reduced infrastructure costs by $400K/year through service consolidation and spot-instance optimization",
        "Designed event-driven microservices with Kafka, cutting end-to-end latency from 800ms to 120ms",
      ],
    },
    {
      id: "2",
      company: "FinEdge Technologies",
      position: "Senior Software Engineer",
      startDate: "Aug 2018",
      endDate: "Feb 2021",
      current: false,
      responsibilities: [
        "Built real-time trading dashboard processing 50K+ WebSocket messages per second using React and Redis Pub/Sub",
        "Owned the full payment-processing pipeline (Stripe, ACH) handling $2B+ in annual transaction volume",
        "Mentored 4 junior engineers; established internal TypeScript style guide adopted company-wide",
      ],
    },
    {
      id: "3",
      company: "Pixel Labs",
      position: "Software Engineer",
      startDate: "Jun 2015",
      endDate: "Jul 2018",
      current: false,
      responsibilities: [
        "Delivered 15+ client projects on time using React, Vue, and Ruby on Rails",
        "Improved Core Web Vitals scores by 60% across flagship product line through performance audits",
      ],
    },
  ],
  education: [
    {
      id: "1",
      institution: "The University of Texas at Austin",
      degree: "M.S.",
      field: "Computer Science",
      startDate: "2013",
      endDate: "2015",
      gpa: "3.9",
    },
    {
      id: "2",
      institution: "Texas A&M University",
      degree: "B.S.",
      field: "Software Engineering",
      startDate: "2009",
      endDate: "2013",
      gpa: "3.7",
    },
  ],
  skills: [
    {
      category: "Frontend",
      skills: ["React", "TypeScript", "Next.js", "Vue", "Tailwind CSS", "GraphQL"],
    },
    {
      category: "Backend",
      skills: ["Node.js", "Python", "Go", "PostgreSQL", "Redis", "Kafka"],
    },
    {
      category: "Cloud & DevOps",
      skills: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD", "Datadog"],
    },
    {
      category: "Leadership",
      skills: ["Agile / Scrum", "System Design", "Code Review", "Mentoring"],
    },
  ],
  certifications: [
    "AWS Certified Solutions Architect – Professional",
    "Google Cloud Professional Data Engineer",
    "Certified Kubernetes Administrator (CKA)",
  ],
  achievements: [
    "Speaker — React Summit 2023: 'Scaling State Management at 5M Users'",
    "Open-Source: maintained react-query-sync (4.2K GitHub stars)",
    "Patent: US20220318541A1 — Adaptive Caching for Distributed APIs",
  ],
  projects: [
    {
      id: "1",
      name: "NexusFlow",
      description: "Low-code workflow automation platform built for enterprise. Deployed to 200+ organizations.",
      technologies: ["React", "Node.js", "Kafka", "PostgreSQL"],
      url: "nexusflow.io",
    },
    {
      id: "2",
      name: "react-query-sync",
      description: "Open-source library synchronizing React Query caches across browser tabs via BroadcastChannel.",
      technologies: ["TypeScript", "React", "BroadcastChannel API"],
      url: "github.com/alexrivera/react-query-sync",
    },
  ],
};

const PurplePeak = ({ data }: PurplePeakProps) => {
  const d = data || defaultData;

  const accentSkillLevels = [95, 90, 88, 85, 80, 78, 75, 70, 68, 65, 62, 58];

  return (
    <div className="w-full bg-white overflow-hidden" style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      {/* ── HEADER ── */}
      <div className="relative overflow-hidden">
        {/* Gradient background */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, hsl(255,60%,28%) 0%, hsl(270,55%,38%) 55%, hsl(290,50%,42%) 100%)" }}
        />
        {/* Decorative circles */}
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full border border-white/10" />
        <div className="absolute -bottom-14 -left-14 w-56 h-56 rounded-full border border-white/10" />
        <div className="absolute top-4 right-40 w-20 h-20 rounded-full border border-white/10" />
        <div className="absolute bottom-8 right-20 w-12 h-12 rounded-full bg-white/5" />
        {/* Gold accent bar */}
        <div className="absolute bottom-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, hsl(45,90%,55%), hsl(38,95%,60%), hsl(45,90%,55%))" }} />

        <div className="relative px-10 py-8 flex items-center gap-8">
          {/* Photo */}
          <div className="shrink-0">
            {d.personalInfo.photoUrl ? (
              <img
                src={d.personalInfo.photoUrl}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 shadow-lg"
                style={{ borderColor: "hsl(45,90%,55%)" }}
              />
            ) : (
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center border-4 shadow-lg"
                style={{ backgroundColor: "rgba(255,255,255,0.12)", borderColor: "hsl(45,90%,55%)" }}
              >
                <Camera className="w-8 h-8 text-white/50" />
              </div>
            )}
          </div>

          {/* Name + title + contact */}
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-extrabold text-white tracking-tight leading-none mb-1">
              {d.personalInfo.name || "Your Name"}
            </h1>
            <p
              className="text-base font-semibold tracking-widest uppercase mb-3"
              style={{ color: "hsl(45,90%,65%)" }}
            >
              {d.personalInfo.title || "Your Title"}
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-1 text-white/70 text-xs">
              {d.personalInfo.email && (
                <span className="flex items-center gap-1">
                  <Mail className="w-3 h-3" /> {d.personalInfo.email}
                </span>
              )}
              {d.personalInfo.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3" /> {d.personalInfo.phone}
                </span>
              )}
              {d.personalInfo.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {d.personalInfo.location}
                </span>
              )}
              {d.personalInfo.linkedin && (
                <span className="flex items-center gap-1">
                  <Linkedin className="w-3 h-3" /> {d.personalInfo.linkedin}
                </span>
              )}
              {d.personalInfo.github && (
                <span className="flex items-center gap-1">
                  <Github className="w-3 h-3" /> {d.personalInfo.github}
                </span>
              )}
              {d.personalInfo.website && (
                <span className="flex items-center gap-1">
                  <Globe className="w-3 h-3" /> {d.personalInfo.website}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="flex">
        {/* ── LEFT SIDEBAR ── */}
        <div
          className="w-[32%] shrink-0 px-6 py-7 space-y-6"
          style={{ backgroundColor: "hsl(255,20%,97%)" }}
        >
          {/* Skills */}
          {d.skills.length > 0 && (
            <div>
              <SidebarHeading label="Skills" />
              <div className="space-y-4">
                {d.skills.map((cat, ci) => (
                  <div key={ci}>
                    <p
                      className="text-xs font-bold uppercase tracking-wider mb-2"
                      style={{ color: "hsl(255,60%,35%)" }}
                    >
                      {cat.category}
                    </p>
                    <div className="space-y-1.5">
                      {cat.skills.filter((s) => s.trim()).map((skill, si) => {
                        const level = accentSkillLevels[(ci * 6 + si) % accentSkillLevels.length];
                        return (
                          <div key={si}>
                            <div className="flex justify-between mb-0.5">
                              <span className="text-xs text-gray-700">{skill}</span>
                              <span className="text-xs text-gray-400">{level}%</span>
                            </div>
                            <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden">
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${level}%`,
                                  background: "linear-gradient(90deg, hsl(255,60%,35%), hsl(290,50%,50%))",
                                }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {d.education.length > 0 && d.education[0].institution && (
            <div>
              <SidebarHeading label="Education" />
              <div className="space-y-4">
                {d.education.map((edu) => (
                  <div key={edu.id}>
                    <p className="text-xs font-bold text-gray-800 leading-tight">
                      {edu.degree} {edu.field}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">{edu.institution}</p>
                    <p className="text-xs text-gray-400">
                      {edu.startDate} – {edu.endDate}
                      {edu.gpa && <span className="ml-2 font-medium" style={{ color: "hsl(255,60%,45%)" }}>GPA {edu.gpa}</span>}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {d.certifications && d.certifications.length > 0 && (
            <div>
              <SidebarHeading label="Certifications" />
              <div className="space-y-2">
                {d.certifications.map((cert, i) => (
                  <div key={i} className="flex items-start gap-1.5">
                    <Award
                      className="w-3 h-3 mt-0.5 shrink-0"
                      style={{ color: "hsl(45,90%,50%)" }}
                    />
                    <span className="text-xs text-gray-700 leading-tight">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Achievements */}
          {d.achievements && d.achievements.length > 0 && (
            <div>
              <SidebarHeading label="Highlights" />
              <div className="space-y-2">
                {d.achievements.map((ach, i) => (
                  <div key={i} className="flex items-start gap-1.5">
                    <Star
                      className="w-3 h-3 mt-0.5 shrink-0"
                      style={{ color: "hsl(255,60%,45%)" }}
                    />
                    <span className="text-xs text-gray-700 leading-tight">{ach}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── RIGHT CONTENT ── */}
        <div className="flex-1 px-8 py-7 space-y-6">
          {/* Summary */}
          {d.summary && (
            <div>
              <ContentHeading label="Professional Summary" />
              <p className="text-xs leading-relaxed text-gray-600">{d.summary}</p>
            </div>
          )}

          {/* Experience */}
          {d.experience.length > 0 && d.experience[0].position && (
            <div>
              <ContentHeading label="Work Experience" />
              <div className="space-y-5">
                {d.experience.map((exp, ei) => (
                  <div key={exp.id} className="relative pl-5">
                    {/* Timeline dot */}
                    <div
                      className="absolute left-0 top-1 w-2.5 h-2.5 rounded-full border-2 bg-white"
                      style={{ borderColor: "hsl(255,60%,40%)" }}
                    />
                    {/* Timeline line (not for last item) */}
                    {ei < d.experience.length - 1 && (
                      <div
                        className="absolute left-[4px] top-4 bottom-[-1.25rem] w-px"
                        style={{ backgroundColor: "hsl(255,20%,85%)" }}
                      />
                    )}
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="text-sm font-bold text-gray-900 leading-tight">{exp.position}</h3>
                        <p className="text-xs font-semibold" style={{ color: "hsl(255,60%,40%)" }}>
                          {exp.company}
                        </p>
                      </div>
                      <span
                        className="text-xs whitespace-nowrap ml-3 px-2 py-0.5 rounded-full font-medium"
                        style={{ backgroundColor: "hsl(255,40%,96%)", color: "hsl(255,50%,45%)" }}
                      >
                        {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                      </span>
                    </div>
                    {exp.responsibilities.filter((r) => r.trim()).length > 0 && (
                      <ul className="mt-1.5 space-y-1">
                        {exp.responsibilities.filter((r) => r.trim()).map((r, ri) => (
                          <li key={ri} className="flex items-start gap-1.5 text-xs text-gray-600">
                            <span
                              className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                              style={{ backgroundColor: "hsl(255,60%,50%)" }}
                            />
                            {r}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {d.projects && d.projects.length > 0 && (
            <div>
              <ContentHeading label="Featured Projects" />
              <div className="space-y-3">
                {d.projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-3 rounded-lg border"
                    style={{ borderColor: "hsl(255,30%,88%)", backgroundColor: "hsl(255,30%,98%)" }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <Code2 className="w-3.5 h-3.5 shrink-0" style={{ color: "hsl(255,60%,45%)" }} />
                        <span className="text-xs font-bold text-gray-800">{proj.name}</span>
                      </div>
                      {proj.url && (
                        <span className="text-xs" style={{ color: "hsl(255,60%,50%)" }}>
                          {proj.url}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{proj.description}</p>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {proj.technologies.map((tech, ti) => (
                        <span
                          key={ti}
                          className="text-[10px] px-1.5 py-0.5 rounded font-medium"
                          style={{ backgroundColor: "hsl(255,50%,93%)", color: "hsl(255,60%,38%)" }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── FOOTER ACCENT ── */}
      <div
        className="h-1"
        style={{ background: "linear-gradient(90deg, hsl(255,60%,28%), hsl(290,50%,42%), hsl(45,90%,55%))" }}
      />
    </div>
  );
};

const SidebarHeading = ({ label }: { label: string }) => (
  <div className="flex items-center gap-2 mb-3">
    <div
      className="w-1 h-4 rounded-full"
      style={{ background: "linear-gradient(180deg, hsl(255,60%,35%), hsl(290,50%,50%))" }}
    />
    <h2
      className="text-xs font-extrabold uppercase tracking-[0.12em]"
      style={{ color: "hsl(255,50%,30%)" }}
    >
      {label}
    </h2>
  </div>
);

const ContentHeading = ({ label }: { label: string }) => (
  <div className="flex items-center gap-2 mb-3">
    <h2
      className="text-sm font-extrabold uppercase tracking-[0.1em]"
      style={{ color: "hsl(255,60%,30%)" }}
    >
      {label}
    </h2>
    <div
      className="flex-1 h-px"
      style={{ background: "linear-gradient(90deg, hsl(255,30%,80%), transparent)" }}
    />
  </div>
);

export default PurplePeak;
