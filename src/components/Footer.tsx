import { NavLink } from "@/components/NavLink";
import logoImg from "/logo.png";

const Footer = () => {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img src={logoImg} alt="CVPilot" width={36} height={36} className="rounded-lg" loading="lazy" />
              <span className="text-xl font-bold">CVPilot</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              Create professional resumes in minutes with our modern templates. 
              One-time payment, no subscriptions, no credit card required.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><NavLink to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Home</NavLink></li>
              <li><NavLink to="/templates" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Templates</NavLink></li>
              <li><NavLink to="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</NavLink></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} CVPilot. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
