import React from 'react';
import WorldMap from '../WorldMap';

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
    </div>
  );
};

export default PreferredRegionStep;
