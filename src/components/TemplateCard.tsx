import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface TemplateCardProps {
  title: string;
  description: string;
  preview: string;
  onPreview: () => void;
}

const TemplateCard = ({ title, description, preview, onPreview }: TemplateCardProps) => {
  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary">
      <div className="aspect-[8.5/11] bg-muted relative overflow-hidden" onClick={onPreview}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
          <Button size="sm" className="gap-2">
            <Eye className="w-4 h-4" />
            Preview
          </Button>
        </div>
        <div className="w-full h-full flex items-center justify-center p-4">
          <div className="transform scale-[0.4] origin-top-left w-[250%]">
            <img 
              src={preview} 
              alt={title} 
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </Card>
  );
};

export default TemplateCard;
