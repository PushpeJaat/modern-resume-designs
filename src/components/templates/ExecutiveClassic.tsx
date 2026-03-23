import { Mail, Phone, MapPin, Linkedin, Award } from "lucide-react";
import { ResumeData } from "@/types/resume";

interface ExecutiveClassicProps {
  data?: ResumeData;
}

const ExecutiveClassic = ({ data }: ExecutiveClassicProps) => {
  const d: ResumeData = data || {
    personalInfo: {
      name: "Michael Roberts",
      title: "Chief Technology Officer",
      email: "michael.roberts@executive.com",
      phone: "+1 (555) 246-8135",
      location: "Boston, MA",
      linkedin: "michaelroberts",
    },
    summary: "Visionary technology executive with 15+ years of experience leading digital transformation initiatives and building high-performing engineering teams. Proven track record of driving innovation, scaling infrastructure, and delivering enterprise solutions for Fortune 500 companies.",
    experience: [
      {
        id: "1", company: "Enterprise Tech Solutions Inc.", position: "Chief Technology Officer",
        startDate: "2020", endDate: "Present", current: true,
        responsibilities: [
          "Spearheaded digital transformation strategy, resulting in $50M annual cost savings",
          "Built and scaled engineering organization from 50 to 200+ team members",
          "Led development of AI-powered analytics platform serving 5M+ enterprise users",
          "Established DevOps culture and implemented CI/CD pipelines, reducing deployment time by 75%",
        ],
      },
      {
        id: "2", company: "Global Innovations Corp", position: "Vice President of Engineering",
        startDate: "2016", endDate: "2020", current: false,
        responsibilities: [
          "Directed engineering teams responsible for cloud-native SaaS platform with 99.99% uptime",
          "Implemented microservices architecture supporting 10M+ daily active users",
          "Reduced technical debt by 60% through strategic refactoring initiatives",
        ],
      },
      {
        id: "3", company: "TechVentures LLC", position: "Director of Software Development",
        startDate: "2012", endDate: "2016", current: false,
        responsibilities: [
          "Managed cross-functional teams of 30+ developers, designers, and QA engineers",
          "Launched 5 successful products generating $25M in annual revenue",
          "Introduced agile methodologies, improving team velocity by 40%",
        ],
      },
    ],
    education: [
      { id: "1", institution: "Harvard Business School", degree: "MBA", field: "", startDate: "2010", endDate: "2012" },
      { id: "2", institution: "MIT", degree: "MS", field: "Computer Science", startDate: "2006", endDate: "2008" },
    ],
    skills: [
      { category: "Leadership", skills: ["Team Building", "Strategic Planning", "Change Management"] },
      { category: "Technical", skills: ["Cloud Architecture (AWS, Azure)", "AI/ML", "Microservices"] },
      { category: "Business", skills: ["P&L Management", "Vendor Relations", "Budget Planning"] },
    ],
    achievements: [
      "CTO of the Year - Tech Excellence Awards (2023)",
      "Innovation Leadership Award - Forbes (2021)",
      "Top 100 Tech Leaders - CIO Magazine (2020)",
      "Patent Holder - AI Optimization System (2019)",
    ],
  };

  return (
    <div className="w-full bg-white overflow-hidden">
      <div className="p-14">
        {/* Header */}
        <div className="text-center mb-10 pb-8 border-b-2 border-resume-border">
          <h1 className="text-5xl font-bold text-resume-section mb-3 tracking-tight">{d.personalInfo.name}</h1>
          <p className="text-xl text-resume-light mb-4 font-light">{d.personalInfo.title}</p>
          <div className="flex justify-center flex-wrap gap-6 text-sm resume-text">
            {d.personalInfo.email && (
              <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary" /><span>{d.personalInfo.email}</span></div>
            )}
            {d.personalInfo.phone && (
              <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /><span>{d.personalInfo.phone}</span></div>
            )}
            {d.personalInfo.location && (
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /><span>{d.personalInfo.location}</span></div>
            )}
            {d.personalInfo.linkedin && (
              <div className="flex items-center gap-2"><Linkedin className="w-4 h-4 text-primary" /><span>{d.personalInfo.linkedin}</span></div>
            )}
          </div>
        </div>

        {/* Summary */}
        {d.summary && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-resume-section mb-4 uppercase tracking-wide">Executive Summary</h2>
            <p className="text-sm resume-text leading-relaxed">{d.summary}</p>
          </div>
        )}

        {/* Experience */}
        {d.experience.length > 0 && d.experience[0].position && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-resume-section mb-6 uppercase tracking-wide">Professional Experience</h2>
            <div className="space-y-8">
              {d.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-resume-section">{exp.position}</h3>
                      <p className="text-base font-semibold text-primary mt-1">{exp.company}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold resume-text">{exp.startDate} - {exp.current ? "Present" : exp.endDate}</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm resume-text leading-relaxed">
                    {exp.responsibilities.filter(r => r.trim()).map((r, idx) => (
                      <li key={idx}>• {r}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education & Skills */}
        <div className="grid grid-cols-2 gap-10 mb-10">
          {d.education.length > 0 && d.education[0].institution && (
            <div>
              <h2 className="text-2xl font-bold text-resume-section mb-4 uppercase tracking-wide">Education</h2>
              <div className="space-y-4">
                {d.education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-bold text-base resume-section">{edu.degree} {edu.field}</h3>
                    <p className="text-sm font-semibold text-primary mt-1">{edu.institution}</p>
                    <p className="text-xs resume-light-text mt-1">{edu.startDate} - {edu.endDate}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {d.skills.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-resume-section mb-4 uppercase tracking-wide">Key Skills</h2>
              <div className="space-y-3 text-sm resume-text">
                {d.skills.map((cat, i) => (
                  <p key={i}><span className="font-semibold">{cat.category}:</span> {cat.skills.filter(s => s.trim()).join(", ")}</p>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Achievements */}
        {d.achievements && d.achievements.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-resume-section mb-4 uppercase tracking-wide flex items-center gap-3">
              <Award className="w-6 h-6 text-primary" />
              Awards & Recognition
            </h2>
            <div className="grid grid-cols-2 gap-4 text-sm resume-text">
              {d.achievements.map((a, i) => (
                <p key={i}>• {a}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExecutiveClassic;
