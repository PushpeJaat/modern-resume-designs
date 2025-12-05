import { Mail, Phone, MapPin, Award, Target } from "lucide-react";

const GradientWave = () => {
  return (
    <div className="w-full bg-white overflow-hidden relative">
      {/* Wave Background */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="wave-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.03"/>
              <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.03"/>
            </linearGradient>
            <linearGradient id="wave-gradient-2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.05"/>
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.02"/>
            </linearGradient>
          </defs>
          <path d="M0,50 Q250,0 500,50 T1000,50 L1000,0 L0,0 Z" fill="url(#wave-gradient-1)"/>
          <path d="M0,100 Q250,150 500,100 T1000,100 L1000,200 L0,200 Z" fill="url(#wave-gradient-2)"/>
          <path d="M0,400 Q300,350 600,400 T1200,400 L1200,600 L0,600 Z" fill="url(#wave-gradient-1)"/>
        </svg>
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-primary/10 to-accent/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-accent/10 to-primary/5 rounded-full blur-3xl"></div>

      <div className="relative p-12">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-full mb-4">
            <p className="text-sm font-semibold text-primary">Portfolio Available</p>
          </div>
          <h1 className="text-6xl font-bold mb-2 bg-gradient-to-r from-resume-section via-primary to-accent bg-clip-text text-transparent">
            Alex Thompson
          </h1>
          <p className="text-2xl text-resume-light font-light mb-6">Full Stack Developer</p>
          
          {/* Contact Pills */}
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur rounded-full border border-primary/20 shadow-sm">
              <Mail className="w-4 h-4 text-primary" />
              <span className="text-sm resume-text">alex.thompson@dev.io</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur rounded-full border border-primary/20 shadow-sm">
              <Phone className="w-4 h-4 text-primary" />
              <span className="text-sm resume-text">+1 (555) 789-0123</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur rounded-full border border-primary/20 shadow-sm">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm resume-text">Austin, TX</span>
            </div>
          </div>
        </div>

        {/* Summary Card */}
        <div className="mb-10 p-6 bg-gradient-to-br from-primary/5 via-white to-accent/5 rounded-2xl border border-primary/10 backdrop-blur">
          <h2 className="text-xl font-bold text-resume-section mb-3 flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Professional Summary
          </h2>
          <p className="text-sm resume-text leading-relaxed">
            Passionate full-stack developer with 7 years of experience building scalable web applications. 
            Specialized in React, Node.js, and cloud architecture. Strong advocate for clean code, testing, 
            and agile methodologies. Proven ability to lead technical projects and mentor junior developers.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="col-span-1 space-y-8">
            {/* Technical Skills */}
            <div className="p-5 bg-gradient-to-br from-white to-primary/5 rounded-xl border border-primary/10">
              <h2 className="section-title mb-4">Technical Stack</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold resume-section mb-2">Frontend</p>
                  <div className="flex flex-wrap gap-1.5">
                    {["React", "TypeScript", "Next.js", "Tailwind"].map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold resume-section mb-2">Backend</p>
                  <div className="flex flex-wrap gap-1.5">
                    {["Node.js", "Python", "PostgreSQL", "MongoDB"].map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold resume-section mb-2">DevOps</p>
                  <div className="flex flex-wrap gap-1.5">
                    {["Docker", "AWS", "CI/CD", "Git"].map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-resume-section text-white text-xs rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="p-5 bg-gradient-to-br from-white to-accent/5 rounded-xl border border-accent/10">
              <h2 className="section-title mb-4 flex items-center gap-2">
                <Award className="w-4 h-4 text-accent" />
                Certifications
              </h2>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold resume-text">AWS Solutions Architect</p>
                  <p className="text-xs resume-light-text">2023</p>
                </div>
                <div>
                  <p className="font-semibold resume-text">Google Cloud Professional</p>
                  <p className="text-xs resume-light-text">2022</p>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="p-5 bg-gradient-to-br from-white to-primary/5 rounded-xl border border-primary/10">
              <h2 className="section-title mb-4">Education</h2>
              <div>
                <h3 className="font-semibold text-sm resume-text">BS Computer Science</h3>
                <p className="text-xs font-medium text-primary mt-1">UT Austin</p>
                <p className="text-xs resume-light-text">2013 - 2017</p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-span-2 space-y-6">
            {/* Experience */}
            <div>
              <h2 className="section-title mb-6 text-2xl">Experience</h2>
              <div className="space-y-6">
                <div className="p-5 bg-white/80 backdrop-blur rounded-xl border-l-4 border-primary shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-lg resume-section">Senior Full Stack Developer</h3>
                      <p className="text-sm font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        CloudTech Solutions
                      </p>
                    </div>
                    <span className="text-xs resume-light-text px-3 py-1 bg-primary/10 rounded-full">2021 - Present</span>
                  </div>
                  <ul className="space-y-1.5 text-sm resume-text">
                    <li>• Architected microservices infrastructure serving 1M+ daily users</li>
                    <li>• Led team of 8 developers in agile environment</li>
                    <li>• Reduced API latency by 65% through optimization</li>
                    <li>• Implemented comprehensive testing suite (95% coverage)</li>
                  </ul>
                </div>

                <div className="p-5 bg-white/80 backdrop-blur rounded-xl border-l-4 border-accent shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-lg resume-section">Full Stack Developer</h3>
                      <p className="text-sm font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        Innovation Labs
                      </p>
                    </div>
                    <span className="text-xs resume-light-text px-3 py-1 bg-accent/10 rounded-full">2019 - 2021</span>
                  </div>
                  <ul className="space-y-1.5 text-sm resume-text">
                    <li>• Developed real-time collaboration platform using WebSockets</li>
                    <li>• Built responsive SPAs with React and modern tooling</li>
                    <li>• Integrated third-party APIs and payment systems</li>
                    <li>• Mentored 3 junior developers</li>
                  </ul>
                </div>

                <div className="p-5 bg-white/80 backdrop-blur rounded-xl border-l-4 border-primary shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-lg resume-section">Software Developer</h3>
                      <p className="text-sm font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        Tech Startup Inc
                      </p>
                    </div>
                    <span className="text-xs resume-light-text px-3 py-1 bg-primary/10 rounded-full">2017 - 2019</span>
                  </div>
                  <ul className="space-y-1.5 text-sm resume-text">
                    <li>• Built RESTful APIs using Node.js and Express</li>
                    <li>• Implemented user authentication and authorization</li>
                    <li>• Participated in code reviews and pair programming</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Projects Highlight */}
            <div className="p-6 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 rounded-2xl border border-primary/20">
              <h2 className="section-title mb-4 text-xl">Notable Projects</h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <h3 className="font-bold resume-section mb-1">E-Commerce Platform</h3>
                  <p className="resume-text text-xs">Full-stack marketplace with 50K+ users</p>
                </div>
                <div>
                  <h3 className="font-bold resume-section mb-1">Analytics Dashboard</h3>
                  <p className="resume-text text-xs">Real-time data visualization system</p>
                </div>
                <div>
                  <h3 className="font-bold resume-section mb-1">Mobile App API</h3>
                  <p className="resume-text text-xs">Backend for iOS/Android application</p>
                </div>
                <div>
                  <h3 className="font-bold resume-section mb-1">DevOps Pipeline</h3>
                  <p className="resume-text text-xs">Automated deployment infrastructure</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradientWave;
