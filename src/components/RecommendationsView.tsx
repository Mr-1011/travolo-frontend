import React, { useState } from 'react';
import RecommendationCard from './RecommendationCard';
import { Recommendation } from '@/types';
import { Button } from '@/components/ui/button';
import { RefreshCcw, ArrowLeft, Home } from 'lucide-react';

type RecommendationsViewProps = {
  recommendations: Recommendation[];
  onRegenerateRecommendations: () => void;
  onBackToForm: () => void;
  onRestartProcess: () => void;
};

const RecommendationsView: React.FC<RecommendationsViewProps> = ({
  recommendations,
  onBackToForm,
  onRestartProcess
}) => {
  // Log the received recommendations data
  console.log('Recommendations received in RecommendationsView:', JSON.stringify(recommendations, null, 2));

  // State to manage ratings for all recommendations
  const [ratings, setRatings] = useState<Record<string, 'like' | 'dislike' | null>>({});

  // Handler to update ratings state
  const handleRatingChange = (id: string, newRating: 'like' | 'dislike') => {
    setRatings(prev => ({
      ...prev,
      // Toggle rating: if clicking the same rating again, set to null
      [id]: prev[id] === newRating ? null : newRating
    }));
    // TODO: Add logic here to send rating updates back to the backend if needed
    console.log(`Rating changed for ${id}: ${newRating}`);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-md p-6">
      <div className="mb-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Your Travel Recommendations</h2>
        <p className="text-lg text-gray-600">Here are some destinations tailored to your preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8 flex-grow">
        {recommendations.map((recommendation) => (
          <RecommendationCard
            key={recommendation.id}
            recommendation={recommendation}
            rating={ratings[recommendation.id] || null}
            onRatingChange={handleRatingChange}
          />
        ))}
      </div>

      <div className="mt-10 pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-center gap-4">
        <Button
          onClick={onBackToForm}
          variant="outline"
          className="border-gray-300 text-gray-700 hover:bg-gray-100 flex items-center justify-center gap-2 px-6 py-3 rounded-full text-base"
          size="lg"
        >
          <ArrowLeft size={18} />
          Edit Preferences
        </Button>

        <Button
          onClick={onRestartProcess}
          variant="ghost"
          className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 flex items-center justify-center gap-2 px-6 py-3 rounded-full text-base"
          size="lg"
        >
          <Home size={18} />
          Start Over
        </Button>
      </div>
    </div>
  );
};

export default RecommendationsView;
