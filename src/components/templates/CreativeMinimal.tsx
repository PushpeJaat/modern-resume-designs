import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";
import { ResumeData } from "@/types/resume";

interface CreativeMinimalProps {
  data?: ResumeData;
}

const CreativeMinimal = ({ data }: CreativeMinimalProps) => {
  const d: ResumeData = data || {
    personalInfo: {
      name: "Emma Chen",
      title: "Product Designer",
      email: "emma.chen@design.com",
      phone: "+1 (555) 987-6543",
      location: "New York, NY",
      linkedin: "emmachen",
      github: "emmachen-design",
    },
    summary: "Creative product designer with a passion for crafting intuitive user experiences. 5+ years of experience in designing digital products from concept to launch. Specialized in user research, interface design, and design systems.",
    experience: [
      {
        id: "1", company: "Design Studio Co.", position: "Senior Product Designer",
        startDate: "2022", endDate: "Present", current: true,
        responsibilities: [
          "Led redesign of flagship product, increasing user satisfaction by 45%",
          "Established and maintained design system used across 15+ products",
          "Conducted user research sessions with 100+ participants",
        ],
      },
      {
        id: "2", company: "Creative Agency", position: "Product Designer",
        startDate: "2019", endDate: "2022", current: false,
        responsibilities: [
          "Designed mobile and web applications for diverse client portfolio",
          "Collaborated with development teams using Figma and prototyping tools",
          "Improved conversion rates by 30% through data-driven design decisions",
        ],
      },
    ],
    education: [
      { id: "1", institution: "Parsons School of Design", degree: "BFA", field: "Graphic Design", startDate: "2015", endDate: "2019" },
    ],
    skills: [
      { category: "Design Tools", skills: ["Figma", "Sketch", "Adobe XD", "Photoshop", "Illustrator"] },
      { category: "Skills", skills: ["UI/UX Design", "Prototyping", "User Research", "Design Systems", "Wireframing"] },
      { category: "Development", skills: ["HTML", "CSS", "Basic JavaScript", "React (basics)"] },
    ],
  };

  return (
    <div className="w-full bg-white overflow-hidden">
      <div className="p-12">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-2 h-24 bg-accent rounded-full"></div>
            <div>
              <h1 className="text-5xl font-bold text-resume-section mb-2">{d.personalInfo.name}</h1>
              <p className="text-2xl font-light text-resume-light">{d.personalInfo.title}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-6 text-sm resume-text ml-6">
            {d.personalInfo.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent" />
                <span>{d.personalInfo.email}</span>
              </div>
            )}
            {d.personalInfo.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent" />
                <span>{d.personalInfo.phone}</span>
              </div>
            )}
            {d.personalInfo.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent" />
                <span>{d.personalInfo.location}</span>
              </div>
            )}
            {d.personalInfo.linkedin && (
              <div className="flex items-center gap-2">
                <Linkedin className="w-4 h-4 text-accent" />
                <span>{d.personalInfo.linkedin}</span>
              </div>
            )}
            {d.personalInfo.github && (
              <div className="flex items-center gap-2">
                <Github className="w-4 h-4 text-accent" />
                <span>{d.personalInfo.github}</span>
              </div>
            )}
          </div>
        </div>

        {/* About */}
        {d.summary && (
          <div data-pdf-section className="mb-10">
            <h2 className="text-2xl font-bold text-resume-section mb-4 flex items-center gap-3">
              <span className="w-12 h-1 bg-accent rounded-full"></span>
              About
            </h2>
            <p className="text-sm resume-text leading-relaxed ml-15">{d.summary}</p>
          </div>
        )}

        {/* Experience */}
        {d.experience.length > 0 && d.experience[0].position && (
          <div data-pdf-section className="mb-10">
            <h2 className="text-2xl font-bold text-resume-section mb-6 flex items-center gap-3">
              <span className="w-12 h-1 bg-accent rounded-full"></span>
              Experience
            </h2>
            <div className="space-y-8 ml-15">
              {d.experience.map((exp, i) => (
                <div key={exp.id} data-pdf-section className="relative pl-8 border-l-2 border-resume-border">
                  <div className="absolute -left-2 top-0 w-3 h-3 rounded-full bg-accent"></div>
                  <div className="mb-2">
                    <h3 className="text-lg font-bold text-resume-section">{exp.position}</h3>
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-semibold text-accent">{exp.company}</p>
                      <span className="text-xs resume-light-text">{exp.startDate} - {exp.current ? "Present" : exp.endDate}</span>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm resume-text">
                    {exp.responsibilities.filter(r => r.trim()).map((r, idx) => (
                      <li key={idx}>• {r}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills & Education Grid */}
        <div className="grid grid-cols-2 gap-10">
          {d.skills.length > 0 && (
            <div data-pdf-section>
              <h2 className="text-2xl font-bold text-resume-section mb-6 flex items-center gap-3">
                <span className="w-12 h-1 bg-accent rounded-full"></span>
                Skills
              </h2>
              <div className="ml-15 space-y-4">
                {d.skills.map((cat, i) => (
                  <div key={i}>
                    <h3 className="font-semibold text-sm resume-section mb-2">{cat.category}</h3>
                    <p className="text-sm resume-text">{cat.skills.filter(s => s.trim()).join(", ")}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {d.education.length > 0 && d.education[0].institution && (
            <div>
              <h2 className="text-2xl font-bold text-resume-section mb-6 flex items-center gap-3">
                <span className="w-12 h-1 bg-accent rounded-full"></span>
                Education
              </h2>
              <div className="ml-15 space-y-4">
                {d.education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-semibold text-sm resume-section">{edu.degree} {edu.field}</h3>
                    <p className="text-sm text-accent font-medium mt-1">{edu.institution}</p>
                    <p className="text-xs resume-light-text">{edu.startDate} - {edu.endDate}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreativeMinimal;
