import React from 'react';
import { QuestionStep, UserPreferences, Message, Destination } from '@/types';
import { ProgressIndicator } from '@/components/ProgressIndicator';
import QuestionNavigation from '@/components/QuestionNavigation';
import TravelThemesStep from '@/components/steps/01_TravelThemesStep';
import WeatherPreferenceStep from '@/components/steps/02_WeatherPreferenceStep';
import TravelMonthsStep from '@/components/steps/03_TravelMonthsStep';
import TravelDurationStep from '@/components/steps/04_TravelDurationStep';
import PreferredRegionStep from '@/components/steps/05_PreferredRegionStep';
import TravelBudgetStep from '@/components/steps/07_TravelBudgetStep';
import DestinationRatingStep from '@/components/steps/08_DestinationRatingStep';
import PhotoUploadStep from '@/components/steps/09_PhotoUploadStep';
import RefinePreferencesStep from '@/components/steps/10_RefinePreferencesStep';
import OriginLocationStep from '@/components/steps/06_OriginLocationStep';

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
    handleOriginLocationChange: (location: { name: string; lat: number; lon: number } | null) => void;
    handleBudgetSelect: (budget: string) => void;
    handleDestinationRatingChange: (destinationId: string, rating: "like" | "dislike" | null) => void;
    handlePhotoChange: (photos: { url: string; caption: string }[]) => void;
    handleSendMessage: (message: string) => void;
  };
  isCurrentStepValid: boolean;
  onNextStep: () => void;
  onPreviousStep: () => void;
  onGetRecommendations: () => void;
  onNavigateToStep: (stepId: QuestionStep) => void;
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
  onNavigateToStep,
}) => {
  const currentIndex = questionSteps.findIndex(step => step.id === currentStep);

  const renderStepContent = () => {
    switch (currentStep) {
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
            temperatureRange={preferences.temperatureRange}
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

      case 'origin-location':
        return (
          <OriginLocationStep
            originLocation={preferences.originLocation}
            onOriginLocationChange={handlers.handleOriginLocationChange}
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
          />
        );

      case 'refine-preferences':
        return (
          <RefinePreferencesStep
            messages={messages}
            isLoading={isTyping}
            onSendMessage={handlers.handleSendMessage}
            preferences={preferences}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-md pb-10">
      <div className="p-6 flex-1 overflow-y-auto min-h-[90vh]">
        <ProgressIndicator
          currentStep={currentStep}
          steps={questionSteps}
          onNavigateToStep={onNavigateToStep}
        />
        <div className="my-4">
          {renderStepContent()}
        </div>
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
