import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown, Info } from 'lucide-react';
import { Destination } from '@/types'; // Import Destination from types
import DestinationDetailModal from './DestinationDetailModal'; // Import the modal

type DestinationCardProps = {
  destination: Destination;
  rating: 'like' | 'dislike' | null;
  onRatingChange: (destinationId: string, rating: 'like' | 'dislike') => void; // Removed null option as buttons only set like/dislike
  confidence?: number; // Add optional confidence prop
};

const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  rating,
  onRatingChange,
  confidence
}) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false); // State for modal

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

  const openDetailModal = () => setIsDetailModalOpen(true);
  const closeDetailModal = () => setIsDetailModalOpen(false);

  return (
    <>
      <Card key={destination.id} className="overflow-hidden rounded-xl transition-all duration-300 destination-card">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/3 relative overflow-hidden bg-gray-200 aspect-video md:aspect-[4/5]">
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            {destination.image_url && !imageError ? (
              <img
                src={destination.image_url}
                alt={destination.city}
                className={`w-full h-full object-cover destination-image transition-opacity duration-500 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                {imageError ? 'Image Not Available' : 'No Image'}
              </div>
            )}
          </div>

          <div className="p-6 w-full md:w-2/3 flex flex-col relative">
            <div className="flex justify-between items-center mb-3 md:hidden">
              <div className="flex flex-col">
                <h4 className="text-lg font-semibold truncate mr-2">{destination.city}</h4>
                <p className="text-sm text-gray-500">{destination.country}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {confidence !== undefined && (
                  <div className="bg-[#3c83f6] text-white rounded-full px-3 py-1 text-xs font-medium flex items-center whitespace-nowrap">
                    {confidence}% match
                  </div>
                )}
                <Button
                  variant="outline" // Use ghost or outline for less emphasis on mobile
                  size="icon"
                  onClick={openDetailModal}
                  aria-label="Show destination details"
                  className="h-10 w-10" // Slightly smaller icon button for mobile
                >
                  <Info className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Desktop Header: City, Country, Match %, Info Button */}
            <div className="absolute top-4 right-4 hidden md:flex items-center gap-2">
              {/* Combined existing desktop Match % and Info button container */}
              {confidence !== undefined && (
                <div className="bg-[#3c83f6] text-white rounded-full px-3 py-1 text-sm font-medium flex items-center whitespace-nowrap">
                  {confidence}% match
                </div>
              )}
              <Button
                variant="outline"
                size="icon"
                onClick={openDetailModal}
                aria-label="Show destination details"
              >
                <Info className="h-5 w-5" />
              </Button>
            </div>

            {/* Desktop Title - keep hidden on mobile */}
            <div className="hidden md:block pr-20">
              <h4 className="text-xl font-semibold">{destination.city}, {destination.country}</h4>
            </div>

            {/* Render tags based on category ratings >= 4 */}
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

            <p className="text-gray-600 mb-4 flex-grow">{destination.short_description}</p>

            <div className="flex flex-row gap-2 mt-auto pt-4">
              <Button
                variant={getButtonVariant('dislike')}
                onClick={() => onRatingChange(destination.id, 'dislike')}
                aria-label={`Dislike ${destination.city}`}
                className="flex-1 flex items-center justify-center gap-2"
              >
                <ThumbsDown className="h-5 w-5" /> Dislike
              </Button>
              <Button
                variant={getButtonVariant('like')}
                onClick={() => onRatingChange(destination.id, 'like')}
                aria-label={`Like ${destination.city}`}
                className="flex-1 flex items-center justify-center gap-2"
              >
                <ThumbsUp className="h-5 w-5" /> Like
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <DestinationDetailModal
        destination={destination}
        isOpen={isDetailModalOpen}
        onClose={closeDetailModal}
        confidence={confidence}
      />
    </>
  );
};

export default DestinationCard;