import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputSidebar } from "@/components/InputSidebar";
import { YieldCard } from "@/components/YieldCard";
import { WeatherAnalysisCard } from "@/components/WeatherAnalysisCard";
import { RiskAssessmentCard } from "@/components/RiskAssessmentCard";
import { RecommendationsCard } from "@/components/RecommendationsCard";
import { predictYield } from "@/utils/predictionEngine";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    district: "",
    season: "",
    year: 2025,
    avgTemp: 27,
    minTemp: 22,
    maxTemp: 32,
    rainfall: 600,
    humidity: 75,
    waterAvailability: 70,
    fertilizer: 150,
    soilQuality: 0.7,
  });

  const [prediction, setPrediction] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePredict = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const result = predictYield(formData);
      setPrediction(result);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto p-6">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            🌾 Tamil Nadu Rice Yield Prediction
          </h1>
          <p className="text-muted-foreground">
            Climate-Based Analysis & Forecasting System
          </p>
          <Button
            onClick={() => navigate("/chatbot")}
            className="mt-4"
            variant="outline"
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Ask Farming Advisor
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[calc(100vh-200px)]">
          <div>
            <InputSidebar
              formData={formData}
              onFormChange={handleFormChange}
              onPredict={handlePredict}
              isLoading={isLoading}
            />
          </div>

          <div className="space-y-6">
            {!prediction ? (
              <Card className="h-full flex items-center justify-center p-12 bg-card/50 backdrop-blur-sm border-dashed">
                <div className="text-center space-y-4">
                  <div className="text-6xl mb-4">🌾</div>
                  <h2 className="text-2xl font-bold text-foreground">Ready to Predict</h2>
                  <p className="text-muted-foreground max-w-md">
                    Select district, season and climate inputs to get AI-powered forecasts
                    for rice yield and farming recommendations.
                  </p>
                </div>
              </Card>
            ) : (
              <>
                <YieldCard yield={prediction.yield} />
                <WeatherAnalysisCard
                  suitabilityScore={prediction.weather_analysis.suitability_score}
                  factors={prediction.weather_analysis.factors}
                  observations={prediction.weather_analysis.observations}
                />
                <RiskAssessmentCard
                  drought={prediction.risk.drought}
                  heat={prediction.risk.heat}
                  flood={prediction.risk.flood}
                  water={prediction.risk.water}
                />
                <RecommendationsCard recommendations={prediction.recommendations} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
