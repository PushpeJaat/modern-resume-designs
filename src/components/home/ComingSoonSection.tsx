import { Sparkles, BarChart3, Brain, FileCheck } from "lucide-react";

const upcoming = [
  { icon: BarChart3, title: "ATS Score Checker", description: "Get instant feedback on how ATS-friendly your resume is" },
  { icon: Brain, title: "AI Content Writer", description: "Generate professional bullet points tailored to your role" },
  { icon: FileCheck, title: "Cover Letter Generator", description: "Create matching cover letters with a single click" },
];

const ComingSoonSection = () => (
  <section className="py-20 sm:py-28 bg-muted/30 border-y border-border">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent mb-4">
          <Sparkles className="h-3.5 w-3.5" />
          Coming Soon
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          More Power, Coming Soon
        </h2>
        <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
          We're building AI-powered tools to make your resume even stronger
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {upcoming.map((item, i) => (
          <div key={i} className="rounded-xl border border-dashed border-border bg-card/50 p-6 sm:p-8 text-center opacity-80">
            <div className="mx-auto h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
              <item.icon className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-bold text-base mb-2">{item.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ComingSoonSection;
