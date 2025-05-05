import React, { useState, useEffect } from 'react';

const AnimatedProgressSteps: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const totalSteps = 9;
  const icons = Array.from({ length: totalSteps }, (_, i) => `/icons/step-${i + 1}.png`);
  const targetStepIndex = 5; // Target the 6th step (index 5)
  const animationDelay = 1500; // milliseconds between steps
  const pauseDelay = 2000; // milliseconds to pause at target

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isPaused) {
      // If paused (target reached), wait for pauseDelay then reset
      timer = setTimeout(() => {
        setActiveStep(0);
        setIsPaused(false);
      }, pauseDelay);
    } else if (activeStep === targetStepIndex) {
      // Reached the target, start the pause
      setIsPaused(true);
    } else {
      // Normal animation progression: Increment step by 1
      timer = setTimeout(() => {
        setActiveStep((prevStep) => prevStep + 1);
      }, animationDelay);
    }

    // Cleanup timer on component unmount or dependency change
    return () => clearTimeout(timer);
  }, [activeStep, isPaused, targetStepIndex, animationDelay, pauseDelay]);

  return (
    <div className="flex flex-col items-center p-6 border border-gray-400 rounded-lg">
      {/* Step Boxes */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {icons.map((icon, index) => {
          // A step is active if its index is less than or equal to the current activeStep index
          const isCurrentlyActiveStep = index <= activeStep;

          return (
            <div
              key={index}
              className={`
                w-20 h-20 lg:w-20 lg:h-20
                flex items-center justify-center 
                border rounded-md bg-white 
                transition-all duration-500 ease-in-out
                ${isCurrentlyActiveStep ? 'border-blue-500 border-2' : 'border-gray-300 border-2'} 
              `}
            >
              <img
                src={icon}
                alt={`Step ${index + 1}`}
                className={`
                  w-10 h-10 lg:w-12 lg:h-12 
                  transition-all duration-500 ease-in-out
                  ${isCurrentlyActiveStep ? '' : 'filter grayscale'} 
                `}
              />
            </div>
          );
        })}
      </div>

      {/* Get Recommendations Indicator */}
      <div
        className={`
          px-6 py-3 
          font-semibold text-center
          rounded-lg shadow-md 
          transition-colors duration-300 ease-in-out
          w-full max-w-xs md:max-w-sm lg:max-w-md 
          ${activeStep === targetStepIndex ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} 
        `}
      >
        Get Recommendations
      </div>

    </div>
  );
};

export default AnimatedProgressSteps; 