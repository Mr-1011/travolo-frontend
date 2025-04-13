
import React from 'react';

type Duration = {
  id: string;
  name: string;
  days: string;
  icon: string;
};

type TravelDurationStepProps = {
  selectedDuration: string;
  onDurationSelect: (durationId: string) => void;
};

const TravelDurationStep: React.FC<TravelDurationStepProps> = ({ 
  selectedDuration, 
  onDurationSelect 
}) => {
  const durations: Duration[] = [
    { id: 'day-trip', name: 'Day trip', days: '1 day', icon: '🚌' },
    { id: 'weekend', name: 'Weekend', days: '2–3 days', icon: '📅' },
    { id: 'short', name: 'Short trip', days: '4–6 days', icon: '🧳' },
    { id: 'week', name: 'One week', days: '7–9 days', icon: '🧭' },
    { id: 'long', name: 'Long trip', days: '10+ days', icon: '🌍' },
  ];

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-2">Ideal Travel Duration</h2>
      <p className="text-gray-600 mb-6">How long do you want your trip to be?</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {durations.map((duration) => (
          <div
            key={duration.id}
            className={`
              flex flex-col items-center justify-center p-4 rounded-lg cursor-pointer transition-all
              ${selectedDuration === duration.id
                ? 'bg-[#3c83f6] text-white shadow-md'
                : 'bg-white border border-gray-200 hover:bg-gray-50'
              }
            `}
            onClick={() => onDurationSelect(duration.id)}
          >
            <span className="text-3xl mb-2">{duration.icon}</span>
            <span className="font-medium">{duration.name}</span>
            <span className="text-sm mt-1">{duration.days}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelDurationStep;
