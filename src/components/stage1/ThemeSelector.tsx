
import React from 'react';
import { Card } from '@/components/ui/card';

type TravelTheme = {
  id: string;
  name: string;
  image: string;
};

type ThemeSelectorProps = {
  selectedTheme: string;
  onThemeSelect: (themeId: string) => void;
};

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ selectedTheme, onThemeSelect }) => {
  const themes: TravelTheme[] = [
    { 
      id: 'beach', 
      name: 'Beach', 
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop' 
    },
    { 
      id: 'city', 
      name: 'City', 
      image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2144&auto=format&fit=crop' 
    },
    { 
      id: 'adventure', 
      name: 'Adventure', 
      image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1974&auto=format&fit=crop' 
    },
    { 
      id: 'nature', 
      name: 'Nature', 
      image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=1950&auto=format&fit=crop' 
    },
    { 
      id: 'food', 
      name: 'Food', 
      image: 'https://images.unsplash.com/photo-1548940740-204726a19be3?q=80&w=1969&auto=format&fit=crop' 
    },
    { 
      id: 'culture', 
      name: 'Culture', 
      image: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?q=80&w=2070&auto=format&fit=crop' 
    },
  ];

  return (
    <div className="w-full">
      <h3 className="text-xl font-semibold mb-4">Select your travel theme</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {themes.map((theme) => (
          <Card
            key={theme.id}
            className={`
              overflow-hidden rounded-2xl cursor-pointer transition-all duration-200 border-0
              ${selectedTheme === theme.id ? 'ring-2 ring-[#3c83f6] shadow-md' : 'hover:shadow-md'}
            `}
            onClick={() => onThemeSelect(theme.id)}
          >
            <div className="relative">
              <div className="h-32 relative overflow-hidden">
                <img 
                  src={theme.image} 
                  alt={theme.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>
              </div>
              
              <div className="absolute bottom-0 w-full p-3 text-white">
                <p className="font-medium">{theme.name}</p>
              </div>
              
              {selectedTheme === theme.id && (
                <div className="absolute top-2 right-2">
                  <div className="w-5 h-5 bg-[#3c83f6] rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
