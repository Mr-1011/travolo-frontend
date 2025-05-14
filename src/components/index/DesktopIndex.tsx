import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const DesktopIndex = () => {
  const navigate = useNavigate();

  const handleStartApp = () => {
    navigate('/preferences?step=1');
  };

  const handleInfo = () => {
    navigate('/info');
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-10 w-full">
      <div className="flex flex-row w-full">
        {/* Left Side: Title, Description, Buttons */}
        <div className="w-1/2 pr-8">
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold mb-6 text-travel-blue">Welcome to Travolo</h1>

            <div className="mb-8">
              <p className="text-xl mb-4">Find your next travel destination your way</p>
              <p className="text-gray-600 mb-4">
                Travolo learns your preferences in up to 9 quick steps. The more you share, the better the recommendations. You decide how much to share and when to stop. Your privacy stays in your hands.
              </p>
            </div>

            <div className="gap-4 flex mt-auto">
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
        </div>

        {/* Right Side: AnimatedProgressSteps */}
        <div className="w-1/2 flex items-center justify-center">
          <img src="/images/travolo.png" alt="Header" className="w-64 object-cover" />
        </div>
      </div>
    </div>
  );
};

export default DesktopIndex; 