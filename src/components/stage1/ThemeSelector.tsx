
import React from 'react';

type TravelTheme = {
  id: string;
  name: string;
  icon: string;
};

type ThemeSelectorProps = {
  selectedTheme: string;
  onThemeSelect: (themeId: string) => void;
};

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ selectedTheme, onThemeSelect }) => {
  const themes: TravelTheme[] = [
    { id: 'beach', name: 'Beach', icon: '🏖️' },
    { id: 'city', name: 'City', icon: '🏙️' },
    { id: 'adventure', name: 'Adventure', icon: '⛰️' },
    { id: 'nature', name: 'Nature', icon: '🌲' },
    { id: 'food', name: 'Food', icon: '🍜' },
    { id: 'culture', name: 'Culture', icon: '🏛️' },
  ];

  return (
    <div className="w-full">
      <h3 className="text-xl font-semibold mb-4">Select your travel theme</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {themes.map((theme) => (
          <div
            key={theme.id}
            className={`theme-card ${
              selectedTheme === theme.id ? 'border-2 border-travel-blue bg-blue-50' : ''
            }`}
            onClick={() => onThemeSelect(theme.id)}
          >
            <span className="theme-icon">{theme.icon}</span>
            <span className="font-medium">{theme.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
