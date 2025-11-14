import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ModernProfessional = () => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white resume-shadow rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-primary px-12 py-10">
        <h1 className="text-4xl font-bold text-white mb-2">John Anderson</h1>
        <p className="text-xl text-white/90 font-light">Senior Software Engineer</p>
      </div>

      <div className="grid grid-cols-3 gap-8 p-12">
        {/* Left Column */}
        <div className="col-span-1 space-y-8">
          {/* Contact */}
          <div>
            <h2 className="section-title mb-4 pb-2 border-b-2 border-resume-header">Contact</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 text-resume-header flex-shrink-0" />
                <span className="resume-text">john.anderson@email.com</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 text-resume-header flex-shrink-0" />
                <span className="resume-text">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-resume-header flex-shrink-0" />
                <span className="resume-text">San Francisco, CA</span>
              </div>
              <div className="flex items-start gap-2">
                <Linkedin className="w-4 h-4 mt-0.5 text-resume-header flex-shrink-0" />
                <span className="resume-text">linkedin.com/in/johnanderson</span>
              </div>
              <div className="flex items-start gap-2">
                <Globe className="w-4 h-4 mt-0.5 text-resume-header flex-shrink-0" />
                <span className="resume-text">johnanderson.dev</span>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div>
            <h2 className="section-title mb-4 pb-2 border-b-2 border-resume-header">Skills</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-sm resume-text mb-2">Technical</h3>
                <div className="flex flex-wrap gap-2">
                  {["React", "TypeScript", "Node.js", "Python", "AWS"].map((skill) => (
                    <span key={skill} className="px-2 py-1 bg-resume-bg text-xs rounded resume-text">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-sm resume-text mb-2">Soft Skills</h3>
                <div className="space-y-1 text-sm">
                  <p className="resume-light-text">Leadership</p>
                  <p className="resume-light-text">Communication</p>
                  <p className="resume-light-text">Problem Solving</p>
                </div>
              </div>
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="section-title mb-4 pb-2 border-b-2 border-resume-header">Education</h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-sm resume-text">BS Computer Science</h3>
                <p className="text-xs resume-light-text mt-1">Stanford University</p>
                <p className="text-xs resume-light-text">2012 - 2016</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-2 space-y-8">
          {/* Summary */}
          <div>
            <h2 className="section-title mb-4 pb-2 border-b-2 border-resume-header">Professional Summary</h2>
            <p className="text-sm resume-text leading-relaxed">
              Innovative software engineer with 8+ years of experience building scalable web applications. 
              Proven track record of leading cross-functional teams and delivering high-impact solutions. 
              Passionate about clean code, user experience, and continuous learning.
            </p>
          </div>

          {/* Experience */}
          <div>
            <h2 className="section-title mb-4 pb-2 border-b-2 border-resume-header">Work Experience</h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-base resume-section">Senior Software Engineer</h3>
                    <p className="text-sm font-medium text-resume-header">Tech Innovations Inc.</p>
                  </div>
                  <span className="text-xs resume-light-text whitespace-nowrap">2020 - Present</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-sm resume-text ml-2">
                  <li>Led development of microservices architecture serving 2M+ users</li>
                  <li>Reduced API response time by 40% through optimization</li>
                  <li>Mentored team of 5 junior developers</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-base resume-section">Software Engineer</h3>
                    <p className="text-sm font-medium text-resume-header">Digital Solutions LLC</p>
                  </div>
                  <span className="text-xs resume-light-text whitespace-nowrap">2018 - 2020</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-sm resume-text ml-2">
                  <li>Built responsive web applications using React and TypeScript</li>
                  <li>Implemented CI/CD pipeline reducing deployment time by 60%</li>
                  <li>Collaborated with UX team to improve user engagement by 35%</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-base resume-section">Junior Developer</h3>
                    <p className="text-sm font-medium text-resume-header">StartUp Ventures</p>
                  </div>
                  <span className="text-xs resume-light-text whitespace-nowrap">2016 - 2018</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-sm resume-text ml-2">
                  <li>Developed full-stack features for SaaS platform</li>
                  <li>Participated in agile development process</li>
                  <li>Contributed to code reviews and technical documentation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernProfessional;
