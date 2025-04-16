import React, { useState } from 'react';
import { UserPreferences } from '@/types'; // Import UserPreferences

type TravelTheme = {
  id: string;
  name: string;
  description: string;
  image_url: string;
};

// Define the props required for the theme values
type ThemeValuesProps = Pick<UserPreferences, 'culture' | 'adventure' | 'nature' | 'beaches' | 'nightlife' | 'cuisine' | 'wellness' | 'urban' | 'seclusion'>;

type TravelThemesStepProps = {
  // Accept individual theme values
  themeValues: ThemeValuesProps;
  // Change handler prop name and signature
  onThemeToggle: (themeId: keyof ThemeValuesProps) => void;
  // themeRatings: Record<string, number>; // Removed
  // onThemesChange: (selectedThemeIds: string[]) => void; // Removed
};

const TravelThemesStep: React.FC<TravelThemesStepProps> = ({ themeValues, onThemeToggle }) => {
  // Track hover state for each theme card
  const [hoveredTheme, setHoveredTheme] = useState<string | null>(null);

  const themes: TravelTheme[] = [
    {
      id: 'culture',
      name: 'Culture',
      description: 'Experience the rich history and traditions of a destination.',
      image_url: '/images/culture.jpg'
    },
    {
      id: 'adventure',
      name: 'Adventure',
      description: 'Explore new places and push your limits.',
      image_url: '/images/adventure.jpg'
    },
    {
      id: 'nature',
      name: 'Nature',
      description: 'Connect with nature and immerse yourself in the beauty of the world.',
      image_url: '/images/nature.jpg'
    },
    {
      id: 'beaches',
      name: 'Beaches',
      description: 'Relax on the beach and enjoy the sun and sand.',
      image_url: '/images/beach.jpg'
    },
    {
      id: 'nightlife',
      name: 'Nightlife',
      description: 'Experience the vibrant nightlife of a destination.',
      image_url: '/images/nightlife.jpg'
    },
    {
      id: 'cuisine',
      name: 'Cuisine',
      description: 'Explore the local cuisine and culinary scene.',
      image_url: '/images/cuisine.jpg'
    },
    {
      id: 'wellness',
      name: 'Wellness',
      description: 'Focus on health and wellness during your travels.',
      image_url: '/images/wellness.jpg'
    },
    {
      id: 'urban',
      name: 'Urban',
      description: 'Experience the bustling energy of a city.',
      image_url: '/images/urban.jpg'
    },
    {
      id: 'seclusion',
      name: 'Seclusion',
      description: 'Find peace and tranquility in a secluded destination.',
      image_url: '/images/seclusion.jpg'
    },
  ];

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-2">Select Your Preferred Travel Themes</h2>
      <p className="text-gray-600 mb-6">What kind of experiences are you looking for?</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {themes.map((theme) => (
          <div
            key={theme.id}
            onClick={() => onThemeToggle(theme.id as keyof ThemeValuesProps)}
            onMouseEnter={() => setHoveredTheme(theme.id)}
            onMouseLeave={() => setHoveredTheme(null)}
            className={`
              relative rounded-lg cursor-pointer transition-all 
              border-2 shadow-sm card-hover-effect overflow-hidden
              ${themeValues[theme.id as keyof ThemeValuesProps] === 5
                ? 'border-[#3c83f6] ring-2 ring-[#3c83f6]'
                : 'border-gray-200 hover:border-gray-300'
              }
            `}
          >
            <div className="relative h-48 w-full">
              <img
                src={theme.image_url}
                alt={theme.name}
                loading="lazy"
                className="w-full h-full object-cover transition-opacity duration-500"
              />
              {/* Dynamically set gradient based on hover state */}
              <div
                className={`
                  absolute inset-0 bg-gradient-to-b to-black/80
                  transition-all duration-200 ease-in-out
                  ${hoveredTheme === theme.id || themeValues[theme.id as keyof ThemeValuesProps] === 5
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
                    ${hoveredTheme === theme.id || themeValues[theme.id as keyof ThemeValuesProps] === 5 ? 'transform -translate-y-1' : ''}
                  `}
                >
                  {theme.name}
                </p>
                <p
                  className={`
                    text-sm text-gray-300 
                    transition-all duration-200 ease-in-out
                    ${hoveredTheme === theme.id || themeValues[theme.id as keyof ThemeValuesProps] === 5
                      ? 'opacity-100 max-h-16 transform translate-y-0'
                      : 'opacity-0 max-h-0 transform translate-y-4 overflow-hidden'
                    }
                  `}
                >
                  {theme.description}
                </p>
              </div>

              {themeValues[theme.id as keyof ThemeValuesProps] === 5 && (
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
