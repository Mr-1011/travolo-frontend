import React, { useState, useEffect } from 'react';
import DestinationCard from './DestinationCard';
import { Recommendation, Destination } from '@/types';
import { Button } from '@/components/ui/button';
import { RefreshCcw, ArrowLeft, Home } from 'lucide-react';
import { submitRecommendationFeedback } from '@/services/recommendationService'; // Import the feedback service
import { Loader2 } from 'lucide-react'; // Import a loader icon

type RecommendationsViewProps = {
  recommendations: Recommendation[];
  recommendationRecordId: string; // Add prop for the record ID
  onRestartProcess: () => void;
};

const RecommendationsView: React.FC<RecommendationsViewProps> = ({
  recommendations,
  recommendationRecordId, // Receive the record ID
  onRestartProcess,
}) => {
  // State for loading simulation
  const [isLoading, setIsLoading] = useState(true);
  // State to manage ratings for UI feedback (button state)
  const [ratings, setRatings] = useState<Record<string, 'like' | 'dislike' | null>>({});

  // Simulate loading for 5 seconds on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // 5 seconds delay

    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, []); // Empty dependency array ensures this runs only once on mount

  // Handler to update local UI state AND submit feedback to backend
  const handleRatingChange = async (destinationId: string, newRating: 'like' | 'dislike') => {
    const currentRating = ratings[destinationId];
    const finalRating = currentRating === newRating ? null : newRating; // Allows toggling off

    // Update local UI state immediately for responsiveness
    setRatings(prev => ({
      ...prev,
      [destinationId]: finalRating
    }));

    // If the rating is being set (not cleared), submit it to the backend
    if (finalRating) {
      if (!recommendationRecordId) {
        console.error('Cannot submit feedback: recommendationRecordId is missing.');
        // Optionally, revert the UI state change immediately
        setRatings(prev => ({
          ...prev,
          [destinationId]: currentRating // Revert to the previous rating
        }));
        return; // Stop execution if ID is missing
      }

      try {
        console.log(`Calling submitRecommendationFeedback with ID: ${recommendationRecordId}, Dest: ${destinationId}, Rating: ${finalRating}`);
        await submitRecommendationFeedback(recommendationRecordId, destinationId, finalRating);
        console.log(`Feedback submitted for ${destinationId}: ${finalRating}`);
      } catch (error) {
        console.error(`Failed to submit feedback for ${destinationId}:`, error);
        // Optional: Revert UI state or show error message to user
        // Revert UI state on failure:
        setRatings(prev => ({
          ...prev,
          [destinationId]: currentRating // Revert to the previous rating
        }));
        // Optionally, show an error notification to the user here
      }
    } else {
      // Optional: If clearing a rating needs an API call (e.g., update feedback to null),
      // you would add that logic here.
      // For now, we just log the clearing action based on the current API design.
      console.log(`Rating cleared for ${destinationId}. No feedback sent.`);
      // If the backend *requires* an update even for clearing, you might call:
      // await submitRecommendationFeedback(recommendationRecordId, destinationId, 'neutral'); // Or whatever the backend expects
    }
  };

  // Helper function to map Recommendation to DestinationCard props
  const mapRecommendationToDestinationProps = (rec: Recommendation): Destination => {
    const mappedDestination: Destination = {
      id: rec.id,
      city: rec.city,
      region: rec.region,
      country: rec.country,
      short_description: rec.short_description ?? 'No description available.',
      image_url: rec.image_url ?? '', // Provide default empty string if image is undefined

      // Map category scores (provide null if undefined)
      culture: rec.culture ?? null,
      adventure: rec.adventure ?? null,
      nature: rec.nature ?? null,
      beaches: rec.beaches ?? null,
      nightlife: rec.nightlife ?? null,
      cuisine: rec.cuisine ?? null,
      wellness: rec.wellness ?? null,
      urban: rec.urban ?? null,
      seclusion: rec.seclusion ?? null,

      // Map other potentially missing fields required by Destination
      avg_temp_monthly: rec.avg_temp_monthly ?? null,
      ideal_durations: rec.ideal_durations ?? null,
      budget_level: rec.budget_level ?? null,
    };

    return mappedDestination;
  };

  return (
    <div className="flex flex-col h-full min-h-screen bg-white rounded-xl shadow-md p-6">
      <div className="mb-8 text-center">

        {!isLoading && ( // Only show this subtitle when not loading
          <>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Your Travel Recommendations</h2>
            <p className="text-lg text-gray-600">Here are some destinations tailored to your preferences.</p>
          </>
        )}
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center flex-grow text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-500 mb-4" />
          <p className="text-xl text-gray-700 font-semibold">Searching for your ideal travel destination...</p>
          <p className="text-md text-gray-500">Please wait a moment while we curate the perfect spots for you.</p>
        </div>
      ) : (
        <>

          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8 flex-grow">
            {recommendations.map((recommendation) => (
              <DestinationCard
                key={recommendation.id}
                destination={mapRecommendationToDestinationProps(recommendation)}
                rating={ratings[recommendation.id] || null}
                onRatingChange={handleRatingChange} // Use the updated handler
                confidence={recommendation.confidence} // Pass confidence score
              />
            ))}
          </div>

          <div className="mt-10 pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-center gap-4">
            <Button
              onClick={onRestartProcess}
              variant="outline"
              className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 flex items-center justify-center gap-2 px-6 py-3 rounded-full text-base"
              size="lg"
            >
              <Home size={18} />
              Start Over
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default RecommendationsView;
