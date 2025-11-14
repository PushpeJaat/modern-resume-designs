import { Mail, Phone, MapPin, Linkedin, Briefcase } from "lucide-react";

const GeometricModern = () => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white resume-shadow rounded-lg overflow-hidden relative">
      {/* Geometric Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="geometric-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary"/>
              <rect x="60" y="10" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent"/>
              <polygon points="15,70 35,85 15,100" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary"/>
              <line x1="70" y1="60" x2="90" y2="90" stroke="currentColor" strokeWidth="2" className="text-accent"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#geometric-pattern)"/>
        </svg>
      </div>

      {/* Accent Corner */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full"></div>
      
      <div className="relative p-12">
        {/* Header with geometric accent */}
        <div className="mb-10 relative">
          <div className="absolute -left-12 top-0 w-2 h-32 bg-gradient-to-b from-primary to-accent"></div>
          <h1 className="text-5xl font-bold text-resume-section mb-2">Sarah Martinez</h1>
          <p className="text-2xl text-resume-light font-light">Marketing Director</p>
          
          {/* Contact with icons */}
          <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 resume-text">
              <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                <Mail className="w-4 h-4 text-primary" />
              </div>
              <span>sarah.martinez@email.com</span>
            </div>
            <div className="flex items-center gap-2 resume-text">
              <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                <Phone className="w-4 h-4 text-primary" />
              </div>
              <span>+1 (555) 321-7890</span>
            </div>
            <div className="flex items-center gap-2 resume-text">
              <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <span>Seattle, WA</span>
            </div>
            <div className="flex items-center gap-2 resume-text">
              <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                <Linkedin className="w-4 h-4 text-primary" />
              </div>
              <span>sarahmartinez</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="col-span-1 space-y-8">
            {/* Profile */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-1 bg-primary"></div>
                <h2 className="section-title">Profile</h2>
              </div>
              <p className="text-sm resume-text leading-relaxed">
                Strategic marketing leader with 10+ years driving brand growth and digital transformation. Expert in data-driven campaigns and team leadership.
              </p>
            </div>

            {/* Skills */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-1 bg-primary"></div>
                <h2 className="section-title">Skills</h2>
              </div>
              <div className="space-y-3">
                {[
                  { name: "Digital Marketing", level: 95 },
                  { name: "Brand Strategy", level: 90 },
                  { name: "Team Leadership", level: 88 },
                  { name: "Analytics", level: 85 },
                ].map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-xs resume-text mb-1">
                      <span>{skill.name}</span>
                      <span className="text-primary font-semibold">{skill.level}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-resume-border rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-1 bg-primary"></div>
                <h2 className="section-title">Tools</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {["HubSpot", "Google Analytics", "Salesforce", "Adobe Suite", "Tableau"].map((tool) => (
                  <span key={tool} className="px-3 py-1.5 bg-gradient-to-r from-primary/10 to-accent/10 text-xs rounded-full resume-text font-medium border border-primary/20">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-1 bg-primary"></div>
                <h2 className="section-title">Education</h2>
              </div>
              <div>
                <h3 className="font-semibold text-sm resume-text">MBA Marketing</h3>
                <p className="text-xs text-primary font-medium mt-1">Northwestern University</p>
                <p className="text-xs resume-light-text">2010 - 2012</p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-span-2 space-y-8">
            {/* Experience */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="w-5 h-5 text-primary" />
                <h2 className="section-title">Experience</h2>
              </div>
              <div className="space-y-6">
                <div className="relative pl-6 border-l-2 border-primary/30">
                  <div className="absolute -left-2 top-1 w-3 h-3 rounded-full bg-primary"></div>
                  <div className="mb-2">
                    <h3 className="font-bold text-base resume-section">Marketing Director</h3>
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-semibold text-primary">Tech Innovations Corp</p>
                      <span className="text-xs resume-light-text">2021 - Present</span>
                    </div>
                  </div>
                  <ul className="space-y-1.5 text-sm resume-text">
                    <li>• Led rebranding initiative resulting in 60% increase in brand awareness</li>
                    <li>• Managed $5M marketing budget across digital and traditional channels</li>
                    <li>• Built and mentored team of 15 marketing professionals</li>
                    <li>• Increased customer acquisition by 45% through data-driven campaigns</li>
                  </ul>
                </div>

                <div className="relative pl-6 border-l-2 border-primary/30">
                  <div className="absolute -left-2 top-1 w-3 h-3 rounded-full bg-accent"></div>
                  <div className="mb-2">
                    <h3 className="font-bold text-base resume-section">Senior Marketing Manager</h3>
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-semibold text-primary">Digital Growth Agency</p>
                      <span className="text-xs resume-light-text">2018 - 2021</span>
                    </div>
                  </div>
                  <ul className="space-y-1.5 text-sm resume-text">
                    <li>• Developed omnichannel marketing strategy for 20+ enterprise clients</li>
                    <li>• Achieved 120% of revenue targets for three consecutive years</li>
                    <li>• Pioneered influencer marketing program generating $2M in revenue</li>
                  </ul>
                </div>

                <div className="relative pl-6 border-l-2 border-primary/30">
                  <div className="absolute -left-2 top-1 w-3 h-3 rounded-full bg-accent"></div>
                  <div className="mb-2">
                    <h3 className="font-bold text-base resume-section">Marketing Manager</h3>
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-semibold text-primary">StartUp Ventures</p>
                      <span className="text-xs resume-light-text">2015 - 2018</span>
                    </div>
                  </div>
                  <ul className="space-y-1.5 text-sm resume-text">
                    <li>• Launched successful product campaigns reaching 500K+ customers</li>
                    <li>• Improved email marketing ROI by 200% through A/B testing</li>
                    <li>• Coordinated cross-functional teams for product launches</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-1 bg-accent"></div>
                <h2 className="section-title">Key Achievements</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-br from-primary/5 to-transparent rounded-lg border border-primary/20">
                  <p className="text-2xl font-bold text-primary">$50M+</p>
                  <p className="text-xs resume-text mt-1">Revenue Generated</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-accent/5 to-transparent rounded-lg border border-accent/20">
                  <p className="text-2xl font-bold text-accent">150%</p>
                  <p className="text-xs resume-text mt-1">Growth Rate</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-primary/5 to-transparent rounded-lg border border-primary/20">
                  <p className="text-2xl font-bold text-primary">25+</p>
                  <p className="text-xs resume-text mt-1">Successful Campaigns</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-accent/5 to-transparent rounded-lg border border-accent/20">
                  <p className="text-2xl font-bold text-accent">3x</p>
                  <p className="text-xs resume-text mt-1">Team Growth</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeometricModern;
