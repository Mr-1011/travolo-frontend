
import React from 'react';

type Activity = {
  id: string;
  name: string;
  icon: string;
};

type ActivitySelectorProps = {
  selectedActivities: string[];
  onActivityToggle: (activityId: string) => void;
};

const ActivitySelector: React.FC<ActivitySelectorProps> = ({ selectedActivities, onActivityToggle }) => {
  const activities: Activity[] = [
    { id: 'hiking', name: 'Hiking', icon: '🥾' },
    { id: 'museums', name: 'Museums', icon: '🏛️' },
    { id: 'beaches', name: 'Beaches', icon: '🏖️' },
    { id: 'food_tours', name: 'Food tours', icon: '🍽️' },
    { id: 'nightlife', name: 'Nightlife', icon: '🌃' },
    { id: 'cultural_events', name: 'Cultural events', icon: '🎭' },
    { id: 'wildlife', name: 'Wildlife watching', icon: '🦓' },
    { id: 'photography', name: 'Photography', icon: '📸' },
    { id: 'markets', name: 'Local markets', icon: '🛍️' },
    { id: 'historical_sites', name: 'Historical sites', icon: '🏰' },
    { id: 'shopping', name: 'Shopping', icon: '🛒' },
  ];

  return (
    <div className="w-full">
      <h3 className="text-xl font-semibold mb-2">Drag your ideal activities into your suitcase</h3>
      <p className="text-gray-500 mb-4">Select the activities you enjoy most while traveling</p>
      
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className={`flex items-center p-3 rounded-md cursor-pointer transition-all ${
                selectedActivities.includes(activity.id)
                  ? 'bg-travel-teal text-white'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
              onClick={() => onActivityToggle(activity.id)}
            >
              <span className="text-xl mr-2">{activity.icon}</span>
              <span>{activity.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivitySelector;
