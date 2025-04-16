import React, { useState, useMemo, useEffect, useCallback } from 'react';
import TinderCard from 'react-tinder-card';
import DestinationCard from '@/components/DestinationCard';
import MobileSwipeCard from '@/components/MobileSwipeCard';
import { Destination } from '@/types';
import { fetchRandomDestinations, mapApiToDestination } from '@/services/destinationService';

const RENDER_WINDOW_SIZE = 3; // How many cards to render at once

type DestinationRatingStepProps = {
  destinations?: Destination[];
  ratings: Record<string, 'like' | 'dislike' | null>;
  onRatingChange: (destinationId: string, rating: 'like' | 'dislike') => void;
};

const DestinationRatingStep: React.FC<DestinationRatingStepProps> = ({
  destinations: initialDestinations = [],
  ratings,
  onRatingChange
}) => {
  const [allDestinations, setAllDestinations] = useState<Destination[]>(initialDestinations);
  const [renderableDestinations, setRenderableDestinations] = useState<Destination[]>([]);
  const [nextDestinationIndex, setNextDestinationIndex] = useState(0);

  const [errorLoading, setErrorLoading] = useState<string | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const setupInitialDestinations = async () => {
      let fetchedDestinations: Destination[] = [];
      if (initialDestinations.length === 0) {
        setInitialLoading(true); // Ensure loading is true
        setErrorLoading(null);
        try {
          const apiDestinations = await fetchRandomDestinations();
          fetchedDestinations = apiDestinations.map(mapApiToDestination);
          setAllDestinations(fetchedDestinations);
        } catch (error) {
          setErrorLoading('Failed to load destinations. Please refresh or try again later.');
          setInitialLoading(false); // Stop loading on error
          return; // Exit if fetch failed
        }
      } else {
        fetchedDestinations = initialDestinations;
        setAllDestinations(fetchedDestinations); // Ensure allDestinations is set
      }

      // Populate the initial renderable window
      const initialRenderable = fetchedDestinations.slice(0, RENDER_WINDOW_SIZE);
      setRenderableDestinations(initialRenderable);
      setNextDestinationIndex(initialRenderable.length); // Next index is the size of the initial window
      setInitialLoading(false); // Finish loading state
    };

    setupInitialDestinations();
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Use useCallback to stabilize the function reference for TinderCard props
  const handleCardLeftScreen = useCallback((removedDestinationId: string) => {
    setRenderableDestinations((prevRenderable) => {
      // Remove the swiped card from the renderable list
      const updatedRenderable = prevRenderable.filter(dest => dest.id !== removedDestinationId);

      // Check if there's a next card to add from the full list
      if (nextDestinationIndex < allDestinations.length) {
        // Add the next destination to the end of the renderable list
        updatedRenderable.push(allDestinations[nextDestinationIndex]);
        // Increment the index for the *next* card
        setNextDestinationIndex(prevIndex => prevIndex + 1);
      }
      return updatedRenderable;
    });

  }, [nextDestinationIndex, allDestinations]);

  const swiped = (direction: string, destinationId: string) => {
    const rating = direction === 'right' ? 'like' : 'dislike';
    onRatingChange(destinationId, rating);
  };

  if (initialLoading) {
    return (
      <div className="w-full">
        <h2 className="text-2xl font-bold mb-2">Rate These Destinations</h2>
        <p className="text-gray-600 mb-6">Finding some destinations for you...</p>

        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading destinations...</p>
        </div>
      </div>
    );
  }

  if (errorLoading && allDestinations.length === 0) {
    return (
      <div className="w-full text-center py-12">
        <h2 className="text-2xl font-bold mb-2 text-red-600">Error</h2>
        <p className="text-gray-600 mb-6">{errorLoading}</p>
      </div>
    );
  }

  // Check if all cards have been processed
  const allCardsRated = renderableDestinations.length === 0 && nextDestinationIndex >= allDestinations.length;

  if (!isMobile) {
    return (
      <div className="w-full">
        <h2 className="text-2xl font-bold mb-2">Rate These Destinations</h2>
        <p className="text-gray-600 mb-6">Do you like or dislike these places?</p>
        <div className="space-y-6">
          {allDestinations.map((destination) => (
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
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-4xl px-4">
        <h2 className="text-2xl font-bold mb-2">Rate These Destinations</h2>
        <p className="text-gray-600 mb-6">Do you like or dislike these places?</p>
      </div>

      <div className="relative w-full max-w-sm h-[600px] flex items-center justify-center mb-4">
        {renderableDestinations.map((destination, index) => (
          // Wrap TinderCard in a div to apply style/z-index
          <div
            key={`${destination.id}-wrapper`} // Use a related but different key for the wrapper
            className="absolute inset-0" // Wrapper takes up the same space
            style={{ zIndex: RENDER_WINDOW_SIZE - index }} // Apply zIndex here
          >
            <TinderCard
              key={destination.id}
              onCardLeftScreen={() => handleCardLeftScreen(destination.id)}
              onSwipe={(dir) => swiped(dir, destination.id)}
              preventSwipe={['up', 'down']}
              // Let TinderCard manage its own class for positioning within the wrapper
              className="w-full h-full" // Make TinderCard fill the wrapper 
              swipeRequirementType="position"
              swipeThreshold={100}
            >
              <div className="w-[85vw] max-w-sm">
                <MobileSwipeCard destination={destination} />
              </div>
            </TinderCard>
          </div>
        ))}
        {allCardsRated && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 z-0">
            <p className="text-gray-600">You've rated all destinations!</p>
            {errorLoading && <p className="text-red-500 mt-2">{errorLoading}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default DestinationRatingStep;
