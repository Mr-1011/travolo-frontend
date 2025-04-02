
import React from 'react';

type TravelTheme = {
  id: string;
  name: string;
  image: string;
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
    { 
      id: 'culture', 
      name: 'Culture', 
      image: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?q=80&w=2070&auto=format&fit=crop' 
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
      id: 'beaches', 
      name: 'Beaches', 
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop' 
    },
    { 
      id: 'nightlife', 
      name: 'Nightlife', 
      image: 'https://images.unsplash.com/photo-1520031662976-7305054abd25?q=80&w=1974&auto=format&fit=crop' 
    },
    { 
      id: 'cuisine', 
      name: 'Cuisine', 
      image: 'https://images.unsplash.com/photo-1548940740-204726a19be3?q=80&w=1969&auto=format&fit=crop' 
    },
    { 
      id: 'wellness', 
      name: 'Wellness', 
      image: 'https://images.unsplash.com/photo-1519766224971-ee4a5eff2b34?q=80&w=1974&auto=format&fit=crop' 
    },
    { 
      id: 'urban', 
      name: 'Urban', 
      image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2144&auto=format&fit=crop' 
    },
    { 
      id: 'seclusion', 
      name: 'Seclusion', 
      image: 'https://images.unsplash.com/photo-1615116598601-22686f70e9a7?q=80&w=1974&auto=format&fit=crop' 
    },
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
              relative rounded-lg cursor-pointer transition-all 
              border-2 shadow-sm card-hover-effect overflow-hidden
              ${selectedThemes.includes(theme.id) 
                ? 'border-[#3c83f6] ring-2 ring-[#3c83f6]' 
                : 'border-gray-200 hover:border-gray-300'
              }
            `}
          >
            <div className="relative h-48 w-full">
              <img 
                src={theme.image} 
                alt={theme.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>
              <div className="absolute bottom-0 w-full p-3 text-white">
                <p className="font-medium text-xl tracking-wide text-shadow-lg">{theme.name}</p>
              </div>
              
              {selectedThemes.includes(theme.id) && (
                <div className="absolute top-2 right-2">
                  <div className="w-5 h-5 bg-[#3c83f6] rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelThemesStep;
