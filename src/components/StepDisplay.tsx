import React from 'react';
import { QuestionStep, UserPreferences, Destination } from '@/types';
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
  handlers: {
    handleWeatherPreferenceChange: (preference: 'warm' | 'cool' | 'specific-range') => void;
    handleTemperatureRangeChange: (range: number[]) => void;
    handleMonthsChange: (months: string[]) => void;
    handleDurationSelect: (duration: string) => void;
    handleRegionChange: (regions: string[]) => void;
    handleOriginLocationChange: (location: { name: string; lat: number; lon: number } | null) => void;
    handleBudgetSelect: (budget_level: string) => void;
    handleDestinationRatingChange: (destinationId: string, rating: "like" | "dislike" | null) => void;
    handlePhotoChange: (photos: { url: string; caption: string }[]) => void;
    handlePhotoAnalysisUpdate: (analysis: { imageCount: number; adjustmentSuccessful: boolean }) => void;
    handlePhotoUploaded: () => void;
    handleUserMessageSent: () => void;
    handleThemeToggle: (theme: string) => void;
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
        const themeValues = {
          culture: preferences.culture,
          adventure: preferences.adventure,
          nature: preferences.nature,
          beaches: preferences.beaches,
          nightlife: preferences.nightlife,
          cuisine: preferences.cuisine,
          wellness: preferences.wellness,
          urban: preferences.urban,
          seclusion: preferences.seclusion,
        };
        return (
          <TravelThemesStep
            themeValues={themeValues}
            onThemeToggle={handlers.handleThemeToggle}
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
        const themePreferences = {
          culture: preferences.culture,
          adventure: preferences.adventure,
          nature: preferences.nature,
          beaches: preferences.beaches,
          nightlife: preferences.nightlife,
          cuisine: preferences.cuisine,
          wellness: preferences.wellness,
          urban: preferences.urban,
          seclusion: preferences.seclusion,
        };
        return (
          <PhotoUploadStep
            onAnalysisComplete={handlers.handlePhotoAnalysisUpdate}
            onPhotoAdded={handlers.handlePhotoUploaded}
            currentThemePreferences={themePreferences}
          />
        );

      case 'refine-preferences':
        return (
          <RefinePreferencesStep
            preferences={preferences}
            messages={[]}
            isLoading={false}
            onSendMessage={() => { console.log("Temp onSendMessage called"); }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-md pb-10">
      <div className="p-6 flex-1 overflow-y-auto min-h-[92vh]">
        <ProgressIndicator
          currentStep={currentStep}
          steps={questionSteps}
          onNavigateToStep={onNavigateToStep}
        />
        <div className="my-4">
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
    </div>
  );
};

export default StepDisplay;
