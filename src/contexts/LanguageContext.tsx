import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "ta";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Header
    appTitle: "Tamil Nadu Rice Yield Prediction",
    appSubtitle: "Climate-Based Analysis & Forecasting System",
    askAdvisor: "Ask Farming Advisor",
    
    // Input Sidebar
    inputTitle: "Input Parameters",
    district: "District",
    selectDistrict: "Select District",
    season: "Season",
    selectSeason: "Select Season",
    year: "Year",
    avgTemp: "Avg Temperature (°C)",
    minTemp: "Min Temperature (°C)",
    maxTemp: "Max Temperature (°C)",
    rainfall: "Rainfall (mm)",
    humidity: "Humidity (%)",
    waterAvailability: "Water Availability (%)",
    fertilizer: "Fertilizer (kg/ha)",
    soilQuality: "Soil Quality Index",
    predictButton: "Predict Yield",
    
    // Districts
    thanjavur: "Thanjavur",
    tiruvarur: "Tiruvarur",
    nagapattinam: "Nagapattinam",
    cuddalore: "Cuddalore",
    villupuram: "Villupuram",
    
    // Seasons
    kuruvai: "Kuruvai (Jun-Sep)",
    samba: "Samba (Aug-Jan)",
    thaladi: "Thaladi (Sep-Feb)",
    
    // Results
    readyToPredict: "Ready to Predict",
    readyDescription: "Select district, season and climate inputs to get AI-powered forecasts for rice yield and farming recommendations.",
    
    // Yield Card
    predictedYield: "Predicted Rice Yield",
    yieldPotential: "Yield Potential",
    
    // Weather Analysis
    weatherAnalysis: "Weather Condition Analysis",
    suitabilityScore: "Suitability Score",
    temperature: "Temperature",
    rainfallFactor: "Rainfall",
    humidityFactor: "Humidity",
    waterFactor: "Water Availability",
    observations: "Key Observations",
    good: "Good",
    moderate: "Moderate",
    poor: "Poor",
    high: "High",
    low: "Low",
    
    // Risk Assessment
    riskAssessment: "Risk Assessment",
    droughtRisk: "Drought Risk",
    heatRisk: "Heat Stress Risk",
    floodRisk: "Flood Risk",
    waterRisk: "Water Scarcity",
    
    // Recommendations
    recommendations: "Recommendations",
    
    // Chatbot
    chatbotTitle: "Farmer Advisory Chatbot",
    chatbotSubtitle: "Get expert advice on rice farming in Tamil Nadu",
    chatPlaceholder: "Ask about farming practices, weather, pests, schemes...",
    chatWelcome: "🌾 Vanakkam! I'm your farming advisor. Ask me anything about rice cultivation, climate management, pest control, or government schemes for Tamil Nadu farmers.",
    backToHome: "Back to Dashboard",
  },
  ta: {
    // Header
    appTitle: "தமிழ்நாடு நெல் விளைச்சல் கணிப்பு",
    appSubtitle: "காலநிலை அடிப்படையிலான பகுப்பாய்வு மற்றும் முன்னறிவிப்பு அமைப்பு",
    askAdvisor: "விவசாய ஆலோசகரிடம் கேளுங்கள்",
    
    // Input Sidebar
    inputTitle: "உள்ளீட்டு அளவுருக்கள்",
    district: "மாவட்டம்",
    selectDistrict: "மாவட்டத்தைத் தேர்ந்தெடுக்கவும்",
    season: "பருவம்",
    selectSeason: "பருவத்தைத் தேர்ந்தெடுக்கவும்",
    year: "ஆண்டு",
    avgTemp: "சராசரி வெப்பநிலை (°C)",
    minTemp: "குறைந்தபட்ச வெப்பநிலை (°C)",
    maxTemp: "அதிகபட்ச வெப்பநிலை (°C)",
    rainfall: "மழைப்பொழிவு (மிமீ)",
    humidity: "ஈரப்பதம் (%)",
    waterAvailability: "நீர் கிடைக்கும் தன்மை (%)",
    fertilizer: "உரம் (கிலோ/ஹெக்டேர்)",
    soilQuality: "மண்ணின் தரக் குறியீடு",
    predictButton: "விளைச்சலைக் கணிக்கவும்",
    
    // Districts
    thanjavur: "தஞ்சாவூர்",
    tiruvarur: "திருவாரூர்",
    nagapattinam: "நாகப்பட்டினம்",
    cuddalore: "கடலூர்",
    villupuram: "விழுப்புரம்",
    
    // Seasons
    kuruvai: "குறுவை (ஜூன்-செப்)",
    samba: "சம்பா (ஆக-ஜன)",
    thaladi: "தாளடி (செப்-பிப்)",
    
    // Results
    readyToPredict: "கணிக்க தயார்",
    readyDescription: "நெல் விளைச்சல் மற்றும் விவசாய பரிந்துரைகளுக்கான AI-இயங்கும் முன்னறிவிப்புகளைப் பெற மாவட்டம், பருவம் மற்றும் காலநிலை உள்ளீடுகளைத் தேர்ந்தெடுக்கவும்.",
    
    // Yield Card
    predictedYield: "கணிக்கப்பட்ட நெல் விளைச்சல்",
    yieldPotential: "விளைச்சல் திறன்",
    
    // Weather Analysis
    weatherAnalysis: "வானிலை நிலைமை பகுப்பாய்வு",
    suitabilityScore: "பொருத்தமான மதிப்பெண்",
    temperature: "வெப்பநிலை",
    rainfallFactor: "மழைப்பொழிவு",
    humidityFactor: "ஈரப்பதம்",
    waterFactor: "நீர் கிடைக்கும் தன்மை",
    observations: "முக்கிய கவனிப்புகள்",
    good: "நல்லது",
    moderate: "மிதமான",
    poor: "மோசம்",
    high: "அதிகம்",
    low: "குறைவு",
    
    // Risk Assessment
    riskAssessment: "இடர் மதிப்பீடு",
    droughtRisk: "வறட்சி ஆபத்து",
    heatRisk: "வெப்ப அழுத்த ஆபத்து",
    floodRisk: "வெள்ள ஆபத்து",
    waterRisk: "நீர் பற்றாக்குறை",
    
    // Recommendations
    recommendations: "பரிந்துரைகள்",
    
    // Chatbot
    chatbotTitle: "விவசாய ஆலோசனை சாட்பாட்",
    chatbotSubtitle: "தமிழ்நாட்டில் நெல் விவசாயம் குறித்த நிபுணர் ஆலோசனை பெறுங்கள்",
    chatPlaceholder: "விவசாய நடைமுறைகள், வானிலை, பூச்சிகள், திட்டங்கள் பற்றி கேளுங்கள்...",
    chatWelcome: "🌾 வணக்கம்! நான் உங்கள் விவசாய ஆலோசகர். நெல் சாகுபடி, காலநிலை மேலாண்மை, பூச்சி கட்டுப்பாடு அல்லது தமிழ்நாடு விவசாயிகளுக்கான அரசாங்க திட்டங்கள் பற்றி என்னிடம் கேளுங்கள்.",
    backToHome: "டாஷ்போர்டுக்குத் திரும்பு",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem("language");
    return (stored === "ta" || stored === "en") ? stored : "en";
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};
