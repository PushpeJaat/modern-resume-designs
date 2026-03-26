import { Mail, Phone, MapPin, Github, Globe, Code } from "lucide-react";
import { ResumeData } from "@/types/resume";

interface DottedPatternProps {
  data?: ResumeData;
}

const DottedPattern = ({ data }: DottedPatternProps) => {
  const d: ResumeData = data || {
    personalInfo: {
      name: "Jamie Wilson",
      title: "Frontend Engineer",
      email: "jamie.w@mail.com",
      phone: "+1 555-0199",
      location: "Portland, OR",
      website: "jamie.dev",
      github: "github.com/jamiewilson",
    },
    summary: "Creative frontend engineer passionate about building beautiful, accessible user interfaces. Love working with modern frameworks and design systems.",
    experience: [
      {
        id: "1", company: "Design Systems Co.", position: "Senior Frontend Engineer",
        startDate: "2022", endDate: "Present", current: true,
        responsibilities: [
          "Led development of component library used across 30+ products",
          "Improved web performance metrics by 50% through optimization",
          "Mentored team of 4 frontend developers",
          "Implemented accessibility standards (WCAG 2.1 AA compliance)",
        ],
      },
      {
        id: "2", company: "Creative Agency Pro", position: "Frontend Developer",
        startDate: "2020", endDate: "2022", current: false,
        responsibilities: [
          "Built responsive SPAs for Fortune 500 clients",
          "Collaborated with UX team to implement pixel-perfect designs",
          "Integrated RESTful APIs and GraphQL endpoints",
          "Reduced bundle size by 40% using code-splitting techniques",
        ],
      },
      {
        id: "3", company: "StartUp Hub", position: "Junior Frontend Developer",
        startDate: "2020", endDate: "2020", current: false,
        responsibilities: [
          "Developed reusable React components",
          "Participated in agile sprints and daily standups",
          "Fixed bugs and improved code quality",
        ],
      },
    ],
    education: [
      { id: "1", institution: "Oregon State University", degree: "BS", field: "Software Engineering", startDate: "2016", endDate: "2020" },
    ],
    skills: [
      { category: "Core Technologies", skills: ["React/Next.js", "TypeScript", "CSS/Tailwind", "JavaScript"] },
      { category: "Tools & Others", skills: ["Git", "Figma", "VS Code", "Webpack", "Jest", "Storybook"] },
    ],
  };

  const initials = d.personalInfo.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();

  return (
    <div className="w-full bg-white overflow-hidden relative">
      {/* Dotted Pattern */}
      <div className="absolute inset-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dot-pattern" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="hsl(var(--primary))" opacity="0.08"/>
            </pattern>
            <pattern id="dot-pattern-accent" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="hsl(var(--accent))" opacity="0.06"/>
            </pattern>
          </defs>
          <rect width="50%" height="100%" fill="url(#dot-pattern)"/>
          <rect x="50%" width="50%" height="100%" fill="url(#dot-pattern-accent)"/>
        </svg>
      </div>

      <div className="absolute top-0 left-0 w-40 h-40">
        <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-primary rounded-tl-3xl"></div>
      </div>
      <div className="absolute bottom-0 right-0 w-40 h-40">
        <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-accent rounded-br-3xl"></div>
      </div>

      <div className="relative p-12">
        {/* Header */}
        <div data-pdf-section className="flex gap-8 mb-10 pb-8 border-b border-resume-border/50">
          <div className="w-2 bg-gradient-to-b from-primary via-accent to-primary rounded-full flex-shrink-0"></div>
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-5xl font-bold text-resume-section mb-2">{d.personalInfo.name}</h1>
                <p className="text-2xl text-resume-light font-light flex items-center gap-2">
                  <Code className="w-6 h-6 text-primary" />
                  {d.personalInfo.title}
                </p>
              </div>
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary via-accent to-primary p-1">
                <div className="w-full h-full rounded-xl bg-white flex items-center justify-center">
                  <span className="text-3xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">{initials}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              {d.personalInfo.email && (
                <div className="flex items-center gap-2 resume-text">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-primary" />
                  </div>
                  <div className="min-w-0"><p className="text-xs resume-light-text">Email</p><a href={`mailto:${d.personalInfo.email}`} className="font-medium text-xs break-all hover:underline">{d.personalInfo.email}</a></div>
                </div>
              )}
              {d.personalInfo.phone && (
                <div className="flex items-center gap-2 resume-text">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-accent" />
                  </div>
                  <div className="min-w-0"><p className="text-xs resume-light-text">Phone</p><p className="font-medium">{d.personalInfo.phone}</p></div>
                </div>
              )}
              {d.personalInfo.location && (
                <div className="flex items-center gap-2 resume-text">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <div className="min-w-0"><p className="text-xs resume-light-text">Location</p><p className="font-medium">{d.personalInfo.location}</p></div>
                </div>
              )}
              {d.personalInfo.website && (
                <div className="flex items-center gap-2 resume-text">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Globe className="w-4 h-4 text-accent" />
                  </div>
                  <div className="min-w-0"><p className="text-xs resume-light-text">Website</p><p className="font-medium">{d.personalInfo.website}</p></div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="col-span-1 space-y-6">
            {d.summary && (
              <div className="p-5 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl border-2 border-primary/10">
                <h2 className="section-title mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>About Me
                </h2>
                <p className="text-xs resume-text leading-relaxed">{d.summary}</p>
              </div>
            )}

            {d.skills.length > 0 && (
              <div className="space-y-4">
                {d.skills.map((cat, i) => (
                  <div key={i} className={`p-4 bg-white rounded-xl border-2 ${i === 0 ? "border-primary/20" : "border-accent/20"} shadow-sm`}>
                    <h3 className="text-xs font-bold resume-section mb-3 uppercase tracking-wide flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${i === 0 ? "bg-primary" : "bg-accent"}`}></div>
                      {cat.category}
                    </h3>
                    {i === 0 ? (
                      <div className="space-y-2">
                        {cat.skills.filter(s => s.trim()).map((skill, idx) => (
                          <div key={idx} className="flex justify-between items-center">
                            <span className="text-xs resume-text">{skill}</span>
                            <div className="flex gap-1">
                              {Array.from({ length: 5 }).map((_, j) => (
                                <div key={j} className={`w-2 h-2 rounded-full ${j < Math.max(3, 5 - idx) ? "bg-primary" : "bg-resume-border"}`}></div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {cat.skills.filter(s => s.trim()).map((tool) => (
                          <span key={tool} className="px-2 py-1 text-xs bg-gradient-to-r from-accent/10 to-transparent rounded border border-accent/20 resume-text">{tool}</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {d.personalInfo.github && (
              <div className="p-4 bg-gradient-to-br from-accent/5 to-transparent rounded-xl border border-accent/20">
                <h2 className="section-title mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent"></div>Links
                </h2>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2 resume-text"><Github className="w-4 h-4" /><span>{d.personalInfo.github}</span></div>
                  {d.personalInfo.website && (
                    <div className="flex items-center gap-2 resume-text"><Globe className="w-4 h-4" /><span>{d.personalInfo.website}</span></div>
                  )}
                </div>
              </div>
            )}

            {d.education.length > 0 && d.education[0].institution && (
              <div className="p-4 bg-white rounded-xl border-2 border-primary/10">
                <h2 className="section-title mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>Education
                </h2>
                {d.education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-semibold text-xs resume-text">{edu.degree} {edu.field}</h3>
                    <p className="text-xs text-primary font-medium mt-1">{edu.institution}</p>
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
                <h2 className="section-title text-2xl mb-6 flex items-center gap-3">
                  <div className="w-3 h-3 rounded bg-primary"></div>Work Experience
                </h2>
                <div className="space-y-5">
                  {d.experience.map((exp, i) => (
                    <div key={exp.id} className={`p-5 bg-white rounded-xl border-l-4 ${i % 2 === 0 ? "border-primary" : "border-accent"} shadow-sm`}>
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-bold text-base resume-section">{exp.position}</h3>
                          <p className={`text-sm font-semibold ${i % 2 === 0 ? "text-primary" : "text-accent"} mt-1`}>{exp.company}</p>
                        </div>
                        <span className={`text-xs resume-light-text ${i % 2 === 0 ? "bg-primary/10" : "bg-accent/10"} px-3 py-1.5 rounded-full`}>
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

export default DottedPattern;
