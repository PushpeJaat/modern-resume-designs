import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Download, Plus, Trash2 } from "lucide-react";
import { ResumeData, ExperienceItem, EducationItem, SkillCategory } from "@/types/resume";
import ModernProfessional from "@/components/templates/ModernProfessional";
import CreativeMinimal from "@/components/templates/CreativeMinimal";
import ExecutiveClassic from "@/components/templates/ExecutiveClassic";
import GeometricModern from "@/components/templates/GeometricModern";
import GradientWave from "@/components/templates/GradientWave";
import DottedPattern from "@/components/templates/DottedPattern";

const templates: Record<string, React.ComponentType<{ data?: ResumeData }>> = {
  "modern-professional": ModernProfessional,
  "creative-minimal": CreativeMinimal,
  "executive-classic": ExecutiveClassic,
  "geometric-modern": GeometricModern,
  "gradient-wave": GradientWave,
  "dotted-pattern": DottedPattern,
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
        // Map the uploaded resume data to our ResumeData format
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
        // Clear the localStorage after loading
        localStorage.removeItem("resumeData");
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
          <Button className="gap-2">
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Form Section */}
          <div className="space-y-4">
            <Card className="p-6">
              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="personal">Personal</TabsTrigger>
                  <TabsTrigger value="experience">Experience</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                  <TabsTrigger value="skills">Skills</TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={resumeData.personalInfo.name}
                        onChange={(e) => updatePersonalInfo("name", e.target.value)}
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="title">Job Title</Label>
                      <Input
                        id="title"
                        value={resumeData.personalInfo.title}
                        onChange={(e) => updatePersonalInfo("title", e.target.value)}
                        placeholder="Software Engineer"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={resumeData.personalInfo.email}
                        onChange={(e) => updatePersonalInfo("email", e.target.value)}
                        placeholder="john@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={resumeData.personalInfo.phone}
                        onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={resumeData.personalInfo.location}
                      onChange={(e) => updatePersonalInfo("location", e.target.value)}
                      placeholder="San Francisco, CA"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input
                        id="linkedin"
                        value={resumeData.personalInfo.linkedin}
                        onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
                        placeholder="linkedin.com/in/johndoe"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        value={resumeData.personalInfo.website}
                        onChange={(e) => updatePersonalInfo("website", e.target.value)}
                        placeholder="johndoe.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="summary">Professional Summary</Label>
                    <Textarea
                      id="summary"
                      value={resumeData.summary}
                      onChange={(e) => setResumeData((prev) => ({ ...prev, summary: e.target.value }))}
                      placeholder="Brief professional summary..."
                      rows={4}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="experience" className="space-y-4 mt-4">
                  {resumeData.experience.map((exp) => (
                    <Card key={exp.id} className="p-4 space-y-4 relative">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeExperience(exp.id)}
                        className="absolute top-2 right-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Company</Label>
                          <Input
                            value={exp.company}
                            onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                            placeholder="Company Name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Position</Label>
                          <Input
                            value={exp.position}
                            onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                            placeholder="Job Title"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Start Date</Label>
                          <Input
                            value={exp.startDate}
                            onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                            placeholder="Jan 2020"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>End Date</Label>
                          <Input
                            value={exp.endDate}
                            onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                            placeholder="Present"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Responsibilities</Label>
                        <Textarea
                          value={exp.responsibilities.join("\n")}
                          onChange={(e) => updateExperience(exp.id, "responsibilities", e.target.value.split("\n"))}
                          placeholder="One responsibility per line..."
                          rows={3}
                        />
                      </div>
                    </Card>
                  ))}
                  <Button onClick={addExperience} className="w-full gap-2">
                    <Plus className="w-4 h-4" />
                    Add Experience
                  </Button>
                </TabsContent>

                <TabsContent value="education" className="space-y-4 mt-4">
                  {resumeData.education.map((edu) => (
                    <Card key={edu.id} className="p-4 space-y-4 relative">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeEducation(edu.id)}
                        className="absolute top-2 right-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <div className="space-y-2">
                        <Label>Institution</Label>
                        <Input
                          value={edu.institution}
                          onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                          placeholder="University Name"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Degree</Label>
                          <Input
                            value={edu.degree}
                            onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                            placeholder="Bachelor's"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Field</Label>
                          <Input
                            value={edu.field}
                            onChange={(e) => updateEducation(edu.id, "field", e.target.value)}
                            placeholder="Computer Science"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Start Date</Label>
                          <Input
                            value={edu.startDate}
                            onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                            placeholder="2016"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>End Date</Label>
                          <Input
                            value={edu.endDate}
                            onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
                            placeholder="2020"
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
                  <Button onClick={addEducation} className="w-full gap-2">
                    <Plus className="w-4 h-4" />
                    Add Education
                  </Button>
                </TabsContent>

                <TabsContent value="skills" className="space-y-4 mt-4">
                  {resumeData.skills.map((skillCat, index) => (
                    <Card key={index} className="p-4 space-y-4 relative">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSkillCategory(index)}
                        className="absolute top-2 right-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <div className="space-y-2">
                        <Label>Category</Label>
                        <Input
                          value={skillCat.category}
                          onChange={(e) => updateSkillCategory(index, "category", e.target.value)}
                          placeholder="e.g., Programming Languages"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Skills</Label>
                        <Textarea
                          value={skillCat.skills.join(", ")}
                          onChange={(e) => updateSkillCategory(index, "skills", e.target.value.split(",").map(s => s.trim()))}
                          placeholder="Skill 1, Skill 2, Skill 3..."
                          rows={2}
                        />
                      </div>
                    </Card>
                  ))}
                  <Button onClick={addSkillCategory} className="w-full gap-2">
                    <Plus className="w-4 h-4" />
                    Add Skill Category
                  </Button>
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-6 h-fit">
            <Card className="p-6 bg-muted/30">
              <div className="mb-4">
                <h3 className="font-bold text-lg">Live Preview</h3>
                <p className="text-sm text-muted-foreground">
                  See your changes in real-time
                </p>
              </div>
              <div className="bg-white shadow-2xl rounded-lg overflow-hidden max-h-[800px] overflow-y-auto">
                <div className="transform scale-90 origin-top">
                  {TemplateComponent && <TemplateComponent data={resumeData} />}
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
