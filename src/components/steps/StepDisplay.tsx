
import React from 'react';
import { QuestionStep, UserPreferences, Message, Destination } from '@/types';
import { ProgressIndicator } from '@/components/ProgressIndicator';
import QuestionNavigation from '@/components/QuestionNavigation';
import TravelThemesStep from '@/components/steps/TravelThemesStep';
import WeatherPreferenceStep from '@/components/steps/WeatherPreferenceStep';
import TravelMonthsStep from '@/components/steps/TravelMonthsStep';
import TravelDurationStep from '@/components/steps/TravelDurationStep';
import PreferredRegionStep from '@/components/steps/PreferredRegionStep';
import TravelBudgetStep from '@/components/steps/TravelBudgetStep';
import DestinationRatingStep from '@/components/steps/DestinationRatingStep';
import PhotoUploadStep from '@/components/steps/PhotoUploadStep';
import RefinePreferencesStep from '@/components/steps/RefinePreferencesStep';

type StepDisplayProps = {
  currentStep: QuestionStep;
  questionSteps: { id: QuestionStep; label: string }[];
  destinations: Destination[];
  preferences: UserPreferences;
  messages: Message[];
  isTyping: boolean;
  handlers: {
    handleThemesChange: (themes: string[]) => void;
    handleWeatherPreferenceChange: (preference: 'warm' | 'cool' | 'specific-range') => void;
    handleTemperatureRangeChange: (range: number[]) => void;
    handleMonthsChange: (months: string[]) => void;
    handleDurationSelect: (duration: string) => void;
    handleRegionChange: (regions: string[]) => void;
    handleBudgetSelect: (budget: string) => void;
    handleDestinationRatingChange: (destinationId: string, rating: number) => void;
    handlePhotoChange: (photos: {url: string; caption: string}[]) => void;
    handleSendMessage: (message: string) => void;
  };
  isCurrentStepValid: boolean;
  onNextStep: () => void;
  onPreviousStep: () => void;
  onGetRecommendations: () => void;
};

const StepDisplay: React.FC<StepDisplayProps> = ({
  currentStep,
  questionSteps,
  destinations,
  preferences,
  messages,
  isTyping,
  handlers,
  isCurrentStepValid,
  onNextStep,
  onPreviousStep,
  onGetRecommendations,
}) => {
  const currentIndex = questionSteps.findIndex(step => step.id === currentStep);
  
  const renderStepContent = () => {
    switch(currentStep) {
      case 'travel-themes':
        return (
          <TravelThemesStep
            selectedThemes={preferences.travelThemes}
            onThemesChange={handlers.handleThemesChange}
          />
        );
        
      case 'preferred-weather':
        return (
          <WeatherPreferenceStep
            weatherPreference={preferences.weatherPreference}
            temperatureRange={preferences.temperatureRange}
            onWeatherPreferenceChange={handlers.handleWeatherPreferenceChange}
            onTemperatureRangeChange={handlers.handleTemperatureRangeChange}
          />
        );
        
      case 'travel-months':
        return (
          <TravelMonthsStep
            selectedMonths={preferences.travelMonths}
            onMonthsChange={handlers.handleMonthsChange}
          />
        );
        
      case 'travel-duration':
        return (
          <TravelDurationStep
            selectedDuration={preferences.travelDuration}
            onDurationSelect={handlers.handleDurationSelect}
          />
        );
        
      case 'preferred-region':
        return (
          <PreferredRegionStep
            selectedRegions={preferences.preferredRegions}
            onRegionChange={handlers.handleRegionChange}
          />
        );
        
      case 'travel-budget':
        return (
          <TravelBudgetStep
            selectedBudget={preferences.travelBudget}
            onBudgetSelect={handlers.handleBudgetSelect}
          />
        );
        
      case 'rate-destinations':
        return (
          <DestinationRatingStep
            destinations={destinations}
            ratings={preferences.destinationRatings}
            onRatingChange={handlers.handleDestinationRatingChange}
          />
        );
        
      case 'upload-photo':
        return (
          <PhotoUploadStep
            photos={preferences.photos}
            onPhotoChange={handlers.handlePhotoChange}
          />
        );
        
      case 'refine-preferences':
        return (
          <RefinePreferencesStep
            messages={messages}
            isLoading={isTyping}
            onSendMessage={handlers.handleSendMessage}
          />
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8 h-[550px] flex flex-col">
      <ProgressIndicator 
        currentStep={currentStep} 
        steps={questionSteps} 
      />
      
      <div className="flex-1 overflow-hidden">
        {renderStepContent()}
      </div>
      
      <QuestionNavigation
        currentStep={currentStep}
        onNextStep={onNextStep}
        onPreviousStep={onPreviousStep}
        onGetRecommendations={onGetRecommendations}
        isFirstStep={currentStep === questionSteps[0].id}
        isLastStep={currentStep === questionSteps[questionSteps.length - 1].id}
        isCurrentStepValid={isCurrentStepValid}
      />
    </div>
  );
};

export default StepDisplay;
