import React, { useState } from 'react';
// Components
import PageLayout from '@/components/layout/PageLayout';
import TitleScreen from '@/components/TitleScreen';
import RecommendationsView from '@/components/RecommendationsView';
import StepDisplay from '@/components/steps/StepDisplay';

// Utilities & Hooks
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { destinations } from '@/utils/recommendationUtils';

// Types
import { QuestionStep, PrivacyLevel } from '@/types';

const questionSteps = [
  { id: 'travel-themes' as QuestionStep, label: 'Travel Themes' },
  { id: 'preferred-weather' as QuestionStep, label: 'Weather Preference' },
  { id: 'travel-months' as QuestionStep, label: 'Travel Months' },
  { id: 'travel-duration' as QuestionStep, label: 'Trip Duration' },
  { id: 'preferred-region' as QuestionStep, label: 'Regions' },
  { id: 'travel-budget' as QuestionStep, label: 'Budget' },
  { id: 'rate-destinations' as QuestionStep, label: 'Rate Destinations' },
  { id: 'upload-photo' as QuestionStep, label: 'Upload Photo' },
  { id: 'refine-preferences' as QuestionStep, label: 'Refine Preferences' },
];

const Index = () => {
  const [showTitleScreen, setShowTitleScreen] = useState(true);
  const [currentStep, setCurrentStep] = useState<QuestionStep>('travel-themes');
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [privacyLevel, setPrivacyLevel] = useState<PrivacyLevel>('medium');
  
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
  
  const renderContent = () => {
    if (showTitleScreen) {
      return <TitleScreen onStart={handleStartApp} />;
    }
    
    if (showRecommendations) {
      return (
        <RecommendationsView 
          recommendations={recommendations}
          privacyLevel={privacyLevel}
          onRegenerateRecommendations={handlers.handleRegenerateRecommendations}
          onBackToForm={handleBackToPreferences}
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
