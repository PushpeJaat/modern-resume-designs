import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Upload, Eye, Download, Palette, Lock } from "lucide-react";

const features = [
  { icon: Upload, title: "AI-Powered Import", description: "Upload any PDF — our AI extracts all your details automatically in seconds" },
  { icon: Sparkles, title: "7+ Stunning Templates", description: "From bold creative to executive classic, each template is professionally designed" },
  { icon: Eye, title: "Real-Time Editor", description: "Edit every section and watch your resume update live — no guesswork" },
  { icon: Download, title: "Pixel-Perfect PDF", description: "Download a high-fidelity PDF that matches the preview exactly, every time" },
  { icon: Palette, title: "Unique Designs", description: "Gradient waves, geometric patterns, dark sidebars — stand out from generic resumes" },
  { icon: Lock, title: "No Forced Sign-Up", description: "Browse and build freely. Only sign in when you're ready to download" },
];

const FeaturesSection = () => (
  <section className="py-20 sm:py-28 bg-background">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
      <div className="text-center mb-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Features</p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
          Everything You Need to Land the Job
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          A complete toolkit to create, customize, and download professional resumes
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="group border border-border hover:border-primary/40 hover:shadow-lg transition-all duration-300 bg-card">
            <CardContent className="p-6 sm:p-8">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
