import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Destination } from '@/types';

// Simpler props as rating and onRatingChange are handled by the swipe container
type MobileSwipeCardProps = {
  destination: Destination;
};

// Define a fixed height for the card or specific elements if needed
const FIXED_CARD_HEIGHT = '550px'; // Adjust as needed

const MobileSwipeCard: React.FC<MobileSwipeCardProps> = ({
  destination
}) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  return (
    // Apply fixed height and ensure content flexes correctly
    <Card key={destination.id} className="overflow-hidden rounded-xl transition-all duration-300 w-full flex flex-col" style={{ height: FIXED_CARD_HEIGHT }}>
      {/* Image container - Make it take a significant portion of height */}
      <div className="w-full h-4/5 relative overflow-hidden bg-gray-200"> {/* Adjust height fraction as needed */}
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {destination.image_url && !imageError ? (
          <img
            src={destination.image_url}
            alt={destination.city}
            className={`w-full h-full object-cover destination-image ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
            draggable="false"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            {imageError ? 'Image Not Available' : 'No Image'}
          </div>
        )}


        <div className="absolute bottom-0 left-0 px-4 py-2"> {/* Adjusted padding */}
          {/* Apply styling similar to TravelThemesStep */}
          <div className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded inline-block">
            <h4 className="text-xl font-semibold text-black">{destination.city}, {destination.country}</h4> {/* Adjusted text size and color */}
          </div>
        </div>

      </div>

      {/* Content Area - Takes remaining height */}
      <div className="p-4 pt-1 flex flex-col flex-grow"> {/* Use flex-grow */}
        <div className="flex flex-wrap gap-2 my-3">
          {[ // Define categories and their corresponding property accessors
            { key: 'culture', name: 'Culture', value: destination.culture },
            { key: 'adventure', name: 'Adventure', value: destination.adventure },
            { key: 'nature', name: 'Nature', value: destination.nature },
            { key: 'beaches', name: 'Beaches', value: destination.beaches },
            { key: 'nightlife', name: 'Nightlife', value: destination.nightlife },
            { key: 'cuisine', name: 'Cuisine', value: destination.cuisine },
            { key: 'wellness', name: 'Wellness', value: destination.wellness },
            { key: 'urban', name: 'Urban', value: destination.urban },
            { key: 'seclusion', name: 'Seclusion', value: destination.seclusion },
          ]
            .filter(category => typeof category.value === 'number' && category.value >= 4) // Filter for ratings >= 4
            .sort((a, b) => b.value! - a.value!) // Sort by rating descending (optional)
            .slice(0, 4) // Limit to top 4 tags (optional)
            .map((category) => (
              <span key={category.key} className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700 capitalize">
                {category.name}
              </span>
            ))}
        </div>
        <p className="text-gray-600 text-sm flex-grow overflow-y-auto">{destination.short_description}</p>
      </div>
    </Card>
  );
};

export default MobileSwipeCard; 