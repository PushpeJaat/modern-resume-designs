import { Mail, Phone, MapPin, Linkedin, Globe, Github } from "lucide-react";
import { ResumeData } from "@/types/resume";

interface DarkSidebarProps {
  data?: ResumeData;
}

const DarkSidebar = ({ data }: DarkSidebarProps) => {
  const displayData: ResumeData = data || {
    personalInfo: {
      name: "John Anderson",
      title: "Senior Software Engineer",
      email: "john.anderson@email.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      linkedin: "linkedin.com/in/johnanderson",
      website: "johnanderson.dev",
    },
    summary:
      "Innovative software engineer with 8+ years of experience building scalable web applications. Proven track record of leading cross-functional teams and delivering high-impact solutions.",
    experience: [
      {
        id: "1",
        company: "TechCorp Inc.",
        position: "Senior Software Engineer",
        startDate: "Jan 2020",
        endDate: "Present",
        current: true,
        responsibilities: [
          "Lead development of microservices architecture serving 1M+ users",
          "Mentor team of 5 junior developers on best practices",
          "Reduced deployment time by 60% through CI/CD optimization",
        ],
      },
      {
        id: "2",
        company: "StartupXYZ",
        position: "Full Stack Developer",
        startDate: "Jun 2016",
        endDate: "Dec 2019",
        current: false,
        responsibilities: [
          "Built and maintained React-based customer dashboard",
          "Implemented RESTful APIs using Node.js and Express",
        ],
      },
    ],
    education: [
      {
        id: "1",
        institution: "Stanford University",
        degree: "BS",
        field: "Computer Science",
        startDate: "2012",
        endDate: "2016",
      },
    ],
    skills: [
      { category: "Technical", skills: ["Java", "React", "Spring Boot", "TypeScript", "AWS"] },
      { category: "Soft Skills", skills: ["Leadership", "Communication"] },
    ],
    projects: [
      { id: "1", name: "E-Commerce Platform", description: "Built a scalable e-commerce platform with microservices", technologies: ["React", "Node.js"] },
      { id: "2", name: "Analytics Dashboard", description: "Real-time analytics dashboard for marketing teams", technologies: ["TypeScript", "D3.js"] },
    ],
  };

  return (
    <div className="w-full bg-white flex min-h-[700px]" style={{ fontFamily: "'Segoe UI', Tahoma, sans-serif" }}>
      {/* Left Sidebar */}
      <div className="w-[35%] bg-[#1e293b] text-white p-8 flex flex-col gap-6">
        {/* Name & Title */}
        <div data-pdf-section>
          <h1 className="text-2xl font-bold leading-tight">{displayData.personalInfo.name || "Your Name"}</h1>
          <p className="text-sm text-sky-300 mt-1">{displayData.personalInfo.title || "Your Title"}</p>
        </div>

        {/* Contact */}
        <div data-pdf-section>
          <h2 className="text-xs font-bold uppercase tracking-widest border-b border-slate-600 pb-1 mb-3">Contact</h2>
          <div className="space-y-2 text-xs">
            {displayData.personalInfo.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-3 h-3 text-sky-400 flex-shrink-0" />
                <span>{displayData.personalInfo.email}</span>
              </div>
            )}
            {displayData.personalInfo.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-3 h-3 text-sky-400 flex-shrink-0" />
                <span>{displayData.personalInfo.phone}</span>
              </div>
            )}
            {displayData.personalInfo.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-3 h-3 text-sky-400 flex-shrink-0" />
                <span>{displayData.personalInfo.location}</span>
              </div>
            )}
            {displayData.personalInfo.linkedin && (
              <div className="flex items-center gap-2">
                <Linkedin className="w-3 h-3 text-sky-400 flex-shrink-0" />
                <span>{displayData.personalInfo.linkedin}</span>
              </div>
            )}
            {displayData.personalInfo.website && (
              <div className="flex items-center gap-2">
                <Globe className="w-3 h-3 text-sky-400 flex-shrink-0" />
                <span>{displayData.personalInfo.website}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills with bars */}
        {displayData.skills.length > 0 && (
          <div data-pdf-section>
            <h2 className="text-xs font-bold uppercase tracking-widest border-b border-slate-600 pb-1 mb-3">Skills</h2>
            <div className="space-y-3">
              {displayData.skills.flatMap(cat => cat.skills).filter(s => s.trim()).map((skill, idx) => (
                <div key={idx}>
                  <p className="text-xs mb-1">{skill}</p>
                  <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-sky-400 rounded-full"
                      style={{ width: `${Math.max(50, 90 - idx * 8)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {displayData.education.length > 0 && (
          <div data-pdf-section>
            <h2 className="text-xs font-bold uppercase tracking-widest border-b border-slate-600 pb-1 mb-3">Education</h2>
            {displayData.education.map((edu) => (
              <div key={edu.id} className="mb-2">
                <p className="text-xs font-semibold">{edu.degree} {edu.field}</p>
                <p className="text-xs text-slate-400">{edu.institution}</p>
                <p className="text-xs text-slate-500">{edu.startDate} - {edu.endDate}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Content */}
      <div className="w-[65%] p-8 flex flex-col gap-6">
        {/* Profile */}
        {displayData.summary && (
          <div data-pdf-section>
            <h2 className="text-sm font-bold uppercase tracking-widest border-b-2 border-gray-200 pb-1 mb-3 text-gray-800">Profile</h2>
            <p className="text-xs leading-relaxed text-gray-600">{displayData.summary}</p>
          </div>
        )}

        {/* Experience */}
        {displayData.experience.length > 0 && (
          <div data-pdf-section>
            <h2 className="text-sm font-bold uppercase tracking-widest border-b-2 border-gray-200 pb-1 mb-3 text-gray-800">Experience</h2>
            <div className="space-y-5">
              {displayData.experience.map((exp) => (
                <div key={exp.id}>
                  <p className="text-sm font-bold text-gray-800">{exp.position}</p>
                  <p className="text-xs text-gray-500">
                    {exp.company} | {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </p>
                  {exp.responsibilities.length > 0 && exp.responsibilities[0].trim() && (
                    <ul className="list-disc pl-4 mt-2 space-y-1">
                      {exp.responsibilities.filter(r => r.trim()).map((r, idx) => (
                        <li key={idx} className="text-xs text-gray-600">{r}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {displayData.projects && displayData.projects.length > 0 && (
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest border-b-2 border-gray-200 pb-1 mb-3 text-gray-800">Projects</h2>
            <ul className="list-disc pl-4 space-y-1">
              {displayData.projects.map((proj) => (
                <li key={proj.id} className="text-xs text-gray-600">
                  <span className="font-semibold">{proj.name}</span> — {proj.description}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DarkSidebar;
