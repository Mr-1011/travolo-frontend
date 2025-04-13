import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Destination } from '@/types'; // Import Destination from types

type DestinationCardProps = {
  destination: Destination;
  rating: 'like' | 'dislike' | null;
  onRatingChange: (destinationId: string, rating: 'like' | 'dislike') => void; // Removed null option as buttons only set like/dislike
};

const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  rating,
  onRatingChange
}) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const getButtonVariant = (type: 'like' | 'dislike') => {
    return rating === type ? 'default' : 'outline';
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  return (
    <Card key={destination.id} className="overflow-hidden rounded-xl transition-all duration-300 destination-card">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 relative overflow-hidden bg-gray-200" style={{ aspectRatio: '4/5' }}>
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

          <div className="absolute bottom-0 left-0 p-4 md:hidden">
            <h4 className="text-lg font-semibold text-white">{destination.name}</h4>
            <p className="text-sm text-gray-200">{destination.country}</p>
          </div>
        </div>

        <div className="p-6 w-full md:w-2/3">
          <div className="hidden md:block">
            <h4 className="text-xl font-semibold">{destination.name}, {destination.country}</h4>
          </div>

          <div className="flex flex-wrap gap-2 my-3">
            {destination.type.map((type, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700">
                {type}
              </span>
            ))}
          </div>

          <p className="text-gray-600 mb-6">{destination.description}</p>

          <div className="flex flex-row gap-2 mt-4">
            <Button
              variant={getButtonVariant('like')}
              onClick={() => onRatingChange(destination.id, 'like')}
              aria-label={`Like ${destination.name}`}
              className="flex-1 flex items-center justify-center gap-2"
            >
              <ThumbsUp className="h-5 w-5" /> Like
            </Button>
            <Button
              variant={getButtonVariant('dislike')}
              onClick={() => onRatingChange(destination.id, 'dislike')}
              aria-label={`Dislike ${destination.name}`}
              className="flex-1 flex items-center justify-center gap-2"
            >
              <ThumbsDown className="h-5 w-5" /> Dislike
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DestinationCard;