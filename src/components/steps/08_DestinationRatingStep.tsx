import React from 'react';
import DestinationCard from '@/components/DestinationCard';
import { Destination } from '@/types';

type DestinationRatingStepProps = {
  destinations: Destination[];
  ratings: Record<string, 'like' | 'dislike' | null>;
  onRatingChange: (destinationId: string, rating: 'like' | 'dislike') => void;
};

const DestinationRatingStep: React.FC<DestinationRatingStepProps> = ({
  destinations,
  ratings,
  onRatingChange
}) => {
  // Show loading state if destinations array is empty
  if (!destinations || destinations.length === 0) {
    return (
      <div className="w-full">
        <h2 className="text-2xl font-bold mb-2">Rate These Destinations</h2>
        <p className="text-gray-600 mb-6">Loading destinations for you to rate...</p>

        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading destinations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-2">Rate These Destinations</h2>
      <p className="text-gray-600 mb-6">Do you like or dislike these places?</p>

      <div className="space-y-6">
        {destinations.map((destination) => (
          <DestinationCard
            key={destination.id}
            destination={destination}
            rating={ratings[destination.id]}
            onRatingChange={onRatingChange}
          />
        ))}
      </div>
    </div>
  );
};

export default DestinationRatingStep;
