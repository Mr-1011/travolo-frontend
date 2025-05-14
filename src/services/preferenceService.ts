import { API_BASE_URL } from '@/config/apiConfig'; // Import the base URL

/**
 * Sends images and current theme preferences to the backend for analysis.
 * @param {File[]} imageFiles - An array of image files (max 3).
 * @param {Record<string, number>} themePreferences - The current theme preference scores (e.g., { culture: 5, adventure: 1 }).
 * @returns {Promise<object>} - The analysis result from the backend (contains imageAnalysis and imageSummary).
 * @throws {Error} - Throws an error if the API call fails.
 */
export const analyzeImagePreferences = async (
  imageFiles: File[],
  themePreferences: Record<string, number> // Add themePreferences parameter
): Promise<{ imageAnalysis: Record<string, number>; imageSummary: string }> => {
  if (!imageFiles || imageFiles.length === 0) {
    throw new Error('No image files provided.');
  }
  if (imageFiles.length > 3) {
    throw new Error('Cannot upload more than 3 images.');
  }

  const formData = new FormData();
  imageFiles.forEach((file) => {
    // The backend expects files under the 'images' field name
    formData.append('images', file);
  });

  // Append the theme preferences as a JSON string
  formData.append('preferences', JSON.stringify(themePreferences));

  try {
    // Construct the URL using the base URL
    const response = await fetch(`${API_BASE_URL}/api/preferences/analyze-images`, {
      method: 'POST',
      body: formData,
      // No 'Content-Type' header needed; browser sets it correctly for FormData
    });

    // Check content type before parsing
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      // Attempt to read response as text for better error message
      let errorText = `Received non-JSON response (Content-Type: ${contentType || 'N/A'})`;
      try {
        const text = await response.text();
        errorText += `\nResponse body (first 100 chars): ${text.substring(0, 100)}`;
      } catch (textError) {
        // Ignore error reading text body if it also fails
      }
      throw new Error(`${errorText} - Status: ${response.status} ${response.statusText}`);
    }

    // Now safe to parse as JSON
    const responseData = await response.json();

    if (!response.ok) {
      // Throw an error with backend message if available
      const errorMsg = responseData?.error || `API error: ${response.status}`;
      throw new Error(errorMsg);
    }
    // Expecting { message, analysis: { imageAnalysis, imageSummary } }
    if (!responseData.analysis || !responseData.analysis.imageAnalysis || typeof responseData.analysis.imageSummary !== 'string') {
      console.error('Invalid response structure from backend:', responseData);
      throw new Error('Received invalid analysis structure from backend.');
    }

    return responseData.analysis; // <-- Return only the analysis part

  } catch (error) {
    console.error('Error analyzing image preferences:', error);
    if (error instanceof Error) {
      throw error; // Re-throw specific error message
    } else {
      throw new Error('An unknown error occurred during image analysis.');
    }
  }
}; 