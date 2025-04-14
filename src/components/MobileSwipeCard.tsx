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

        {destination.image && !imageError ? (
          <img
            src={destination.image}
            alt={destination.name}
            className={`w-full h-full object-cover destination-image ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            {imageError ? 'Image Not Available' : 'No Image'}
          </div>
        )}


        <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black/80 to-transparent w-full">
          <h4 className="text-2xl font-semibold text-white">{destination.name}</h4>
          <p className="text-lg text-gray-200">{destination.country}</p>
        </div>

      </div>

      {/* Content Area - Takes remaining height */}
      <div className="p-4 flex flex-col flex-grow"> {/* Use flex-grow */}
        <div className="flex flex-wrap gap-1 mb-2">
          {destination.type.map((type, index) => (
            <span key={index} className="px-2 py-0.5 bg-gray-100 rounded-full text-xs font-medium text-gray-700">
              {type}
            </span>
          ))}
        </div>

        {/* Description - Allow scrolling if needed */}
        <p className="text-gray-600 text-sm flex-grow overflow-y-auto">{destination.description}</p>

        {/* NO BUTTONS HERE */}
      </div>
    </Card>
  );
};

export default MobileSwipeCard; 