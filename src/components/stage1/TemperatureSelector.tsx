
import React from 'react';
import { Slider } from '@/components/ui/slider';

type TemperatureSelectorProps = {
  temperature: number[];
  onTemperatureChange: (value: number[]) => void;
};

const TemperatureSelector: React.FC<TemperatureSelectorProps> = ({ temperature, onTemperatureChange }) => {
  return (
    <div className="w-full my-8">
      <h3 className="text-xl font-semibold mb-4">Select your ideal temperature</h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="flex items-center text-lg">❄️ Cold (~5°C)</span>
          <span className="text-travel-teal font-bold text-lg">{temperature[0]}°C</span>
          <span className="flex items-center text-lg">Hot (~35°C) ☀️</span>
        </div>
        <Slider 
          defaultValue={temperature} 
          min={5} 
          max={35} 
          step={1}
          onValueChange={onTemperatureChange}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default TemperatureSelector;
