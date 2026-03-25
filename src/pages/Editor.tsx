import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Download, Plus, Trash2, Loader2 } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { ResumeData, ExperienceItem, EducationItem, SkillCategory } from "@/types/resume";
import ModernProfessional from "@/components/templates/ModernProfessional";
import CreativeMinimal from "@/components/templates/CreativeMinimal";
import ExecutiveClassic from "@/components/templates/ExecutiveClassic";
import GeometricModern from "@/components/templates/GeometricModern";
import GradientWave from "@/components/templates/GradientWave";
import DottedPattern from "@/components/templates/DottedPattern";
import DarkSidebar from "@/components/templates/DarkSidebar";

const templates: Record<string, React.ComponentType<{ data?: ResumeData }>> = {
  "modern-professional": ModernProfessional,
  "creative-minimal": CreativeMinimal,
  "executive-classic": ExecutiveClassic,
  "geometric-modern": GeometricModern,
  "gradient-wave": GradientWave,
  "dotted-pattern": DottedPattern,
  "dark-sidebar": DarkSidebar,
};

const defaultPlaceholderData: ResumeData = {
  personalInfo: {
    name: "John Anderson",
    title: "Senior Software Engineer",
    email: "john.anderson@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/johnanderson",
    website: "johnanderson.dev",
    github: "github.com/johnanderson",
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

const Editor = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const templateId = searchParams.get("template") || "modern-professional";
  const [resumeData, setResumeData] = useState<ResumeData>(defaultPlaceholderData);

  // Check for uploaded resume data on mount
  useEffect(() => {
    const savedResumeData = localStorage.getItem("resumeData");
    if (savedResumeData) {
      try {
        const parsed = JSON.parse(savedResumeData);
        
        // If already in ResumeData format (has personalInfo), use directly
        if (parsed.personalInfo) {
          setResumeData(parsed as ResumeData);
          toast({
            title: "Resume data loaded",
            description: "Your uploaded resume information has been auto-filled.",
          });
          return;
        }
        
        // Legacy format mapping
        const mappedData: ResumeData = {
          personalInfo: {
            name: parsed.name || defaultPlaceholderData.personalInfo.name,
            title: parsed.title || defaultPlaceholderData.personalInfo.title,
            email: parsed.email || defaultPlaceholderData.personalInfo.email,
            phone: parsed.phone || defaultPlaceholderData.personalInfo.phone,
            location: parsed.location || defaultPlaceholderData.personalInfo.location,
            linkedin: parsed.linkedin || defaultPlaceholderData.personalInfo.linkedin,
            website: parsed.website || defaultPlaceholderData.personalInfo.website,
            github: parsed.github || defaultPlaceholderData.personalInfo.github,
          },
          summary: parsed.summary || defaultPlaceholderData.summary,
          experience: parsed.experience?.map((exp: any, idx: number) => ({
            id: exp.id || String(idx + 1),
            company: exp.company || "",
            position: exp.title || exp.position || "",
            startDate: exp.startDate || exp.duration?.split(" - ")[0] || "",
            endDate: exp.endDate || exp.duration?.split(" - ")[1] || "",
            current: exp.current || exp.endDate === "Present",
            responsibilities: Array.isArray(exp.responsibilities) 
              ? exp.responsibilities 
              : exp.description 
                ? [exp.description] 
                : [""],
          })) || defaultPlaceholderData.experience,
          education: parsed.education?.map((edu: any, idx: number) => ({
            id: edu.id || String(idx + 1),
            institution: edu.institution || "",
            degree: edu.degree?.split(" in ")[0] || edu.degree || "",
            field: edu.degree?.split(" in ")[1] || edu.field || "",
            startDate: edu.startDate || "",
            endDate: edu.endDate || edu.year || "",
          })) || defaultPlaceholderData.education,
          skills: parsed.skills 
            ? [{ category: "Skills", skills: Array.isArray(parsed.skills) ? parsed.skills : [] }]
            : defaultPlaceholderData.skills,
        };
        
        setResumeData(mappedData);
        toast({
          title: "Resume data loaded",
          description: "Your uploaded resume information has been auto-filled.",
        });
      } catch (error) {
        console.error("Error parsing resume data:", error);
      }
    }
  }, [toast]);

  const TemplateComponent = templates[templateId];

  const updatePersonalInfo = (field: string, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
  };

  const addExperience = () => {
    const newExp: ExperienceItem = {
      id: Date.now().toString(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      responsibilities: [""],
    };
    setResumeData((prev) => ({
      ...prev,
      experience: [...prev.experience, newExp],
    }));
  };

  const updateExperience = (id: string, field: string, value: any) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }));
  };

  const addEducation = () => {
    const newEdu: EducationItem = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
    };
    setResumeData((prev) => ({
      ...prev,
      education: [...prev.education, newEdu],
    }));
  };

  const updateEducation = (id: string, field: string, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  const addSkillCategory = () => {
    const newCategory: SkillCategory = {
      category: "",
      skills: [""],
    };
    setResumeData((prev) => ({
      ...prev,
      skills: [...prev.skills, newCategory],
    }));
  };

  const updateSkillCategory = (index: number, field: string, value: any) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.map((skill, i) =>
        i === index ? { ...skill, [field]: value } : skill
      ),
    }));
  };

  const removeSkillCategory = (index: number) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const resumeRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const handleDownloadPDF = async () => {
    if (!resumeRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        width: 794,
        height: resumeRef.current.scrollHeight,
        windowWidth: 794,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = pdfWidth / imgWidth;
      const scaledHeight = imgHeight * ratio;

      let position = 0;
      while (position < scaledHeight) {
        if (position > 0) pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, -position, pdfWidth, scaledHeight);
        position += pdfHeight;
      }

      const name = resumeData.personalInfo.name || "resume";
      pdf.save(`${name.replace(/\s+/g, "_")}_resume.pdf`);
      toast({ title: "PDF downloaded successfully!" });
    } catch (err) {
      console.error(err);
      toast({ title: "Download failed", description: "Please try again.", variant: "destructive" });
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/templates")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Templates
          </Button>
          <Button className="gap-2" onClick={handleDownloadPDF} disabled={downloading}>
            {downloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            {downloading ? "Generating..." : "Download PDF"}
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          {/* Form Section - 40% */}
          <div className="w-full lg:w-[38%] flex-shrink-0">
            <Card className="p-4 lg:p-5">
              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid w-full grid-cols-4 text-xs">
                  <TabsTrigger value="personal" className="text-xs px-1">Personal</TabsTrigger>
                  <TabsTrigger value="experience" className="text-xs px-1">Experience</TabsTrigger>
                  <TabsTrigger value="education" className="text-xs px-1">Education</TabsTrigger>
                  <TabsTrigger value="skills" className="text-xs px-1">Skills</TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="space-y-3 mt-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label htmlFor="name" className="text-xs">Full Name</Label>
                      <Input
                        id="name"
                        value={resumeData.personalInfo.name}
                        onChange={(e) => updatePersonalInfo("name", e.target.value)}
                        placeholder="John Doe"
                        className="h-8 text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="title" className="text-xs">Job Title</Label>
                      <Input
                        id="title"
                        value={resumeData.personalInfo.title}
                        onChange={(e) => updatePersonalInfo("title", e.target.value)}
                        placeholder="Software Engineer"
                        className="h-8 text-sm"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label htmlFor="email" className="text-xs">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={resumeData.personalInfo.email}
                        onChange={(e) => updatePersonalInfo("email", e.target.value)}
                        placeholder="john@example.com"
                        className="h-8 text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="phone" className="text-xs">Phone</Label>
                      <Input
                        id="phone"
                        value={resumeData.personalInfo.phone}
                        onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                        placeholder="+1 (555) 123-4567"
                        className="h-8 text-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="location" className="text-xs">Location</Label>
                    <Input
                      id="location"
                      value={resumeData.personalInfo.location}
                      onChange={(e) => updatePersonalInfo("location", e.target.value)}
                      placeholder="San Francisco, CA"
                      className="h-8 text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label htmlFor="linkedin" className="text-xs">LinkedIn</Label>
                      <Input
                        id="linkedin"
                        value={resumeData.personalInfo.linkedin}
                        onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
                        placeholder="linkedin.com/in/johndoe"
                        className="h-8 text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="website" className="text-xs">Website</Label>
                      <Input
                        id="website"
                        value={resumeData.personalInfo.website}
                        onChange={(e) => updatePersonalInfo("website", e.target.value)}
                        placeholder="johndoe.com"
                        className="h-8 text-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="summary" className="text-xs">Professional Summary</Label>
                    <Textarea
                      id="summary"
                      value={resumeData.summary}
                      onChange={(e) => setResumeData((prev) => ({ ...prev, summary: e.target.value }))}
                      placeholder="Brief professional summary..."
                      rows={3}
                      className="text-sm"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="experience" className="space-y-3 mt-3">
                  <div className="max-h-[60vh] overflow-y-auto space-y-3 pr-1">
                    {resumeData.experience.map((exp) => (
                      <Card key={exp.id} className="p-3 space-y-3 relative">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeExperience(exp.id)}
                          className="absolute top-1 right-1 h-7 w-7 p-0"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <Label className="text-xs">Company</Label>
                            <Input
                              value={exp.company}
                              onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                              placeholder="Company Name"
                              className="h-8 text-sm"
                            />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs">Position</Label>
                            <Input
                              value={exp.position}
                              onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                              placeholder="Job Title"
                              className="h-8 text-sm"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <Label className="text-xs">Start Date</Label>
                            <Input
                              value={exp.startDate}
                              onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                              placeholder="Jan 2020"
                              className="h-8 text-sm"
                            />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs">End Date</Label>
                            <Input
                              value={exp.endDate}
                              onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                              placeholder="Present"
                              className="h-8 text-sm"
                            />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Responsibilities</Label>
                          <Textarea
                            value={exp.responsibilities.join("\n")}
                            onChange={(e) => updateExperience(exp.id, "responsibilities", e.target.value.split("\n"))}
                            placeholder="One responsibility per line..."
                            rows={2}
                            className="text-sm"
                          />
                        </div>
                      </Card>
                    ))}
                  </div>
                  <Button onClick={addExperience} className="w-full gap-2 h-8 text-sm">
                    <Plus className="w-3 h-3" />
                    Add Experience
                  </Button>
                </TabsContent>

                <TabsContent value="education" className="space-y-3 mt-3">
                  <div className="max-h-[60vh] overflow-y-auto space-y-3 pr-1">
                    {resumeData.education.map((edu) => (
                      <Card key={edu.id} className="p-3 space-y-3 relative">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeEducation(edu.id)}
                          className="absolute top-1 right-1 h-7 w-7 p-0"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                        <div className="space-y-1">
                          <Label className="text-xs">Institution</Label>
                          <Input
                            value={edu.institution}
                            onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                            placeholder="University Name"
                            className="h-8 text-sm"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <Label className="text-xs">Degree</Label>
                            <Input
                              value={edu.degree}
                              onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                              placeholder="Bachelor's"
                              className="h-8 text-sm"
                            />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs">Field</Label>
                            <Input
                              value={edu.field}
                              onChange={(e) => updateEducation(edu.id, "field", e.target.value)}
                              placeholder="Computer Science"
                              className="h-8 text-sm"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <Label className="text-xs">Start Date</Label>
                            <Input
                              value={edu.startDate}
                              onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                              placeholder="2016"
                              className="h-8 text-sm"
                            />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs">End Date</Label>
                            <Input
                              value={edu.endDate}
                              onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
                              placeholder="2020"
                              className="h-8 text-sm"
                            />
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                  <Button onClick={addEducation} className="w-full gap-2 h-8 text-sm">
                    <Plus className="w-3 h-3" />
                    Add Education
                  </Button>
                </TabsContent>

                <TabsContent value="skills" className="space-y-3 mt-3">
                  <div className="max-h-[60vh] overflow-y-auto space-y-3 pr-1">
                    {resumeData.skills.map((skillCat, index) => (
                      <Card key={index} className="p-3 space-y-3 relative">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSkillCategory(index)}
                          className="absolute top-1 right-1 h-7 w-7 p-0"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                        <div className="space-y-1">
                          <Label className="text-xs">Category</Label>
                          <Input
                            value={skillCat.category}
                            onChange={(e) => updateSkillCategory(index, "category", e.target.value)}
                            placeholder="e.g., Programming Languages"
                            className="h-8 text-sm"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Skills</Label>
                          <Textarea
                            value={skillCat.skills.join(", ")}
                            onChange={(e) => updateSkillCategory(index, "skills", e.target.value.split(",").map(s => s.trim()))}
                            placeholder="Skill 1, Skill 2, Skill 3..."
                            rows={2}
                            className="text-sm"
                          />
                        </div>
                      </Card>
                    ))}
                  </div>
                  <Button onClick={addSkillCategory} className="w-full gap-2 h-8 text-sm">
                    <Plus className="w-3 h-3" />
                    Add Skill Category
                  </Button>
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          {/* Preview Section - 60% */}
          <div className="w-full lg:w-[62%] lg:sticky lg:top-6 h-fit">
            <Card className="p-3 lg:p-4 bg-muted/30">
              <div className="mb-3">
                <h3 className="font-bold text-sm">Live Preview</h3>
                <p className="text-xs text-muted-foreground">
                  See your changes in real-time
                </p>
              </div>
              <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
                <div className="overflow-y-auto max-h-[75vh]">
                  <div 
                    className="origin-top-left"
                    style={{
                      width: '794px',
                      transform: 'scale(var(--preview-scale))',
                      transformOrigin: 'top left',
                    }}
                    ref={(el) => {
                      if (el) {
                        const updateScale = () => {
                          const parent = el.parentElement;
                          if (parent) {
                            const scale = parent.clientWidth / 794;
                            el.style.setProperty('--preview-scale', String(Math.min(scale, 1)));
                            el.parentElement!.style.height = `${el.scrollHeight * Math.min(scale, 1)}px`;
                          }
                        };
                        updateScale();
                        const observer = new ResizeObserver(updateScale);
                        observer.observe(el.parentElement!);
                      }
                    }}
                  >
                    <div ref={resumeRef}>
                      {TemplateComponent && <TemplateComponent data={resumeData} />}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
