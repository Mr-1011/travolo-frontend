import React, { useState, useMemo, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import DestinationCard from '@/components/DestinationCard';
import MobileSwipeCard from '@/components/MobileSwipeCard';
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
  const [currentIndex, setCurrentIndex] = useState(destinations.length - 1);
  const [isMobile, setIsMobile] = useState(false);

  // Basic check for mobile - replace with a more robust hook if needed
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768); // Tailwind's 'md' breakpoint
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);


  const currentDestinations = useMemo(() => destinations, [destinations]);

  const canSwipe = currentIndex >= 0;

  const swiped = (direction: string, destinationId: string, index: number) => {
    console.log(`Swiped ${direction} on ${destinationId} at index ${index}`);
    setCurrentIndex(index - 1);
    const rating = direction === 'right' ? 'like' : 'dislike';
    onRatingChange(destinationId, rating);
  };

  const outOfFrame = (destinationId: string, index: number) => {
    console.log(`${destinationId} (${index}) left the screen!`);
    // Optionally handle when all cards are swiped
  };


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

  // Desktop View (List)
  if (!isMobile) {
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
              onRatingChange={onRatingChange} // Original handler for desktop buttons
            />
          ))}
        </div>
      </div>
    );
  }

  // Mobile View (Swipe Cards)
  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-2 text-center">Rate These Destinations</h2>
      <p className="text-gray-600 mb-6 text-center">Swipe right to like, left to dislike.</p>

      <div className="relative w-full max-w-sm h-[600px] flex items-center justify-center"> {/* Adjust height as needed */}
        {currentDestinations.map((destination, index) => (
          <TinderCard
            key={destination.id}
            onSwipe={(dir) => swiped(dir, destination.id, index)}
            onCardLeftScreen={() => outOfFrame(destination.id, index)}
            preventSwipe={['up', 'down']}
            className="absolute" // Important for stacking
            swipeRequirementType="position"
            swipeThreshold={100} // Adjust sensitivity if needed
          >
            <div className="w-[85vw] max-w-sm"> {/* Adjust container width if needed */}
              <MobileSwipeCard
                destination={destination}
              />
            </div>
          </TinderCard>
        ))}
        {!canSwipe && (
          <p className="text-gray-600 mt-4">All destinations rated!</p>
        )}
      </div>
      {/* Optional: Add explicit buttons for swipe actions if desired */}
      {/* <div className="mt-4 flex justify-center gap-4">
          <Button onClick={() => swipe('left')} disabled={!canSwipe}>Dislike</Button>
          <Button onClick={() => swipe('right')} disabled={!canSwipe}>Like</Button>
        </div> */}
    </div>
  );
};

export default DestinationRatingStep;
