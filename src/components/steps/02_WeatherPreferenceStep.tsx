import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

type WeatherPreferenceStepProps = {
  temperatureRange: number[];
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
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <div className="flex flex-col items-center">
                  <span className="text-lg mb-1">❄️ Minimum</span>
                  <span className="text-2xl font-bold text-[#3c83f6]">{temperatureRange[0]}°C</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-lg mb-1">Maximum ☀️</span>
                  <span className="text-2xl font-bold text-[#3c83f6]">{temperatureRange[1]}°C</span>
                </div>
              </div>

              <div className="mt-6 mb-2">
                <SliderPrimitive.Root
                  className="relative flex w-full touch-none select-none items-center"
                  value={temperatureRange}
                  min={-10}
                  max={40}
                  step={1}
                  onValueChange={onTemperatureRangeChange}
                >
                  <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-200">
                    <SliderPrimitive.Range className="absolute h-full bg-[#3c83f6]" />
                  </SliderPrimitive.Track>

                  <SliderPrimitive.Thumb
                    className="block h-5 w-5 rounded-full border-2 border-white bg-[#3c83f6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                    aria-label="Minimum temperature"
                  />

                  <SliderPrimitive.Thumb
                    className="block h-5 w-5 rounded-full border-2 border-white bg-[#3c83f6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                    aria-label="Maximum temperature"
                  />
                </SliderPrimitive.Root>
              </div>

              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>Very Cold (-10°C)</span>
                <span>Very Hot (40°C)</span>
              </div>

              <p className="text-center mt-6 text-gray-600">
                Drag both handles to set your preferred temperature range for your vacation
              </p>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default WeatherPreferenceStep;
