
import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

type WeatherPreferenceStepProps = {
  weatherPreference: 'warm' | 'cool' | 'specific-range';
  temperatureRange: number[];
  onWeatherPreferenceChange: (preference: 'warm' | 'cool' | 'specific-range') => void;
  onTemperatureRangeChange: (range: number[]) => void;
};

const WeatherPreferenceStep: React.FC<WeatherPreferenceStepProps> = ({ 
  weatherPreference,
  temperatureRange,
  onWeatherPreferenceChange,
  onTemperatureRangeChange 
}) => {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-2">Preferred Weather</h2>
      <p className="text-gray-600 mb-6">What kind of climate do you prefer for your trip?</p>
      
      <RadioGroup 
        value={weatherPreference} 
        onValueChange={(value) => onWeatherPreferenceChange(value as 'warm' | 'cool' | 'specific-range')}
        className="space-y-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="warm" id="warm" />
          <Label htmlFor="warm" className="text-lg cursor-pointer">I prefer warm places ☀️</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="cool" id="cool" />
          <Label htmlFor="cool" className="text-lg cursor-pointer">I prefer cooler places ❄️</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="specific-range" id="specific-range" />
          <Label htmlFor="specific-range" className="text-lg cursor-pointer">Let me choose a specific range</Label>
        </div>
      </RadioGroup>
      
      {weatherPreference === 'specific-range' && (
        <div className="mt-8 mb-4">
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-2">
              <span className="flex items-center text-lg">❄️ Cold ({temperatureRange[0]}°C)</span>
              <span className="text-[#3c83f6] font-bold text-lg">→</span>
              <span className="flex items-center text-lg">Hot ({temperatureRange[1]}°C) ☀️</span>
            </div>
            <Slider 
              defaultValue={temperatureRange} 
              min={5} 
              max={35} 
              step={1}
              onValueChange={onTemperatureRangeChange}
              className="w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherPreferenceStep;
