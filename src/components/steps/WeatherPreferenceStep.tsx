
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from '@/components/ui/slider';

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
    <div className="w-full h-full flex flex-col">
      <ScrollArea className="flex-1">
        <div className="pr-4 pb-4">
          <h2 className="text-2xl font-bold mb-2">Preferred Weather</h2>
          <p className="text-gray-600 mb-6">What temperature range do you prefer for your trip?</p>
          
          <div className="w-full my-8">
            <h3 className="text-xl font-semibold mb-4">Select your ideal temperature</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="flex items-center text-lg">❄️ Cold (~5°C)</span>
                <span className="text-[#3c83f6] font-bold text-lg">{temperatureRange[0]}°C</span>
                <span className="flex items-center text-lg">Hot (~35°C) ☀️</span>
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
        </div>
      </ScrollArea>
    </div>
  );
};

export default WeatherPreferenceStep;
