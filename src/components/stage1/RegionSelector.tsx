
import React from 'react';

type Region = {
  id: string;
  name: string;
};

type RegionSelectorProps = {
  selectedRegion: string;
  onRegionSelect: (regionId: string) => void;
};

const RegionSelector: React.FC<RegionSelectorProps> = ({ selectedRegion, onRegionSelect }) => {
  const regions: Region[] = [
    { id: 'anywhere', name: 'Anywhere' },
    { id: 'europe', name: 'Europe' },
    { id: 'asia', name: 'Asia' },
    { id: 'north_america', name: 'North America' },
    { id: 'south_america', name: 'South America' },
    { id: 'africa', name: 'Africa' },
    { id: 'oceania', name: 'Oceania' },
  ];

  return (
    <div className="w-full my-8">
      <h3 className="text-xl font-semibold mb-4">Select your preferred region</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {regions.map((region) => (
          <button
            key={region.id}
            className={`py-2 px-4 rounded-md transition-all ${
              selectedRegion === region.id
                ? 'bg-travel-teal text-white'
                : 'bg-white hover:bg-gray-100 border border-gray-200'
            }`}
            onClick={() => onRegionSelect(region.id)}
          >
            {region.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RegionSelector;
