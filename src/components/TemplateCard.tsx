import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useRef, useEffect, useState, ReactNode } from "react";

interface TemplateCardProps {
  title: string;
  description: string;
  previewImage?: string;
  onPreview: () => void;
  livePreview?: ReactNode;
}

const TemplateCard = ({ title, description, onPreview, livePreview }: TemplateCardProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.3);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      const width = entries[0].contentRect.width;
      setScale(width / 794);
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary bg-card">
      <div
        ref={containerRef}
        className="aspect-[8.5/11] relative overflow-hidden border-b-2 border-border bg-white"
        onClick={onPreview}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8 z-10">
          <Button size="lg" className="gap-2 shadow-lg">
            <Eye className="w-5 h-5" />
            Preview Full Template
          </Button>
        </div>
        {livePreview && (
          <div
            style={{
              width: 794,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
            }}
            className="absolute top-0 left-0"
          >
            {livePreview}
          </div>
        )}
      </div>
      <div className="p-4 bg-card">
        <h3 className="font-bold text-base mb-1 text-foreground">{title}</h3>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </Card>
  );
};

export default TemplateCard;