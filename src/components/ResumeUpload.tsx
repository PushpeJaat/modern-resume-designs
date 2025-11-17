import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, CheckCircle2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ResumeUpload = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const parseResumeData = async (file: File) => {
    setIsProcessing(true);
    try {
      // Simulate resume parsing (in production, this would call a backend API)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock extracted data
      const extractedData = {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 (555) 123-4567",
        location: "San Francisco, CA",
        summary: "Experienced professional with 5+ years in the industry...",
        experience: [
          {
            title: "Senior Developer",
            company: "Tech Corp",
            duration: "2020 - Present",
            description: "Led development of key features..."
          }
        ],
        education: [
          {
            degree: "Bachelor of Science in Computer Science",
            institution: "University of California",
            year: "2019"
          }
        ],
        skills: ["JavaScript", "React", "Node.js", "Python"]
      };

      // Store in localStorage for template auto-fill
      localStorage.setItem("resumeData", JSON.stringify(extractedData));
      
      toast({
        title: "Resume parsed successfully!",
        description: "Your information has been extracted. Select a template to get started.",
      });
    } catch (error) {
      toast({
        title: "Error parsing resume",
        description: "Please try again or enter your information manually.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === "application/pdf" || file.type === "application/msword" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        setUploadedFile(file);
        await parseResumeData(file);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF or Word document.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <Card className="border-2 border-dashed border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5 hover:border-primary/50 transition-all duration-300">
      <div className="p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <Upload className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-xl font-bold">Upload Your Resume</h3>
        </div>
        <p className="text-muted-foreground mb-6">
          Have an existing resume? Upload it and we'll automatically extract your information to save you time.
        </p>
        
        {isProcessing ? (
          <div className="flex flex-col items-center justify-center p-8 space-y-4">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
            <div className="text-center">
              <p className="font-medium mb-1">Processing your resume...</p>
              <p className="text-sm text-muted-foreground">Extracting information from your document</p>
            </div>
          </div>
        ) : !uploadedFile ? (
          <div className="space-y-4">
            <label htmlFor="resume-upload" className="block">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer">
                <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm font-medium mb-1">Click to upload or drag and drop</p>
                <p className="text-xs text-muted-foreground">PDF or Word document (Max 10MB)</p>
              </div>
              <input
                id="resume-upload"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
                disabled={isProcessing}
              />
            </label>
          </div>
        ) : (
          <div className="flex items-center gap-3 p-4 bg-primary/10 rounded-lg border border-primary/20">
            <FileText className="w-8 h-8 text-primary" />
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
            className="mt-4"
            onClick={() => setUploadedFile(null)}
          >
            Upload Different File
          </Button>
        )}
      </div>
    </Card>
  );
};

export default ResumeUpload;
