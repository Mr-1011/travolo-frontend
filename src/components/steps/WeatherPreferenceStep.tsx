
import React from 'react';
import { Slider } from "@/components/ui/slider";
import TemperatureSelector from "../stage1/TemperatureSelector";

type WeatherPreferenceStepProps = {
  weatherPreference: 'warm' | 'cool' | 'specific-range';
  temperatureRange: number[];
  onWeatherPreferenceChange: (preference: 'warm' | 'cool' | 'specific-range') => void;
  onTemperatureRangeChange: (range: number[]) => void;
};

const WeatherPreferenceStep: React.FC<WeatherPreferenceStepProps> = ({ 
  temperatureRange,
  onTemperatureRangeChange 
}) => {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-2">Preferred Weather</h2>
      <p className="text-gray-600 mb-6">What temperature range do you prefer for your trip?</p>
      
      <TemperatureSelector
        temperature={temperatureRange}
        onTemperatureChange={onTemperatureRangeChange}
      />
    </div>
  );
};

export default WeatherPreferenceStep;
