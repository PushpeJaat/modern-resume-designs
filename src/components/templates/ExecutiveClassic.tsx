import { Mail, Phone, MapPin, Linkedin, Award } from "lucide-react";

const ExecutiveClassic = () => {
  return (
    <div className="w-full bg-white overflow-hidden">
      <div className="p-14">
        {/* Header */}
        <div className="text-center mb-10 pb-8 border-b-2 border-resume-border">
          <h1 className="text-5xl font-bold text-resume-section mb-3 tracking-tight">Michael Roberts</h1>
          <p className="text-xl text-resume-light mb-4 font-light">Chief Technology Officer</p>
          <div className="flex justify-center flex-wrap gap-6 text-sm resume-text">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              <span>michael.roberts@executive.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary" />
              <span>+1 (555) 246-8135</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span>Boston, MA</span>
            </div>
            <div className="flex items-center gap-2">
              <Linkedin className="w-4 h-4 text-primary" />
              <span>michaelroberts</span>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-resume-section mb-4 uppercase tracking-wide">Executive Summary</h2>
          <p className="text-sm resume-text leading-relaxed">
            Visionary technology executive with 15+ years of experience leading digital transformation initiatives 
            and building high-performing engineering teams. Proven track record of driving innovation, scaling 
            infrastructure, and delivering enterprise solutions for Fortune 500 companies. Strategic thinker with 
            expertise in cloud architecture, AI/ML integration, and agile methodologies.
          </p>
        </div>

        {/* Professional Experience */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-resume-section mb-6 uppercase tracking-wide">Professional Experience</h2>
          <div className="space-y-8">
            <div>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-xl font-bold text-resume-section">Chief Technology Officer</h3>
                  <p className="text-base font-semibold text-primary mt-1">Enterprise Tech Solutions Inc.</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold resume-text">2020 - Present</p>
                  <p className="text-xs resume-light-text">Boston, MA</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm resume-text leading-relaxed">
                <li>• Spearheaded digital transformation strategy, resulting in $50M annual cost savings through cloud migration and infrastructure optimization</li>
                <li>• Built and scaled engineering organization from 50 to 200+ team members across 5 global offices</li>
                <li>• Led development of AI-powered analytics platform serving 5M+ enterprise users</li>
                <li>• Established DevOps culture and implemented CI/CD pipelines, reducing deployment time by 75%</li>
                <li>• Partnered with C-suite executives to align technology roadmap with business objectives</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-xl font-bold text-resume-section">Vice President of Engineering</h3>
                  <p className="text-base font-semibold text-primary mt-1">Global Innovations Corp</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold resume-text">2016 - 2020</p>
                  <p className="text-xs resume-light-text">San Francisco, CA</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm resume-text leading-relaxed">
                <li>• Directed engineering teams responsible for developing cloud-native SaaS platform with 99.99% uptime</li>
                <li>• Implemented microservices architecture supporting 10M+ daily active users</li>
                <li>• Reduced technical debt by 60% through strategic refactoring initiatives</li>
                <li>• Championed adoption of machine learning capabilities across product suite</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-xl font-bold text-resume-section">Director of Software Development</h3>
                  <p className="text-base font-semibold text-primary mt-1">TechVentures LLC</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold resume-text">2012 - 2016</p>
                  <p className="text-xs resume-light-text">New York, NY</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm resume-text leading-relaxed">
                <li>• Managed cross-functional teams of 30+ developers, designers, and QA engineers</li>
                <li>• Launched 5 successful products generating $25M in annual revenue</li>
                <li>• Introduced agile methodologies, improving team velocity by 40%</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Education & Certifications */}
        <div className="grid grid-cols-2 gap-10 mb-10">
          <div>
            <h2 className="text-2xl font-bold text-resume-section mb-4 uppercase tracking-wide">Education</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-base resume-section">Master of Business Administration (MBA)</h3>
                <p className="text-sm font-semibold text-primary mt-1">Harvard Business School</p>
                <p className="text-xs resume-light-text mt-1">2010 - 2012</p>
              </div>
              <div>
                <h3 className="font-bold text-base resume-section">MS Computer Science</h3>
                <p className="text-sm font-semibold text-primary mt-1">MIT</p>
                <p className="text-xs resume-light-text mt-1">2006 - 2008</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-resume-section mb-4 uppercase tracking-wide">Key Skills</h2>
            <div className="space-y-3 text-sm resume-text">
              <p><span className="font-semibold">Leadership:</span> Team Building, Strategic Planning, Change Management</p>
              <p><span className="font-semibold">Technical:</span> Cloud Architecture (AWS, Azure), AI/ML, Microservices</p>
              <p><span className="font-semibold">Business:</span> P&L Management, Vendor Relations, Budget Planning</p>
            </div>
          </div>
        </div>

        {/* Awards */}
        <div>
          <h2 className="text-2xl font-bold text-resume-section mb-4 uppercase tracking-wide flex items-center gap-3">
            <Award className="w-6 h-6 text-primary" />
            Awards & Recognition
          </h2>
          <div className="grid grid-cols-2 gap-4 text-sm resume-text">
            <p>• CTO of the Year - Tech Excellence Awards (2023)</p>
            <p>• Innovation Leadership Award - Forbes (2021)</p>
            <p>• Top 100 Tech Leaders - CIO Magazine (2020)</p>
            <p>• Patent Holder - AI Optimization System (2019)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveClassic;
