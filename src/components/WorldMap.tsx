import React from 'react';
import SvgComponent from './SvgComponent'; // Import the SvgComponent

type WorldMapProps = {
  selectedRegions: string[];
  onRegionChange: (regions: string[]) => void;
};

const WorldMap: React.FC<WorldMapProps> = ({ selectedRegions, onRegionChange }) => {
  const handleRegionClick = (regionId: string) => {
    let newRegions;
    if (selectedRegions.includes(regionId)) {
      newRegions = selectedRegions.filter(id => id !== regionId);
    } else {
      newRegions = [...selectedRegions, regionId];
    }
    onRegionChange(newRegions);
  };

  const baseColor = "#e2e8f0"; // light gray (slate-200)
  const selectedColor = "#3b82f6"; // blue (blue-500)

  return (
    <div className="w-full relative">
      <SvgComponent
        selectedRegions={selectedRegions}
        onRegionClick={handleRegionClick}
        className="w-full max-w-4xl h-auto border rounded-lg mx-auto"
        aria-label="World Map"
      />

      <div className="absolute bottom-4 left-4 flex flex-col gap-1 text-sm bg-white/80 px-3 py-2 rounded hidden md:flex">
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

export default WorldMap; 