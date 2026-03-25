import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";
import { ArrowRight, Zap } from "lucide-react";

const CTASection = () => (
  <section className="py-20 sm:py-28 bg-background">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
      <div className="relative rounded-3xl bg-gradient-to-br from-primary to-primary/80 p-10 sm:p-16 text-center overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-primary-foreground">
            <Zap className="h-3.5 w-3.5" />
            No credit card required
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-foreground tracking-tight">
            Ready to Build Your Resume?
          </h2>

          <p className="text-lg text-primary-foreground/80 max-w-xl mx-auto">
            Upload your PDF, pick a template, and download a polished resume — all in under 5 minutes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button size="lg" variant="secondary" asChild className="h-13 px-8 text-base font-semibold shadow-lg">
              <NavLink to="/templates">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </NavLink>
            </Button>
            <Button size="lg" variant="ghost" asChild className="h-13 px-8 text-base font-semibold text-primary-foreground hover:bg-white/10 border border-white/20">
              <NavLink to="/pricing">View Pricing</NavLink>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CTASection;
