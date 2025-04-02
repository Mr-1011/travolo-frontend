
import React from 'react';

type TravelTheme = {
  id: string;
  name: string;
  icon: string;
};

type TravelThemesStepProps = {
  selectedThemes: string[];
  onThemesChange: (themes: string[]) => void;
};

const TravelThemesStep: React.FC<TravelThemesStepProps> = ({ 
  selectedThemes, 
  onThemesChange 
}) => {
  const themes: TravelTheme[] = [
    { id: 'culture', name: 'Culture', icon: '🏛️' },
    { id: 'adventure', name: 'Adventure', icon: '⛰️' },
    { id: 'nature', name: 'Nature', icon: '🌿' },
    { id: 'beaches', name: 'Beaches', icon: '🏖️' },
    { id: 'nightlife', name: 'Nightlife', icon: '🎉' },
    { id: 'cuisine', name: 'Cuisine', icon: '🍝' },
    { id: 'wellness', name: 'Wellness', icon: '🧘' },
    { id: 'urban', name: 'Urban', icon: '🌆' },
    { id: 'seclusion', name: 'Seclusion', icon: '🛖' },
  ];

  const handleThemeToggle = (themeId: string) => {
    if (selectedThemes.includes(themeId)) {
      // Remove theme if already selected
      onThemesChange(selectedThemes.filter(id => id !== themeId));
    } else if (selectedThemes.length < 3) {
      // Add theme if under limit
      onThemesChange([...selectedThemes, themeId]);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-2">Select Your Preferred Travel Themes</h2>
      <p className="text-gray-600 mb-6">What kind of experiences are you looking for?</p>
      
      {selectedThemes.length >= 3 && (
        <p className="text-amber-600 mb-4">Maximum 3 themes can be selected</p>
      )}
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {themes.map((theme) => (
          <div
            key={theme.id}
            onClick={() => handleThemeToggle(theme.id)}
            className={`
              flex items-center p-4 rounded-lg cursor-pointer transition-all 
              border-2 shadow-sm card-hover-effect
              ${selectedThemes.includes(theme.id) 
                ? 'border-[#3c83f6] bg-[#3c83f6]/10 text-[#3c83f6]' 
                : 'border-gray-200 hover:border-gray-300'
              }
            `}
          >
            <span className="text-3xl mr-3">{theme.icon}</span>
            <span className="font-medium">{theme.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelThemesStep;
