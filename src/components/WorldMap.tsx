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
    <div className="w-full flex flex-col items-center"> {/* Center content */}
      {/* Render the SvgComponent with props */}
      <SvgComponent
        selectedRegions={displayedRegions} // Pass displayedRegions based on 'anywhere' state
        onRegionClick={handleRegionClick}
        className="w-full max-w-4xl h-auto border rounded-lg mb-4" // Limit max width, add margin
        aria-label="World Map"
      />

      {/* Anywhere button - Keep outside the SVG for easier layout */}
      <button
        onClick={() => handleRegionClick('anywhere')}
        className={`px-4 py-2 rounded-full border transition-colors ${isAnywhereSelected
          ? 'bg-blue-500 text-white border-blue-500'
          : 'bg-slate-300 text-slate-700 border-slate-300 hover:bg-slate-400'
          }`}
      >
        Anywhere
      </button>

      {/* Legend showing which colors represent selected/unselected */}
      <div className="flex items-center gap-4 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: baseColor }}></div> {/* Rounded legend color box */}
          <span>Unselected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: selectedColor }}></div> {/* Rounded legend color box */}
          <span>Selected</span>
        </div>
      </div>
    </div>
  );
};

export default WorldMap; 