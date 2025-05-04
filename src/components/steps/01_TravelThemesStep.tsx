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
  // Track loaded images
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const handleImageLoad = (imageUrl: string) => {
    setLoadedImages((prev) => new Set(prev).add(imageUrl));
  };

  const themes: TravelTheme[] = [
    {
      id: 'culture',
      name: 'Culture',
      description: 'You want to experience the rich history, traditions, and cultural heritage of a destination.',
      image_url: '/images/culture.jpg'
    },
    {
      id: 'adventure',
      name: 'Adventure',
      description: 'You are looking for adrenaline-fueled activities and exploring new places.',
      image_url: '/images/adventure.jpg'
    },
    {
      id: 'nature',
      name: 'Nature',
      description: 'You seek to connect with nature and immerse yourself in the beauty of the world.',
      image_url: '/images/nature.jpg'
    },
    {
      id: 'beaches',
      name: 'Beaches',
      description: 'Relaxing on the beach, enjoying the sun with a cool drink and a good book.',
      image_url: '/images/beach.jpg'
    },
    {
      id: 'nightlife',
      name: 'Nightlife',
      description: 'Bars, clubs, and nightlife experiences are a must for you, and you want to experience the best of them.',
      image_url: '/images/nightlife.jpg'
    },
    {
      id: 'cuisine',
      name: 'Cuisine',
      description: 'Phat thai, pho, authentic street food, or michelin star dining, you want to experience the best of it.',
      image_url: '/images/cuisine.jpg'
    },
    {
      id: 'wellness',
      name: 'Wellness',
      description: 'You want to focus on health and wellness, whether it be yoga retreats, spa treatments, or healthy eating.',
      image_url: '/images/wellness.jpg'
    },
    {
      id: 'urban',
      name: 'Urban',
      description: 'You need the bustling energy of a city, whether it be the neon lights, the skyscrapers, or the busy streets.',
      image_url: '/images/urban.jpg'
    },
    {
      id: 'seclusion',
      name: 'Seclusion',
      description: 'You want to find peace and tranquility in a secluded destination away from the crowds and noise.',
      image_url: '/images/seclusion.jpg'
    },
  ];

  return (
    <div className="w-full">

      <h2 className="text-2xl font-bold mb-1">Select Your Travel Themes</h2>
      <p className="text-gray-600 mb-6">What kind of experiences are you looking for? Select all that apply.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            <div className="relative sm:h-64 h-64 w-full">
              {!loadedImages.has(theme.image_url) && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse"></div> // Skeleton Loader
              )}
              <img
                src={theme.image_url}
                alt={theme.name}
                loading="lazy"
                draggable="false"
                className={`w-full h-full object-cover transition-opacity duration-500 ${loadedImages.has(theme.image_url) ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => handleImageLoad(theme.image_url)}
              />
              {/* Dynamically set gradient based on hover state */}
              <div className={`absolute bottom-0 w-full p-2
               ${hoveredTheme === theme.id || themeValues[theme.id as keyof ThemeValuesProps] === 5 ? 'pb-2' : 'pb-0'}
              `}>
                <div className={`
                  bg-white/80 backdrop-blur-sm px-2 py-1 inline-block mb-0 
                  ${hoveredTheme === theme.id || themeValues[theme.id as keyof ThemeValuesProps] === 5 ? 'rounded-t pb-0' : 'rounded'}
                `}>
                  <p
                    className={`
                      font-medium text-2xl tracking-wide text-black text-shadow-sm
                      transition-transform duration-200 ease-in-out
                      ${hoveredTheme === theme.id || themeValues[theme.id as keyof ThemeValuesProps] === 5 ? 'transform -translate-y-0' : ''}
                    `}
                  >
                    {theme.name}
                  </p>
                </div>
                <div
                  className={`
                    bg-white/80 backdrop-blur-sm px-2 py-1
                    transition-all duration-200 ease-in-out
                    rounded-b rounded-tr
                    ${hoveredTheme === theme.id || themeValues[theme.id as keyof ThemeValuesProps] === 5
                      ? 'opacity-100 max-h-16 transform translate-y-0 '
                      : 'opacity-0 max-h-0 transform'
                    }
                  `}
                >
                  <p
                    className={`
                      text-sm text-black text-shadow-sm
                    `}
                  >
                    {theme.description}
                  </p>
                </div>
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
