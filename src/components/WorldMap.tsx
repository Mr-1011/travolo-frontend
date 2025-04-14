import React from 'react';
import SvgComponent from './SvgComponent'; // Import the SvgComponent

type WorldMapProps = {
  selectedRegions: string[];
  onRegionChange: (regions: string[]) => void;
};

const allRegionIds = ['north_america', 'south_america', 'europe', 'africa', 'middle_east', 'asia', 'oceania'];

const WorldMap: React.FC<WorldMapProps> = ({ selectedRegions, onRegionChange }) => {
  const handleRegionClick = (regionId: string) => {
    if (regionId === 'anywhere') {
      // If "Anywhere" is selected, clear other selections
      if (selectedRegions.includes('anywhere')) {
        onRegionChange(selectedRegions.filter(id => id !== 'anywhere'));
      } else {
        // Select all regions *except* 'anywhere'
        onRegionChange(['anywhere']);
      }
    } else {
      // Handle normal region toggle
      let newRegions;
      if (selectedRegions.includes(regionId)) {
        // Deselect the clicked region
        newRegions = selectedRegions.filter(id => id !== regionId);
      } else {
        // Select the clicked region
        // Remove "Anywhere" if it was selected
        newRegions = [...selectedRegions.filter(id => id !== 'anywhere'), regionId];
      }
      onRegionChange(newRegions);
    }
  };

  // Base color for unselected regions (used in legend)
  const baseColor = "#e2e8f0"; // light gray (slate-200)
  // Color for selected regions (used in legend)
  const selectedColor = "#3b82f6"; // blue (blue-500)

  const isAnywhereSelected = selectedRegions.includes('anywhere');
  const displayedRegions = isAnywhereSelected ? allRegionIds : selectedRegions;

  return (
    <div className="w-full relative">
      {/* Render the SvgComponent with props */}
      <SvgComponent
        selectedRegions={displayedRegions} // Pass displayedRegions based on 'anywhere' state
        onRegionClick={handleRegionClick}
        className="w-full max-w-4xl h-auto border rounded-lg mx-auto"
        aria-label="World Map"
      />

      {/* Legend at the bottom left, stacked vertically */}
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