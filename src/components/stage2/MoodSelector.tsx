
import React from 'react';

type Mood = {
  id: string;
  name: string;
  icon: string;
};

type MoodSelectorProps = {
  selectedMood: string;
  onMoodSelect: (moodId: string) => void;
};

const MoodSelector: React.FC<MoodSelectorProps> = ({ selectedMood, onMoodSelect }) => {
  const moods: Mood[] = [
    { id: 'relaxed', name: 'Relaxed', icon: '😌' },
    { id: 'adventurous', name: 'Adventurous', icon: '🤠' },
    { id: 'romantic', name: 'Romantic', icon: '❤️' },
    { id: 'social', name: 'Social', icon: '🎉' },
    { id: 'cultural', name: 'Cultural', icon: '🏛️' },
    { id: 'productive', name: 'Productive', icon: '💼' },
  ];

  return (
    <div className="w-full my-8">
      <h3 className="text-xl font-semibold mb-4">What mood or vibe are you looking for?</h3>
      <div className="flex flex-wrap gap-4 justify-center">
        {moods.map((mood) => (
          <div
            key={mood.id}
            className={`flex flex-col items-center p-4 rounded-full cursor-pointer transition-all ${
              selectedMood === mood.id
                ? 'bg-travel-teal text-white scale-110 shadow-md'
                : 'bg-white border border-gray-200 hover:scale-105'
            }`}
            style={{ width: '90px', height: '90px' }}
            onClick={() => onMoodSelect(mood.id)}
          >
            <span className="text-3xl mb-1">{mood.icon}</span>
            <span className="text-sm font-medium">{mood.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;
