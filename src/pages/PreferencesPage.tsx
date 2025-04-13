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

  // Fetch destinations from API when component mounts
  useEffect(() => {
    const loadDestinations = async () => {
      try {
        const apiDestinations = await fetchDestinations();
        setRatingDestinations(apiDestinations);
      } catch (error) {
        console.error('Failed to load destinations:', error);
        // If API fails, we'll have an empty array
      }
    };

    loadDestinations();
  }, []);

  const {
    preferences,
    messages,
    isTyping,
    recommendations,
    handlers,
    isCurrentStepValid
  } = useUserPreferences();

  // Effect to navigate when recommendations are ready
  useEffect(() => {
    if (recommendations && recommendations.length > 0) {
      // Check if we are *not* already on the results page before navigating
      // This prevents potential loops if the hook updates recommendations again
      // while already on the results page (though unlikely with current setup).
      // A check for a specific state flag set before calling handleGetRecommendations
      // might be more robust.
      navigate('/results', { state: { recommendations } });

      // Optional: Clear recommendations in the hook's state after navigating
      // to prevent re-navigation if the user goes back and forth?
      // handlers.clearRecommendations(); // Assuming such a handler exists
    }
  }, [recommendations, navigate]);

  const handleNextStep = () => {
    const currentIndex = questionSteps.findIndex(step => step.id === currentStep);
    if (currentIndex < questionSteps.length - 1) {
      setCurrentStep(questionSteps[currentIndex + 1].id);
    } else {
      // If it's the last step, trigger recommendation generation
      handlers.handleGetRecommendations(); // Call the handler to fetch/generate
      // Navigation will happen via the useEffect above when recommendations are ready
    }
  };

  const handlePreviousStep = () => {
    const currentIndex = questionSteps.findIndex(step => step.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(questionSteps[currentIndex - 1].id);
    }
  };

  // Modified to trigger recommendation generation
  const handleGetRecommendations = () => {
    handlers.handleGetRecommendations();
    // Navigation happens via useEffect
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