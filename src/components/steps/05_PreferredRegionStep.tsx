import React from 'react';
import WorldMap from '../WorldMap';

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
    { id: 'anywhere', name: 'Anywhere' },
  ];

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-2">Preferred Region</h2>
      <p className="text-gray-600 mb-6">Which areas of the world are you open to?</p>

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
    </div>
  );
};

export default PreferredRegionStep;
