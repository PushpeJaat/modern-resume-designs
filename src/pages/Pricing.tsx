import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { NavLink } from "@/components/NavLink";
import { CheckCircle2, X } from "lucide-react";

const Pricing = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            One-time payment, lifetime access. No subscriptions, no hidden fees.
          </p>
        </div>

        {/* Pricing Card */}
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-primary relative overflow-hidden">
            {/* Popular Badge */}
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-sm font-semibold">
              POPULAR
            </div>

            <CardHeader className="text-center pb-8 pt-12">
              <CardTitle className="text-3xl mb-2">Complete Access</CardTitle>
              <CardDescription className="text-lg">
                Get instant access to all templates
              </CardDescription>
              <div className="mt-6">
                <span className="text-5xl font-bold">$19</span>
                <span className="text-muted-foreground ml-2">one-time payment</span>
              </div>
            </CardHeader>

            <CardContent className="pb-12">
              <div className="space-y-4 mb-8">
                {[
                  "Access to all 6 premium templates",
                  "Instant PDF download",
                  "High-quality print-ready files",
                  "ATS-friendly formats",
                  "No watermarks",
                  "Lifetime access to your resume",
                  "No credit card required",
                  "No recurring charges",
                  "No subscriptions"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <Button size="lg" className="w-full text-lg" asChild>
                <NavLink to="/templates">Choose Your Template</NavLink>
              </Button>

              <p className="text-center text-sm text-muted-foreground mt-4">
                Pay once, use forever. No surprises.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Comparison Section */}
        <div className="mt-20 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose One-Time Payment?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Our Approach */}
            <Card className="border-2 border-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  ResumeBuilder (Us)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "$19 one-time payment",
                    "All templates included",
                    "No credit card required",
                    "No recurring charges",
                    "Instant access",
                    "Download anytime",
                    "No expiration"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Traditional Approach */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-muted-foreground">
                  <X className="w-5 h-5" />
                  Traditional Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "$15-30 per month",
                    "Limited templates on free tier",
                    "Credit card required",
                    "Auto-renewal charges",
                    "Pay to continue access",
                    "Cancel to stop paying",
                    "Lose access when you stop paying"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <X className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {[
              {
                q: "Is this really a one-time payment?",
                a: "Yes! You pay $19 once and get lifetime access to all templates. No monthly fees, no hidden charges."
              },
              {
                q: "Do I need a credit card?",
                a: "No credit card is required. We accept various payment methods to make it easy for you."
              },
              {
                q: "Can I download my resume multiple times?",
                a: "Yes! Once you've paid, you can download your resume as many times as you need."
              },
              {
                q: "Are there any additional charges?",
                a: "No. The $19 payment includes everything - all templates and PDF downloads."
              },
              {
                q: "What if I don't like the template?",
                a: "You can preview all templates before making a payment to ensure you choose the right one for you."
              }
            ].map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.q}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
