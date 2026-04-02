import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, CheckCircle2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { extractResumeFromPDF } from "@/lib/resumeParser";
import { ResumeData } from "@/types/resume";

interface ResumeUploadProps {
  onDataExtracted?: (data: ResumeData) => void;
}

const ResumeUpload = ({ onDataExtracted }: ResumeUploadProps) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast({
        title: "Only PDF supported",
        description: "Please upload a PDF file.",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a PDF under 10MB.",
        variant: "destructive",
      });
      return;
    }

    setUploadedFile(file);
    setIsProcessing(true);

    try {
      const resumeData = await extractResumeFromPDF(file);

      localStorage.setItem("resumeData", JSON.stringify(resumeData));
      onDataExtracted?.(resumeData);

      toast({
        title: "Resume parsed successfully!",
        description: "Your information has been extracted using AI and applied to all templates.",
      });
    } catch (error) {
      console.error("Resume parsing error:", error);
      setUploadedFile(null);
      toast({
        title: "Error parsing resume",
        description: error instanceof Error ? error.message : "Could not extract data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="border border-primary/40 bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 shadow-sm">
      <div className="p-3">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="p-1 rounded-md bg-primary/15">
            <Upload className="w-3.5 h-3.5 text-primary" />
          </div>
          <h3 className="text-sm font-bold text-foreground">Upload Resume</h3>
        </div>
        <p className="text-muted-foreground text-[11px] mb-2 leading-tight">
          Upload PDF — AI auto-fills all templates.
        </p>

        {isProcessing ? (
          <div className="flex items-center gap-2 p-2.5 bg-primary/10 rounded-md">
            <Loader2 className="w-4 h-4 text-primary animate-spin flex-shrink-0" />
            <div>
              <p className="font-medium text-xs">Extracting data...</p>
              <p className="text-[10px] text-muted-foreground">Few seconds</p>
            </div>
          </div>
        ) : !uploadedFile ? (
          <label htmlFor="resume-upload" className="block cursor-pointer">
            <div className="border border-dashed border-primary/40 rounded-md p-2.5 text-center hover:border-primary hover:bg-primary/10 transition-all">
              <Upload className="w-5 h-5 text-primary/60 mx-auto mb-0.5" />
              <p className="text-xs font-medium">Click to upload</p>
              <p className="text-[10px] text-muted-foreground">PDF only · Max 10MB</p>
            </div>
            <input
              id="resume-upload"
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        ) : (
          <div className="flex items-center gap-2 p-2 bg-primary/10 rounded-md border border-primary/20">
            <FileText className="w-4 h-4 text-primary flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-xs truncate">{uploadedFile.name}</p>
              <p className="text-[10px] text-muted-foreground">
                {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
          </div>
        )}

        {uploadedFile && (
          <Button
            variant="outline"
            size="sm"
            className="mt-1.5 h-7 text-xs"
            onClick={() => {
              setUploadedFile(null);
              localStorage.removeItem("resumeData");
              onDataExtracted?.(undefined as any);
            }}
          >
            Upload Different File
          </Button>
        )}
      </div>
    </Card>
  );
};

export default ResumeUpload;
