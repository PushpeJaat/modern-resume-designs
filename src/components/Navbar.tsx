import { useState } from "react";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";
import { Menu, User, LogOut, FileText } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Templates", path: "/templates" },
    { label: "Pricing", path: "/pricing" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="CVPilot" width={36} height={36} className="rounded-lg" />
            <span className="text-xl font-bold">CVPilot</span>
          </NavLink>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                activeClassName="text-foreground"
              >
                {item.label}
              </NavLink>
            ))}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <User className="w-4 h-4" />
                    {user.user_metadata?.full_name || user.email?.split("@")[0] || "Account"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate("/profile")} className="gap-2 cursor-pointer">
                    <FileText className="w-4 h-4" /> My Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} className="gap-2 cursor-pointer">
                    <LogOut className="w-4 h-4" /> Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" asChild>
                  <NavLink to="/auth">Sign In</NavLink>
                </Button>
                <Button size="sm" asChild>
                  <NavLink to="/templates">Get Started</NavLink>
                </Button>
              </div>
            )}
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                    activeClassName="text-foreground"
                  >
                    {item.label}
                  </NavLink>
                ))}
                {user ? (
                  <>
                    <NavLink to="/profile" onClick={() => setIsOpen(false)} className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors py-2">
                      My Profile
                    </NavLink>
                    <Button variant="outline" onClick={() => { signOut(); setIsOpen(false); }} className="mt-4 gap-2">
                      <LogOut className="w-4 h-4" /> Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" asChild className="mt-4">
                      <NavLink to="/auth" onClick={() => setIsOpen(false)}>Sign In</NavLink>
                    </Button>
                    <Button asChild>
                      <NavLink to="/templates" onClick={() => setIsOpen(false)}>Get Started</NavLink>
                    </Button>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
