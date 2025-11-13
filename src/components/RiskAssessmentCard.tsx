import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RiskLevel {
  level: string;
  description: string;
}

interface RiskAssessmentProps {
  drought: RiskLevel;
  heat: RiskLevel;
  flood: RiskLevel;
  water: RiskLevel;
}

export const RiskAssessmentCard = ({ drought, heat, flood, water }: RiskAssessmentProps) => {
  const getRiskBadgeVariant = (level: string) => {
    switch (level.toLowerCase()) {
      case 'low':
        return 'default';
      case 'moderate':
        return 'secondary';
      case 'high':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const risks = [
    { name: 'Drought Risk', icon: '☀️', ...drought },
    { name: 'Heat Stress', icon: '🌡️', ...heat },
    { name: 'Flood Risk', icon: '🌊', ...flood },
    { name: 'Water Scarcity', icon: '💧', ...water },
  ];

  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg">Risk Assessment</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {risks.map((risk) => (
            <div 
              key={risk.name} 
              className="p-4 rounded-lg bg-muted/50 space-y-2 hover:bg-muted/70 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{risk.icon}</span>
                <Badge variant={getRiskBadgeVariant(risk.level)}>
                  {risk.level}
                </Badge>
              </div>
              <div className="font-medium text-sm">{risk.name}</div>
              <div className="text-xs text-muted-foreground">{risk.description}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};