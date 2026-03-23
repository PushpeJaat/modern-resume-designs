import { Mail, Phone, MapPin, Award, Target } from "lucide-react";
import { ResumeData } from "@/types/resume";

interface GradientWaveProps {
  data?: ResumeData;
}

const GradientWave = ({ data }: GradientWaveProps) => {
  const d: ResumeData = data || {
    personalInfo: {
      name: "Alex Thompson",
      title: "Full Stack Developer",
      email: "alex.thompson@dev.io",
      phone: "+1 (555) 789-0123",
      location: "Austin, TX",
    },
    summary: "Passionate full-stack developer with 7 years of experience building scalable web applications. Specialized in React, Node.js, and cloud architecture. Strong advocate for clean code, testing, and agile methodologies.",
    experience: [
      {
        id: "1", company: "CloudTech Solutions", position: "Senior Full Stack Developer",
        startDate: "2021", endDate: "Present", current: true,
        responsibilities: [
          "Architected microservices infrastructure serving 1M+ daily users",
          "Led team of 8 developers in agile environment",
          "Reduced API latency by 65% through optimization",
          "Implemented comprehensive testing suite (95% coverage)",
        ],
      },
      {
        id: "2", company: "Innovation Labs", position: "Full Stack Developer",
        startDate: "2019", endDate: "2021", current: false,
        responsibilities: [
          "Developed real-time collaboration platform using WebSockets",
          "Built responsive SPAs with React and modern tooling",
          "Integrated third-party APIs and payment systems",
        ],
      },
      {
        id: "3", company: "Tech Startup Inc", position: "Software Developer",
        startDate: "2017", endDate: "2019", current: false,
        responsibilities: [
          "Built RESTful APIs using Node.js and Express",
          "Implemented user authentication and authorization",
          "Participated in code reviews and pair programming",
        ],
      },
    ],
    education: [
      { id: "1", institution: "UT Austin", degree: "BS", field: "Computer Science", startDate: "2013", endDate: "2017" },
    ],
    skills: [
      { category: "Frontend", skills: ["React", "TypeScript", "Next.js", "Tailwind"] },
      { category: "Backend", skills: ["Node.js", "Python", "PostgreSQL", "MongoDB"] },
      { category: "DevOps", skills: ["Docker", "AWS", "CI/CD", "Git"] },
    ],
    certifications: ["AWS Solutions Architect (2023)", "Google Cloud Professional (2022)"],
  };

  return (
    <div className="w-full bg-white overflow-hidden relative">
      {/* Wave Background */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="wave-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.03"/>
              <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.03"/>
            </linearGradient>
            <linearGradient id="wave-gradient-2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.05"/>
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.02"/>
            </linearGradient>
          </defs>
          <path d="M0,50 Q250,0 500,50 T1000,50 L1000,0 L0,0 Z" fill="url(#wave-gradient-1)"/>
          <path d="M0,100 Q250,150 500,100 T1000,100 L1000,200 L0,200 Z" fill="url(#wave-gradient-2)"/>
          <path d="M0,400 Q300,350 600,400 T1200,400 L1200,600 L0,600 Z" fill="url(#wave-gradient-1)"/>
        </svg>
      </div>

      <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-primary/10 to-accent/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-accent/10 to-primary/5 rounded-full blur-3xl"></div>

      <div className="relative p-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-6xl font-bold mb-2 bg-gradient-to-r from-resume-section via-primary to-accent bg-clip-text text-transparent">
            {d.personalInfo.name}
          </h1>
          <p className="text-2xl text-resume-light font-light mb-6">{d.personalInfo.title}</p>
          <div className="flex flex-wrap gap-3">
            {d.personalInfo.email && (
              <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur rounded-full border border-primary/20 shadow-sm">
                <Mail className="w-4 h-4 text-primary" /><span className="text-sm resume-text">{d.personalInfo.email}</span>
              </div>
            )}
            {d.personalInfo.phone && (
              <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur rounded-full border border-primary/20 shadow-sm">
                <Phone className="w-4 h-4 text-primary" /><span className="text-sm resume-text">{d.personalInfo.phone}</span>
              </div>
            )}
            {d.personalInfo.location && (
              <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur rounded-full border border-primary/20 shadow-sm">
                <MapPin className="w-4 h-4 text-primary" /><span className="text-sm resume-text">{d.personalInfo.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Summary */}
        {d.summary && (
          <div className="mb-10 p-6 bg-gradient-to-br from-primary/5 via-white to-accent/5 rounded-2xl border border-primary/10 backdrop-blur">
            <h2 className="text-xl font-bold text-resume-section mb-3 flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />Professional Summary
            </h2>
            <p className="text-sm resume-text leading-relaxed">{d.summary}</p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="col-span-1 space-y-8">
            {d.skills.length > 0 && (
              <div className="p-5 bg-gradient-to-br from-white to-primary/5 rounded-xl border border-primary/10">
                <h2 className="section-title mb-4">Technical Stack</h2>
                <div className="space-y-3">
                  {d.skills.map((cat, i) => (
                    <div key={i}>
                      <p className="text-xs font-semibold resume-section mb-2">{cat.category}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.skills.filter(s => s.trim()).map((skill) => (
                          <span key={skill} className={`px-2 py-1 text-xs rounded ${i === 0 ? "bg-primary text-primary-foreground" : i === 1 ? "bg-accent text-accent-foreground" : "bg-resume-section text-white"}`}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {d.certifications && d.certifications.length > 0 && (
              <div className="p-5 bg-gradient-to-br from-white to-accent/5 rounded-xl border border-accent/10">
                <h2 className="section-title mb-4 flex items-center gap-2">
                  <Award className="w-4 h-4 text-accent" />Certifications
                </h2>
                <div className="space-y-3 text-sm">
                  {d.certifications.map((cert, i) => (
                    <div key={i}><p className="font-semibold resume-text">{cert}</p></div>
                  ))}
                </div>
              </div>
            )}

            {d.education.length > 0 && d.education[0].institution && (
              <div className="p-5 bg-gradient-to-br from-white to-primary/5 rounded-xl border border-primary/10">
                <h2 className="section-title mb-4">Education</h2>
                {d.education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-semibold text-sm resume-text">{edu.degree} {edu.field}</h3>
                    <p className="text-xs font-medium text-primary mt-1">{edu.institution}</p>
                    <p className="text-xs resume-light-text">{edu.startDate} - {edu.endDate}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="col-span-2 space-y-6">
            {d.experience.length > 0 && d.experience[0].position && (
              <div>
                <h2 className="section-title mb-6 text-2xl">Experience</h2>
                <div className="space-y-6">
                  {d.experience.map((exp, i) => (
                    <div key={exp.id} className={`p-5 bg-white/80 backdrop-blur rounded-xl border-l-4 ${i % 2 === 0 ? "border-primary" : "border-accent"} shadow-sm`}>
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-bold text-lg resume-section">{exp.position}</h3>
                          <p className="text-sm font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{exp.company}</p>
                        </div>
                        <span className={`text-xs resume-light-text px-3 py-1 ${i % 2 === 0 ? "bg-primary/10" : "bg-accent/10"} rounded-full`}>
                          {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                        </span>
                      </div>
                      <ul className="space-y-1.5 text-sm resume-text">
                        {exp.responsibilities.filter(r => r.trim()).map((r, idx) => (
                          <li key={idx}>• {r}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradientWave;
