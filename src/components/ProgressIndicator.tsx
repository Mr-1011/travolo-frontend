import React from 'react';
import { QuestionStep } from '@/types';

type ProgressIndicatorProps = {
  currentStep: QuestionStep;
  steps: {
    id: QuestionStep;
    label: string; // Keep label for potential future use or accessibility
  }[];
  onNavigateToStep: (stepId: QuestionStep) => void;
};

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  steps,
  onNavigateToStep
}) => {
  const currentIndex = steps.findIndex(step => step.id === currentStep);

  // Generate icon paths assuming a convention like /icons/step-1.png, /icons/step-2.png, etc.
  const icons = steps.map((_, index) => `/icons/step-${index + 1}.png`);

  return (
    <div className="mb-4 sm:mb-8">
      <div className="block sm:hidden">
        <div className="relative w-full mt-2 mb-4">
          {/* Progress Bar Line */}
          <div className="absolute w-full h-1 bg-gray-200 top-4 rounded">
            <div
              className="absolute left-0 top-0 h-full bg-[#3c83f6] rounded transition-all duration-300"
              style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
            ></div>
          </div>
          {/* Step Circles */}
          <div className="flex justify-between items-center w-full relative">
            {steps.map((step, index) => {
              const isActive = step.id === currentStep;
              const isCompleted = index < currentIndex;
              const isClickable = index <= currentIndex;

              return (
                <div
                  key={step.id}
                  className="flex flex-col items-center"
                  onClick={isClickable ? () => onNavigateToStep(step.id) : undefined}
                >
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full
                      ${isActive ? 'bg-[#3c83f6] text-white font-bold ring-2 ring-offset-2 ring-[#3c83f6]' : // Active step has ring
                        isCompleted ? 'bg-[#3c83f6] text-white' :
                          'bg-gray-200 text-gray-500'}
                      transition-all duration-200 z-10
                      ${isClickable ? 'cursor-pointer hover:ring-2 hover:ring-[#3c83f6] hover:ring-offset-2' : 'cursor-default'}
                    `}
                  >
                    {index + 1}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="hidden sm:flex justify-between gap-4 mt-4">
        {steps.map((step, index) => {
          const isActive = step.id === currentStep;
          const isCompleted = index < currentIndex;
          const isClickable = index <= currentIndex;
          const iconSrc = icons[index];
          return (
            <div
              key={step.id}
              onClick={isClickable ? () => onNavigateToStep(step.id) : undefined}
              className={`
                flex flex-col items-center justify-center
                border-2 rounded-lg bg-white
                transition-all duration-300 ease-in-out
                ${isActive ? 'border-[#3c83f6] shadow-md' : /* Style for active step */
                  isCompleted ? 'border-blue-300' : /* Style for completed step */
                    'border-gray-300'} /* Style for future step */
                ${isClickable ? 'cursor-pointer hover:border-[#3c83f6] hover:shadow-lg' : 'cursor-default opacity-60'}
              `}
            >
              <img
                src={iconSrc}
                alt={step.label || `Step ${index + 1}`}
                className={`
                  m-3 w-10 h-10
                  transition-all duration-300 ease-in-out
                  ${(isActive || isCompleted) ? '' : 'filter grayscale'} /* Grayscale future steps */
                `}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
