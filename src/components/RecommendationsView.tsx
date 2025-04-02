import React from 'react';
import RecommendationCard, { Recommendation } from './RecommendationCard';
import { Button } from '@/components/ui/button';
import { RefreshCcw, ArrowLeft } from 'lucide-react';

type RecommendationsViewProps = {
  recommendations: Recommendation[];
  onRegenerateRecommendations: () => void;
  onBackToForm: () => void;
  onRestartProcess?: () => void;
};

const RecommendationsView: React.FC<RecommendationsViewProps> = ({
  recommendations,
  onRegenerateRecommendations,
  onBackToForm,
  onRestartProcess
}) => {
  return (
    <div className="w-full">
      <div className="mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Your Travel Recommendations</h2>
        <p className="text-gray-600">These recommendations are based on your preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {recommendations.map((recommendation) => (
          <RecommendationCard key={recommendation.id} recommendation={recommendation} />
        ))}
      </div>

      <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
        <Button
          onClick={onRestartProcess || onRegenerateRecommendations}
          className="bg-travel-teal hover:bg-travel-teal/90 text-white flex items-center gap-2"
        >
          <RefreshCcw size={16} />
          {onRestartProcess ? 'Start Over' : 'Try Another Recommendation'}
        </Button>

        <Button
          onClick={onBackToForm}
          variant="outline"
          className="border-travel-teal text-travel-teal hover:bg-travel-teal/10"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Preferences
        </Button>
      </div>
    </div>
  );
};

export default RecommendationsView;
