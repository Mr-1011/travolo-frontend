
import React from 'react';
import { Button } from '@/components/ui/button';

type StageButtonsProps = {
  onGetRecommendations: () => void;
  onContinue?: () => void;
  isFinalStage?: boolean;
};

const StageButtons: React.FC<StageButtonsProps> = ({ 
  onGetRecommendations, 
  onContinue,
  isFinalStage = false
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full">
      <Button 
        onClick={onGetRecommendations}
        className="flex-1 bg-travel-red hover:bg-travel-red/90 text-white font-medium rounded-lg py-3 px-4"
      >
        🔍 {isFinalStage ? 'See Your Fully Personalized Recommendations' : 'See Recommendations Now'}
      </Button>
      
      {!isFinalStage && onContinue && (
        <Button 
          onClick={onContinue}
          className="flex-1 bg-travel-teal hover:bg-travel-teal/90 text-white font-medium rounded-lg py-3 px-4"
        >
          ✨ Continue (Better Personalization)
        </Button>
      )}
    </div>
  );
};

export default StageButtons;
