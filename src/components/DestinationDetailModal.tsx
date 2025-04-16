import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';
import { Destination } from '@/types';

type DestinationDetailModalProps = {
  destination: Destination | null;
  isOpen: boolean;
  onClose: () => void;
};

const DestinationDetailModal: React.FC<DestinationDetailModalProps> = ({
  destination,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !destination) {
    return null;
  }

  const [imageLoading, setImageLoading] = React.useState(true);
  const [imageError, setImageError] = React.useState(false);

  const handleImageLoad = () => setImageLoading(false);
  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  // Reset image state when modal opens with a new destination
  React.useEffect(() => {
    if (isOpen) {
      setImageLoading(true);
      setImageError(false);
    }
  }, [isOpen, destination?.id]);


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] md:max-w-[800px] lg:max-w-[900px] max-h-[90vh] flex flex-col">
        <DialogClose asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 z-10 rounded-full"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </Button>
        </DialogClose>

        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{destination.name}, {destination.country}</DialogTitle>
        </DialogHeader>

        <div className="flex-grow overflow-y-auto pr-2 pl-1 space-y-6 py-4">
          {/* Image Section */}
          <div className="w-full h-64 md:h-80 relative overflow-hidden rounded-lg bg-gray-200">
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            {destination.image && !imageError ? (
              <img
                src={destination.image}
                alt={destination.name}
                className={`w-full h-full object-cover ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
                onLoad={handleImageLoad}
                onError={handleImageError}
                loading="lazy" // Lazy load image
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                {imageError ? 'Image Not Available' : 'No Image Provided'}
              </div>
            )}
          </div>

          {/* Description Section */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-700">{destination.description}</p>
          </div>

          {/* Category Ratings Section */}
          {destination.categoryRatings && Object.keys(destination.categoryRatings).length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Category Ratings</h3>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4 text-sm">
                {Object.entries(destination.categoryRatings)
                  .sort(([keyA], [keyB]) => keyA.localeCompare(keyB)) // Sort alphabetically
                  .map(([category, rating]) => {
                    const ratingValue = typeof rating === 'number' ? Math.max(0, Math.min(5, rating)) : 0; // Clamp rating 0-5
                    const widthPercentage = ratingValue * 20; // 5 * 20 = 100%
                    return (
                      <li key={category} className="space-y-1">
                        <div className="flex justify-between items-baseline">
                          <span className="capitalize font-medium text-gray-800">{category.replace(/_/g, ' ')}</span>
                          <span className="text-xs font-semibold text-gray-600">{rating ?? 'N/A'} / 5</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${ratingValue >= 4 ? 'bg-green-500' : ratingValue >= 2 ? 'bg-yellow-500' : 'bg-red-500'}`}
                            style={{ width: `${widthPercentage}%` }}
                            aria-valuenow={ratingValue}
                            aria-valuemin={0}
                            aria-valuemax={5}
                            role="progressbar"
                            aria-label={`${category} rating: ${ratingValue} out of 5`}
                          ></div>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </div>
          )}

          {/* Budget and Duration Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {destination.budget && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Typical Budget</h3>
                <p className="text-gray-700 capitalize bg-blue-50 p-3 rounded text-center font-medium">{destination.budget}</p>
              </div>
            )}
            {destination.idealDurations && destination.idealDurations.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Ideal Trip Durations</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {destination.idealDurations.map((duration) => (
                    <span key={duration} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                      {duration}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Temperature Section (Placeholder) */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Average Monthly Temperatures (°C)</h3>
            {destination.monthlyTemperatures ? (
              <div className="bg-gray-50 p-4 rounded-md text-gray-700 text-sm">
                {/* Basic text representation for now */}
                <pre className="whitespace-pre-wrap break-words">
                  {JSON.stringify(destination.monthlyTemperatures, null, 2)}
                </pre>
                <p className="mt-2 text-xs text-gray-500">Temperature chart coming soon!</p>
              </div>
            ) : (
              <p className="text-gray-500 text-sm">Temperature data not available.</p>
            )}
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DestinationDetailModal; 