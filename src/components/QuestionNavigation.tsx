import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { QuestionStep } from '@/types';

type QuestionNavigationProps = {
  className?: string;
  currentStep: QuestionStep;
  onNextStep: () => void;
  onPreviousStep: () => void;
  onGetRecommendations: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  isCurrentStepValid: boolean;
};

const QuestionNavigation: React.FC<QuestionNavigationProps> = ({
  className,
  currentStep,
  onNextStep,
  onPreviousStep,
  onGetRecommendations,
  isFirstStep,
  isLastStep,
  isCurrentStepValid
}) => {
  return (
    <div className={className || ''}>
      <div className="max-w-4xl mx-auto flex justify-between px-6 py-4">
        <Button
          variant="outline"
          onClick={onPreviousStep}
          disabled={isFirstStep}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Previous
        </Button>

        <div className="flex space-x-3">
          {!isLastStep && (
            <Button
              variant="outline"
              onClick={onGetRecommendations}
              className="text-[#3c83f6] border-[#3c83f6]"
            >
              <Sparkles className="mr-2 h-4 w-4" /> Get Recommendations
            </Button>
          )}

          {!isLastStep && (
            <Button
              onClick={onNextStep}
              disabled={!isCurrentStepValid}
            >
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          )}

          {isLastStep && (
            <Button
              onClick={onGetRecommendations}
              className="bg-[#3c83f6]"
            >
              <Sparkles className="mr-2 h-4 w-4" /> Find My Perfect Trip
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionNavigation;
