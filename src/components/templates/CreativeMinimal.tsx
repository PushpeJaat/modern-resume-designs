import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";

const CreativeMinimal = () => {
  return (
    <div className="w-full bg-white overflow-hidden">
      <div className="p-12">
        {/* Header with accent */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-2 h-24 bg-accent rounded-full"></div>
            <div>
              <h1 className="text-5xl font-bold text-resume-section mb-2">Emma Chen</h1>
              <p className="text-2xl font-light text-resume-light">Product Designer</p>
            </div>
          </div>
          
          {/* Contact inline */}
          <div className="flex flex-wrap gap-6 text-sm resume-text ml-6">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-accent" />
              <span>emma.chen@design.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-accent" />
              <span>+1 (555) 987-6543</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accent" />
              <span>New York, NY</span>
            </div>
            <div className="flex items-center gap-2">
              <Linkedin className="w-4 h-4 text-accent" />
              <span>emmachen</span>
            </div>
            <div className="flex items-center gap-2">
              <Github className="w-4 h-4 text-accent" />
              <span>emmachen-design</span>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-resume-section mb-4 flex items-center gap-3">
            <span className="w-12 h-1 bg-accent rounded-full"></span>
            About
          </h2>
          <p className="text-sm resume-text leading-relaxed ml-15">
            Creative product designer with a passion for crafting intuitive user experiences. 
            5+ years of experience in designing digital products from concept to launch. 
            Specialized in user research, interface design, and design systems.
          </p>
        </div>

        {/* Experience */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-resume-section mb-6 flex items-center gap-3">
            <span className="w-12 h-1 bg-accent rounded-full"></span>
            Experience
          </h2>
          <div className="space-y-8 ml-15">
            <div className="relative pl-8 border-l-2 border-resume-border">
              <div className="absolute -left-2 top-0 w-3 h-3 rounded-full bg-accent"></div>
              <div className="mb-2">
                <h3 className="text-lg font-bold text-resume-section">Senior Product Designer</h3>
                <div className="flex justify-between items-center">
                  <p className="text-sm font-semibold text-accent">Design Studio Co.</p>
                  <span className="text-xs resume-light-text">2022 - Present</span>
                </div>
              </div>
              <ul className="space-y-2 text-sm resume-text">
                <li>• Led redesign of flagship product, increasing user satisfaction by 45%</li>
                <li>• Established and maintained design system used across 15+ products</li>
                <li>• Conducted user research sessions with 100+ participants</li>
              </ul>
            </div>

            <div className="relative pl-8 border-l-2 border-resume-border">
              <div className="absolute -left-2 top-0 w-3 h-3 rounded-full bg-accent"></div>
              <div className="mb-2">
                <h3 className="text-lg font-bold text-resume-section">Product Designer</h3>
                <div className="flex justify-between items-center">
                  <p className="text-sm font-semibold text-accent">Creative Agency</p>
                  <span className="text-xs resume-light-text">2019 - 2022</span>
                </div>
              </div>
              <ul className="space-y-2 text-sm resume-text">
                <li>• Designed mobile and web applications for diverse client portfolio</li>
                <li>• Collaborated with development teams using Figma and prototyping tools</li>
                <li>• Improved conversion rates by 30% through data-driven design decisions</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Skills & Education Grid */}
        <div className="grid grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-bold text-resume-section mb-6 flex items-center gap-3">
              <span className="w-12 h-1 bg-accent rounded-full"></span>
              Skills
            </h2>
            <div className="ml-15 space-y-4">
              <div>
                <h3 className="font-semibold text-sm resume-section mb-2">Design Tools</h3>
                <p className="text-sm resume-text">Figma, Sketch, Adobe XD, Photoshop, Illustrator</p>
              </div>
              <div>
                <h3 className="font-semibold text-sm resume-section mb-2">Skills</h3>
                <p className="text-sm resume-text">UI/UX Design, Prototyping, User Research, Design Systems, Wireframing</p>
              </div>
              <div>
                <h3 className="font-semibold text-sm resume-section mb-2">Development</h3>
                <p className="text-sm resume-text">HTML, CSS, Basic JavaScript, React (basics)</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-resume-section mb-6 flex items-center gap-3">
              <span className="w-12 h-1 bg-accent rounded-full"></span>
              Education
            </h2>
            <div className="ml-15 space-y-4">
              <div>
                <h3 className="font-semibold text-sm resume-section">BFA Graphic Design</h3>
                <p className="text-sm text-accent font-medium mt-1">Parsons School of Design</p>
                <p className="text-xs resume-light-text">2015 - 2019</p>
              </div>
              <div className="pt-2">
                <h3 className="font-semibold text-sm resume-section mb-2">Certifications</h3>
                <p className="text-sm resume-text">Google UX Design Certificate</p>
                <p className="text-sm resume-text">Nielsen Norman Group UX Certification</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreativeMinimal;
