
import React, { useState } from 'react';
// Components
import ProgressIndicator from '@/components/ProgressIndicator';
import QuestionNavigation from '@/components/QuestionNavigation';
import RecommendationsView from '@/components/RecommendationsView';
import TitleScreen from '@/components/TitleScreen';

// Step Components
import TravelThemesStep from '@/components/steps/TravelThemesStep';
import WeatherPreferenceStep from '@/components/steps/WeatherPreferenceStep';
import TravelMonthsStep from '@/components/steps/TravelMonthsStep';
import TravelDurationStep from '@/components/steps/TravelDurationStep';
import PreferredRegionStep from '@/components/steps/PreferredRegionStep';
import TravelBudgetStep from '@/components/steps/TravelBudgetStep';
import DestinationRatingStep from '@/components/steps/DestinationRatingStep';
import PhotoUploadStep from '@/components/steps/PhotoUploadStep';
import RefinePreferencesStep from '@/components/steps/RefinePreferencesStep';

// Types
import { 
  QuestionStep, 
  UserPreferences,
  Message,
  Destination,
  Recommendation,
  PrivacyLevel
} from '@/types';

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

const destinations: Destination[] = [
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    description: 'Experience the romance, art, cuisine, and iconic landmarks of the City of Light.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop',
    type: ['Culture', 'Food']
  },
  {
    id: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    description: 'Tropical paradise with stunning beaches, lush rice terraces, and rich cultural heritage.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1938&auto=format&fit=crop',
    type: ['Relaxation', 'Beaches']
  },
  {
    id: 'patagonia',
    name: 'Patagonia',
    country: 'Argentina/Chile',
    description: 'Dramatic landscapes with towering mountains, pristine lakes, and incredible hiking trails.',
    image: 'https://images.unsplash.com/photo-1619409437363-1b1d6df39f49?q=80&w=1974&auto=format&fit=crop',
    type: ['Adventure', 'Nature']
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    description: 'Ultra-modern metropolis with cutting-edge technology, incredible food, and ancient traditions.',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1974&auto=format&fit=crop',
    type: ['Urban', 'Food']
  },
  {
    id: 'maldives',
    name: 'Maldives',
    country: 'Maldives',
    description: 'Pristine white sand beaches, crystal-clear turquoise waters, and overwater bungalows.',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1965&auto=format&fit=crop',
    type: ['Seclusion', 'Beaches']
  },
];

const sampleConversationQuestions = [
  "Tell me about your favorite vacation. What made it special?",
  "What's one travel experience you've always wanted to try?",
  "Describe your ideal evening during a vacation.",
  "What aspects of a destination are most important to you?"
];

const generateRecommendations = (preferences: UserPreferences): Recommendation[] => {
  const sampleRecommendations: Recommendation[] = [
    {
      id: 'santorini',
      name: 'Santorini',
      country: 'Greece',
      description: 'Famous for its dramatic views, stunning sunsets, white-washed houses, and blue domes.',
      image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1974&auto=format&fit=crop',
      matchScore: 96,
      features: ['Beach', 'Culture', 'Relaxation', 'Scenic Views'],
      activities: [
        'Watch the sunset in Oia',
        'Visit black sand beaches',
        'Explore ancient ruins',
        'Enjoy local cuisine and wines'
      ]
    },
    {
      id: 'kyoto',
      name: 'Kyoto',
      country: 'Japan',
      description: 'Ancient capital with over 1,600 Buddhist temples, imperial palaces, and traditional gardens.',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop',
      matchScore: 92,
      features: ['Culture', 'History', 'Food', 'Temples'],
      activities: [
        'Visit Fushimi Inari Shrine',
        'Experience a traditional tea ceremony',
        'Explore bamboo forests',
        'Try authentic Japanese cuisine'
      ]
    },
    {
      id: 'barcelona',
      name: 'Barcelona',
      country: 'Spain',
      description: 'A vibrant city known for stunning architecture, Mediterranean beaches, and lively culture.',
      image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=2070&auto=format&fit=crop',
      matchScore: 88,
      features: ['City', 'Beach', 'Architecture', 'Nightlife'],
      activities: [
        'Explore Gaudí\'s masterpieces',
        'Stroll down Las Ramblas',
        'Relax on Barceloneta Beach',
        'Enjoy tapas and sangria'
      ]
    }
  ];
  
  return sampleRecommendations;
};

const Index = () => {
  const [showTitleScreen, setShowTitleScreen] = useState(true);
  const [currentStep, setCurrentStep] = useState<QuestionStep>('travel-themes');
  const [showRecommendations, setShowRecommendations] = useState(false);
  // Add privacy level state with default value
  const [privacyLevel, setPrivacyLevel] = useState<PrivacyLevel>('medium');
  
  const [preferences, setPreferences] = useState<UserPreferences>({
    // Step 1: Travel Themes
    travelThemes: [],
    
    // Step 2: Preferred Weather
    weatherPreference: 'warm',
    temperatureRange: [15, 25],
    
    // Step 3: Best Months to Travel
    travelMonths: [],
    
    // Step 4: Travel Duration
    travelDuration: '',
    
    // Step 5: Preferred Region
    preferredRegions: [],
    
    // Step 6: Travel Budget
    travelBudget: '',
    
    // Step 7: Destination Ratings
    destinationRatings: {},
    
    // Step 8: Photo Upload
    photos: [],
    
    // Step 9: Conversation Insights
    conversationInsights: [],
  });
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: sampleConversationQuestions[0],
      sender: 'ai'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  
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
    const newRecommendations = generateRecommendations(preferences);
    setRecommendations(newRecommendations);
    setShowRecommendations(true);
  };
  
  const handleBackToPreferences = () => {
    setShowRecommendations(false);
  };
  
  const handleRegenerateRecommendations = () => {
    const newRecommendations = generateRecommendations(preferences);
    setRecommendations(newRecommendations);
  };
  
  // Theme handlers
  const handleThemesChange = (themes: string[]) => {
    setPreferences(prev => ({ ...prev, travelThemes: themes }));
  };
  
  // Weather handlers
  const handleWeatherPreferenceChange = (preference: 'warm' | 'cool' | 'specific-range') => {
    setPreferences(prev => ({ ...prev, weatherPreference: preference }));
  };
  
  const handleTemperatureRangeChange = (range: number[]) => {
    setPreferences(prev => ({ ...prev, temperatureRange: range }));
  };
  
  // Month handlers
  const handleMonthsChange = (months: string[]) => {
    setPreferences(prev => ({ ...prev, travelMonths: months }));
  };
  
  // Duration handlers
  const handleDurationSelect = (duration: string) => {
    setPreferences(prev => ({ ...prev, travelDuration: duration }));
  };
  
  // Region handlers
  const handleRegionChange = (regions: string[]) => {
    setPreferences(prev => ({ ...prev, preferredRegions: regions }));
  };
  
  // Budget handlers
  const handleBudgetSelect = (budget: string) => {
    setPreferences(prev => ({ ...prev, travelBudget: budget }));
  };
  
  // Rating handlers
  const handleDestinationRatingChange = (destinationId: string, rating: number) => {
    setPreferences(prev => ({
      ...prev,
      destinationRatings: {
        ...prev.destinationRatings,
        [destinationId]: rating
      }
    }));
  };
  
  // Photo handlers
  const handlePhotoChange = (photos: {url: string; caption: string}[]) => {
    setPreferences(prev => ({ ...prev, photos }));
  };
  
  // Message handlers
  const handleSendMessage = (message: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'user'
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    setTimeout(() => {
      const randomQuestion = sampleConversationQuestions[
        Math.floor(Math.random() * sampleConversationQuestions.length)
      ];
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        text: randomQuestion,
        sender: 'ai'
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
      
      setPreferences(prev => ({
        ...prev,
        conversationInsights: [...prev.conversationInsights, message]
      }));
    }, 1500);
  };
  
  // Validation
  const isCurrentStepValid = () => {
    switch (currentStep) {
      case 'travel-themes':
        return preferences.travelThemes.length > 0;
      case 'travel-duration':
        return !!preferences.travelDuration;
      case 'preferred-region':
        return preferences.preferredRegions.length > 0;
      case 'travel-budget':
        return !!preferences.travelBudget;
      default:
        return true;
    }
  };
  
  const renderCurrentStep = () => {
    if (showTitleScreen) {
      return <TitleScreen onStart={handleStartApp} />;
    }
    
    if (showRecommendations) {
      return (
        <RecommendationsView 
          recommendations={recommendations}
          privacyLevel={privacyLevel}
          onRegenerateRecommendations={handleRegenerateRecommendations}
          onBackToForm={handleBackToPreferences}
        />
      );
    }
    
    const stepContent = () => {
      switch(currentStep) {
        case 'travel-themes':
          return (
            <TravelThemesStep
              selectedThemes={preferences.travelThemes}
              onThemesChange={handleThemesChange}
            />
          );
          
        case 'preferred-weather':
          return (
            <WeatherPreferenceStep
              weatherPreference={preferences.weatherPreference}
              temperatureRange={preferences.temperatureRange}
              onWeatherPreferenceChange={handleWeatherPreferenceChange}
              onTemperatureRangeChange={handleTemperatureRangeChange}
            />
          );
          
        case 'travel-months':
          return (
            <TravelMonthsStep
              selectedMonths={preferences.travelMonths}
              onMonthsChange={handleMonthsChange}
            />
          );
          
        case 'travel-duration':
          return (
            <TravelDurationStep
              selectedDuration={preferences.travelDuration}
              onDurationSelect={handleDurationSelect}
            />
          );
          
        case 'preferred-region':
          return (
            <PreferredRegionStep
              selectedRegions={preferences.preferredRegions}
              onRegionChange={handleRegionChange}
            />
          );
          
        case 'travel-budget':
          return (
            <TravelBudgetStep
              selectedBudget={preferences.travelBudget}
              onBudgetSelect={handleBudgetSelect}
            />
          );
          
        case 'rate-destinations':
          return (
            <DestinationRatingStep
              destinations={destinations}
              ratings={preferences.destinationRatings}
              onRatingChange={handleDestinationRatingChange}
            />
          );
          
        case 'upload-photo':
          return (
            <PhotoUploadStep
              photos={preferences.photos}
              onPhotoChange={handlePhotoChange}
            />
          );
          
        case 'refine-preferences':
          return (
            <RefinePreferencesStep
              messages={messages}
              isLoading={isTyping}
              onSendMessage={handleSendMessage}
            />
          );
          
        default:
          return null;
      }
    };
    
    return (
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <ProgressIndicator 
          currentStep={currentStep} 
          steps={questionSteps} 
        />
        
        {stepContent()}
        
        <QuestionNavigation
          currentStep={currentStep}
          onNextStep={handleNextStep}
          onPreviousStep={handlePreviousStep}
          onGetRecommendations={handleGetRecommendations}
          isFirstStep={currentStep === questionSteps[0].id}
          isLastStep={currentStep === questionSteps[questionSteps.length - 1].id}
          isCurrentStepValid={isCurrentStepValid()}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#3c83f6]">Travolo</h1>
        </div>
      </header>
      
      <main className="container py-8">
        <div className="max-w-4xl mx-auto">
          {renderCurrentStep()}
        </div>
      </main>
    </div>
  );
};

export default Index;
