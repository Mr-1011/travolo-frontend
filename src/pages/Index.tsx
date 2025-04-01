import React, { useState } from 'react';
// Common components
import PrivacyLevel from '@/components/PrivacyLevel';
import StageButtons from '@/components/StageButtons';
import RecommendationsView from '@/components/RecommendationsView';

// Stage 1 components
import ThemeSelector from '@/components/stage1/ThemeSelector';
import TemperatureSelector from '@/components/stage1/TemperatureSelector';
import RegionSelector from '@/components/stage1/RegionSelector';

// Stage 2 components
import ActivitySelector from '@/components/stage2/ActivitySelector';
import BudgetSelector from '@/components/stage2/BudgetSelector';
import DurationSelector from '@/components/stage2/DurationSelector';
import MoodSelector from '@/components/stage2/MoodSelector';

// Stage 3 components
import DestinationRating from '@/components/stage3/DestinationRating';

// Stage 4 components
import ConversationInput from '@/components/stage4/ConversationInput';

// Stage 5 components
import PhotoUpload from '@/components/stage5/PhotoUpload';

// Types
import { 
  Stage, 
  PrivacyLevel as PrivacyLevelType, 
  UserPreferences,
  Message,
  Destination,
  Recommendation 
} from '@/types';

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

const generateRecommendations = (preferences: UserPreferences, privacyLevel: PrivacyLevelType): Recommendation[] => {
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
  const [currentStage, setCurrentStage] = useState<Stage>(1);
  const [privacyLevel, setPrivacyLevel] = useState<PrivacyLevelType>('minimal');
  const [showRecommendations, setShowRecommendations] = useState(false);
  
  const [preferences, setPreferences] = useState<UserPreferences>({
    theme: '',
    temperature: [20],
    region: '',
    
    activities: [],
    budget: '',
    duration: '',
    mood: '',
    
    destinationRatings: {},
    
    conversationInsights: [],
    
    photos: []
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
  
  const handleContinueToNextStage = () => {
    const nextStage = (currentStage + 1) as Stage;
    setCurrentStage(nextStage);
    
    switch(nextStage) {
      case 2:
        setPrivacyLevel('low');
        break;
      case 3:
        setPrivacyLevel('medium');
        break;
      case 4:
        setPrivacyLevel('high');
        break;
      case 5:
        setPrivacyLevel('highest');
        break;
      default:
        break;
    }
  };
  
  const handleGetRecommendations = () => {
    const newRecommendations = generateRecommendations(preferences, privacyLevel);
    setRecommendations(newRecommendations);
    setShowRecommendations(true);
  };
  
  const handleBackToPreferences = () => {
    setShowRecommendations(false);
  };
  
  const handleRegenerateRecommendations = () => {
    const newRecommendations = generateRecommendations(preferences, privacyLevel);
    setRecommendations(newRecommendations);
  };
  
  const handleThemeSelect = (theme: string) => {
    setPreferences(prev => ({ ...prev, theme }));
  };
  
  const handleTemperatureChange = (temperature: number[]) => {
    setPreferences(prev => ({ ...prev, temperature }));
  };
  
  const handleRegionSelect = (region: string) => {
    setPreferences(prev => ({ ...prev, region }));
  };
  
  const handleActivityToggle = (activityId: string) => {
    setPreferences(prev => {
      const activities = [...prev.activities];
      const index = activities.indexOf(activityId);
      
      if (index >= 0) {
        activities.splice(index, 1);
      } else {
        activities.push(activityId);
      }
      
      return { ...prev, activities };
    });
  };
  
  const handleBudgetSelect = (budget: string) => {
    setPreferences(prev => ({ ...prev, budget }));
  };
  
  const handleDurationSelect = (duration: string) => {
    setPreferences(prev => ({ ...prev, duration }));
  };
  
  const handleMoodSelect = (mood: string) => {
    setPreferences(prev => ({ ...prev, mood }));
  };
  
  const handleDestinationRatingChange = (destinationId: string, rating: number) => {
    setPreferences(prev => ({
      ...prev,
      destinationRatings: {
        ...prev.destinationRatings,
        [destinationId]: rating
      }
    }));
  };
  
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
  
  const handlePhotoUpload = (photos: string[]) => {
    setPreferences(prev => ({ ...prev, photos }));
  };

  const renderCurrentStage = () => {
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
    
    switch(currentStage) {
      case 1:
        return (
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <ThemeSelector 
              selectedTheme={preferences.theme}
              onThemeSelect={handleThemeSelect}
            />
            
            <TemperatureSelector 
              temperature={preferences.temperature}
              onTemperatureChange={handleTemperatureChange}
            />
            
            <RegionSelector 
              selectedRegion={preferences.region}
              onRegionSelect={handleRegionSelect}
            />
            
            <StageButtons 
              onGetRecommendations={handleGetRecommendations}
              onContinue={handleContinueToNextStage}
            />
          </div>
        );
        
      case 2:
        return (
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <ActivitySelector 
              selectedActivities={preferences.activities}
              onActivityToggle={handleActivityToggle}
            />
            
            <BudgetSelector 
              selectedBudget={preferences.budget}
              onBudgetSelect={handleBudgetSelect}
            />
            
            <DurationSelector 
              selectedDuration={preferences.duration}
              onDurationSelect={handleDurationSelect}
            />
            
            <MoodSelector 
              selectedMood={preferences.mood}
              onMoodSelect={handleMoodSelect}
            />
            
            <StageButtons 
              onGetRecommendations={handleGetRecommendations}
              onContinue={handleContinueToNextStage}
            />
          </div>
        );
        
      case 3:
        return (
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <DestinationRating 
              destinations={destinations}
              ratings={preferences.destinationRatings}
              onRatingChange={handleDestinationRatingChange}
            />
            
            <StageButtons 
              onGetRecommendations={handleGetRecommendations}
              onContinue={handleContinueToNextStage}
            />
          </div>
        );
        
      case 4:
        return (
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <ConversationInput 
              messages={messages}
              onSendMessage={handleSendMessage}
              isLoading={isTyping}
            />
            
            <StageButtons 
              onGetRecommendations={handleGetRecommendations}
              onContinue={handleContinueToNextStage}
            />
          </div>
        );
        
      case 5:
        return (
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <PhotoUpload 
              photos={preferences.photos}
              onPhotoUpload={handlePhotoUpload}
            />
            
            <StageButtons 
              onGetRecommendations={handleGetRecommendations}
              isFinalStage={true}
            />
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-travel-red">Travolo</h1>
          {!showRecommendations && <PrivacyLevel level={privacyLevel} />}
        </div>
      </header>
      
      <main className="container py-8">
        {!showRecommendations && (
          <div className="mb-8 text-center max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-travel-dark">
              {currentStage === 1 && "Let's find your perfect destination"}
              {currentStage === 2 && "Tell us more about your preferences"}
              {currentStage === 3 && "Rate these vacation ideas"}
              {currentStage === 4 && "Let's chat about your travel style"}
              {currentStage === 5 && "Share photos from your favorite vacations"}
            </h2>
            <p className="text-gray-600">
              {currentStage === 1 && "Start with some basic preferences. You can get recommendations now or continue for better results."}
              {currentStage === 2 && "Let's get more specific about your ideal trip."}
              {currentStage === 3 && "Rate these destinations to help us understand what you like."}
              {currentStage === 4 && "A quick conversation will help us better understand your preferences."}
              {currentStage === 5 && "Sharing vacation photos helps us recommend the most personalized destinations."}
            </p>
            
            <div className="flex justify-center mt-6 mb-2">
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((stage) => (
                  <div 
                    key={stage}
                    className={`w-3 h-3 rounded-full ${
                      stage <= currentStage ? 'bg-travel-teal' : 'bg-gray-300'
                    } ${stage === currentStage ? 'w-4 h-4' : ''}`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        
        <div className="max-w-4xl mx-auto">
          {renderCurrentStage()}
        </div>
      </main>
      
      <footer className="bg-travel-dark text-white py-4 mt-auto">
        <div className="container text-center">
          <p>Travolo &copy; {new Date().getFullYear()} — Find your perfect trip</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
