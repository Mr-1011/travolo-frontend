import { Destination } from '@/types';
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
  // Extract types based on category fields with a rating of 4 or higher
  const categories: (keyof ApiDestination)[] = [
    'culture', 'adventure', 'nature', 'beaches',
    'nightlife', 'cuisine', 'wellness', 'urban', 'seclusion'
  ];

  const type = categories
    .filter(category => {
      const rating = apiDestination[category];
      return typeof rating === 'number' && rating >= 4;
    })
    // Capitalize the first letter for display
    .map(category => category.charAt(0).toUpperCase() + category.slice(1));

  return {
    id: apiDestination.id,
    name: apiDestination.city,
    country: apiDestination.country,
    description: apiDestination.short_description ||
      `Explore the wonders of ${apiDestination.city}, ${apiDestination.country}`,
    // Use image_url from API. If null/undefined, use an empty string.
    image: apiDestination.image_url || '',
    // Use the filtered and capitalized types
    type: type
  };
}; 