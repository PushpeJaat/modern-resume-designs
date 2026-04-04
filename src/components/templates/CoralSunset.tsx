import { Mail, Phone, MapPin, Linkedin, Globe, Camera } from "lucide-react";
import { ResumeData } from "@/types/resume";

interface CoralSunsetProps {
  data?: ResumeData;
  onPhotoUpload?: (url: string) => void;
}

const CoralSunset = ({ data }: CoralSunsetProps) => {
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
      { id: "1", institution: "Stanford University", degree: "BS", field: "Computer Science", startDate: "2012", endDate: "2016" },
    ],
    skills: [
      { category: "Technical", skills: ["React", "TypeScript", "Node.js", "Python", "AWS"] },
      { category: "Soft Skills", skills: ["Leadership", "Communication", "Problem Solving"] },
    ],
  };

  const photo = displayData.personalInfo.photoUrl;

  return (
    <div className="w-full bg-white overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-16 -left-16 w-72 h-72 rounded-full opacity-[0.05] bg-[hsl(15,90%,55%)] blur-3xl" />
        <div className="absolute bottom-20 right-0 w-60 h-60 rounded-full opacity-[0.04] bg-[hsl(35,95%,55%)] blur-3xl" />
        <div className="absolute top-1/2 left-10 w-32 h-32 rounded-full opacity-[0.04] bg-[hsl(5,85%,60%)] blur-2xl" />
      </div>

      {/* Header with warm gradient */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(15,80%,45%)] via-[hsl(25,85%,50%)] to-[hsl(35,90%,55%)]" />
        {/* Decorative shapes */}
        <div className="absolute -top-6 -right-6 w-32 h-32 border-2 border-white/10 rounded-full" />
        <div className="absolute -bottom-10 -left-10 w-44 h-44 border-2 border-white/10 rounded-full" />
        <div className="absolute top-4 right-24 w-14 h-14 border border-white/10 rounded-full" />
        <div className="absolute bottom-6 right-40 w-20 h-20 border border-white/[0.07] rounded-full" />
        {/* Wave-like decorative strip */}
        <div className="absolute bottom-0 left-0 w-full h-3 bg-gradient-to-r from-white/10 via-white/20 to-white/10" />

        <div className="relative px-12 py-10 flex items-center gap-8">
          <div className="relative shrink-0">
            {photo ? (
              <img src={photo} alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-white/30 shadow-lg" />
            ) : (
              <div className="w-24 h-24 rounded-full bg-white/20 border-4 border-white/30 flex items-center justify-center">
                <Camera className="w-8 h-8 text-white/50" />
              </div>
            )}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white mb-1 tracking-wide">{displayData.personalInfo.name || "Your Name"}</h1>
            <p className="text-lg text-white/80 font-light tracking-wide">{displayData.personalInfo.title || "Your Title"}</p>
            <div className="flex flex-wrap gap-x-5 gap-y-1 mt-3 text-white/70 text-xs">
              {displayData.personalInfo.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {displayData.personalInfo.email}</span>}
              {displayData.personalInfo.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {displayData.personalInfo.phone}</span>}
              {displayData.personalInfo.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {displayData.personalInfo.location}</span>}
              {displayData.personalInfo.linkedin && <span className="flex items-center gap-1"><Linkedin className="w-3 h-3" /> {displayData.personalInfo.linkedin}</span>}
              {displayData.personalInfo.website && <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> {displayData.personalInfo.website}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="px-12 py-8 space-y-7 relative">
        {displayData.summary && (
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-[hsl(15,80%,40%)] mb-3 flex items-center gap-2">
              <span className="w-8 h-[3px] rounded bg-gradient-to-r from-[hsl(15,80%,45%)] to-[hsl(35,90%,55%)]" />
              Professional Summary
            </h2>
            <p className="text-sm leading-relaxed text-[hsl(15,10%,30%)]">{displayData.summary}</p>
          </div>
        )}

        {displayData.experience.length > 0 && displayData.experience[0].position && (
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-[hsl(15,80%,40%)] mb-4 flex items-center gap-2">
              <span className="w-8 h-[3px] rounded bg-gradient-to-r from-[hsl(15,80%,45%)] to-[hsl(35,90%,55%)]" />
              Work Experience
            </h2>
            <div className="space-y-5">
              {displayData.experience.map((exp) => (
                <div key={exp.id} className="relative pl-5 border-l-2 border-[hsl(15,15%,87%)]">
                  <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-[hsl(25,85%,50%)]" />
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-bold text-sm text-[hsl(15,20%,20%)]">{exp.position}</h3>
                      <p className="text-sm font-medium text-[hsl(25,85%,45%)]">{exp.company}</p>
                    </div>
                    <span className="text-xs text-[hsl(15,10%,55%)] whitespace-nowrap ml-4">
                      {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  {exp.responsibilities.filter((r) => r.trim()).length > 0 && (
                    <ul className="list-disc list-inside text-sm text-[hsl(15,15%,30%)] space-y-0.5 mt-1.5">
                      {exp.responsibilities.filter((r) => r.trim()).map((r, i) => <li key={i}>{r}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-8">
          {displayData.skills.length > 0 && (
            <div>
              <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-[hsl(15,80%,40%)] mb-3 flex items-center gap-2">
                <span className="w-8 h-[3px] rounded bg-gradient-to-r from-[hsl(15,80%,45%)] to-[hsl(35,90%,55%)]" />
                Skills
              </h2>
              <div className="space-y-3">
                {displayData.skills.map((cat, i) => (
                  <div key={i}>
                    <h3 className="font-semibold text-xs text-[hsl(15,20%,25%)] mb-1.5">{cat.category}</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.skills.filter((s) => s.trim()).map((skill, idx) => (
                        <span key={idx} className="px-2.5 py-1 text-xs rounded-full bg-[hsl(25,80%,94%)] text-[hsl(15,80%,35%)] font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {displayData.education.length > 0 && displayData.education[0].institution && (
            <div>
              <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-[hsl(15,80%,40%)] mb-3 flex items-center gap-2">
                <span className="w-8 h-[3px] rounded bg-gradient-to-r from-[hsl(15,80%,45%)] to-[hsl(35,90%,55%)]" />
                Education
              </h2>
              <div className="space-y-3">
                {displayData.education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-bold text-sm text-[hsl(15,20%,20%)]">{edu.degree} {edu.field}</h3>
                    <p className="text-xs text-[hsl(15,10%,55%)] mt-0.5">{edu.institution}</p>
                    <p className="text-xs text-[hsl(15,10%,65%)]">{edu.startDate} — {edu.endDate}</p>
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

export default CoralSunset;
