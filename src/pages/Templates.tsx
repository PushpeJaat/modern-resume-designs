import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ModernProfessional from "@/components/templates/ModernProfessional";
import CreativeMinimal from "@/components/templates/CreativeMinimal";
import ExecutiveClassic from "@/components/templates/ExecutiveClassic";
import GeometricModern from "@/components/templates/GeometricModern";
import GradientWave from "@/components/templates/GradientWave";
import DottedPattern from "@/components/templates/DottedPattern";
import DarkSidebar from "@/components/templates/DarkSidebar";
import TemplateCard from "@/components/TemplateCard";
import ResumeUpload from "@/components/ResumeUpload";
import { ArrowLeft, Download, Edit } from "lucide-react";
import { ResumeData } from "@/types/resume";

const templateList = [
  { id: "modern-professional", title: "Modern Professional", description: "Clean two-column layout with blue accents. Perfect for tech and corporate roles.", component: ModernProfessional },
  { id: "creative-minimal", title: "Creative Minimal", description: "Bold typography with timeline design. Ideal for designers and creative professionals.", component: CreativeMinimal },
  { id: "executive-classic", title: "Executive Classic", description: "Sophisticated single-column format. Best for senior leadership and C-level positions.", component: ExecutiveClassic },
  { id: "geometric-modern", title: "Geometric Modern", description: "Dynamic geometric patterns with gradient accents. Stand out with modern design.", component: GeometricModern },
  { id: "gradient-wave", title: "Gradient Wave", description: "Flowing wave backgrounds with soft gradients. Perfect for tech and creative fields.", component: GradientWave },
  { id: "dotted-pattern", title: "Dotted Pattern", description: "Sophisticated dot matrix with corner accents. Professional yet distinctive.", component: DottedPattern },
  { id: "dark-sidebar", title: "Dark Sidebar", description: "Dark navy sidebar with skill bars and clean right panel. Great for tech roles.", component: DarkSidebar },
];

const Templates = () => {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [uploadedData, setUploadedData] = useState<ResumeData | null>(null);

  // Load any previously uploaded data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("resumeData");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Check if it's in ResumeData format (has personalInfo)
        if (parsed.personalInfo) {
          setUploadedData(parsed);
        }
      } catch {}
    }
  }, []);

  const handleDataExtracted = (data: ResumeData) => {
    setUploadedData(data || null);
  };

  const handlePreview = (templateId: string) => {
    setSelectedTemplate(templateId);
    setIsDialogOpen(true);
  };

  const selected = templateList.find(t => t.id === selectedTemplate);
  const SelectedComponent = selected?.component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background py-12">
      <main className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Choose Your Perfect Resume
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Professional, modern templates designed to help you stand out.
              {uploadedData ? " Your resume data is applied to all templates below." : " Upload your resume to see your data in every template."}
            </p>
          </div>

          {/* Upload */}
          <div className="mb-12 animate-fade-in">
            <ResumeUpload onDataExtracted={handleDataExtracted} />
          </div>

          {/* Templates Grid */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">
              {uploadedData ? "Your Resume in Different Templates" : "Available Templates"}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templateList.map((template) => {
              const Comp = template.component;
              return (
                <div key={template.id} className="animate-fade-in">
                  <TemplateCard
                    title={template.title}
                    description={template.description}
                    onPreview={() => handlePreview(template.id)}
                    livePreview={<Comp data={uploadedData || undefined} />}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Preview Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-[95vw] max-w-4xl max-h-[95vh] overflow-hidden flex flex-col p-3 sm:p-6">
          <DialogHeader className="border-b pb-3">
            <div className="flex items-center justify-between gap-2">
              <DialogTitle className="flex items-center gap-2 min-w-0">
                <Button variant="ghost" size="sm" onClick={() => setIsDialogOpen(false)} className="hover:bg-primary/10 shrink-0 h-8 w-8 p-0">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <span className="text-base sm:text-xl font-bold truncate">{selected?.title}</span>
              </DialogTitle>
              <div className="flex gap-1.5 shrink-0">
                <Button variant="outline" size="sm" className="gap-1.5 text-xs sm:text-sm h-8" onClick={() => { setIsDialogOpen(false); navigate(`/editor?template=${selectedTemplate}`); }}>
                  <Edit className="w-3.5 h-3.5" /><span className="hidden sm:inline">Customize</span>
                </Button>
                <Button size="sm" className="gap-1.5 text-xs sm:text-sm h-8" onClick={() => navigate(`/editor?template=${selectedTemplate}`)}>
                  <Download className="w-3.5 h-3.5" /><span className="hidden sm:inline">Use Template</span><span className="sm:hidden">Use</span>
                </Button>
              </div>
            </div>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto mt-3 bg-muted/30 p-2 sm:p-6 rounded-lg border border-border">
            <div className="mx-auto bg-white shadow-2xl rounded-lg overflow-hidden"
              ref={(el) => {
                if (!el) return;
                const inner = el.querySelector('[data-preview-inner]') as HTMLElement;
                if (!inner) return;
                const updateScale = () => {
                  const parentW = el.clientWidth;
                  const scale = Math.min(parentW / 794, 1);
                  inner.style.transform = `scale(${scale})`;
                  inner.style.transformOrigin = 'top left';
                  el.style.height = `${inner.scrollHeight * scale}px`;
                };
                updateScale();
                const obs = new ResizeObserver(updateScale);
                obs.observe(el);
              }}
            >
              <div data-preview-inner style={{ width: 794 }}>
                {SelectedComponent && <SelectedComponent data={uploadedData || undefined} />}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Templates;
