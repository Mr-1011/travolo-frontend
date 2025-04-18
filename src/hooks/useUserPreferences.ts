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

// Export the default preferences to be used elsewhere
export const defaultPreferences: UserPreferences = {
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
  const [recommendationRecordId, setRecommendationRecordId] = useState<string | null>(null); // Add state for the ID

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

  // Renamed back: Handler to toggle a specific theme between 1 (not selected) and 5 (selected)
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
        // Only update the adjustment status. Count is handled by handlePhotoUploaded.
        ...prev.photoAnalysis, // Keep existing count
        adjustmentSuccessful: analysis.adjustmentSuccessful
      }
    }));
  };

  /**
   * New handler to increment photo count when a photo is uploaded.
   * Call this from your upload component after a successful upload.
   */
  const handlePhotoUploaded = () => {
    setPreferences(prev => ({
      ...prev,
      photoAnalysis: {
        ...prev.photoAnalysis,
        photoCount: (prev.photoAnalysis?.photoCount || 0) + 1
      }
    }));
    console.log('Photo count incremented.');
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

  const handleGetRecommendations = async (onComplete?: (recommendations: Recommendation[], recommendationRecordId: string | null) => void) => {
    console.log('Get Recommendations called - User Preferences:', JSON.stringify(preferences, null, 2));
    setIsLoadingRecommendations(true);
    setRecommendationError(null); // Clear previous errors
    setRecommendations([]); // Clear previous recommendations immediately
    setRecommendationRecordId(null); // Clear previous ID immediately

    try {
      // fetchRecommendations now returns an object { recommendations, recommendationRecordId }
      const result = await fetchRecommendations(preferences);

      // Destructure the result
      const apiRecommendations = result.recommendations;
      const recordId = result.recommendationRecordId;

      // Map ApiRecommendation[] to Recommendation[] using the updated types
      const uiRecommendations: Recommendation[] = apiRecommendations.map((apiRec: ApiRecommendation) => ({
        id: apiRec.id,
        city: apiRec.city,
        country: apiRec.country,
        region: apiRec.region ?? undefined,
        short_description: apiRec.short_description ?? 'No description available.', // Use short_description
        image_url: apiRec.image_url ?? undefined,

        culture: apiRec.culture ?? undefined,
        adventure: apiRec.adventure ?? undefined,
        nature: apiRec.nature ?? undefined,
        beaches: apiRec.beaches ?? undefined,
        nightlife: apiRec.nightlife ?? undefined,
        cuisine: apiRec.cuisine ?? undefined,
        wellness: apiRec.wellness ?? undefined,
        urban: apiRec.urban ?? undefined,
        seclusion: apiRec.seclusion ?? undefined,

        avg_temp_monthly: apiRec.avg_temp_monthly ?? undefined,
        ideal_durations: apiRec.ideal_durations ?? undefined,
        budget_level: apiRec.budget_level ?? undefined,
        confidence: apiRec.confidence, // Use confidence score directly
      }));

      setRecommendations(uiRecommendations);
      setRecommendationRecordId(recordId); // Store the received ID
      onComplete?.(uiRecommendations, recordId); // Call callback with the mapped data and the record ID

    } catch (error) {
      console.error('Error fetching or processing recommendations:', error);
      setRecommendationError(error instanceof Error ? error.message : 'An unknown error occurred.');
      setRecommendations([]); // Ensure recommendations are empty on error
      onComplete?.([], null); // Optionally call callback with empty array and null ID on error
    } finally {
      setIsLoadingRecommendations(false);
    }
  };

  const handleRegenerateRecommendations = (onComplete?: (recommendations: Recommendation[], recommendationRecordId: string | null) => void) => {
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
    recommendationRecordId,
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
      handlePhotoUploaded,
      handlePhotoAnalysisUpdate,
      handleUserMessageSent,
      handleGetRecommendations,
      handleRegenerateRecommendations,
      resetAllPreferences
    },
    isCurrentStepValid
  };
}
