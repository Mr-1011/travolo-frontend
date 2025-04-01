
import React from 'react';

type Duration = {
  id: string;
  name: string;
  days: string;
  icon: string;
};

type DurationSelectorProps = {
  selectedDuration: string;
  onDurationSelect: (durationId: string) => void;
};

const DurationSelector: React.FC<DurationSelectorProps> = ({ selectedDuration, onDurationSelect }) => {
  const durations: Duration[] = [
    { id: 'weekend', name: 'Weekend', days: '2-3 days', icon: '🏃' },
    { id: 'short', name: 'Short', days: '4-5 days', icon: '⏱️' },
    { id: 'week', name: 'One Week', days: '6-8 days', icon: '📅' },
    { id: 'long', name: 'Long', days: '9+ days', icon: '🏝️' },
  ];

  return (
    <div className="w-full my-8">
      <h3 className="text-xl font-semibold mb-4">Preferred trip duration</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {durations.map((duration) => (
          <div
            key={duration.id}
            className={`flex flex-col items-center p-4 rounded-lg cursor-pointer transition-all ${
              selectedDuration === duration.id
                ? 'bg-travel-teal text-white'
                : 'bg-white border border-gray-200 hover:bg-gray-100'
            }`}
            onClick={() => onDurationSelect(duration.id)}
          >
            <span className="text-3xl mb-1">{duration.icon}</span>
            <span className="font-medium">{duration.name}</span>
            <span className="text-sm mt-1">{duration.days}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DurationSelector;
