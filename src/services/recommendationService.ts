import { UserPreferences, MonthlyTemperature } from '@/types'; // Added MonthlyTemperature
import { API_BASE_URL } from '@/config/apiConfig'; // Import the base URL

// Define the structure of a single recommendation returned by the backend
// Aligned with ApiDestination structure
export type ApiRecommendation = {
  id: string;
  city: string;
  country: string;
  region: string;
  short_description: string | null; // Use standard description field
  image_url: string | null; // Standard image field

  // Individual category ratings
  culture: number | null;
  adventure: number | null;
  nature: number | null;
  beaches: number | null;
  nightlife: number | null;
  cuisine: number | null;
  wellness: number | null;
  urban: number | null;
  seclusion: number | null;

  // Additional details
  avg_temp_monthly: Record<string, MonthlyTemperature> | null;
  ideal_durations: string[] | null;
  budget_level: string | null;
  confidence?: number; // Keep optional confidence score
};

// Define the structure of the response from the /api/recommendations endpoint
type RecommendationsApiResponse = {
  message: string;
  recommendationRecordId: string; // ID of the saved preferences record
  recommendations: ApiRecommendation[];
};

// Updated return type for fetchRecommendations
type FetchRecommendationsResult = {
  recommendations: ApiRecommendation[];
  recommendationRecordId: string;
};


/**
 * Fetches personalized recommendations based on user preferences.
 * @param {UserPreferences} userPreferences - The user's collected preferences.
 * @returns {Promise<FetchRecommendationsResult>} - A promise that resolves to an object containing recommendations and the record ID.
 * @throws {Error} - Throws an error if the API call fails.
 */
export const fetchRecommendations = async (userPreferences: UserPreferences): Promise<FetchRecommendationsResult> => {
  try {
    // Construct the URL using the base URL
    const response = await fetch(`${API_BASE_URL}/api/recommendations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userPreferences),
    });

    // Check content type before parsing
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      let errorText = `Received non-JSON response (Content-Type: ${contentType || 'N/A'})`;
      try {
        const text = await response.text();
        errorText += `\nResponse body (first 100 chars): ${text.substring(0, 100)}`;
      } catch (textError) {
        // Ignore error reading text body
      }
      throw new Error(`${errorText} - Status: ${response.status} ${response.statusText}`);
    }

    const responseData: RecommendationsApiResponse = await response.json();

    if (!response.ok) {
      // Use a generic error message or try to parse an error from responseData if backend provides one
      const errorMsg = (responseData as any)?.error || `API error: ${response.status}`;
      throw new Error(errorMsg);
    }

    // Return the recommendations and the record ID
    return {
      recommendations: responseData.recommendations,
      recommendationRecordId: responseData.recommendationRecordId,
    };

  } catch (error) {
    console.error('Error fetching recommendations:', error);
    if (error instanceof Error) {
      throw error; // Re-throw specific error message
    } else {
      throw new Error('An unknown error occurred while fetching recommendations.');
    }
  }
};

/**
 * Submits feedback (like/dislike) for a specific recommended destination.
 * @param {string} recommendationId - The ID of the overall recommendation record.
 * @param {string} destinationId - The ID of the specific destination being rated.
 * @param {'like' | 'dislike'} feedback - The feedback provided by the user.
 * @returns {Promise<void>} - A promise that resolves when the feedback is submitted.
 * @throws {Error} - Throws an error if the API call fails.
 */
export const submitRecommendationFeedback = async (
  recommendationId: string,
  destinationId: string,
  feedback: 'like' | 'dislike'
): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/recommendations/${recommendationId}/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ destinationId, feedback }),
    });

    if (!response.ok) {
      let errorMsg = `API error: ${response.status} ${response.statusText}`;
      try {
        const errorData = await response.json();
        errorMsg = errorData?.error || errorData?.message || errorMsg;
      } catch (jsonError) {
        // Ignore if response is not JSON
      }
      throw new Error(errorMsg);
    }
    const responseData = await response.json();
  } catch (error) {
    console.error('Error submitting recommendation feedback:', error);
    if (error instanceof Error) {
      throw error; // Re-throw specific error message
    } else {
      throw new Error('An unknown error occurred while submitting feedback.');
    }
  }
};