import React, { useState, useEffect } from 'react';
// Components
import PageLayout from '@/components/layout/PageLayout';
import TitleScreen from '@/components/TitleScreen';
import RecommendationsView from '@/components/RecommendationsView';
import StepDisplay from '@/components/StepDisplay';

// Utilities & Hooks
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { usePersistedStep } from '@/hooks/usePersistedState';
import { destinations } from '@/utils/recommendationUtils';

// Types
import { QuestionStep, UserPreferences, Message, Destination } from '@/types';

const questionSteps = [
  { id: 'travel-themes' as QuestionStep, label: 'Travel Themes' },
  { id: 'preferred-weather' as QuestionStep, label: 'Weather Preference' },
  { id: 'travel-months' as QuestionStep, label: 'Travel Months' },
  { id: 'travel-duration' as QuestionStep, label: 'Trip Duration' },
  { id: 'preferred-region' as QuestionStep, label: 'Regions' },
  { id: 'origin-location' as QuestionStep, label: 'Origin Location' },
  { id: 'travel-budget' as QuestionStep, label: 'Budget' },
  { id: 'rate-destinations' as QuestionStep, label: 'Rate Destinations' },
  { id: 'upload-photo' as QuestionStep, label: 'Upload Photo' },
  { id: 'refine-preferences' as QuestionStep, label: 'Refine Preferences' },
];

const Index = () => {
  // Use persisted state for showTitleScreen
  const [showTitleScreen, setShowTitleScreen] = useState<boolean>(() => {
    const storedValue = localStorage.getItem('travel_app_showTitleScreen');
    return storedValue ? JSON.parse(storedValue) : true;
  });

  // Use persisted state for currentStep
  const [currentStep, setCurrentStep] = usePersistedStep('travel-themes' as QuestionStep);

  // Use persisted state for showRecommendations
  const [showRecommendations, setShowRecommendations] = useState<boolean>(() => {
    const storedValue = localStorage.getItem('travel_app_showRecommendations');
    return storedValue ? JSON.parse(storedValue) : false;
  });

  // Save showTitleScreen and showRecommendations to localStorage
  useEffect(() => {
    localStorage.setItem('travel_app_showTitleScreen', JSON.stringify(showTitleScreen));
  }, [showTitleScreen]);

  useEffect(() => {
    localStorage.setItem('travel_app_showRecommendations', JSON.stringify(showRecommendations));
  }, [showRecommendations]);

  const {
    preferences,
    messages,
    isTyping,
    recommendations,
    handlers,
    isCurrentStepValid
  } = useUserPreferences();

  const handleStartApp = () => {
    setShowTitleScreen(false);
  };

  const handleNextStep = () => {
    const currentIndex = questionSteps.findIndex(step => step.id === currentStep);
    if (currentIndex < questionSteps.length - 1) {
      setCurrentStep(questionSteps[currentIndex + 1].id);
    }
  };

  const handlePreviousStep = () => {
    const currentIndex = questionSteps.findIndex(step => step.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(questionSteps[currentIndex - 1].id);
    }
  };

  const handleGetRecommendations = () => {
    handlers.handleGetRecommendations();
    setShowRecommendations(true);
  };

  const handleBackToPreferences = () => {
    setShowRecommendations(false);
  };

  const handleRestartProcess = () => {
    // Reset all user preferences
    handlers.resetAllPreferences();

    // Go back to the first step
    setCurrentStep('travel-themes' as QuestionStep);

    // Close recommendations view
    setShowRecommendations(false);

    // Clear URL parameters except for step=1
    const url = new URL(window.location.href);
    url.search = '?step=1';
    window.history.replaceState({}, '', url.toString());
  };

  // New handler to navigate directly to a specific step
  const handleNavigateToStep = (stepId: QuestionStep) => {
    setCurrentStep(stepId);
  };

  const renderContent = () => {
    if (showTitleScreen) {
      return <TitleScreen onStart={handleStartApp} />;
    }

    if (showRecommendations) {
      return (
        <RecommendationsView
          recommendations={recommendations}
          onRegenerateRecommendations={handlers.handleRegenerateRecommendations}
          onBackToForm={handleBackToPreferences}
          onRestartProcess={handleRestartProcess}
        />
      );
    }

    return (
      <StepDisplay
        currentStep={currentStep}
        questionSteps={questionSteps}
        destinations={destinations}
        preferences={preferences}
        messages={messages}
        isTyping={isTyping}
        handlers={handlers}
        isCurrentStepValid={isCurrentStepValid(currentStep)}
        onNextStep={handleNextStep}
        onPreviousStep={handlePreviousStep}
        onGetRecommendations={handleGetRecommendations}
        onNavigateToStep={handleNavigateToStep}
      />
    );
  };

  return (
    <PageLayout>
      {renderContent()}
    </PageLayout>
  );
};

export default Index;
