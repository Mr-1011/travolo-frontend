import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PageLayout from '@/components/layout/PageLayout';
import AnimatedProgressSteps from '@/components/AnimatedProgressSteps';

const Index = () => {
  const navigate = useNavigate();

  const handleStartApp = () => {
    navigate('/preferences?step=1'); // Navigate to the new preferences route
  };

  const handleInfo = () => {
    navigate('/info');
  };

  return (
    <PageLayout>
      <div className="bg-white rounded-xl shadow-md p-6 md:p-10">
        <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-travel-blue mb-12">Welcome to Travolo</h1>

          <div className="mb-8 text-left">
            <p className="text-xl mb-4">My Name is <span className="font-bold">Furkan Imamoglu</span> and this is my Master Thesis Project</p>
            <p className="text-gray-600 mb-6">
              I am evaluating the tradeoff between accuracy and privacy in hybrid travel recommender systems. You will see 9 individual steps that I will go through to build this application. You decide when to stop and see the recommendations.
            </p>
          </div>
          <AnimatedProgressSteps />
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
    </PageLayout>
  );
};

export default Index;
