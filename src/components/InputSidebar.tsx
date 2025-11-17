import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

interface InputSidebarProps {
  formData: {
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
  };
  onFormChange: (field: string, value: any) => void;
  onPredict: () => void;
  isLoading: boolean;
}

const DISTRICTS = [
  "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri",
  "Dindigul", "Erode", "Kallakurichi", "Kanchipuram", "Kanyakumari", "Karur",
  "Krishnagiri", "Madurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur",
  "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi",
  "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli",
  "Tirupathur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur",
  "Vellore", "Viluppuram", "Virudhunagar"
];

const SEASONS = ["Kuruvai", "Samba", "Thaladi", "Navarai"];

export const InputSidebar = ({ formData, onFormChange, onPredict, isLoading }: InputSidebarProps) => {
  const { t } = useLanguage();
  
  return (
    <Card className="h-full overflow-y-auto p-6 bg-card/50 backdrop-blur-sm border-border/50">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">{t("inputTitle")}</h2>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="district">{t("district")}</Label>
            <Select value={formData.district} onValueChange={(value) => onFormChange("district", value)}>
              <SelectTrigger id="district">
                <SelectValue placeholder={t("selectDistrict")} />
              </SelectTrigger>
              <SelectContent>
                {DISTRICTS.map((district) => (
                  <SelectItem key={district} value={district}>{district}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="season">{t("season")}</Label>
            <Select value={formData.season} onValueChange={(value) => onFormChange("season", value)}>
              <SelectTrigger id="season">
                <SelectValue placeholder={t("selectSeason")} />
              </SelectTrigger>
              <SelectContent>
                {SEASONS.map((season) => (
                  <SelectItem key={season} value={season}>{season}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="year">{t("year")}</Label>
            <div className="flex items-center gap-4">
              <Slider
                id="year"
                min={2020}
                max={2030}
                step={1}
                value={[formData.year]}
                onValueChange={([value]) => onFormChange('year', value)}
                className="flex-1"
              />
              <span className="text-sm font-medium w-12 text-right">{formData.year}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="avgTemp">{t("avgTemp")}</Label>
            <div className="flex items-center gap-4">
              <Slider
                id="avgTemp"
                min={15}
                max={40}
                step={0.5}
                value={[formData.avgTemp]}
                onValueChange={([value]) => onFormChange('avgTemp', value)}
                className="flex-1"
              />
              <span className="text-sm font-medium w-12 text-right">{formData.avgTemp}°C</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="minTemp">{t("minTemp")}</Label>
              <div className="flex items-center gap-2">
                <Slider
                  id="minTemp"
                  min={10}
                  max={35}
                  step={0.5}
                  value={[formData.minTemp]}
                  onValueChange={([value]) => onFormChange('minTemp', value)}
                  className="flex-1"
                />
                <span className="text-xs font-medium w-10 text-right">{formData.minTemp}°C</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxTemp">{t("maxTemp")}</Label>
              <div className="flex items-center gap-2">
                <Slider
                  id="maxTemp"
                  min={20}
                  max={45}
                  step={0.5}
                  value={[formData.maxTemp]}
                  onValueChange={([value]) => onFormChange('maxTemp', value)}
                  className="flex-1"
                />
                <span className="text-xs font-medium w-10 text-right">{formData.maxTemp}°C</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rainfall">{t("rainfall")}</Label>
            <div className="flex items-center gap-4">
              <Slider
                id="rainfall"
                min={0}
                max={2000}
                step={10}
                value={[formData.rainfall]}
                onValueChange={([value]) => onFormChange('rainfall', value)}
                className="flex-1"
              />
              <span className="text-sm font-medium w-16 text-right">{formData.rainfall} mm</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="humidity">{t("humidity")}</Label>
            <div className="flex items-center gap-4">
              <Slider
                id="humidity"
                min={30}
                max={100}
                step={1}
                value={[formData.humidity]}
                onValueChange={([value]) => onFormChange('humidity', value)}
                className="flex-1"
              />
              <span className="text-sm font-medium w-12 text-right">{formData.humidity}%</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="waterAvailability">{t("waterAvailability")}</Label>
            <div className="flex items-center gap-4">
              <Slider
                id="waterAvailability"
                min={0}
                max={100}
                step={5}
                value={[formData.waterAvailability]}
                onValueChange={([value]) => onFormChange('waterAvailability', value)}
                className="flex-1"
              />
              <span className="text-sm font-medium w-12 text-right">{formData.waterAvailability}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fertilizer">{t("fertilizer")}</Label>
            <div className="flex items-center gap-4">
              <Slider
                id="fertilizer"
                min={0}
                max={300}
                step={5}
                value={[formData.fertilizer]}
                onValueChange={([value]) => onFormChange('fertilizer', value)}
                className="flex-1"
              />
              <span className="text-sm font-medium w-16 text-right">{formData.fertilizer} kg/ha</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="soilQuality">{t("soilQuality")}</Label>
            <div className="flex items-center gap-4">
              <Slider
                id="soilQuality"
                min={0}
                max={1}
                step={0.05}
                value={[formData.soilQuality]}
                onValueChange={([value]) => onFormChange('soilQuality', value)}
                className="flex-1"
              />
              <span className="text-sm font-medium w-12 text-right">{formData.soilQuality.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <Button 
          onClick={onPredict} 
          disabled={isLoading || !formData.district || !formData.season}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          size="lg"
        >
          {isLoading ? "Predicting..." : "Predict Yield"}
        </Button>
      </div>
    </Card>
  );
};