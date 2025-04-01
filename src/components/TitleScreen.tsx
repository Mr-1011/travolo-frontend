
import React from 'react';
import { Button } from '@/components/ui/button';

type TitleScreenProps = {
  onStart: () => void;
};

const TitleScreen: React.FC<TitleScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto py-12">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-travel-blue">Welcome to Travolo</h1>
      
      <div className="mb-8">
        <p className="text-xl mb-4">Find your perfect vacation destination in just a few steps.</p>
        <p className="text-gray-600 mb-6">
          Travolo personalizes your travel recommendations as you share more information.
          You can get recommendations at any point or continue for better personalization.
        </p>
        
        <div className="bg-blue-50 p-4 rounded-lg text-left mb-8">
          <h3 className="font-semibold text-lg mb-2">How it works:</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Start with basic preferences (theme, temperature)</li>
            <li>Add activities and mood information</li>
            <li>Rate destinations you like or dislike</li>
            <li>Chat about your travel style</li>
            <li>Share photos from previous trips</li>
          </ol>
          <p className="mt-3 text-sm">At any point, you can see recommendations based on what you've shared.</p>
        </div>
      </div>
      
      <Button 
        onClick={onStart}
        className="bg-travel-blue hover:bg-travel-darkBlue text-white font-medium rounded-lg py-6 px-8 text-xl"
      >
        Start My Travel Journey
      </Button>
    </div>
  );
};

export default TitleScreen;
