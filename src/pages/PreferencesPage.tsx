import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import PageLayout from '@/components/layout/PageLayout';
import StepDisplay from '@/components/StepDisplay';

// Utilities & Hooks
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { usePersistedStep } from '@/hooks/usePersistedState';
import { fetchDestinations } from '@/utils/recommendationUtils';

// Types
import { QuestionStep, UserPreferences, Message, Destination, Recommendation } from '@/types';

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

const PreferencesPage = () => {
  const navigate = useNavigate();

  // Use persisted state for currentStep
  const [currentStep, setCurrentStep] = usePersistedStep('travel-themes' as QuestionStep);

  // State for destinations
  const [ratingDestinations, setRatingDestinations] = useState<Destination[]>([]);

  const {
    preferences,
    messages,
    isTyping,
    recommendations,
    handlers,
    isCurrentStepValid
  } = useUserPreferences();

  const handleNextStep = () => {
    const currentIndex = questionSteps.findIndex(step => step.id === currentStep);
    if (currentIndex < questionSteps.length - 1) {
      setCurrentStep(questionSteps[currentIndex + 1].id);
    } else {
      // Last step: Call handler with navigation callback
      console.log("Last step reached, calling handleGetRecommendations with navigation callback");
      handlers.handleGetRecommendations((newRecommendations) => {
        navigate('/results', { state: { recommendations: newRecommendations } });
      });
    }
  };

  const handlePreviousStep = () => {
    const currentIndex = questionSteps.findIndex(step => step.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(questionSteps[currentIndex - 1].id);
    }
  };

  // Modified to call handler with navigation callback
  const handleGetRecommendations = () => {
    console.log("handleGetRecommendations called with navigation callback");
    handlers.handleGetRecommendations((newRecommendations) => {
      navigate('/results', { state: { recommendations: newRecommendations } });
    });
  };

  const handleRestartProcess = () => {
    // Reset all user preferences
    handlers.resetAllPreferences();
    // Go back to the first step
    setCurrentStep('travel-themes' as QuestionStep);
    // Navigate back to home (Title Screen)
    navigate('/');
  };

  // New handler to navigate directly to a specific step
  const handleNavigateToStep = (stepId: QuestionStep) => {
    setCurrentStep(stepId);
  };

  // Simplified renderContent - only shows StepDisplay
  const renderContent = () => {
    return (
      <StepDisplay
        currentStep={currentStep}
        questionSteps={questionSteps}
        destinations={ratingDestinations}
        preferences={preferences}
        messages={messages}
        isTyping={isTyping}
        handlers={handlers} // Pass down handlers including the modified handleGetRecommendations
        isCurrentStepValid={isCurrentStepValid(currentStep)}
        onNextStep={handleNextStep}
        onPreviousStep={handlePreviousStep}
        onGetRecommendations={handleGetRecommendations} // Pass the modified handler
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

export default PreferencesPage; 