import { API_BASE_URL } from '@/config/apiConfig'; // Import the base URL

/**
 * Sends images to the backend for preference analysis.
 * @param {File[]} imageFiles - An array of image files (max 3).
 * @returns {Promise<object>} - The analysis result from the backend.
 * @throws {Error} - Throws an error if the API call fails.
 */
export const analyzeImagePreferences = async (imageFiles: File[]): Promise<object> => {
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

    console.log('Image analysis successful:', responseData);
    return responseData; // Contains { message, analysis } from backend

  } catch (error) {
    console.error('Error analyzing image preferences:', error);
    if (error instanceof Error) {
      throw error; // Re-throw specific error message
    } else {
      throw new Error('An unknown error occurred during image analysis.');
    }
  }
}; 