import React, { useState } from 'react';

type TravelTheme = {
  id: string;
  name: string;
  description: string;
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
  // Track hover state for each theme card
  const [hoveredTheme, setHoveredTheme] = useState<string | null>(null);

  const themes: TravelTheme[] = [
    {
      id: 'culture',
      name: 'Culture',
      description: 'Experience the rich history and traditions of a destination.',
      image: '/images/culture.jpg'
    },
    {
      id: 'adventure',
      name: 'Adventure',
      description: 'Explore new places and push your limits.',
      image: '/images/adventure.jpg'
    },
    {
      id: 'nature',
      name: 'Nature',
      description: 'Connect with nature and immerse yourself in the beauty of the world.',
      image: '/images/nature.jpg'
    },
    {
      id: 'beaches',
      name: 'Beaches',
      description: 'Relax on the beach and enjoy the sun and sand.',
      image: '/images/beach.jpg'
    },
    {
      id: 'nightlife',
      name: 'Nightlife',
      description: 'Experience the vibrant nightlife of a destination.',
      image: '/images/nightlife.jpg'
    },
    {
      id: 'cuisine',
      name: 'Cuisine',
      description: 'Explore the local cuisine and culinary scene.',
      image: '/images/cuisine.jpg'
    },
    {
      id: 'wellness',
      name: 'Wellness',
      description: 'Focus on health and wellness during your travels.',
      image: '/images/wellness.jpg'
    },
    {
      id: 'urban',
      name: 'Urban',
      description: 'Experience the bustling energy of a city.',
      image: '/images/urban.jpg'
    },
    {
      id: 'seclusion',
      name: 'Seclusion',
      description: 'Find peace and tranquility in a secluded destination.',
      image: '/images/seclusion.jpg'
    },
  ];

  const handleThemeToggle = (themeId: string) => {
    if (selectedThemes.includes(themeId)) {
      onThemesChange(selectedThemes.filter(id => id !== themeId));
    } else {
      onThemesChange([...selectedThemes, themeId]);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-2">Select Your Preferred Travel Themes</h2>
      <p className="text-gray-600 mb-6">What kind of experiences are you looking for?</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {themes.map((theme) => (
          <div
            key={theme.id}
            onClick={() => handleThemeToggle(theme.id)}
            onMouseEnter={() => setHoveredTheme(theme.id)}
            onMouseLeave={() => setHoveredTheme(null)}
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
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>
              <div className="absolute bottom-0 w-full p-3 text-white">
                <p
                  className={`
                    font-medium text-2xl tracking-wide text-shadow-lg
                    transition-transform duration-200 ease-in-out
                    ${hoveredTheme === theme.id || selectedThemes.includes(theme.id) ? 'transform -translate-y-1' : ''}
                  `}
                >
                  {theme.name}
                </p>
                <p
                  className={`
                    text-sm text-gray-300 
                    transition-all duration-200 ease-in-out
                    ${hoveredTheme === theme.id || selectedThemes.includes(theme.id)
                      ? 'opacity-100 max-h-16 transform translate-y-0'
                      : 'opacity-0 max-h-0 transform translate-y-4 overflow-hidden'
                    }
                  `}
                >
                  {theme.description}
                </p>
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
