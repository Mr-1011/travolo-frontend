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
