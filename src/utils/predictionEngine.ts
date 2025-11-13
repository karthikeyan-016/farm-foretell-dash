interface PredictionInput {
  district: string;
  season: string;
  year: number;
  avgTemp: number;
  minTemp: number;
  maxTemp: number;
  rainfall: number;
  humidity: number;
  waterAvailability: number;
  fertilizer: number;
  soilQuality: number;
}

interface WeatherFactor {
  label: string;
  score: number;
}

interface RiskLevel {
  level: string;
  description: string;
}

interface PredictionResult {
  yield: number;
  weather_analysis: {
    suitability_score: number;
    factors: {
      temperature: WeatherFactor;
      rainfall: WeatherFactor;
      humidity: WeatherFactor;
      water: WeatherFactor;
    };
    observations: string[];
  };
  risk: {
    drought: RiskLevel;
    heat: RiskLevel;
    flood: RiskLevel;
    water: RiskLevel;
  };
  recommendations: string[];
}

export const predictYield = (input: PredictionInput): PredictionResult => {
  // Base yield calculation (dummy ML model)
  const baseYield = 2000;
  
  // Factor contributions
  const tempFactor = Math.max(0, 1 - Math.abs(input.avgTemp - 27) / 10);
  const rainfallFactor = Math.min(input.rainfall / 800, 1.2);
  const humidityFactor = Math.max(0, 1 - Math.abs(input.humidity - 75) / 30);
  const waterFactor = input.waterAvailability / 100;
  const fertilizerFactor = Math.min(input.fertilizer / 200, 1.3);
  const soilFactor = input.soilQuality;
  
  const yieldValue = Math.round(
    baseYield * 
    (1 + tempFactor * 0.3) *
    (1 + rainfallFactor * 0.4) *
    (1 + humidityFactor * 0.2) *
    (1 + waterFactor * 0.3) *
    (1 + fertilizerFactor * 0.2) *
    (1 + soilFactor * 0.3)
  );

  // Weather analysis
  const tempScore = Math.round(tempFactor * 100);
  const rainfallScore = Math.round(Math.min(rainfallFactor, 1) * 100);
  const humidityScore = Math.round(humidityFactor * 100);
  const waterScore = Math.round(waterFactor * 100);
  
  const suitabilityScore = Math.round(
    (tempScore * 0.3 + rainfallScore * 0.3 + humidityScore * 0.2 + waterScore * 0.2)
  );

  const getFactorLabel = (score: number): string => {
    if (score >= 75) return "Good";
    if (score >= 50) return "Moderate";
    return "Poor";
  };

  const observations: string[] = [];
  if (input.avgTemp >= 25 && input.avgTemp <= 30) {
    observations.push("Temperature ideal for tillering stage.");
  } else if (input.avgTemp > 32) {
    observations.push("High temperature may stress plants.");
  }
  
  if (input.rainfall < 600) {
    observations.push("Rainfall slightly below optimal - consider irrigation.");
  } else if (input.rainfall > 1000) {
    observations.push("Abundant rainfall - monitor for waterlogging.");
  }
  
  if (input.humidity > 85) {
    observations.push("High humidity - increased disease risk.");
  }

  // Risk assessment
  const droughtRisk = input.rainfall < 400 || input.waterAvailability < 40 ? "High" : 
                      input.rainfall < 600 || input.waterAvailability < 60 ? "Moderate" : "Low";
  
  const heatRisk = input.maxTemp > 38 ? "High" : input.maxTemp > 35 ? "Moderate" : "Low";
  
  const floodRisk = input.rainfall > 1200 ? "High" : input.rainfall > 900 ? "Moderate" : "Low";
  
  const waterRisk = input.waterAvailability < 40 ? "High" : 
                    input.waterAvailability < 60 ? "Moderate" : "Low";

  // Recommendations
  const recommendations: string[] = [];
  
  if (droughtRisk === "High") {
    recommendations.push("Implement drip irrigation systems and mulching to conserve soil moisture.");
  } else if (droughtRisk === "Moderate") {
    recommendations.push("Schedule irrigation during critical growth stages and monitor soil moisture.");
  }
  
  if (heatRisk === "High" || heatRisk === "Moderate") {
    recommendations.push("Apply stress-tolerant varieties and maintain adequate water supply during hot periods.");
  }
  
  if (floodRisk === "High") {
    recommendations.push("Ensure proper drainage systems and consider raised bed cultivation.");
  }
  
  if (input.fertilizer < 120) {
    recommendations.push("Increase NPK fertilizer application to 150-180 kg/ha for optimal growth.");
  }
  
  if (input.soilQuality < 0.6) {
    recommendations.push("Improve soil health through organic matter addition and proper pH management.");
  }
  
  if (suitabilityScore >= 75) {
    recommendations.push("Conditions are favorable - follow standard cultural practices for maximum yield.");
  }

  // Ensure at least 3 recommendations
  if (recommendations.length < 3) {
    recommendations.push("Monitor crop regularly for pest and disease incidence.");
    if (recommendations.length < 3) {
      recommendations.push("Maintain optimal plant spacing and weed management for better yields.");
    }
  }

  return {
    yield: yieldValue,
    weather_analysis: {
      suitability_score: suitabilityScore,
      factors: {
        temperature: { label: getFactorLabel(tempScore), score: tempScore },
        rainfall: { label: getFactorLabel(rainfallScore), score: rainfallScore },
        humidity: { label: getFactorLabel(humidityScore), score: humidityScore },
        water: { label: getFactorLabel(waterScore), score: waterScore },
      },
      observations,
    },
    risk: {
      drought: {
        level: droughtRisk,
        description: droughtRisk === "High" ? "Critical water shortage" : 
                     droughtRisk === "Moderate" ? "Moderate water stress" : "Adequate water supply"
      },
      heat: {
        level: heatRisk,
        description: heatRisk === "High" ? "Extreme heat stress" : 
                     heatRisk === "Moderate" ? "Moderate heat conditions" : "Favorable temperatures"
      },
      flood: {
        level: floodRisk,
        description: floodRisk === "High" ? "High waterlogging risk" : 
                     floodRisk === "Moderate" ? "Possible excess water" : "Normal drainage"
      },
      water: {
        level: waterRisk,
        description: waterRisk === "High" ? "Severe water scarcity" : 
                     waterRisk === "Moderate" ? "Limited water availability" : "Sufficient water"
      },
    },
    recommendations: recommendations.slice(0, 5),
  };
};