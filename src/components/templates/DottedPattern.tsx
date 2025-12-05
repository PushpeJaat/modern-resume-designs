import { Mail, Phone, MapPin, Github, Globe, Code } from "lucide-react";

const DottedPattern = () => {
  return (
    <div className="w-full bg-white overflow-hidden relative">
      {/* Dotted Pattern Background */}
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

      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-40 h-40">
        <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-primary rounded-tl-3xl"></div>
      </div>
      <div className="absolute bottom-0 right-0 w-40 h-40">
        <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-accent rounded-br-3xl"></div>
      </div>

      <div className="relative p-12">
        {/* Header with side accent */}
        <div className="flex gap-8 mb-10 pb-8 border-b border-resume-border/50">
          <div className="w-2 bg-gradient-to-b from-primary via-accent to-primary rounded-full flex-shrink-0"></div>
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-5xl font-bold text-resume-section mb-2">Jamie Wilson</h1>
                <p className="text-2xl text-resume-light font-light flex items-center gap-2">
                  <Code className="w-6 h-6 text-primary" />
                  Frontend Engineer
                </p>
              </div>
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary via-accent to-primary p-1">
                <div className="w-full h-full rounded-xl bg-white flex items-center justify-center">
                  <span className="text-3xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
                    JW
                  </span>
                </div>
              </div>
            </div>
            
            {/* Contact Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2 resume-text">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs resume-light-text">Email</p>
                  <p className="font-medium truncate">jamie.w@mail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-2 resume-text">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-accent" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs resume-light-text">Phone</p>
                  <p className="font-medium">+1 555-0199</p>
                </div>
              </div>
              <div className="flex items-center gap-2 resume-text">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs resume-light-text">Location</p>
                  <p className="font-medium">Portland, OR</p>
                </div>
              </div>
              <div className="flex items-center gap-2 resume-text">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Globe className="w-4 h-4 text-accent" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs resume-light-text">Website</p>
                  <p className="font-medium">jamie.dev</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="col-span-1 space-y-6">
            {/* About */}
            <div className="p-5 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl border-2 border-primary/10">
              <h2 className="section-title mb-3 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                About Me
              </h2>
              <p className="text-xs resume-text leading-relaxed">
                Creative frontend engineer passionate about building beautiful, accessible user interfaces. 
                Love working with modern frameworks and design systems.
              </p>
            </div>

            {/* Skills Categories */}
            <div className="space-y-4">
              <div className="p-4 bg-white rounded-xl border-2 border-primary/20 shadow-sm">
                <h3 className="text-xs font-bold resume-section mb-3 uppercase tracking-wide flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  Core Technologies
                </h3>
                <div className="space-y-2">
                  {[
                    { name: "React/Next.js", dots: 5 },
                    { name: "TypeScript", dots: 5 },
                    { name: "CSS/Tailwind", dots: 5 },
                    { name: "JavaScript", dots: 4 },
                  ].map((skill) => (
                    <div key={skill.name} className="flex justify-between items-center">
                      <span className="text-xs resume-text">{skill.name}</span>
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              i < skill.dots ? "bg-primary" : "bg-resume-border"
                            }`}
                          ></div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-white rounded-xl border-2 border-accent/20 shadow-sm">
                <h3 className="text-xs font-bold resume-section mb-3 uppercase tracking-wide flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                  Tools & Others
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["Git", "Figma", "VS Code", "Webpack", "Jest", "Storybook"].map((tool) => (
                    <span
                      key={tool}
                      className="px-2 py-1 text-xs bg-gradient-to-r from-accent/10 to-transparent rounded border border-accent/20 resume-text"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="p-4 bg-gradient-to-br from-accent/5 to-transparent rounded-xl border border-accent/20">
              <h2 className="section-title mb-3 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent"></div>
                Links
              </h2>
              <div className="space-y-2 text-xs">
                <a href="#" className="flex items-center gap-2 resume-text hover:text-primary transition-colors">
                  <Github className="w-4 h-4" />
                  <span>github.com/jamiewilson</span>
                </a>
                <a href="#" className="flex items-center gap-2 resume-text hover:text-primary transition-colors">
                  <Globe className="w-4 h-4" />
                  <span>jamie.dev</span>
                </a>
              </div>
            </div>

            {/* Education */}
            <div className="p-4 bg-white rounded-xl border-2 border-primary/10">
              <h2 className="section-title mb-3 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                Education
              </h2>
              <div>
                <h3 className="font-semibold text-xs resume-text">BS Software Engineering</h3>
                <p className="text-xs text-primary font-medium mt-1">Oregon State University</p>
                <p className="text-xs resume-light-text">2016 - 2020</p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-span-2 space-y-6">
            {/* Experience */}
            <div>
              <h2 className="section-title text-2xl mb-6 flex items-center gap-3">
                <div className="w-3 h-3 rounded bg-primary"></div>
                Work Experience
              </h2>
              <div className="space-y-5">
                <div className="p-5 bg-white rounded-xl border-l-4 border-primary shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-base resume-section">Senior Frontend Engineer</h3>
                      <p className="text-sm font-semibold text-primary mt-1">Design Systems Co.</p>
                    </div>
                    <span className="text-xs resume-light-text bg-primary/10 px-3 py-1.5 rounded-full">
                      2022 - Present
                    </span>
                  </div>
                  <ul className="space-y-1.5 text-sm resume-text">
                    <li>• Led development of component library used across 30+ products</li>
                    <li>• Improved web performance metrics by 50% through optimization</li>
                    <li>• Mentored team of 4 frontend developers</li>
                    <li>• Implemented accessibility standards (WCAG 2.1 AA compliance)</li>
                  </ul>
                </div>

                <div className="p-5 bg-white rounded-xl border-l-4 border-accent shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-base resume-section">Frontend Developer</h3>
                      <p className="text-sm font-semibold text-accent mt-1">Creative Agency Pro</p>
                    </div>
                    <span className="text-xs resume-light-text bg-accent/10 px-3 py-1.5 rounded-full">
                      2020 - 2022
                    </span>
                  </div>
                  <ul className="space-y-1.5 text-sm resume-text">
                    <li>• Built responsive SPAs for Fortune 500 clients</li>
                    <li>• Collaborated with UX team to implement pixel-perfect designs</li>
                    <li>• Integrated RESTful APIs and GraphQL endpoints</li>
                    <li>• Reduced bundle size by 40% using code-splitting techniques</li>
                  </ul>
                </div>

                <div className="p-5 bg-white rounded-xl border-l-4 border-primary shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-base resume-section">Junior Frontend Developer</h3>
                      <p className="text-sm font-semibold text-primary mt-1">StartUp Hub</p>
                    </div>
                    <span className="text-xs resume-light-text bg-primary/10 px-3 py-1.5 rounded-full">
                      2020 - 2020
                    </span>
                  </div>
                  <ul className="space-y-1.5 text-sm resume-text">
                    <li>• Developed reusable React components</li>
                    <li>• Participated in agile sprints and daily standups</li>
                    <li>• Fixed bugs and improved code quality</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Projects */}
            <div className="p-6 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 rounded-2xl border-2 border-primary/10">
              <h2 className="section-title text-xl mb-4 flex items-center gap-3">
                <div className="w-3 h-3 rounded bg-accent"></div>
                Featured Projects
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary flex-shrink-0 flex items-center justify-center">
                    <Code className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-sm resume-section">Component Library</h3>
                    <p className="text-xs resume-text mt-1">
                      Built comprehensive design system with 50+ components. Used by 1000+ developers.
                    </p>
                    <div className="flex gap-2 mt-2">
                      <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded">React</span>
                      <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded">TypeScript</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent flex-shrink-0 flex items-center justify-center">
                    <Globe className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-sm resume-section">Portfolio Platform</h3>
                    <p className="text-xs resume-text mt-1">
                      Created dynamic portfolio builder with drag-and-drop interface and live preview.
                    </p>
                    <div className="flex gap-2 mt-2">
                      <span className="px-2 py-0.5 bg-accent/20 text-accent text-xs rounded">Next.js</span>
                      <span className="px-2 py-0.5 bg-accent/20 text-accent text-xs rounded">Tailwind</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DottedPattern;
