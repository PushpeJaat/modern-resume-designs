import { NavLink } from "@/components/NavLink";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="CVPilot" width={32} height={32} className="rounded-lg" loading="lazy" />
              <span className="text-lg font-bold">CVPilot</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Professional resumes in minutes. AI-powered, beautifully designed, ATS-friendly.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider text-foreground">Product</h4>
            <ul className="space-y-3">
              <li><NavLink to="/templates" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Templates</NavLink></li>
              <li><NavLink to="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</NavLink></li>
              <li><NavLink to="/editor" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Editor</NavLink></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider text-foreground">Company</h4>
            <ul className="space-y-3">
              <li><NavLink to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</NavLink></li>
              <li><a href="mailto:support@cvpilot.info" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider text-foreground">Legal</h4>
            <ul className="space-y-3">
              <li><NavLink to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</NavLink></li>
              <li><NavLink to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</NavLink></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} CVPilot. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Made with ❤️ for professionals worldwide
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
