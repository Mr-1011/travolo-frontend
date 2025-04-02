import React from 'react';
import WorldMap from './WorldMap';

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

      {/* Show selected regions as text below the map */}
      <div className="mt-4">
        <p className="text-sm font-medium">Selected regions:</p>
        <div className="flex flex-wrap gap-2 mt-1">
          {selectedRegions.length === 0 ? (
            <span className="text-gray-500 text-sm">None selected</span>
          ) : (
            selectedRegions.map(regionId => (
              <span
                key={regionId}
                className="inline-block bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded"
              >
                {regions.find(r => r.id === regionId)?.name || regionId}
              </span>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PreferredRegionStep;
