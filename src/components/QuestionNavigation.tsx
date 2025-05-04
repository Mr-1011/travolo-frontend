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
  const handleNext = () => {
    window.scrollTo(0, 0);
    onNextStep();
  };

  const handlePrevious = () => {
    window.scrollTo(0, 0);
    onPreviousStep();
  };

  const handleGetRecommendations = () => {
    window.scrollTo(0, 0);
    onGetRecommendations();
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-white rounded-b-xl border-t border-gray-200 max-w-4xl mx-auto px-6 py-4">
      <div className="flex sm:hidden justify-between items-center w-full">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={isFirstStep}
          className="flex-shrink-0"
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        {!isLastStep && (
          <Button
            variant="outline"
            onClick={handleGetRecommendations}
            className="text-[#3c83f6] border-[#3c83f6]"
          >
            Submit Now
          </Button>
        )}

        {isLastStep && (
          <Button
            onClick={handleGetRecommendations}
            className="bg-[#3c83f6]"
          >
            Submit Now
          </Button>
        )}

        {!isLastStep && (
          <Button
            onClick={handleNext}
            disabled={!isCurrentStepValid}
            className="flex-shrink-0"
          >
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="hidden sm:flex justify-between items-center w-full">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={isFirstStep}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <div className="flex space-x-3">
          {!isLastStep && (
            <Button
              variant="outline"
              onClick={handleGetRecommendations}
              className="text-[#3c83f6] border-[#3c83f6]"
            >
              <Sparkles className="mr-2 h-4 w-4" /> Submit Now
            </Button>
          )}

          {!isLastStep && (
            <Button
              onClick={handleNext}
              disabled={!isCurrentStepValid}
            >
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          )}

          {isLastStep && (
            <Button
              onClick={handleGetRecommendations}
              className="bg-[#3c83f6]"
            >
              <Sparkles className="mr-2 h-4 w-4" /> Submit Now
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionNavigation;
