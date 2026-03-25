import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  { name: "Sarah K.", role: "Product Manager", text: "The Gradient Wave template helped me land interviews at 3 top tech companies. The AI import saved me hours of manual work!", avatar: "SK" },
  { name: "Marcus T.", role: "Software Engineer", text: "Finally a resume builder with genuinely unique designs. Not the same recycled templates every other site uses.", avatar: "MT" },
  { name: "Elena R.", role: "UX Designer", text: "Incredibly intuitive. I went from PDF upload to a polished, professional resume in under 10 minutes.", avatar: "ER" },
];

const TestimonialsSection = () => (
  <section className="py-20 sm:py-28 bg-background">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
      <div className="text-center mb-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Testimonials</p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
          Loved by Professionals Worldwide
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {testimonials.map((t, index) => (
          <Card key={index} className="border border-border hover:shadow-lg transition-all duration-300 relative">
            <CardContent className="p-6 sm:p-8">
              <Quote className="h-8 w-8 text-primary/15 absolute top-4 right-4" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm font-bold text-primary-foreground">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
