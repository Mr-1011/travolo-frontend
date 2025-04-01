
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

type StageButtonsProps = {
  onGetRecommendations: () => void;
  onContinue?: () => void;
  onBack?: () => void;
  isFinalStage?: boolean;
  currentStage?: number;
};

const StageButtons: React.FC<StageButtonsProps> = ({ 
  onGetRecommendations, 
  onContinue,
  onBack,
  isFinalStage = false,
  currentStage = 1
}) => {
  return (
    <div className="space-y-4 mt-8 w-full">
      {/* Primary action buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          onClick={onGetRecommendations}
          className="flex-1 bg-travel-blue hover:bg-travel-darkBlue text-white font-medium rounded-lg py-3 px-4"
        >
          🔍 {isFinalStage ? 'See Your Fully Personalized Recommendations' : 'See Recommendations Now'}
        </Button>
        
        {!isFinalStage && onContinue && (
          <Button 
            onClick={onContinue}
            className="flex-1 bg-travel-accent hover:bg-travel-accent/90 text-travel-dark font-medium rounded-lg py-3 px-4"
          >
            ✨ Continue (Better Personalization)
          </Button>
        )}
      </div>
      
      {/* Back button */}
      {currentStage > 1 && onBack && (
        <Button 
          onClick={onBack}
          variant="outline"
          className="flex items-center justify-center gap-2 text-travel-dark border-travel-blue/30 hover:bg-travel-blue/5"
        >
          <ArrowLeft size={16} />
          Back to previous step
        </Button>
      )}
    </div>
  );
};

export default StageButtons;
