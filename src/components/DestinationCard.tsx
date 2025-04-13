import React from 'react';
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
  const getButtonVariant = (type: 'like' | 'dislike') => {
    return rating === type ? 'default' : 'outline';
  };

  return (
    <Card key={destination.id} className="overflow-hidden rounded-xl transition-all duration-300 destination-card">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 relative overflow-hidden bg-gray-200" style={{ aspectRatio: '4/5' }}>
          {destination.image ? (
            <img
              src={destination.image}
              alt={destination.name}
              className="w-full h-full object-cover destination-image"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                // Hide image container on error or show placeholder
                target.parentElement?.classList.add('flex', 'items-center', 'justify-center', 'text-gray-500');
                target.parentElement!.innerHTML = 'Image Error'; // Or some placeholder text/icon
                target.remove(); // Remove the img element itself
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent md:bg-gradient-to-t md:from-black/60 md:via-black/30 md:to-transparent"></div>

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