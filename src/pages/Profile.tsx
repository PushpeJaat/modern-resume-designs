import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Download, FileText, Calendar, User, Mail, ArrowRight, Loader2 } from "lucide-react";

interface DownloadRecord {
  id: string;
  template_id: string;
  resume_title: string | null;
  downloaded_at: string;
}

interface SavedResume {
  id: string;
  template_id: string;
  title: string | null;
  updated_at: string;
}

const Profile = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [downloads, setDownloads] = useState<DownloadRecord[]>([]);
  const [resumes, setResumes] = useState<SavedResume[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth?returnTo=/profile");
      return;
    }
    if (user) {
      fetchData();
    }
  }, [user, authLoading]);

  const fetchData = async () => {
    setLoading(true);
    const [downloadsRes, resumesRes] = await Promise.all([
      supabase.from("download_history").select("*").eq("user_id", user!.id).order("downloaded_at", { ascending: false }).limit(50),
      supabase.from("saved_resumes").select("id, template_id, title, updated_at").eq("user_id", user!.id).order("updated_at", { ascending: false }),
    ]);
    if (downloadsRes.data) setDownloads(downloadsRes.data as DownloadRecord[]);
    if (resumesRes.data) setResumes(resumesRes.data as SavedResume[]);
    setLoading(false);
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  const templateLabel = (id: string) => id.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">My Profile</h1>

        {/* User Info */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center">
                <User className="w-7 h-7 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-lg">{user.user_metadata?.full_name || user.email?.split("@")[0] || "User"}</p>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Mail className="w-3 h-3" /> {user.email || user.phone || "No email"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6 text-center">
              <Download className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">{downloads.length}</p>
              <p className="text-xs text-muted-foreground">Total Downloads</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <FileText className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">{resumes.length}</p>
              <p className="text-xs text-muted-foreground">Saved Resumes</p>
            </CardContent>
          </Card>
          <Card className="col-span-2 sm:col-span-1">
            <CardContent className="pt-6 text-center">
              <Calendar className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">
                {new Set(downloads.map(d => d.template_id)).size}
              </p>
              <p className="text-xs text-muted-foreground">Templates Used</p>
            </CardContent>
          </Card>
        </div>

        {/* Saved Resumes */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Saved Resumes</CardTitle>
          </CardHeader>
          <CardContent>
            {resumes.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm">No saved resumes yet</p>
                <Button variant="outline" size="sm" className="mt-3" onClick={() => navigate("/templates")}>
                  Create Your First Resume <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {resumes.map((r) => (
                  <div key={r.id} className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:border-primary/30 transition-colors">
                    <div>
                      <p className="font-medium text-sm">{r.title || "Untitled Resume"}</p>
                      <p className="text-xs text-muted-foreground">{templateLabel(r.template_id)} · Updated {new Date(r.updated_at).toLocaleDateString()}</p>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => navigate(`/editor?template=${r.template_id}`)}>
                      Edit
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Download History */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Download History</CardTitle>
          </CardHeader>
          <CardContent>
            {downloads.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Download className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm">No downloads yet</p>
              </div>
            ) : (
              <div className="space-y-2">
                {downloads.map((d) => (
                  <div key={d.id} className="flex items-center justify-between p-3 rounded-lg border border-border/50">
                    <div className="flex items-center gap-3">
                      <Download className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-sm">{d.resume_title || "Untitled"}</p>
                        <p className="text-xs text-muted-foreground">{templateLabel(d.template_id)}</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{new Date(d.downloaded_at).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
