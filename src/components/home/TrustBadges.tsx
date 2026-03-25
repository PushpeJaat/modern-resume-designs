import { Shield, Clock, Layers, Globe } from "lucide-react";

const badges = [
  { icon: Shield, label: "Secure & Private", desc: "Your data stays yours" },
  { icon: Clock, label: "5-Minute Setup", desc: "Upload → Edit → Download" },
  { icon: Layers, label: "ATS Optimized", desc: "Passes screening systems" },
  { icon: Globe, label: "Works Everywhere", desc: "Any device, any browser" },
];

const TrustBadges = () => (
  <section className="py-16 sm:py-20 bg-muted/30 border-y border-border">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {badges.map((item, i) => (
          <div key={i} className="space-y-2">
            <div className="mx-auto h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <item.icon className="h-6 w-6 text-primary" />
            </div>
            <p className="font-semibold text-sm">{item.label}</p>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustBadges;
