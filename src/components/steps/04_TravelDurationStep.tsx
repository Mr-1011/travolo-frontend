import React from 'react';

type Duration = {
  id: string;
  name: string;
  days: string;
  icon?: string;
  imageSrc?: string;
};

type TravelDurationStepProps = {
  selectedDuration: string[];
  onDurationSelect: (durationId: string) => void;
};

const TravelDurationStep: React.FC<TravelDurationStepProps> = ({
  selectedDuration,
  onDurationSelect
}) => {
  const durations: Duration[] = [
    { id: 'day-trip', name: 'Day trip', days: '1 day', imageSrc: '/icons/day-trip.png' },
    { id: 'weekend', name: 'Weekend', days: '2–3 days', imageSrc: '/icons/weekend.png' },
    { id: 'short', name: 'Short trip', days: '4–6 days', imageSrc: '/icons/short-trip.png' },
    { id: 'week', name: 'One week', days: '7–9 days', imageSrc: '/icons/one-week.png' },
    { id: 'long', name: 'Long trip', days: '10+ days', imageSrc: '/icons/long-trip.png' },
  ];

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-1">How long do you want your trip to be?</h2>
      <p className="text-gray-600 mb-6">Select all the durations that best describe your ideal trip.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {durations.map((duration) => (
          <div
            key={duration.id}
            className={`
              relative flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer
              ${selectedDuration.includes(duration.id)
                ? 'border-[#3c83f6] bg-blue-50 shadow-sm'
                : 'border-gray-200 bg-gray-50 hover:border-gray-300'
              }
            `}
            onClick={() => onDurationSelect(duration.id)}
          >
            {duration.imageSrc ? (
              <img
                src={duration.imageSrc}
                alt={duration.name}
                className="w-14 h-14 mb-2"
                style={{ filter: 'drop-shadow(0 2px 3px rgba(0, 21, 255, 0.10))' }}
                draggable="false"
              />
            ) : (
              <span className="text-3xl mb-2">{duration.icon}</span>
            )}
            <span className={`font-medium ${selectedDuration.includes(duration.id) ? 'text-[#3c83f6]' : 'text-gray-700'}`}>{duration.name}</span>
            <span className="text-sm mt-1 text-gray-600">{duration.days}</span>
            {selectedDuration.includes(duration.id) && (
              <div className="absolute top-2 right-2 w-5 h-5 bg-[#3c83f6] rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelDurationStep;
