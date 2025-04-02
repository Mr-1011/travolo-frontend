
import { useState } from 'react';
import { UserPreferences, Message, Destination, Recommendation } from '@/types';
import { generateRecommendations } from '@/utils/recommendationUtils';

// Sample conversation starters
const sampleConversationQuestions = [
  "Tell me about your favorite vacation. What made it special?",
  "What's one travel experience you've always wanted to try?",
  "Describe your ideal evening during a vacation.",
  "What aspects of a destination are most important to you?"
];

export function useUserPreferences() {
  const [preferences, setPreferences] = useState<UserPreferences>({
    travelThemes: [],
    weatherPreference: 'warm',
    temperatureRange: [15, 25],
    travelMonths: [],
    travelDuration: '',
    preferredRegions: [],
    travelBudget: '',
    destinationRatings: {},
    photos: [],
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

  const handleThemesChange = (themes: string[]) => {
    setPreferences(prev => ({ ...prev, travelThemes: themes }));
  };
  
  const handleWeatherPreferenceChange = (preference: 'warm' | 'cool' | 'specific-range') => {
    setPreferences(prev => ({ ...prev, weatherPreference: preference }));
  };
  
  const handleTemperatureRangeChange = (range: number[]) => {
    setPreferences(prev => ({ ...prev, temperatureRange: range }));
  };
  
  const handleMonthsChange = (months: string[]) => {
    setPreferences(prev => ({ ...prev, travelMonths: months }));
  };
  
  const handleDurationSelect = (duration: string) => {
    setPreferences(prev => ({ ...prev, travelDuration: duration }));
  };
  
  const handleRegionChange = (regions: string[]) => {
    setPreferences(prev => ({ ...prev, preferredRegions: regions }));
  };
  
  const handleBudgetSelect = (budget: string) => {
    setPreferences(prev => ({ ...prev, travelBudget: budget }));
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
  
  const handlePhotoChange = (photos: {url: string; caption: string}[]) => {
    setPreferences(prev => ({ ...prev, photos }));
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

  const handleGetRecommendations = () => {
    const newRecommendations = generateRecommendations(preferences);
    setRecommendations(newRecommendations);
  };

  const handleRegenerateRecommendations = () => {
    const newRecommendations = generateRecommendations(preferences);
    setRecommendations(newRecommendations);
  };

  const isCurrentStepValid = (currentStep: string) => {
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

  return {
    preferences,
    messages,
    isTyping,
    recommendations,
    handlers: {
      handleThemesChange,
      handleWeatherPreferenceChange,
      handleTemperatureRangeChange,
      handleMonthsChange,
      handleDurationSelect,
      handleRegionChange,
      handleBudgetSelect,
      handleDestinationRatingChange,
      handlePhotoChange,
      handleSendMessage,
      handleGetRecommendations,
      handleRegenerateRecommendations
    },
    isCurrentStepValid
  };
}
