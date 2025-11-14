import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ModernProfessional from "@/components/templates/ModernProfessional";
import CreativeMinimal from "@/components/templates/CreativeMinimal";
import ExecutiveClassic from "@/components/templates/ExecutiveClassic";
import GeometricModern from "@/components/templates/GeometricModern";
import GradientWave from "@/components/templates/GradientWave";
import DottedPattern from "@/components/templates/DottedPattern";
import TemplateCard from "@/components/TemplateCard";
import { FileText, ArrowLeft } from "lucide-react";

const templates = [
  {
    id: "modern-professional",
    title: "Modern Professional",
    description: "Clean two-column layout with blue accents. Perfect for tech and corporate roles.",
    component: ModernProfessional,
    preview: "/placeholder.svg"
  },
  {
    id: "creative-minimal",
    title: "Creative Minimal",
    description: "Bold typography with timeline design. Ideal for designers and creative professionals.",
    component: CreativeMinimal,
    preview: "/placeholder.svg"
  },
  {
    id: "executive-classic",
    title: "Executive Classic",
    description: "Sophisticated single-column format. Best for senior leadership and C-level positions.",
    component: ExecutiveClassic,
    preview: "/placeholder.svg"
  },
  {
    id: "geometric-modern",
    title: "Geometric Modern",
    description: "Dynamic geometric patterns with gradient accents. Stand out with modern design.",
    component: GeometricModern,
    preview: "/placeholder.svg"
  },
  {
    id: "gradient-wave",
    title: "Gradient Wave",
    description: "Flowing wave backgrounds with soft gradients. Perfect for tech and creative fields.",
    component: GradientWave,
    preview: "/placeholder.svg"
  },
  {
    id: "dotted-pattern",
    title: "Dotted Pattern",
    description: "Sophisticated dot matrix with corner accents. Professional yet distinctive.",
    component: DottedPattern,
    preview: "/placeholder.svg"
  }
];

const Index = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handlePreview = (templateId: string) => {
    setSelectedTemplate(templateId);
    setIsDialogOpen(true);
  };

  const SelectedComponent = selectedTemplate 
    ? templates.find(t => t.id === selectedTemplate)?.component 
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Resume Templates</h1>
                <p className="text-sm text-muted-foreground">Modern, professional designs</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Choose Your Perfect Resume
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Professional, modern templates designed to help you stand out. 
              Select a template that matches your style and career level.
            </p>
          </div>

          {/* Templates Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template) => (
              <div key={template.id} className="animate-fade-in">
                <TemplateCard
                  title={template.title}
                  description={template.description}
                  preview={template.preview}
                  onPreview={() => handlePreview(template.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Preview Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsDialogOpen(false)}
                className="mr-2"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              {templates.find(t => t.id === selectedTemplate)?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-6 bg-resume-bg p-8 rounded-lg">
            {SelectedComponent && <SelectedComponent />}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
