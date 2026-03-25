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
    <Card className="border-2 border-dashed border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5 hover:border-primary/50 transition-all duration-300">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <Upload className="w-4 h-4 text-primary" />
          </div>
          <h3 className="text-base font-bold">Upload Your Resume</h3>
        </div>
        <p className="text-muted-foreground text-xs mb-3">
          Upload a PDF resume — AI will extract your data and auto-fill all templates.
        </p>

        {isProcessing ? (
          <div className="flex items-center justify-center gap-3 p-4">
            <Loader2 className="w-6 h-6 text-primary animate-spin" />
            <div>
              <p className="font-medium text-sm">AI is extracting your data...</p>
              <p className="text-xs text-muted-foreground">This may take a few seconds</p>
            </div>
          </div>
        ) : !uploadedFile ? (
          <label htmlFor="resume-upload" className="block cursor-pointer">
            <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary/50 hover:bg-primary/5 transition-all">
              <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-1" />
              <p className="text-sm font-medium">Click to upload</p>
              <p className="text-xs text-muted-foreground">PDF only (Max 10MB)</p>
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
          <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg border border-primary/20">
            <FileText className="w-6 h-6 text-primary" />
            <div className="flex-1">
              <p className="font-medium text-sm">{uploadedFile.name}</p>
              <p className="text-xs text-muted-foreground">
                {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <CheckCircle2 className="w-5 h-5 text-green-600" />
          </div>
        )}

        {uploadedFile && (
          <Button
            variant="outline"
            size="sm"
            className="mt-2"
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
