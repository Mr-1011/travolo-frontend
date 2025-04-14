import { UserPreferences } from '@/types'; // Assuming you have a UserPreferences type

// Define the structure of a single recommendation returned by the backend
// Based on the placeholder in recommendationService.js
// TODO: Update this type when the backend returns actual destination data
export type ApiRecommendation = {
  id: string;
  city: string;
  country: string;
  reason: string; // Placeholder field
  // Add other fields expected from the *actual* backend implementation later
  // e.g., image_url, description, etc. matching ApiDestination from destinationService.ts
};

// Define the structure of the response from the /api/recommendations endpoint
type RecommendationsApiResponse = {
  message: string;
  preferences_received: UserPreferences; // Echoed preferences
  recommendations: ApiRecommendation[];
};


/**
 * Fetches personalized recommendations based on user preferences.
 * @param {UserPreferences} userPreferences - The user's collected preferences.
 * @returns {Promise<ApiRecommendation[]>} - A promise that resolves to an array of recommendations.
 * @throws {Error} - Throws an error if the API call fails.
 */
export const fetchRecommendations = async (userPreferences: UserPreferences): Promise<ApiRecommendation[]> => {
  console.log("Sending user preferences to backend:", userPreferences);
  try {
    const response = await fetch('http://localhost:3001/api/recommendations', {
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

    console.log('Recommendations received:', responseData.recommendations);
    // Return only the recommendations array
    return responseData.recommendations;

  } catch (error) {
    console.error('Error fetching recommendations:', error);
    if (error instanceof Error) {
      throw error; // Re-throw specific error message
    } else {
      throw new Error('An unknown error occurred while fetching recommendations.');
    }
  }
};