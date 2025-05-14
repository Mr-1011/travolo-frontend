import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AnimatedProgressSteps from '@/components/AnimatedProgressSteps';

const MobileIndex = () => {
  const navigate = useNavigate();

  const handleStartApp = () => {
    navigate('/preferences?step=1');
  };

  const handleInfo = () => {
    navigate('/info');
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 min-h-screen">
      <div className="flex flex-col items-center justify-center max-w-2xl mx-auto">
        <img src="/images/travolo.png" alt="Header" className="w-32 object-cover mt-14 mb-20" />
        <h1 className="text-4xl md:text-5xl font-bold text-travel-blue mb-4">Welcome to Travolo</h1>

        <div className="mb-4 text-left">
          <p className="text-xl mb-4">Find your next travel destination</p>
          <p className="text-gray-600 mb-6">
            Travolo learns your preferences in up to 9 quick steps. The more you share, the better the recommendations. You decide how much to share and when to stop.
          </p>
        </div>

      </div>

      <div className="text-center gap-4 flex justify-center">
        <Button
          variant="outline"
          onClick={handleInfo}
          className="border-travel-blue text-travel-blue hover:bg-travel-blue hover:text-white font-medium rounded-lg py-6 px-8 text-xl"
        >
          Learn More
        </Button>
        <Button
          onClick={handleStartApp}
          className="bg-travel-blue hover:bg-travel-darkBlue text-white font-medium rounded-lg py-6 px-8 text-xl"
        >
          Start Now
        </Button>
      </div>
    </div>
  );
};

export default MobileIndex; 