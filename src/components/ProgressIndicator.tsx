
import React from 'react';
import { QuestionStep } from '@/types';

type ProgressIndicatorProps = {
  currentStep: QuestionStep;
  steps: {
    id: QuestionStep;
    label: string;
  }[];
};

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  steps
}) => {
  const currentIndex = steps.findIndex(step => step.id === currentStep);
  
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center w-full mb-2">
        {steps.map((step, index) => {
          // Determine status
          const isActive = step.id === currentStep;
          const isCompleted = index < currentIndex;
          
          return (
            <div 
              key={step.id}
              className="flex flex-col items-center"
            >
              <div 
                className={`flex items-center justify-center w-8 h-8 rounded-full 
                  ${isActive ? 'bg-[#3c83f6] text-white' : 
                    isCompleted ? 'bg-[#3c83f6]/20 text-[#3c83f6]' : 'bg-gray-200 text-gray-500'}
                  transition-all duration-200
                `}
              >
                {index + 1}
              </div>
            </div>
          );
        })}
      </div>

      <div className="relative w-full h-1 bg-gray-200 mt-2 mb-4 rounded">
        <div 
          className="absolute left-0 top-0 h-full bg-[#3c83f6] rounded transition-all duration-300"
          style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
        ></div>
      </div>

      <p className="text-center font-medium text-gray-600">
        Step {currentIndex + 1} of {steps.length}: <span className="text-[#3c83f6]">{steps[currentIndex].label}</span>
      </p>
    </div>
  );
};
