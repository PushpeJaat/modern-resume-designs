import { Mail, Phone, MapPin, Linkedin, Briefcase } from "lucide-react";
import { ResumeData } from "@/types/resume";

interface GeometricModernProps {
  data?: ResumeData;
}

const GeometricModern = ({ data }: GeometricModernProps) => {
  const d: ResumeData = data || {
    personalInfo: {
      name: "Sarah Martinez",
      title: "Marketing Director",
      email: "sarah.martinez@email.com",
      phone: "+1 (555) 321-7890",
      location: "Seattle, WA",
      linkedin: "sarahmartinez",
    },
    summary: "Strategic marketing leader with 10+ years driving brand growth and digital transformation. Expert in data-driven campaigns and team leadership.",
    experience: [
      {
        id: "1", company: "Tech Innovations Corp", position: "Marketing Director",
        startDate: "2021", endDate: "Present", current: true,
        responsibilities: [
          "Led rebranding initiative resulting in 60% increase in brand awareness",
          "Managed $5M marketing budget across digital and traditional channels",
          "Built and mentored team of 15 marketing professionals",
          "Increased customer acquisition by 45% through data-driven campaigns",
        ],
      },
      {
        id: "2", company: "Digital Growth Agency", position: "Senior Marketing Manager",
        startDate: "2018", endDate: "2021", current: false,
        responsibilities: [
          "Developed omnichannel marketing strategy for 20+ enterprise clients",
          "Achieved 120% of revenue targets for three consecutive years",
          "Pioneered influencer marketing program generating $2M in revenue",
        ],
      },
      {
        id: "3", company: "StartUp Ventures", position: "Marketing Manager",
        startDate: "2015", endDate: "2018", current: false,
        responsibilities: [
          "Launched successful product campaigns reaching 500K+ customers",
          "Improved email marketing ROI by 200% through A/B testing",
          "Coordinated cross-functional teams for product launches",
        ],
      },
    ],
    education: [
      { id: "1", institution: "Northwestern University", degree: "MBA", field: "Marketing", startDate: "2010", endDate: "2012" },
    ],
    skills: [
      { category: "Marketing", skills: ["Digital Marketing", "Brand Strategy", "Team Leadership", "Analytics"] },
      { category: "Tools", skills: ["HubSpot", "Google Analytics", "Salesforce", "Adobe Suite", "Tableau"] },
    ],
  };

  const allSkills = d.skills.flatMap(c => c.skills).filter(s => s.trim());

  return (
    <div className="w-full bg-white overflow-hidden relative">
      {/* Geometric Background */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="geometric-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary"/>
              <rect x="60" y="10" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#geometric-pattern)"/>
        </svg>
      </div>

      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full"></div>

      <div className="relative p-12">
        {/* Header */}
        <div data-pdf-section className="mb-10 relative">
          <div className="absolute -left-12 top-0 w-2 h-32 bg-gradient-to-b from-primary to-accent"></div>
          <h1 className="text-5xl font-bold text-resume-section mb-2">{d.personalInfo.name}</h1>
          <p className="text-2xl text-resume-light font-light">{d.personalInfo.title}</p>
          <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
            {d.personalInfo.email && (
              <div className="flex items-center gap-2 resume-text">
                <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <span>{d.personalInfo.email}</span>
              </div>
            )}
            {d.personalInfo.phone && (
              <div className="flex items-center gap-2 resume-text">
                <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <span>{d.personalInfo.phone}</span>
              </div>
            )}
            {d.personalInfo.location && (
              <div className="flex items-center gap-2 resume-text">
                <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <span>{d.personalInfo.location}</span>
              </div>
            )}
            {d.personalInfo.linkedin && (
              <div className="flex items-center gap-2 resume-text">
                <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                  <Linkedin className="w-4 h-4 text-primary" />
                </div>
                <span>{d.personalInfo.linkedin}</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="col-span-1 space-y-8">
            {d.summary && (
              <div data-pdf-section>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-1 bg-primary"></div>
                  <h2 className="section-title">Profile</h2>
                </div>
                <p className="text-sm resume-text leading-relaxed">{d.summary}</p>
              </div>
            )}

            {allSkills.length > 0 && (
              <div data-pdf-section>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-1 bg-primary"></div>
                  <h2 className="section-title">Skills</h2>
                </div>
                <div className="space-y-3">
                  {allSkills.slice(0, 6).map((skill, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-xs resume-text mb-1">
                        <span>{skill}</span>
                        <span className="text-primary font-semibold">{Math.max(50, 95 - idx * 5)}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-resume-border rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full" style={{ width: `${Math.max(50, 95 - idx * 5)}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {d.skills.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-1 bg-primary"></div>
                  <h2 className="section-title">Tools</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {d.skills.flatMap(c => c.skills).filter(s => s.trim()).slice(0, 8).map((tool) => (
                    <span key={tool} className="px-3 py-1.5 bg-gradient-to-r from-primary/10 to-accent/10 text-xs rounded-full resume-text font-medium border border-primary/20">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {d.education.length > 0 && d.education[0].institution && (
              <div data-pdf-section>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-1 bg-primary"></div>
                  <h2 className="section-title">Education</h2>
                </div>
                {d.education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-semibold text-sm resume-text">{edu.degree} {edu.field}</h3>
                    <p className="text-xs text-primary font-medium mt-1">{edu.institution}</p>
                    <p className="text-xs resume-light-text">{edu.startDate} - {edu.endDate}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="col-span-2 space-y-8">
            {d.experience.length > 0 && d.experience[0].position && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Briefcase className="w-5 h-5 text-primary" />
                  <h2 className="section-title">Experience</h2>
                </div>
                <div className="space-y-6">
                  {d.experience.map((exp, i) => (
                    <div key={exp.id} className="relative pl-6 border-l-2 border-primary/30">
                      <div className={`absolute -left-2 top-1 w-3 h-3 rounded-full ${i === 0 ? "bg-primary" : "bg-accent"}`}></div>
                      <div className="mb-2">
                        <h3 className="font-bold text-base resume-section">{exp.position}</h3>
                        <div className="flex justify-between items-center">
                          <p className="text-sm font-semibold text-primary">{exp.company}</p>
                          <span className="text-xs resume-light-text">{exp.startDate} - {exp.current ? "Present" : exp.endDate}</span>
                        </div>
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

export default GeometricModern;
