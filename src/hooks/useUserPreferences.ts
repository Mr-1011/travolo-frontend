import { useState, useEffect } from 'react';
import { UserPreferences, Message, Destination, Recommendation, QuestionStep } from '@/types';

// Sample conversation starters
const sampleConversationQuestions = [
  "Tell me about your favorite vacation. What made it special?",
  "What's one travel experience you've always wanted to try?",
  "Describe your ideal evening during a vacation.",
  "What aspects of a destination are most important to you?"
];

// Sample recommendations to use when generating recommendations
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

// Define all possible theme IDs
const allThemeIds = [
  'culture',
  'adventure',
  'nature',
  'beaches',
  'nightlife',
  'cuisine',
  'wellness',
  'urban',
  'seclusion',
];

// Helper function to create the default theme ratings (all set to 1)
const createDefaultThemeRatings = (): Record<string, number> => {
  return allThemeIds.reduce((acc, themeId) => {
    acc[themeId] = 1; // Default rating
    return acc;
  }, {} as Record<string, number>);
};

// Export the default preferences to be used elsewhere
export const defaultPreferences: UserPreferences = {
  travelThemes: createDefaultThemeRatings(), // Use helper for initial default
  temperatureRange: [-5, 30],
  travelMonths: [],
  travelDuration: '',
  preferredRegions: [],
  originLocation: null,
  travelBudget: '',
  destinationRatings: {},
  photoAnalysis: { photoCount: 0, adjustmentSuccessful: false },
  conversationSummary: { userMessageCount: 0 },
};

export function useUserPreferences() {
  // Load preferences from localStorage if available
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    const storedPreferences = localStorage.getItem('travel_app_preferences');
    if (storedPreferences) {
      try {
        let parsed = JSON.parse(storedPreferences);

        // --- Theme Migration --- START
        if (Array.isArray(parsed.travelThemes)) {
          // Old format (string[]) found, migrate to Record<string, number>
          const selectedThemes = parsed.travelThemes as string[];
          const newThemeRatings: Record<string, number> = {};
          allThemeIds.forEach(themeId => {
            newThemeRatings[themeId] = selectedThemes.includes(themeId) ? 5 : 1;
          });
          parsed.travelThemes = newThemeRatings;
        } else if (typeof parsed.travelThemes === 'object' && parsed.travelThemes !== null) {
          // New format (Record<string, number>) found, ensure all keys exist
          const currentRatings = parsed.travelThemes as Record<string, number>;
          const completeRatings: Record<string, number> = {};
          allThemeIds.forEach(themeId => {
            completeRatings[themeId] = currentRatings[themeId] === 5 ? 5 : 1; // Keep 5s, default others to 1
          });
          parsed.travelThemes = completeRatings;
        } else {
          // Invalid or missing, initialize with defaults
          parsed.travelThemes = createDefaultThemeRatings();
        }
        // --- Theme Migration --- END

        // Migration/Compatibility: Check for old fields and initialize new ones if necessary
        if ('photos' in parsed || !('photoAnalysis' in parsed)) {
          parsed.photoAnalysis = { photoCount: parsed.photos?.length || 0, adjustmentSuccessful: false }; // Default adjustment to false
          delete parsed.photos; // Remove old field
        }
        if ('conversationInsights' in parsed || !('conversationSummary' in parsed)) {
          parsed.conversationSummary = { userMessageCount: parsed.conversationInsights?.length || 0 };
          delete parsed.conversationInsights; // Remove old field
        }
        // Remove weatherPreference if it exists in stored data (legacy handling)
        if ('weatherPreference' in parsed) {
          const { weatherPreference, ...rest } = parsed;
          parsed = rest; // Update parsed object directly
        }

        // Merge with defaults to ensure all fields are present
        return { ...defaultPreferences, ...parsed };
      } catch (e) {
        console.warn('Failed to parse stored preferences:', e);
      }
    }
    // Return a clean default state if nothing is stored or parsing failed
    return { ...defaultPreferences };
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

  // Updated handler: Accepts selected theme IDs (string[]) and updates the ratings Record
  const handleThemesChange = (selectedThemeIds: string[]) => {
    setPreferences(prev => {
      const newThemeRatings: Record<string, number> = {};
      allThemeIds.forEach(themeId => {
        newThemeRatings[themeId] = selectedThemeIds.includes(themeId) ? 5 : 1;
      });
      return { ...prev, travelThemes: newThemeRatings };
    });
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

  const handleOriginLocationChange = (location: { name: string; lat: number; lon: number } | null) => {
    setPreferences(prev => ({ ...prev, originLocation: location }));
  };

  const handleBudgetSelect = (budget: string) => {
    setPreferences(prev => ({ ...prev, travelBudget: budget }));
  };

  const handleDestinationRatingChange = (destinationId: string, rating: 'like' | 'dislike' | null) => {
    setPreferences(prev => {
      const currentRating = prev.destinationRatings[destinationId];
      const newRating = currentRating === rating ? null : rating; // Toggle or set

      return {
        ...prev,
        destinationRatings: {
          ...prev.destinationRatings,
          [destinationId]: newRating
        }
      };
    });
  };

  // Updated to handle photo analysis summary
  const handlePhotoAnalysisUpdate = (analysis: { photoCount: number; adjustmentSuccessful: boolean }) => {
    setPreferences(prev => ({
      ...prev,
      photoAnalysis: {
        photoCount: analysis.photoCount,
        adjustmentSuccessful: analysis.adjustmentSuccessful
      }
    }));
  };

  // Kept for compatibility or potential future use, logs a warning
  const handlePhotoChange = (photos: { url: string; caption: string }[]) => {
    console.warn('handlePhotoChange is deprecated. Use handlePhotoAnalysisUpdate instead.');
    // Optionally, update photo count if needed for basic compatibility
    setPreferences(prev => ({
      ...prev,
      photoAnalysis: {
        ...prev.photoAnalysis, // Keep existing adjustment status
        photoCount: photos.length,
      }
    }));
  };

  const handleWeatherPreferenceChange = (preference: 'warm' | 'cool' | 'specific-range') => {
    console.log('Weather preference changed:', preference);
  };

  const handleSendMessage = (message: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'user'
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Increment user message count in preferences
    setPreferences(prev => ({
      ...prev,
      conversationSummary: {
        userMessageCount: (prev.conversationSummary?.userMessageCount || 0) + 1
      }
    }));

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

      // Removed direct update to conversationInsights
      // Preferences are now updated above when the user message is sent
    }, 1500);
  };

  const handleGetRecommendations = (onComplete?: (recommendations: Recommendation[]) => void) => {
    console.log('Get Recommendations called - User Preferences:', JSON.stringify(preferences, null, 2));
    // Simulate potential async operation
    setTimeout(() => {
      const newRecommendations = sampleRecommendations; // In reality, fetch/generate here
      setRecommendations(newRecommendations);
      console.log('Recommendations set, calling onComplete callback');
      onComplete?.(newRecommendations); // Call callback if provided
    }, 50); // Short delay to simulate async
  };

  const handleRegenerateRecommendations = (onComplete?: (recommendations: Recommendation[]) => void) => {
    console.log('Regenerate Recommendations called - User Preferences:', JSON.stringify(preferences, null, 2));
    // Simulate potential async operation
    setTimeout(() => {
      // Modify sample data slightly for regeneration effect if desired
      const regeneratedRecommendations = sampleRecommendations.map(r => ({ ...r, matchScore: r.matchScore - Math.floor(Math.random() * 5) }));
      setRecommendations(regeneratedRecommendations);
      console.log('Recommendations regenerated, calling onComplete callback');
      onComplete?.(regeneratedRecommendations);
    }, 50); // Short delay to simulate async
  };

  const isCurrentStepValid = (currentStep: QuestionStep) => {
    switch (currentStep) {
      case 'travel-themes':
        // Check if at least one theme has a rating of 5
        return Object.values(preferences.travelThemes || {}).some(rating => rating === 5);
      case 'travel-months':
        return preferences.travelMonths.length > 0;
      case 'travel-duration':
        return !!preferences.travelDuration;
      case 'preferred-region':
        return preferences.preferredRegions.length > 0;
      case 'origin-location':
        return !!preferences.originLocation;
      case 'travel-budget':
        return !!preferences.travelBudget;
      default:
        return true;
    }
  };

  // Add a reset function to clear all user preferences
  const resetAllPreferences = () => {
    // Reset preferences to default values using the spread operator for a clean copy
    // Ensure defaultPreferences uses the updated createDefaultThemeRatings()
    const freshDefaults = { ...defaultPreferences, travelThemes: createDefaultThemeRatings() };
    setPreferences(freshDefaults);

    // Reset messages to initial state
    setMessages([{
      id: Date.now().toString(),
      text: sampleConversationQuestions[0],
      sender: 'ai'
    }]);

    // Clear recommendations
    setRecommendations([]);

    // Clear specific localStorage items
    localStorage.removeItem('travel_app_preferences');
    localStorage.removeItem('travel_app_messages');
    localStorage.removeItem('travel_app_recommendations');
    localStorage.removeItem('travel_app_chat_started');
    localStorage.removeItem('travel_app_step'); // Clear the persisted step

    // Log the reset
    console.log('All preferences and related storage reset to default values');
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
      handleOriginLocationChange,
      handleBudgetSelect,
      handleDestinationRatingChange,
      handlePhotoChange, // Kept for potential compatibility, but logs warning
      handlePhotoAnalysisUpdate, // New handler for photo analysis
      handleSendMessage,
      handleGetRecommendations,
      handleRegenerateRecommendations,
      resetAllPreferences
    },
    isCurrentStepValid
  };
}
