import React from 'react';

type WorldMapProps = {
  selectedRegions: string[];
  onRegionChange: (regions: string[]) => void;
};

const WorldMap: React.FC<WorldMapProps> = ({ selectedRegions, onRegionChange }) => {
  const handleRegionClick = (regionId: string) => {
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

  // Base color for unselected regions
  const baseColor = "#e2e8f0"; // light gray
  // Color for selected regions
  const selectedColor = "#3b82f6"; // blue

  return (
    <div className="w-full">
      <svg
        viewBox="0 0 1000 500"
        className="w-full h-auto border rounded-lg"
        aria-label="World Map"
      >
        {/* Europe */}
        <path
          d="M500 170 L550 150 L580 155 L590 170 L570 190 L560 210 L530 220 L500 210 L490 190 z"
          fill={selectedRegions.includes('europe') ? selectedColor : baseColor}
          stroke="#fff"
          strokeWidth="2"
          onClick={() => handleRegionClick('europe')}
          className="cursor-pointer hover:opacity-80 transition-opacity"
          aria-label="Europe"
        />

        {/* Asia */}
        <path
          d="M590 170 L650 150 L700 160 L720 180 L710 240 L670 260 L630 250 L600 230 L580 210 L570 190 z"
          fill={selectedRegions.includes('asia') ? selectedColor : baseColor}
          stroke="#fff"
          strokeWidth="2"
          onClick={() => handleRegionClick('asia')}
          className="cursor-pointer hover:opacity-80 transition-opacity"
          aria-label="Asia"
        />

        {/* Africa */}
        <path
          d="M500 210 L530 220 L550 240 L560 270 L540 320 L520 330 L490 310 L480 270 L490 240 z"
          fill={selectedRegions.includes('africa') ? selectedColor : baseColor}
          stroke="#fff"
          strokeWidth="2"
          onClick={() => handleRegionClick('africa')}
          className="cursor-pointer hover:opacity-80 transition-opacity"
          aria-label="Africa"
        />

        {/* North America */}
        <path
          d="M300 150 L350 140 L400 160 L380 200 L350 240 L320 230 L290 200 L280 170 z"
          fill={selectedRegions.includes('north_america') ? selectedColor : baseColor}
          stroke="#fff"
          strokeWidth="2"
          onClick={() => handleRegionClick('north_america')}
          className="cursor-pointer hover:opacity-80 transition-opacity"
          aria-label="North America"
        />

        {/* South America */}
        <path
          d="M350 240 L370 260 L380 300 L360 340 L330 320 L320 280 L330 250 z"
          fill={selectedRegions.includes('south_america') ? selectedColor : baseColor}
          stroke="#fff"
          strokeWidth="2"
          onClick={() => handleRegionClick('south_america')}
          className="cursor-pointer hover:opacity-80 transition-opacity"
          aria-label="South America"
        />

        {/* Middle East */}
        <path
          d="M560 210 L580 210 L600 230 L590 250 L570 260 L550 240 L530 220 z"
          fill={selectedRegions.includes('middle_east') ? selectedColor : baseColor}
          stroke="#fff"
          strokeWidth="2"
          onClick={() => handleRegionClick('middle_east')}
          className="cursor-pointer hover:opacity-80 transition-opacity"
          aria-label="Middle East"
        />

        {/* Anywhere button at the bottom */}
        <g onClick={() => handleRegionClick('anywhere')} className="cursor-pointer">
          <rect
            x="450"
            y="400"
            width="100"
            height="30"
            rx="15"
            fill={selectedRegions.includes('anywhere') ? selectedColor : "#cbd5e1"}
            className="hover:opacity-80 transition-opacity"
          />
          <text
            x="500"
            y="420"
            textAnchor="middle"
            fill="#fff"
            fontSize="14"
            fontWeight="bold"
          >
            Anywhere
          </text>
        </g>

        {/* Region labels */}
        <text x="525" y="180" fontSize="12" textAnchor="middle">Europe</text>
        <text x="650" y="200" fontSize="12" textAnchor="middle">Asia</text>
        <text x="520" y="280" fontSize="12" textAnchor="middle">Africa</text>
        <text x="330" y="190" fontSize="12" textAnchor="middle">North America</text>
        <text x="350" y="300" fontSize="12" textAnchor="middle">South America</text>
        <text x="570" y="235" fontSize="12" textAnchor="middle">Middle East</text>
      </svg>

      {/* Legend showing which colors represent selected/unselected */}
      <div className="flex items-center gap-4 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4" style={{ backgroundColor: baseColor }}></div>
          <span>Unselected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4" style={{ backgroundColor: selectedColor }}></div>
          <span>Selected</span>
        </div>
      </div>
    </div>
  );
};

export default WorldMap; 