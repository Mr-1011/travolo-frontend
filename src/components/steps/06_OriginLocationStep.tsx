// src/components/steps/OriginLocationStep.tsx
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Search, AlertCircle, CheckCircle } from 'lucide-react'; // Using lucide-react for icons

// Define the structure for the origin location data
type OriginLocation = {
  name: string;
  lat: number;
  lon: number;
};

type OriginLocationStepProps = {
  originLocation: OriginLocation | null;
  onOriginLocationChange: (location: OriginLocation | null) => void;
};

const OPENCAGE_API_KEY = import.meta.env.VITE_OPENCAGE_API_KEY; // Ensure you have VITE_OPENCAGE_API_KEY in your .env file

const OriginLocationStep: React.FC<OriginLocationStepProps> = ({
  originLocation,
  onOriginLocationChange
}) => {
  const [inputValue, setInputValue] = useState(originLocation?.name || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(!!originLocation); // Track if a location is confirmed

  // Update input if the prop changes externally (e.g., reset)
  useEffect(() => {
    setInputValue(originLocation?.name || '');
    setIsConfirmed(!!originLocation);
  }, [originLocation]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setError(null); // Clear error on new input
    setIsConfirmed(false); // Reset confirmation status if user types again
    if (originLocation) {
      onOriginLocationChange(null); // Clear the stored location if user edits input after confirmation
    }
  };

  const handleSearch = async () => {
    if (!inputValue.trim()) {
      setError('Please enter a city or country.');
      return;
    }
    if (!OPENCAGE_API_KEY) {
      setError('OpenCage API key is missing. Please configure VITE_OPENCAGE_API_KEY in your .env file.');
      console.error('OpenCage API key is missing.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setIsConfirmed(false);

    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(inputValue)}&key=${OPENCAGE_API_KEY}&limit=1`
      );
      const data = await response.json();

      if (response.ok && data.results && data.results.length > 0) {
        const firstResult = data.results[0];
        const location: OriginLocation = {
          name: firstResult.formatted,
          lat: firstResult.geometry.lat,
          lon: firstResult.geometry.lng,
        };
        setInputValue(location.name); // Update input field with formatted name
        onOriginLocationChange(location);
        setIsConfirmed(true);
      } else {
        setError(`Could not find location "${inputValue}". Please try again.`);
        onOriginLocationChange(null);
      }
    } catch (err) {
      console.error('Geocoding API error:', err);
      setError('Failed to fetch location. Please check your network connection.');
      onOriginLocationChange(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Allow search on Enter key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-1">Set Your Origin Location</h2>
      <p className="text-gray-600 mb-6">Where are you starting your trip?</p>

      {/* Modified flex container for responsiveness */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-2 space-y-2 sm:space-y-0">
        <div className="flex-grow relative">
          <Input
            type="text"
            placeholder="Can be a city, country, or airport."
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className={`pr-10 ${error ? 'border-red-500 focus-visible:ring-red-500' : ''} ${isConfirmed ? 'border-green-500 focus-visible:ring-green-500' : ''}`}
            disabled={isLoading}
          />
          {isConfirmed && !isLoading && (
            <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
          )}
        </div>
        {/* Make button full width on small screens */}
        <Button onClick={handleSearch} disabled={isLoading || isConfirmed} className="w-full sm:w-auto">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Search className="mr-2 h-4 w-4" />
          )}
          {isConfirmed ? 'Confirmed' : 'Find Location'}
        </Button>
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center">
          <AlertCircle className="h-4 w-4 mr-1" />
          {error}
        </p>
      )}
      {!error && isConfirmed && originLocation && (
        <p className="mt-2 text-sm text-green-600 flex items-center">
          <CheckCircle className="h-4 w-4 mr-1" />
          Location set to: {originLocation.name}
        </p>
      )}
      {!OPENCAGE_API_KEY && (
        <p className="mt-2 text-sm text-yellow-600 flex items-center">
          <AlertCircle className="h-4 w-4 mr-1" />
          Note: Geocoding requires a VITE_OPENCAGE_API_KEY environment variable.
        </p>
      )}
    </div>
  );
};

export default OriginLocationStep; 