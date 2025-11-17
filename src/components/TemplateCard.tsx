import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import React from "react";

interface TemplateCardProps {
  title: string;
  description: string;
  component: React.ComponentType;
  onPreview: () => void;
}

const TemplateCard = ({ title, description, component: Component, onPreview }: TemplateCardProps) => {
  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary bg-card">
      <div className="aspect-[8.5/11] bg-gradient-to-br from-muted/50 to-muted relative overflow-hidden border-b-2 border-border" onClick={onPreview}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8 z-10">
          <Button size="lg" className="gap-2 shadow-lg">
            <Eye className="w-5 h-5" />
            Preview Full Template
          </Button>
        </div>
        <div className="w-full h-full overflow-hidden flex items-start justify-center p-4">
          <div className="transform scale-[0.18] origin-top w-[555%] h-[555%] pointer-events-none bg-white shadow-2xl">
            <Component />
          </div>
        </div>
      </div>
      <div className="p-6 bg-card">
        <h3 className="font-bold text-lg mb-2 text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </Card>
  );
};

export default TemplateCard;
