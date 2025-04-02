
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

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
    { id: 'oceania', name: 'Oceania' },
    { id: 'middle_east', name: 'Middle East' },
    { id: 'caribbean', name: 'Caribbean' },
    { id: 'anywhere', name: 'Anywhere' },
  ];

  const handleRegionToggle = (regionId: string) => {
    if (regionId === 'anywhere') {
      // If "Anywhere" is selected, clear other selections
      if (selectedRegions.includes('anywhere')) {
        onRegionChange(selectedRegions.filter(id => id !== 'anywhere'));
      } else {
        onRegionChange(['anywhere']);
      }
    } else {
      // Handle normal region toggle
      if (selectedRegions.includes(regionId)) {
        onRegionChange(selectedRegions.filter(id => id !== regionId));
      } else {
        // Remove "Anywhere" if it was selected
        const newRegions = selectedRegions.filter(id => id !== 'anywhere');
        onRegionChange([...newRegions, regionId]);
      }
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-2">Preferred Region</h2>
      <p className="text-gray-600 mb-6">Which areas of the world are you open to?</p>
      
      {/* Would be ideal to add a world map visual here */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {regions.map((region) => (
          <div 
            key={region.id}
            className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50"
          >
            <Checkbox 
              id={`region-${region.id}`}
              checked={selectedRegions.includes(region.id)}
              onCheckedChange={() => handleRegionToggle(region.id)}
            />
            <Label 
              htmlFor={`region-${region.id}`}
              className="cursor-pointer"
            >
              {region.name}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreferredRegionStep;
