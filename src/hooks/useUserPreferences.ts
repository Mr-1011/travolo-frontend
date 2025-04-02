import { useState, useEffect } from 'react';
import { UserPreferences, Message, Destination, Recommendation } from '@/types';
import { generateRecommendations } from '@/utils/recommendationUtils';

// Sample conversation starters
const sampleConversationQuestions = [
  "Tell me about your favorite vacation. What made it special?",
  "What's one travel experience you've always wanted to try?",
  "Describe your ideal evening during a vacation.",
  "What aspects of a destination are most important to you?"
];

// Export the default preferences to be used elsewhere
export const defaultPreferences: UserPreferences = {
  travelThemes: [],
  temperatureRange: [-5, 30],
  travelMonths: [],
  travelDuration: '',
  preferredRegions: [],
  travelBudget: '',
  destinationRatings: {},
  photos: [],
  conversationInsights: [],
};

export function useUserPreferences() {
  // Load preferences from localStorage if available
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    const storedPreferences = localStorage.getItem('travel_app_preferences');
    if (storedPreferences) {
      try {
        const parsed = JSON.parse(storedPreferences);
        // Remove weatherPreference if it exists in stored data
        if ('weatherPreference' in parsed) {
          const { weatherPreference, ...rest } = parsed;
          return rest;
        }
        return parsed;
      } catch (e) {
        console.warn('Failed to parse stored preferences:', e);
      }
    }
    return defaultPreferences;
  });

  // Load messages from localStorage if available
  const [messages, setMessages] = useState<Message[]>(() => {
    const storedMessages = localStorage.getItem('travel_app_messages');
    if (storedMessages) {
      try {
        return JSON.parse(storedMessages);
      } catch (e) {
        console.warn('Failed to parse stored messages:', e);
        return [
          {
            id: '1',
            text: sampleConversationQuestions[0],
            sender: 'ai'
          }
        ];
      }
    }
    return [
      {
        id: '1',
        text: sampleConversationQuestions[0],
        sender: 'ai'
      }
    ];
  });

  const [isTyping, setIsTyping] = useState(false);

  // Load recommendations from localStorage if available
  const [recommendations, setRecommendations] = useState<Recommendation[]>(() => {
    const storedRecommendations = localStorage.getItem('travel_app_recommendations');
    if (storedRecommendations) {
      try {
        return JSON.parse(storedRecommendations);
      } catch (e) {
        console.warn('Failed to parse stored recommendations:', e);
        return [];
      }
    }
    return [];
  });

  // Save preferences to localStorage when they change
  useEffect(() => {
    localStorage.setItem('travel_app_preferences', JSON.stringify(preferences));
  }, [preferences]);

  // Save messages to localStorage when they change
  useEffect(() => {
    localStorage.setItem('travel_app_messages', JSON.stringify(messages));
  }, [messages]);

  // Save recommendations to localStorage when they change
  useEffect(() => {
    localStorage.setItem('travel_app_recommendations', JSON.stringify(recommendations));
  }, [recommendations]);

  const handleThemesChange = (themes: string[]) => {
    setPreferences(prev => ({ ...prev, travelThemes: themes }));
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

  const handlePhotoChange = (photos: { url: string; caption: string }[]) => {
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
    // Log the complete user preferences for debugging
    console.log('Get Recommendations clicked - User Preferences:', JSON.stringify(preferences, null, 2));
    const newRecommendations = generateRecommendations(preferences);
    setRecommendations(newRecommendations);
  };

  const handleRegenerateRecommendations = () => {
    // Log the complete user preferences for debugging
    console.log('Find My Perfect Trip clicked - User Preferences:', JSON.stringify(preferences, null, 2));
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

  // Add a reset function to clear all user preferences
  const resetAllPreferences = () => {
    // Reset preferences to default values
    setPreferences({ ...defaultPreferences });

    // Reset messages to initial state
    setMessages([{
      id: Date.now().toString(),
      text: sampleConversationQuestions[0],
      sender: 'ai'
    }]);

    // Clear recommendations
    setRecommendations([]);

    // Clear chat started state
    localStorage.setItem('travel_app_chat_started', JSON.stringify(false));

    // Log the reset
    console.log('All preferences reset to default values');
  };

  return {
    preferences,
    messages,
    isTyping,
    recommendations,
    handlers: {
      handleThemesChange,
      handleTemperatureRangeChange,
      handleMonthsChange,
      handleDurationSelect,
      handleRegionChange,
      handleBudgetSelect,
      handleDestinationRatingChange,
      handlePhotoChange,
      handleSendMessage,
      handleGetRecommendations,
      handleRegenerateRecommendations,
      resetAllPreferences
    },
    isCurrentStepValid
  };
}
