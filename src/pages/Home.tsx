import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { NavLink } from "@/components/NavLink";
import { 
  FileText, 
  Download, 
  Sparkles, 
  Shield, 
  Zap,
  CheckCircle2,
  ArrowRight,
  Star,
  Users,
  Palette,
  Upload,
  Eye,
  Lock
} from "lucide-react";

const Home = () => {
  const features = [
    {
      icon: Sparkles,
      title: "Modern Templates",
      description: "7+ professionally designed templates — from bold creative to executive classic"
    },
    {
      icon: Upload,
      title: "AI-Powered Import",
      description: "Upload your existing PDF and our AI extracts all the details automatically"
    },
    {
      icon: Eye,
      title: "Live Preview Editor",
      description: "Edit every section and see your changes reflected instantly in real-time"
    },
    {
      icon: Download,
      title: "Pixel-Perfect PDF",
      description: "Download a high-fidelity PDF that matches the preview exactly"
    },
    {
      icon: Palette,
      title: "Unique Designs",
      description: "Gradient waves, geometric patterns, dark sidebars — stand out from the crowd"
    },
    {
      icon: Lock,
      title: "No Account Needed",
      description: "Start building immediately — no sign-up, no subscriptions, no hidden fees"
    }
  ];

  const benefits = [
    "Professional templates designed by experts",
    "AI resume parser — upload any PDF",
    "Instant live preview as you type",
    "ATS-friendly formats that pass screening",
    "Multi-page support with perfect pagination",
    "One-time payment, download forever"
  ];

  const testimonials = [
    {
      name: "Sarah K.",
      role: "Product Manager",
      text: "The Gradient Wave template helped me land interviews at 3 top tech companies. The AI import saved me hours!",
      stars: 5,
    },
    {
      name: "Marcus T.",
      role: "Software Engineer",
      text: "Finally, a resume builder that doesn't look like every other template on the internet. The designs are genuinely unique.",
      stars: 5,
    },
    {
      name: "Elena R.",
      role: "UX Designer",
      text: "The live editor is incredibly intuitive. I went from PDF upload to polished resume in under 10 minutes.",
      stars: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b-2 border-border/50 bg-gradient-to-br from-background via-muted/30 to-background py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8 inline-flex items-center rounded-full border-2 border-primary/20 bg-muted px-4 py-2 text-sm shadow-lg">
              <Sparkles className="mr-2 h-4 w-4 text-primary animate-pulse" />
              <span className="text-muted-foreground font-medium">AI-Powered Resume Builder</span>
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
              Build a Resume That{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Actually Gets Noticed
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground mb-4 max-w-2xl mx-auto">
              Upload your existing resume and our AI extracts every detail. Pick a stunning template, 
              fine-tune in the live editor, and download a pixel-perfect PDF — all in minutes.
            </p>

            <p className="text-sm text-muted-foreground/70 mb-8 max-w-xl mx-auto">
              No sign-up required. No subscriptions. Just a beautiful resume.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" asChild className="text-lg px-8 shadow-lg">
                <NavLink to="/templates">
                  Browse Templates
                  <ArrowRight className="ml-2 h-5 w-5" />
                </NavLink>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8 border-2">
                <NavLink to="/pricing">View Pricing</NavLink>
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 max-w-3xl mx-auto mt-16">
              <div className="border-2 border-primary/20 rounded-lg p-4 bg-card">
                <div className="text-3xl font-bold text-primary mb-1">7+</div>
                <div className="text-sm text-muted-foreground">Unique Templates</div>
              </div>
              <div className="border-2 border-accent/20 rounded-lg p-4 bg-card">
                <div className="text-3xl font-bold text-accent mb-1">AI</div>
                <div className="text-sm text-muted-foreground">PDF Import</div>
              </div>
              <div className="border-2 border-primary/20 rounded-lg p-4 bg-card">
                <div className="text-3xl font-bold text-primary mb-1">$9.99</div>
                <div className="text-sm text-muted-foreground">One-Time</div>
              </div>
              <div className="border-2 border-accent/20 rounded-lg p-4 bg-card">
                <div className="text-3xl font-bold text-accent mb-1">
                  <Download className="w-7 h-7 mx-auto" />
                </div>
                <div className="text-sm text-muted-foreground">Instant PDF</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] -z-10" />
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-28 bg-muted/50 border-b-2 border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-primary" />
              <h2 className="text-3xl sm:text-4xl font-bold">
                Why Choose ResumeBuilder?
              </h2>
              <Sparkles className="w-6 h-6 text-accent" />
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to create a professional resume that gets noticed
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 hover:border-primary hover:shadow-xl transition-all duration-300 group">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 border-2 border-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 sm:py-28 border-b-2 border-border/50 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <Zap className="w-6 h-6 text-primary" />
              <h2 className="text-3xl sm:text-4xl font-bold">
                How It Works
              </h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From upload to download in just a few clicks
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
              <div className="hidden md:block absolute top-8 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-primary via-accent to-primary" style={{ top: '32px' }} />
              
              {[
                { step: "01", icon: Upload, title: "Upload PDF", description: "Upload your existing resume — our AI extracts all your info" },
                { step: "02", icon: Palette, title: "Pick a Template", description: "Choose from 7+ unique, professionally designed styles" },
                { step: "03", icon: Eye, title: "Edit Live", description: "Fine-tune every detail with instant live preview" },
                { step: "04", icon: Download, title: "Download PDF", description: "Get a pixel-perfect PDF — ready to send" },
              ].map((item, index) => (
                <div key={index} className="text-center relative">
                  <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center mx-auto mb-4 relative z-10 bg-background">
                    <span className="text-2xl font-bold text-primary">{item.step}</span>
                  </div>
                  <div className="border-2 border-border/50 rounded-lg p-5 hover:border-primary/50 transition-colors bg-card">
                    <item.icon className="w-7 h-7 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold text-base mb-2">{item.title}</h3>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 sm:py-28 bg-muted/50 border-b-2 border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <Users className="w-6 h-6 text-primary" />
              <h2 className="text-3xl sm:text-4xl font-bold">
                Loved by Professionals
              </h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See what our users have to say
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((t, index) => (
              <Card key={index} className="border-2 hover:shadow-lg transition-all">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.stars }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 italic">"{t.text}"</p>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 sm:py-28 border-b-2 border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                  <h2 className="text-3xl sm:text-4xl font-bold">
                    Everything You Need
                  </h2>
                </div>
                <p className="text-lg text-muted-foreground mb-8">
                  Our resume builder provides all the tools and templates you need 
                  to create a professional resume that stands out to employers.
                </p>
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3 p-3 rounded-lg border border-border/50 bg-card/50 hover:border-primary/50 transition-colors">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative">
                <div className="aspect-[4/5] bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl p-8 flex flex-col items-center justify-center border-2 border-primary/20 shadow-2xl gap-6">
                  <FileText className="w-24 h-24 text-primary/30" />
                  <div className="text-center space-y-2">
                    <p className="text-lg font-semibold text-foreground/60">Your Next Resume</p>
                    <p className="text-sm text-muted-foreground">Starts here — pick a template and go</p>
                  </div>
                  <Button asChild size="sm" variant="outline" className="border-primary/30">
                    <NavLink to="/templates">
                      Get Started <ArrowRight className="ml-1 h-4 w-4" />
                    </NavLink>
                  </Button>
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent rounded-full blur-2xl opacity-20" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary rounded-full blur-2xl opacity-20" />
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground rounded-full p-2 border-2 border-background shadow-lg">
                  <Download className="w-4 h-4" />
                </div>
                <div className="absolute bottom-4 left-4 bg-accent text-accent-foreground rounded-full p-2 border-2 border-background shadow-lg">
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-28 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center border-2 border-primary/20 rounded-2xl p-12 bg-gradient-to-br from-primary/5 to-accent/5 relative">
            <div className="absolute top-4 left-4 text-primary/20">
              <Sparkles className="w-12 h-12" />
            </div>
            <div className="absolute bottom-4 right-4 text-accent/20">
              <FileText className="w-12 h-12" />
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Build Your Resume?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Upload your PDF, pick a template, and download a polished resume — 
              it only takes a few minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="text-lg px-8 shadow-xl">
                <NavLink to="/templates">
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </NavLink>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8 border-2">
                <NavLink to="/pricing">See Pricing</NavLink>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
