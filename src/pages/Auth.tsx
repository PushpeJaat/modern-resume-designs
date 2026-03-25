import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { Mail, Phone, Loader2, ArrowLeft } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const returnTo = searchParams.get("returnTo") || "/";
  const { toast } = useToast();

  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [method, setMethod] = useState<"email" | "phone">("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailAuth = async () => {
    setLoading(true);
    try {
      if (authMode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
            emailRedirectTo: window.location.origin + returnTo,
          },
        });
        if (error) throw error;
        toast({ title: "Check your email", description: "We've sent you a verification link. Please verify your email to continue." });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate(returnTo);
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneSendOtp = async () => {
    setLoading(true);
    try {
      if (authMode === "signup") {
        const { error } = await supabase.auth.signUp({ phone, password, options: { data: { full_name: fullName } } });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithOtp({ phone });
        if (error) throw error;
      }
      setOtpSent(true);
      toast({ title: "OTP Sent", description: "Check your phone for the verification code." });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.verifyOtp({ phone, token: otp, type: "sms" });
      if (error) throw error;
      navigate(returnTo);
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      // Store the returnTo so we can redirect after OAuth callback
      localStorage.setItem("authReturnTo", returnTo);
      const { error } = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (error) throw error;
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md border-2">
        <CardHeader className="text-center space-y-3">
          <div className="flex justify-center">
            <img src="/logo.png" alt="CVPilot" width={48} height={48} className="rounded-lg" />
          </div>
          <CardTitle className="text-2xl">
            {authMode === "signin" ? "Welcome Back" : "Create Account"}
          </CardTitle>
          <CardDescription>
            {authMode === "signin" ? "Sign in to access your saved resumes" : "Sign up to save and download your resumes"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full border-2 gap-2" onClick={handleGoogleSignIn} disabled={loading}>
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <Tabs value={method} onValueChange={(v) => { setMethod(v as "email" | "phone"); setOtpSent(false); }}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="email" className="gap-1 text-xs"><Mail className="w-3 h-3" /> Email</TabsTrigger>
              <TabsTrigger value="phone" className="gap-1 text-xs"><Phone className="w-3 h-3" /> Phone</TabsTrigger>
            </TabsList>

            <TabsContent value="email" className="space-y-3 mt-3">
              {authMode === "signup" && (
                <div className="space-y-1">
                  <Label className="text-xs">Full Name</Label>
                  <Input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="John Doe" className="h-9" />
                </div>
              )}
              <div className="space-y-1">
                <Label className="text-xs">Email</Label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="h-9" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Password</Label>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="h-9" />
              </div>
              <Button className="w-full" onClick={handleEmailAuth} disabled={loading}>
                {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {authMode === "signin" ? "Sign In" : "Sign Up"}
              </Button>
            </TabsContent>

            <TabsContent value="phone" className="space-y-3 mt-3">
              {authMode === "signup" && !otpSent && (
                <div className="space-y-1">
                  <Label className="text-xs">Full Name</Label>
                  <Input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="John Doe" className="h-9" />
                </div>
              )}
              <div className="space-y-1">
                <Label className="text-xs">Phone Number</Label>
                <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1234567890" className="h-9" disabled={otpSent} />
              </div>
              {authMode === "signup" && !otpSent && (
                <div className="space-y-1">
                  <Label className="text-xs">Password</Label>
                  <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="h-9" />
                </div>
              )}
              {otpSent ? (
                <>
                  <div className="space-y-1">
                    <Label className="text-xs">Verification Code</Label>
                    <Input value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="123456" className="h-9" />
                  </div>
                  <Button className="w-full" onClick={handleVerifyOtp} disabled={loading}>
                    {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    Verify & Continue
                  </Button>
                </>
              ) : (
                <Button className="w-full" onClick={handlePhoneSendOtp} disabled={loading}>
                  {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  Send OTP
                </Button>
              )}
            </TabsContent>
          </Tabs>

          <div className="text-center text-sm text-muted-foreground">
            {authMode === "signin" ? (
              <p>Don't have an account?{" "}
                <button onClick={() => setAuthMode("signup")} className="text-primary font-medium hover:underline">Sign Up</button>
              </p>
            ) : (
              <p>Already have an account?{" "}
                <button onClick={() => setAuthMode("signin")} className="text-primary font-medium hover:underline">Sign In</button>
              </p>
            )}
          </div>

          <Button variant="ghost" className="w-full text-xs gap-1" onClick={() => navigate(returnTo)}>
            <ArrowLeft className="w-3 h-3" /> Continue without signing in
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
