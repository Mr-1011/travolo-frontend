import { Destination, MonthlyTemperature } from '@/types';
import { API_BASE_URL } from '@/config/apiConfig';

/**
 * API response type from the random destinations endpoint
 */
export type ApiDestination = {
  id: string;
  city: string;
  country: string;
  region: string;
  short_description: string | null;
  culture: number | null;
  adventure: number | null;
  nature: number | null;
  beaches: number | null;
  nightlife: number | null;
  cuisine: number | null;
  wellness: number | null;
  urban: number | null;
  seclusion: number | null;
  image_url: string | null;
  avg_temp_monthly: Record<string, MonthlyTemperature> | null;
  ideal_durations: string[] | null;
  budget_level: string | null;
};

/**
 * Fetches random destinations from the API (assumed to return 10 by default)
 * @param excludeIds - Optional array of destination IDs to exclude.
 */
export const fetchRandomDestinations = async (excludeIds?: string[]): Promise<ApiDestination[]> => {
  try {
    const url = new URL(`${API_BASE_URL}/api/destinations/random`);
    if (excludeIds && excludeIds.length > 0) {
      url.searchParams.append('exclude', excludeIds.join(','));
    }

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching random destinations:', error);
    throw error;
  }
};

/**
 * Converts API destination format to the application Destination format
 */
export const mapApiToDestination = (apiDestination: ApiDestination): Destination => {
  const categories: (keyof ApiDestination)[] = [
    'culture', 'adventure', 'nature', 'beaches',
    'nightlife', 'cuisine', 'wellness', 'urban', 'seclusion'
  ];

  // Determine 'type' based on ratings >= 4
  const type = categories
    .filter(category => {
      const rating = apiDestination[category];
      return typeof rating === 'number' && rating >= 4;
    })
    .map(category => category.charAt(0).toUpperCase() + category.slice(1));

  // Helper function to safely get number or null
  const getRating = (key: keyof ApiDestination): number | null => {
    const rating = apiDestination[key];
    return typeof rating === 'number' ? rating : null;
  };

  return {
    id: apiDestination.id,
    city: apiDestination.city,
    country: apiDestination.country,
    region: apiDestination.region,
    short_description: apiDestination.short_description ||
      `Explore the wonders of ${apiDestination.city}, ${apiDestination.country}.`,
    image_url: apiDestination.image_url || '',

    // Map individual category ratings directly
    culture: getRating('culture'),
    adventure: getRating('adventure'),
    nature: getRating('nature'),
    beaches: getRating('beaches'),
    nightlife: getRating('nightlife'),
    cuisine: getRating('cuisine'),
    wellness: getRating('wellness'),
    urban: getRating('urban'),
    seclusion: getRating('seclusion'),

    avg_temp_monthly: apiDestination.avg_temp_monthly ?? null,
    ideal_durations: apiDestination.ideal_durations ?? null,
    budget_level: apiDestination.budget_level ?? null,
  };
};

/**
 * Submits feedback for a specific destination.
 * @param destinationId - The ID of the destination.
 * @param feedback - The feedback text.
 */
export const submitDestinationFeedback = async (
  destinationId: string,
  feedback: string
): Promise<void> => {
  try {
    const url = `${API_BASE_URL}/api/destinations/${destinationId}/feedback`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ feedback }), // Send feedback in the body
    });

    if (!response.ok) {
      // Try to get error details from response body
      let errorBody = 'Unknown error';
      try {
        errorBody = await response.text(); // Or response.json() if backend sends JSON error
      } catch (_) {
        // Ignore if body parsing fails
      }
      throw new Error(`API error: ${response.status} - ${errorBody}`);
    }

    // No content expected on success, just return
    return;

  } catch (error) {
    console.error(`Error submitting feedback for destination ${destinationId}:`, error);
    // Re-throw the error so the component can handle it
    throw error;
  }
}; 