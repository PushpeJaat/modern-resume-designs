import { Upload, Palette, Eye, Download } from "lucide-react";

const steps = [
  { step: "01", icon: Upload, title: "Upload PDF", description: "Upload your existing resume — our AI extracts all your info" },
  { step: "02", icon: Palette, title: "Pick Template", description: "Choose from 7+ unique, professionally designed styles" },
  { step: "03", icon: Eye, title: "Edit Live", description: "Fine-tune every detail with instant live preview" },
  { step: "04", icon: Download, title: "Download", description: "Get a pixel-perfect PDF ready to send" },
];

const HowItWorks = () => (
  <section className="py-20 sm:py-28 bg-muted/30 border-y border-border">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
      <div className="text-center mb-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">How It Works</p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
          From Upload to Download in Minutes
        </h2>
      </div>

      <div className="relative">
        {/* Connecting line — behind circles, only on md+ */}
        <div className="hidden md:block absolute top-8 left-[calc(12.5%+2rem)] right-[calc(12.5%+2rem)] h-px bg-gradient-to-r from-primary/40 via-accent/40 to-primary/40 z-0" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 sm:gap-6">
          {steps.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center relative">
              {/* Number circle */}
              <div className="relative z-10 h-16 w-16 rounded-full bg-background border-2 border-primary/30 flex items-center justify-center mb-6 shadow-md">
                <span className="text-xl font-extrabold text-primary">{item.step}</span>
              </div>
              {/* Content */}
              <div className="rounded-xl border border-border bg-card p-5 sm:p-6 hover:border-primary/40 hover:shadow-md transition-all w-full">
                <item.icon className="h-7 w-7 text-primary mx-auto mb-3" />
                <h3 className="font-bold text-base mb-1.5">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default HowItWorks;
