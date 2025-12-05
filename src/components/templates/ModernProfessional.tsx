import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";
import { ResumeData } from "@/types/resume";

interface ModernProfessionalProps {
  data?: ResumeData;
}

const ModernProfessional = ({ data }: ModernProfessionalProps) => {
  // Default demo data
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
    summary: "Innovative software engineer with 8+ years of experience building scalable web applications. Proven track record of leading cross-functional teams and delivering high-impact solutions. Passionate about clean code and modern development practices.",
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
          "Collaborated with design team to improve UX metrics by 40%",
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
      {
        category: "Technical",
        skills: ["React", "TypeScript", "Node.js", "Python", "AWS"],
      },
      {
        category: "Soft Skills",
        skills: ["Leadership", "Communication", "Problem Solving"],
      },
    ],
  };
  return (
    <div className="w-full bg-white overflow-hidden">
      {/* Header */}
      <div className="bg-primary px-12 py-10">
        <h1 className="text-4xl font-bold text-white mb-2">{displayData.personalInfo.name || "Your Name"}</h1>
        <p className="text-xl text-white/90 font-light">{displayData.personalInfo.title || "Your Title"}</p>
      </div>

      <div className="grid grid-cols-3 gap-8 p-12">
        {/* Left Column */}
        <div className="col-span-1 space-y-8">
          {/* Contact */}
          <div>
            <h2 className="section-title mb-4 pb-2 border-b-2 border-resume-header">Contact</h2>
            <div className="space-y-3 text-sm">
              {displayData.personalInfo.email && (
                <div className="flex items-start gap-2">
                  <Mail className="w-4 h-4 mt-0.5 text-resume-header flex-shrink-0" />
                  <span className="resume-text">{displayData.personalInfo.email}</span>
                </div>
              )}
              {displayData.personalInfo.phone && (
                <div className="flex items-start gap-2">
                  <Phone className="w-4 h-4 mt-0.5 text-resume-header flex-shrink-0" />
                  <span className="resume-text">{displayData.personalInfo.phone}</span>
                </div>
              )}
              {displayData.personalInfo.location && (
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 text-resume-header flex-shrink-0" />
                  <span className="resume-text">{displayData.personalInfo.location}</span>
                </div>
              )}
              {displayData.personalInfo.linkedin && (
                <div className="flex items-start gap-2">
                  <Linkedin className="w-4 h-4 mt-0.5 text-resume-header flex-shrink-0" />
                  <span className="resume-text">{displayData.personalInfo.linkedin}</span>
                </div>
              )}
              {displayData.personalInfo.website && (
                <div className="flex items-start gap-2">
                  <Globe className="w-4 h-4 mt-0.5 text-resume-header flex-shrink-0" />
                  <span className="resume-text">{displayData.personalInfo.website}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {displayData.skills.length > 0 && (
            <div>
              <h2 className="section-title mb-4 pb-2 border-b-2 border-resume-header">Skills</h2>
              <div className="space-y-4">
                {displayData.skills.map((skillCat, index) => (
                  <div key={index}>
                    <h3 className="font-semibold text-sm resume-text mb-2">{skillCat.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {skillCat.skills.filter(s => s.trim()).map((skill, idx) => (
                        <span key={idx} className="px-2 py-1 bg-resume-bg text-xs rounded resume-text">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {displayData.education.length > 0 && (
            <div>
              <h2 className="section-title mb-4 pb-2 border-b-2 border-resume-header">Education</h2>
              <div className="space-y-3">
                {displayData.education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-semibold text-sm resume-text">
                      {edu.degree} {edu.field}
                    </h3>
                    <p className="text-xs resume-light-text mt-1">{edu.institution}</p>
                    <p className="text-xs resume-light-text">
                      {edu.startDate} - {edu.endDate}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="col-span-2 space-y-8">
          {/* Summary */}
          {displayData.summary && (
            <div>
              <h2 className="section-title mb-4 pb-2 border-b-2 border-resume-header">Professional Summary</h2>
              <p className="text-sm resume-text leading-relaxed">
                {displayData.summary}
              </p>
            </div>
          )}

          {/* Experience */}
          {displayData.experience.length > 0 && (
            <div>
              <h2 className="section-title mb-4 pb-2 border-b-2 border-resume-header">Work Experience</h2>
              <div className="space-y-6">
                {displayData.experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-base resume-section">{exp.position}</h3>
                        <p className="text-sm font-medium text-resume-header">{exp.company}</p>
                      </div>
                      <span className="text-xs resume-light-text whitespace-nowrap">
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                      </span>
                    </div>
                    {exp.responsibilities.length > 0 && exp.responsibilities[0].trim() && (
                      <ul className="list-disc list-inside space-y-1 text-sm resume-text ml-2">
                        {exp.responsibilities.filter(r => r.trim()).map((resp, idx) => (
                          <li key={idx}>{resp}</li>
                        ))}
                      </ul>
                    )}
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

export default ModernProfessional;
