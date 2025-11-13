import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface YieldCardProps {
  yield: number;
  maxYield?: number;
}

export const YieldCard = ({ yield: yieldValue, maxYield = 6500 }: YieldCardProps) => {
  const yieldPercentage = (yieldValue / maxYield) * 100;

  return (
    <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
      <CardHeader>
        <CardTitle className="text-lg">Predicted Rice Yield</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-5xl font-bold text-success mb-2">
            {yieldValue.toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground">kg/hectare</div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Yield Potential</span>
            <span className="font-medium">{yieldPercentage.toFixed(1)}%</span>
          </div>
          <Progress value={yieldPercentage} className="h-3" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0 kg/ha</span>
            <span>{maxYield} kg/ha</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};