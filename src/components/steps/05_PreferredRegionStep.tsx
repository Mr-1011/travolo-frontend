import React from 'react';
import WorldMap from '../WorldMap';
import { RegionIcon } from '../RegionIcon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const baseColor = "#e2e8f0"; // light gray (slate-200)
// Color for selected regions (used in legend)
const selectedColor = "#3b82f6"; // blue (blue-500)

type Region = {
  id: string;
  name: string;
};

type PreferredRegionStepProps = {
  selectedRegions: string[];
  onRegionChange: (regions: string[]) => void;
};

const PreferredRegionStep: React.FC<PreferredRegionStepProps> = ({
  selectedRegions,
  onRegionChange
}) => {
  const regions: Region[] = [
    { id: 'europe', name: 'Europe' },
    { id: 'asia', name: 'Asia' },
    { id: 'north_america', name: 'North America' },
    { id: 'south_america', name: 'South America' },
    { id: 'africa', name: 'Africa' },
    { id: 'middle_east', name: 'Middle East' },
    { id: 'oceania', name: 'Oceania' },
  ];

  const handleRegionToggle = (regionId: string) => {
    let newRegions;
    if (selectedRegions.includes(regionId)) {
      newRegions = selectedRegions.filter(id => id !== regionId);
    } else {
      newRegions = [...selectedRegions, regionId];
    }
    onRegionChange(newRegions);
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-1">Set Your Preferred Regions</h2>
      <p className="text-gray-600 mb-6">Which areas of the world are you open to?</p>

      <Tabs defaultValue="map" className="w-full">
        <TabsList className="w-full mb-6 grid grid-cols-2">
          <TabsTrigger value="map">Map</TabsTrigger>
          <TabsTrigger value="list">List</TabsTrigger>
        </TabsList>

        <TabsContent value="map">
          <WorldMap
            selectedRegions={selectedRegions}
            onRegionChange={onRegionChange}
          />
          {/* Mobile legend */}
          <div className="flex flex-col gap-1 text-sm bg-white/80 px-3 py-2 rounded md:hidden mt-3">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: baseColor }}></div>
              <span>Unselected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: selectedColor }}></div>
              <span>Selected</span>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="list">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {regions.map((region) => (
              <div
                key={region.id}
                className={`
                  relative flex items-center p-4 rounded-lg border transition-all duration-200 cursor-pointer
                  ${selectedRegions.includes(region.id)
                    ? 'border-[#3c83f6] bg-blue-50'
                    : 'border-gray-200 bg-blue-50/20 hover:bg-blue-50/30'
                  }
                `}
                onClick={() => handleRegionToggle(region.id)}
              >
                <div className="flex items-center w-full">
                  <div className="w-12 h-10 flex-shrink-0 flex items-center justify-center">
                    <RegionIcon regionId={region.id} isSelected={selectedRegions.includes(region.id)} />
                  </div>
                  <span className="font-medium ml-3 flex-grow text-left pl-2 text-gray-700">
                    {region.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PreferredRegionStep;
