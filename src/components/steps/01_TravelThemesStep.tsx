import React, { useState } from 'react';

type TravelTheme = {
  id: string;
  name: string;
  description: string;
  image: string;
};

type TravelThemesStepProps = {
  themeRatings: Record<string, number>;
  onThemesChange: (selectedThemeIds: string[]) => void;
};

const TravelThemesStep: React.FC<TravelThemesStepProps> = ({
  themeRatings = {},
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
    // Ensure themeRatings is treated as an object even if initially undefined/empty
    const currentRatings = themeRatings || {};
    // Determine the current list of selected themes (rating === 5)
    const currentlySelectedIds = Object.entries(currentRatings)
      .filter(([, rating]) => rating === 5)
      .map(([id]) => id);

    let newSelectedIds: string[];
    if (currentlySelectedIds.includes(themeId)) {
      // If currently selected, remove it
      newSelectedIds = currentlySelectedIds.filter(id => id !== themeId);
    } else {
      // If not selected, add it
      newSelectedIds = [...currentlySelectedIds, themeId];
    }
    // Call the callback with the updated list of selected theme IDs
    onThemesChange(newSelectedIds);
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
              ${(themeRatings || {})[theme.id] === 5
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
                className="w-full h-full object-cover transition-opacity duration-500"
              />
              {/* Dynamically set gradient based on hover state */}
              <div
                className={`
                  absolute inset-0 bg-gradient-to-b to-black/80
                  transition-all duration-200 ease-in-out
                  ${hoveredTheme === theme.id || (themeRatings || {})[theme.id] === 5
                    ? 'from-transparent from-30%' // Hovered or Selected state: start gradient at 30%
                    : 'from-transparent from-60%' // Default state: start gradient at 60%
                  }
                `}
              ></div>
              <div className="absolute bottom-0 w-full p-3 text-white">
                <p
                  className={`
                    font-medium text-2xl tracking-wide text-shadow-lg
                    transition-transform duration-200 ease-in-out
                    ${hoveredTheme === theme.id || (themeRatings || {})[theme.id] === 5 ? 'transform -translate-y-1' : ''}
                  `}
                >
                  {theme.name}
                </p>
                <p
                  className={`
                    text-sm text-gray-300 
                    transition-all duration-200 ease-in-out
                    ${hoveredTheme === theme.id || (themeRatings || {})[theme.id] === 5
                      ? 'opacity-100 max-h-16 transform translate-y-0'
                      : 'opacity-0 max-h-0 transform translate-y-4 overflow-hidden'
                    }
                  `}
                >
                  {theme.description}
                </p>
              </div>

              {(themeRatings || {})[theme.id] === 5 && (
                <div className="absolute top-2 right-2">
                  <div className="w-6 h-6 bg-[#3c83f6] rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
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
