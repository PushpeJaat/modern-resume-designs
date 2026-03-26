import { Mail, Phone, MapPin, Linkedin, Globe, Github, Camera } from "lucide-react";
import { ResumeData } from "@/types/resume";
import { useState } from "react";

interface PhotoModernProps {
  data?: ResumeData;
  onPhotoUpload?: (url: string) => void;
}

const PhotoModern = ({ data, onPhotoUpload }: PhotoModernProps) => {
  const d: ResumeData = data || {
    personalInfo: {
      name: "Sarah Mitchell",
      title: "Product Designer",
      email: "sarah.mitchell@email.com",
      phone: "+1 (555) 890-1234",
      location: "New York, NY",
      linkedin: "linkedin.com/in/sarahmitchell",
      website: "sarahmitchell.design",
      github: "github.com/sarahm",
      photoUrl: "",
    },
    summary: "Creative product designer with 6+ years of experience crafting intuitive digital experiences. Skilled in user research, prototyping, and design systems. Passionate about accessibility and inclusive design.",
    experience: [
      {
        id: "1", company: "DesignHub Inc.", position: "Senior Product Designer",
        startDate: "Mar 2021", endDate: "Present", current: true,
        responsibilities: [
          "Lead design for flagship SaaS product serving 500K+ users",
          "Established and maintained comprehensive design system",
          "Increased user engagement by 35% through UX improvements",
          "Conduct user research and usability testing sessions",
        ],
      },
      {
        id: "2", company: "CreativeStudio", position: "UI/UX Designer",
        startDate: "Jun 2018", endDate: "Feb 2021", current: false,
        responsibilities: [
          "Designed responsive interfaces for mobile and web applications",
          "Collaborated with engineering teams on implementation",
          "Created wireframes, prototypes, and high-fidelity mockups",
        ],
      },
    ],
    education: [
      { id: "1", institution: "Parsons School of Design", degree: "BFA", field: "Product Design", startDate: "2014", endDate: "2018" },
    ],
    skills: [
      { category: "Design", skills: ["Figma", "Sketch", "Adobe XD", "Prototyping", "Design Systems"] },
      { category: "Research", skills: ["User Research", "Usability Testing", "A/B Testing", "Analytics"] },
    ],
  };

  const handlePhotoInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const url = ev.target?.result as string;
      onPhotoUpload?.(url);
    };
    reader.readAsDataURL(file);
  };

  const photoUrl = d.personalInfo.photoUrl;
  const initials = d.personalInfo.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();

  return (
    <div className="w-full bg-white overflow-hidden">
      {/* Header with photo */}
      <div className="relative bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 px-12 py-10">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/3 -translate-x-1/4" />
        </div>
        <div className="relative flex items-center gap-8">
          {/* Photo */}
          <div className="relative group flex-shrink-0">
            <div className="w-28 h-28 rounded-2xl overflow-hidden border-4 border-white/30 shadow-xl bg-slate-600">
              {photoUrl ? (
                <img src={photoUrl} alt={d.personalInfo.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-3xl font-bold text-white/70">{initials}</span>
                </div>
              )}
            </div>
            {onPhotoUpload && (
              <label className="absolute inset-0 cursor-pointer flex items-center justify-center bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-6 h-6 text-white" />
                <input type="file" accept="image/*" onChange={handlePhotoInput} className="hidden" />
              </label>
            )}
          </div>
          {/* Name & Title */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-white mb-1">{d.personalInfo.name || "Your Name"}</h1>
            <p className="text-xl text-white/80 font-light mb-4">{d.personalInfo.title || "Your Title"}</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70">
              {d.personalInfo.email && (
                <a href={`mailto:${d.personalInfo.email}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <Mail className="w-3.5 h-3.5" />{d.personalInfo.email}
                </a>
              )}
              {d.personalInfo.phone && (
                <a href={`tel:${d.personalInfo.phone}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <Phone className="w-3.5 h-3.5" />{d.personalInfo.phone}
                </a>
              )}
              {d.personalInfo.location && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />{d.personalInfo.location}
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70 mt-1.5">
              {d.personalInfo.linkedin && (
                <span className="flex items-center gap-1.5">
                  <Linkedin className="w-3.5 h-3.5" />{d.personalInfo.linkedin}
                </span>
              )}
              {d.personalInfo.website && (
                <span className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" />{d.personalInfo.website}
                </span>
              )}
              {d.personalInfo.github && (
                <span className="flex items-center gap-1.5">
                  <Github className="w-3.5 h-3.5" />{d.personalInfo.github}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="px-12 py-8 space-y-7">
        {/* Summary */}
        {d.summary && (
          <div data-pdf-section>
            <h2 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-slate-800 rounded" />
              About Me
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">{d.summary}</p>
          </div>
        )}

        {/* Experience */}
        {d.experience.length > 0 && d.experience[0].position && (
          <div data-pdf-section>
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-slate-800 rounded" />
              Experience
            </h2>
            <div className="space-y-5">
              {d.experience.map((exp) => (
                <div key={exp.id} className="relative pl-5 border-l-2 border-slate-200">
                  <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-slate-800" />
                  <div className="flex justify-between items-start mb-1.5">
                    <div>
                      <h3 className="font-bold text-sm text-slate-800">{exp.position}</h3>
                      <p className="text-sm text-slate-500 font-medium">{exp.company}</p>
                    </div>
                    <span className="text-xs text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full whitespace-nowrap">
                      {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  {exp.responsibilities.length > 0 && exp.responsibilities[0].trim() && (
                    <ul className="space-y-1 text-sm text-slate-600 mt-2">
                      {exp.responsibilities.filter(r => r.trim()).map((r, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="mt-2 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
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

        {/* Education & Skills side by side */}
        <div className="grid grid-cols-2 gap-8">
          {d.education.length > 0 && d.education[0].institution && (
            <div data-pdf-section>
              <h2 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                <span className="w-8 h-0.5 bg-slate-800 rounded" />
                Education
              </h2>
              <div className="space-y-3">
                {d.education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-bold text-sm text-slate-800">{edu.degree} {edu.field}</h3>
                    <p className="text-sm text-slate-500">{edu.institution}</p>
                    <p className="text-xs text-slate-400">{edu.startDate} – {edu.endDate}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {d.skills.length > 0 && (
            <div data-pdf-section>
              <h2 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                <span className="w-8 h-0.5 bg-slate-800 rounded" />
                Skills
              </h2>
              <div className="space-y-3">
                {d.skills.map((cat, i) => (
                  <div key={i}>
                    <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">{cat.category}</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.skills.filter(s => s.trim()).map((skill, idx) => (
                        <span key={idx} className="px-2.5 py-1 text-xs bg-slate-100 text-slate-700 rounded-md border border-slate-200">
                          {skill}
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
    </div>
  );
};

export default PhotoModern;
