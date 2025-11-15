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
  ArrowRight
} from "lucide-react";

const Home = () => {
  const features = [
    {
      icon: Sparkles,
      title: "Modern Templates",
      description: "Choose from our collection of professionally designed resume templates"
    },
    {
      icon: Zap,
      title: "Quick & Easy",
      description: "Build your resume in minutes with our intuitive editor"
    },
    {
      icon: Download,
      title: "PDF Download",
      description: "Download your resume as a high-quality PDF file"
    },
    {
      icon: Shield,
      title: "One-Time Payment",
      description: "No subscriptions, no recurring charges, no credit card required"
    }
  ];

  const benefits = [
    "Professional templates designed by experts",
    "Instant PDF download after payment",
    "No monthly subscriptions or hidden fees",
    "ATS-friendly formats",
    "Multiple design styles to choose from",
    "Easy customization options"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b-2 border-border/50 bg-gradient-to-br from-background via-muted/30 to-background py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8 inline-flex items-center rounded-full border-2 border-primary/20 bg-muted px-4 py-2 text-sm shadow-lg">
              <Sparkles className="mr-2 h-4 w-4 text-primary animate-pulse" />
              <span className="text-muted-foreground font-medium">Professional Resume Builder</span>
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
              Create Your Perfect{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Resume
              </span>
              {" "}in Minutes
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Stand out from the crowd with our modern, professional resume templates. 
              One-time payment, no subscriptions, download instantly.
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
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mt-16">
              <div className="border-2 border-primary/20 rounded-lg p-4 bg-card">
                <div className="text-3xl font-bold text-primary mb-1">6+</div>
                <div className="text-sm text-muted-foreground">Templates</div>
              </div>
              <div className="border-2 border-accent/20 rounded-lg p-4 bg-card">
                <div className="text-3xl font-bold text-accent mb-1">$9.99</div>
                <div className="text-sm text-muted-foreground">One-Time</div>
              </div>
              <div className="border-2 border-primary/20 rounded-lg p-4 bg-card">
                <div className="text-3xl font-bold text-primary mb-1">PDF</div>
                <div className="text-sm text-muted-foreground">Instant Download</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] -z-10" />
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-32 bg-muted/50 border-b-2 border-border/50">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
      <section className="py-20 sm:py-32 border-b-2 border-border/50 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <Zap className="w-6 h-6 text-primary" />
              <h2 className="text-3xl sm:text-4xl font-bold">
                Simple 3-Step Process
              </h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get your professional resume in just three easy steps
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Connection lines */}
              <div className="hidden md:block absolute top-8 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary via-accent to-primary" style={{ top: '32px' }} />
              
              {[
                {
                  step: "01",
                  icon: FileText,
                  title: "Choose Template",
                  description: "Browse our collection of modern, professional templates"
                },
                {
                  step: "02",
                  icon: Shield,
                  title: "Make Payment",
                  description: "One-time payment, no subscriptions or recurring charges"
                },
                {
                  step: "03",
                  icon: Download,
                  title: "Download PDF",
                  description: "Instantly download your resume as a high-quality PDF"
                }
              ].map((item, index) => (
                <div key={index} className="text-center relative">
                  <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center mx-auto mb-4 relative z-10 bg-background">
                    <span className="text-2xl font-bold text-primary">{item.step}</span>
                  </div>
                  <div className="border-2 border-border/50 rounded-lg p-6 hover:border-primary/50 transition-colors bg-card">
                    <item.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 sm:py-32 bg-muted/50 border-b-2 border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                  <h2 className="text-3xl sm:text-4xl font-bold">
                    Everything You Need for Success
                  </h2>
                </div>
                <p className="text-lg text-muted-foreground mb-8">
                  Our resume builder provides all the tools and templates you need 
                  to create a professional resume that stands out to employers.
                </p>
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3 p-3 rounded-lg border border-border/50 bg-card/50 hover:border-primary/50 transition-colors">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative">
                <div className="aspect-[4/5] bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl p-8 flex items-center justify-center border-2 border-primary/20 shadow-2xl">
                  <FileText className="w-32 h-32 text-primary/40" />
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent rounded-full blur-2xl opacity-20" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary rounded-full blur-2xl opacity-20" />
                
                {/* Decorative corner badges */}
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
      <section className="py-20 sm:py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center border-2 border-primary/20 rounded-2xl p-12 bg-gradient-to-br from-primary/5 to-accent/5 relative">
            {/* Decorative icons */}
            <div className="absolute top-4 left-4 text-primary/20">
              <Sparkles className="w-12 h-12" />
            </div>
            <div className="absolute bottom-4 right-4 text-accent/20">
              <FileText className="w-12 h-12" />
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Build Your Resume?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of professionals who have created their perfect resume with us
            </p>
            <Button size="lg" asChild className="text-lg px-8 shadow-xl">
              <NavLink to="/templates">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </NavLink>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
