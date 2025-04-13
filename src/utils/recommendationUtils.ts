import { Destination } from '@/types';
import { fetchRandomDestinations, mapApiToDestination } from '@/services/destinationService';

/**
 * Fetches destinations from the API
 */
export const fetchDestinations = async (): Promise<Destination[]> => {
  try {
    const apiDestinations = await fetchRandomDestinations();
    return apiDestinations.map(mapApiToDestination);
  } catch (error) {
    console.error('Failed to fetch destinations:', error);
    // Return empty array instead of using fallback
    return [];
  }
};
