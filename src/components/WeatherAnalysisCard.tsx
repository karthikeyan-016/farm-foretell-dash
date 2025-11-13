import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface WeatherFactor {
  label: string;
  score: number;
}

interface WeatherAnalysisProps {
  suitabilityScore: number;
  factors: {
    temperature: WeatherFactor;
    rainfall: WeatherFactor;
    humidity: WeatherFactor;
    water: WeatherFactor;
  };
  observations: string[];
}

export const WeatherAnalysisCard = ({ suitabilityScore, factors, observations }: WeatherAnalysisProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 75) return "text-success";
    if (score >= 50) return "text-warning";
    return "text-destructive";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 75) return "Good";
    if (score >= 50) return "Moderate";
    return "Poor";
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg">Weather Condition Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Suitability Score</span>
            <span className={`text-2xl font-bold ${getScoreColor(suitabilityScore)}`}>
              {suitabilityScore}%
            </span>
          </div>
          <Progress value={suitabilityScore} className="h-2" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {Object.entries(factors).map(([key, factor]) => (
            <div key={key} className="p-3 rounded-lg bg-muted/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium capitalize">{key}</span>
                <Badge 
                  variant={factor.score >= 75 ? "default" : factor.score >= 50 ? "secondary" : "destructive"}
                  className="text-xs"
                >
                  {factor.label}
                </Badge>
              </div>
              <div className="text-sm font-semibold">{factor.score}%</div>
              <Progress value={factor.score} className="h-1.5" />
            </div>
          ))}
        </div>

        {observations.length > 0 && (
          <div className="space-y-2 pt-2 border-t">
            <span className="text-sm font-medium">Key Observations</span>
            <ul className="space-y-1">
              {observations.map((obs, idx) => (
                <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>{obs}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};