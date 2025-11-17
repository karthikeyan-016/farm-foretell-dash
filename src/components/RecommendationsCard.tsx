import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

interface RecommendationsProps {
  recommendations: string[];
}

export const RecommendationsCard = ({ recommendations }: RecommendationsProps) => {
  const { t } = useLanguage();
  
  return (
    <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
      <CardHeader>
        <CardTitle className="text-lg">{t("recommendations")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recommendations.map((rec, idx) => (
            <div 
              key={idx} 
              className="p-4 rounded-lg bg-card border border-border/50 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  {idx + 1}
                </div>
                <p className="text-sm text-foreground flex-1">{rec}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};