
import React from 'react';
import RecommendationCard, { Recommendation } from './RecommendationCard';
import { Button } from '@/components/ui/button';
import { RefreshCcw } from 'lucide-react';

type RecommendationsViewProps = {
  recommendations: Recommendation[];
  privacyLevel: 'minimal' | 'low' | 'medium' | 'high' | 'highest';
  onRegenerateRecommendations: () => void;
  onBackToForm: () => void;
};

const RecommendationsView: React.FC<RecommendationsViewProps> = ({ 
  recommendations, 
  privacyLevel,
  onRegenerateRecommendations,
  onBackToForm
}) => {
  const getMatchExplanation = () => {
    switch(privacyLevel) {
      case 'minimal':
        return 'These recommendations are based on your basic theme, temperature and region preferences.';
      case 'low':
        return 'These recommendations are based on your activities, budget, trip duration, and mood preferences.';
      case 'medium':
        return 'These recommendations are based on your destination ratings and the preferences you shared previously.';
      case 'high':
        return 'These recommendations are based on your conversational insights and all previous preferences.';
      case 'highest':
        return 'These fully personalized recommendations are based on your photos and all previous preferences.';
      default:
        return 'These recommendations are based on your preferences.';
    }
  };
  
  return (
    <div className="w-full">
      <div className="mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Your Travel Recommendations</h2>
        <p className="text-gray-600">{getMatchExplanation()}</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {recommendations.map((recommendation) => (
          <RecommendationCard key={recommendation.id} recommendation={recommendation} />
        ))}
      </div>
      
      <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
        <Button 
          onClick={onRegenerateRecommendations}
          className="bg-travel-teal hover:bg-travel-teal/90 text-white flex items-center gap-2"
        >
          <RefreshCcw size={16} />
          🔄 Try Another Recommendation
        </Button>
        
        <Button 
          onClick={onBackToForm}
          variant="outline"
          className="border-travel-teal text-travel-teal hover:bg-travel-teal/10"
        >
          ← Back to Preferences
        </Button>
      </div>
    </div>
  );
};

export default RecommendationsView;
