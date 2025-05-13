import React, { useState, useMemo, useEffect, useCallback } from 'react';
import TinderCard from 'react-tinder-card';
import DestinationCard from '@/components/DestinationCard';
import MobileSwipeCard from '@/components/MobileSwipeCard';
import { Destination } from '@/types';
import { fetchRandomDestinations, mapApiToDestination } from '@/services/destinationService';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

const RENDER_WINDOW_SIZE = 3;

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
  const [showSwipeHints, setShowSwipeHints] = useState(true);
  const [shouldRenderHints, setShouldRenderHints] = useState(true);
  const [showDesktopNudge, setShowDesktopNudge] = useState(false);
  const [lastSwipeFeedback, setLastSwipeFeedback] = useState<'like' | 'dislike' | null>(null);

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

  useEffect(() => {
    let hintTimer: NodeJS.Timeout | null = null;
    let renderTimer: NodeJS.Timeout | null = null;

    if (isMobile) {
      hintTimer = setTimeout(() => {
        setShowSwipeHints(false);
        renderTimer = setTimeout(() => {
          setShouldRenderHints(false);
        }, 500);
      }, 5000);
    }

    return () => {
      if (hintTimer) clearTimeout(hintTimer);
      if (renderTimer) clearTimeout(renderTimer);
    };
  }, [isMobile]);

  // Effect for the desktop nudge timer
  useEffect(() => {
    let nudgeTimer: NodeJS.Timeout | null = null;
    // Show nudge only on desktop, after initial load, and for 5 seconds
    if (!isMobile && !initialLoading) {
      setShowDesktopNudge(true);
      nudgeTimer = setTimeout(() => {
        setShowDesktopNudge(false);
      }, 5000); // 5 seconds
    }

    // Clear nudge state if switching to mobile or while loading
    if (isMobile || initialLoading) {
      setShowDesktopNudge(false);
    }

    return () => {
      if (nudgeTimer) clearTimeout(nudgeTimer);
    };
  }, [isMobile, initialLoading]); // Depend on mobile status and loading status

  // Effect to clear swipe feedback after a delay
  useEffect(() => {
    let feedbackTimer: NodeJS.Timeout | null = null;
    if (lastSwipeFeedback) {
      feedbackTimer = setTimeout(() => {
        setLastSwipeFeedback(null);
      }, 1500); // Show feedback for 1.5 seconds
    }
    return () => {
      if (feedbackTimer) clearTimeout(feedbackTimer);
    };
  }, [lastSwipeFeedback]);

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
    setLastSwipeFeedback(rating); // Set feedback state
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
        <p className="text-gray-600 mb-6">This will help us understand what you like</p>
        <div className="space-y-6">
          {allDestinations.map((destination, index) => {
            return (
              <DestinationCard
                key={destination.id}
                destination={destination}
                rating={ratings[destination.id]}
                onRatingChange={onRatingChange}
                showInitialNudge={index === 0 && showDesktopNudge}
              />
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="w-full">
        <h2 className="text-2xl font-bold mb-2">Rate These Destinations</h2>
        <p className="text-gray-600 mb-6">This will help us understand what you like.</p>
      </div>
      <div className="flex flex-col items-center justify-center ml-2">
        <div className="relative w-full max-w-sm h-[600px]">
          {/* Swipe Hints - Show only on mobile and for the first 5 seconds */}
          {isMobile && shouldRenderHints && (
            <>
              {/* Dislike Hint (Left) */}
              <div
                className={`absolute top-1/3 left-4 transform -translate-y-1/2 z-30 p-2 w-20 rounded-md shadow-md flex flex-col items-center bg-white border border-gray-200 transition-opacity duration-500 ease-out ${showSwipeHints ? 'opacity-100' : 'opacity-0'}`}
              >
                <span className="text-2xl">←</span>
                <span className="text-sm font-semibold">Dislike</span>
              </div>
              {/* Like Hint (Right) */}
              <div
                className={`absolute top-1/3 right-4 transform -translate-y-1/2 z-30 p-2 w-20 rounded-md shadow-md flex flex-col items-center bg-white border border-gray-200 transition-opacity duration-500 ease-out ${showSwipeHints ? 'opacity-100' : 'opacity-0'}`}
              >
                <span className="text-2xl">→</span>
                <span className="text-sm font-semibold">Like</span>
              </div>
            </>
          )}

          {/* Swipe Feedback Visual */}
          {lastSwipeFeedback && (
            <div className={`absolute inset-0 z-40 flex items-center pointer-events-none transition-opacity duration-300 ease-in-out ${lastSwipeFeedback === 'like' ? 'justify-end pr-2' : 'justify-start pl-0'}`}>
              <div
                className={`px-4 py-3 rounded-sm text-gray-800 font-bold text-base shadow-lg flex items-center justify-center gap-2 bg-white opacity-90`}
              >
                {lastSwipeFeedback === 'like' ? (
                  <>
                    <ThumbsUp className="h-6 w-6" /> Liked
                  </>
                ) : (
                  <>
                    <ThumbsDown className="h-6 w-6  " /> Disliked
                  </>
                )}
              </div>
            </div>
          )}

          {/* Renderable Destination Cards */}
          {renderableDestinations.map((destination, index) => (
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
          {/* Message when all cards are rated */}
          {allCardsRated && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 z-0">
              <p className="text-gray-600">You've rated all available destinations!</p>
              {errorLoading && <p className="text-red-500 mt-2">{errorLoading}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DestinationRatingStep;
