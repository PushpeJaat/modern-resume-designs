import { Users, Award, TrendingUp, Globe } from "lucide-react";

const stats = [
  { icon: Users, value: "10K+", label: "Resumes Created" },
  { icon: Award, value: "7+", label: "Pro Templates" },
  { icon: TrendingUp, value: "85%", label: "Interview Rate" },
  { icon: Globe, value: "50+", label: "Countries" },
];

const StatsBar = () => (
  <section className="border-y border-border bg-muted/30 py-12 sm:py-16">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, i) => (
          <div key={i} className="space-y-2">
            <stat.icon className="h-5 w-5 mx-auto text-primary" />
            <div className="text-3xl sm:text-4xl font-extrabold text-foreground">{stat.value}</div>
            <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsBar;
