import { useState, useEffect } from 'react';
import { UserPreferences, Destination, Recommendation, QuestionStep } from '@/types';
import { fetchRecommendations, ApiRecommendation } from '@/services/recommendationService';


// Define all possible theme IDs - Still useful for iteration
const allThemeIds: (keyof Pick<UserPreferences, 'culture' | 'adventure' | 'nature' | 'beaches' | 'nightlife' | 'cuisine' | 'wellness' | 'urban' | 'seclusion'>)[] = [
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

// Helper function to create the default theme ratings (all set to 1) - No longer needed for structure
// const createDefaultThemeRatings = (): Record<string, number> => { ... };

// Export the default preferences to be used elsewhere
export const defaultPreferences: UserPreferences = {
  // Initialize individual themes
  culture: 1,
  adventure: 1,
  nature: 1,
  beaches: 1,
  nightlife: 1,
  cuisine: 1,
  wellness: 1,
  urban: 1,
  seclusion: 1,
  // travelThemes: createDefaultThemeRatings(), // Removed
  temperatureRange: [-5, 30],
  travelMonths: [],
  travelDuration: [],
  preferredRegions: [],
  originLocation: null,
  travelBudget: [],
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
        const parsed = JSON.parse(storedPreferences);

        // Assume stored data is valid and merge with defaults
        // This will overwrite defaults with stored values if they exist,
        // and keep defaults for fields missing in stored data.
        if (typeof parsed === 'object' && parsed !== null) {
          return { ...defaultPreferences, ...parsed };
        } else {
          // If parsed data isn't an object, log warning and use defaults
          console.warn('Stored preferences are not a valid object, using defaults.');
        }

      } catch (e) {
        console.warn('Failed to parse stored preferences:', e);
        // Fall through to return default preferences on error
      }
    }
    // Return a clean default state if nothing is stored or parsing/validation failed
    return { ...defaultPreferences };
  });

  // Load recommendations from localStorage if available
  const [recommendations, setRecommendations] = useState<Recommendation[]>(() => {
    const storedRecommendations = localStorage.getItem('travel_app_recommendations');
    if (storedRecommendations) {
      try {
        // Attempt to parse. If it fails or doesn't match Recommendation[], return []
        const parsed = JSON.parse(storedRecommendations);
        if (Array.isArray(parsed) && parsed.every(item => 'id' in item && 'name' in item)) { // Basic check
          return parsed as Recommendation[];
        }
        console.warn('Stored recommendations have unexpected format.');
        return [];
      } catch (e) {
        console.warn('Failed to parse stored recommendations:', e);
        return [];
      }
    }
    return [];
  });
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false); // Loading state
  const [recommendationError, setRecommendationError] = useState<string | null>(null); // Error state

  // Save preferences to localStorage when they change
  useEffect(() => {
    localStorage.setItem('travel_app_preferences', JSON.stringify(preferences));
  }, [preferences]);

  // Save recommendations (Recommendation type) to localStorage when they change
  useEffect(() => {
    // Only save if there are recommendations and no error occurred during fetch
    if (recommendations.length > 0 && !recommendationError) {
      localStorage.setItem('travel_app_recommendations', JSON.stringify(recommendations));
    } else if (recommendations.length === 0) {
      // Optionally clear storage if recommendations are explicitly cleared
      localStorage.removeItem('travel_app_recommendations');
    }
  }, [recommendations, recommendationError]);

  // New handler to toggle a specific theme between 1 (not selected) and 5 (selected)
  const handleThemeToggle = (themeId: keyof Pick<UserPreferences, 'culture' | 'adventure' | 'nature' | 'beaches' | 'nightlife' | 'cuisine' | 'wellness' | 'urban' | 'seclusion'>) => {
    setPreferences(prev => {
      const currentRating = prev[themeId];
      const newRating = currentRating === 5 ? 1 : 5; // Toggle between 5 and 1
      return { ...prev, [themeId]: newRating };
    });
  };

  const handleTemperatureRangeChange = (range: number[]) => {
    setPreferences(prev => ({ ...prev, temperatureRange: range }));
  };

  const handleMonthsChange = (months: string[]) => {
    setPreferences(prev => ({ ...prev, travelMonths: months }));
  };

  const handleDurationSelect = (durationId: string) => {
    setPreferences(prev => {
      // More robust check: ensure prev.travelDuration is an array
      const currentDurations = Array.isArray(prev.travelDuration) ? prev.travelDuration : [];
      const isSelected = currentDurations.includes(durationId);
      let newDurations;
      if (isSelected) {
        // Remove the duration if already selected
        newDurations = currentDurations.filter(d => d !== durationId);
      } else {
        // Add the duration if not selected
        newDurations = [...currentDurations, durationId];
      }
      return { ...prev, travelDuration: newDurations };
    });
  };

  const handleRegionChange = (regions: string[]) => {
    setPreferences(prev => ({ ...prev, preferredRegions: regions }));
  };

  const handleOriginLocationChange = (location: { name: string; lat: number; lon: number } | null) => {
    setPreferences(prev => ({ ...prev, originLocation: location }));
  };

  const handleBudgetSelect = (budgetId: string) => {
    setPreferences(prev => {
      const currentBudgets = Array.isArray(prev.travelBudget) ? prev.travelBudget : [];
      const isSelected = currentBudgets.includes(budgetId);
      let newBudgets;
      if (isSelected) {
        newBudgets = currentBudgets.filter(b => b !== budgetId);
      } else {
        newBudgets = [...currentBudgets, budgetId];
      }
      return { ...prev, travelBudget: newBudgets };
    });
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

  /**
   * Call this function whenever a user message is successfully sent
   * by the chat component to increment the counter.
   */
  const handleUserMessageSent = () => {
    setPreferences(prev => ({
      ...prev,
      conversationSummary: {
        // Ensure userMessageCount exists and increment it, defaulting to 1 if it was 0 or undefined
        userMessageCount: (prev.conversationSummary?.userMessageCount || 0) + 1
      }
    }));
    console.log('User message count incremented.');
  };

  const handleGetRecommendations = async (onComplete?: (recommendations: Recommendation[]) => void) => {
    console.log('Get Recommendations called - User Preferences:', JSON.stringify(preferences, null, 2));
    setIsLoadingRecommendations(true);
    setRecommendationError(null); // Clear previous errors
    setRecommendations([]); // Clear previous recommendations immediately

    try {
      // fetchRecommendations now returns ApiRecommendation[] directly
      const apiRecommendations: ApiRecommendation[] = await fetchRecommendations(preferences);

      // Map ApiRecommendation[] to Recommendation[] using direct field names matching the updated type
      const uiRecommendations: Recommendation[] = apiRecommendations.map((apiRec: ApiRecommendation) => ({
        id: apiRec.id,
        city: apiRec.city,         // Use city directly
        country: apiRec.country,
        short_description: apiRec.reason ?? 'No description available.', // Map reason to short_description, provide default
        image: apiRec.image_url ?? undefined, // Use image_url, map to optional image
        confidence: apiRec.match_score ?? undefined, // Map match_score to optional confidence

        // Keep other potential fields from Recommendation type as undefined or map if available in ApiRecommendation
        // region: apiRec.region, // Example if region existed
        // culture: apiRec.culture, // Example if theme scores existed
        // ... other fields like avg_temp_monthly, ideal_durations, budget_level, latitude, longitude
        // Make sure ApiRecommendation provides these if needed, otherwise they remain undefined
      }));

      setRecommendations(uiRecommendations);
      console.log('Mapped recommendations set, calling onComplete callback');
      onComplete?.(uiRecommendations); // Call callback with the mapped data

    } catch (error) {
      console.error('Error fetching or processing recommendations:', error);
      setRecommendationError(error instanceof Error ? error.message : 'An unknown error occurred.');
      setRecommendations([]); // Ensure recommendations are empty on error
      onComplete?.([]); // Optionally call callback with empty array on error
    } finally {
      setIsLoadingRecommendations(false);
    }
  };

  const handleRegenerateRecommendations = (onComplete?: (recommendations: Recommendation[]) => void) => {
    console.log('Regenerate Recommendations called - User Preferences:', JSON.stringify(preferences, null, 2));
    // Re-use the handleGetRecommendations logic for regeneration
    // Pass the onComplete callback along
    handleGetRecommendations(onComplete);
  };

  const isCurrentStepValid = (currentStep: QuestionStep) => {
    switch (currentStep) {
      case 'travel-themes':
        // Check if at least one theme has a rating of 5
        // Iterate over the theme keys defined in allThemeIds
        return allThemeIds.some(themeId => preferences[themeId] === 5);
      case 'travel-months':
        return preferences.travelMonths.length > 0;
      case 'travel-duration':
        return preferences.travelDuration.length > 0;
      case 'preferred-region':
        return preferences.preferredRegions.length > 0;
      case 'origin-location':
        return !!preferences.originLocation;
      case 'travel-budget':
        return preferences.travelBudget.length > 0;
      default:
        return true;
    }
  };

  // Add a reset function to clear all user preferences
  const resetAllPreferences = () => {
    // Reset preferences to default values
    // Need to create a fresh default object inline or ensure defaultPreferences is correctly defined
    const freshDefaults: UserPreferences = {
      culture: 1,
      adventure: 1,
      nature: 1,
      beaches: 1,
      nightlife: 1,
      cuisine: 1,
      wellness: 1,
      urban: 1,
      seclusion: 1,
      temperatureRange: [-5, 30],
      travelMonths: [],
      travelDuration: [],
      preferredRegions: [],
      originLocation: null,
      travelBudget: [],
      destinationRatings: {},
      photoAnalysis: { photoCount: 0, adjustmentSuccessful: false },
      conversationSummary: { userMessageCount: 0 },
    };
    setPreferences(freshDefaults);

    // Reset recommendations
    setRecommendations([]);

    // Clear specific localStorage items
    localStorage.removeItem('travel_app_preferences');
    localStorage.removeItem('travel_app_recommendations');
    localStorage.removeItem('travel_app_chat_started');
    localStorage.removeItem('travel_app_step'); // Clear the persisted step

    // Reset loading and error states
    setIsLoadingRecommendations(false);
    setRecommendationError(null);

    // Log the reset
    console.log('All preferences and related storage reset to default values (excluding messages).');
  };

  return {
    preferences,
    recommendations,
    isLoadingRecommendations,
    recommendationError,
    handlers: {
      handleThemeToggle,
      handleWeatherPreferenceChange,
      handleTemperatureRangeChange,
      handleMonthsChange,
      handleDurationSelect,
      handleRegionChange,
      handleOriginLocationChange,
      handleBudgetSelect,
      handleDestinationRatingChange,
      handlePhotoChange,
      handlePhotoAnalysisUpdate,
      handleUserMessageSent,
      handleGetRecommendations,
      handleRegenerateRecommendations,
      resetAllPreferences
    },
    isCurrentStepValid
  };
}
