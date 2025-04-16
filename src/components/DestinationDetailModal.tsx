import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Destination } from '@/types';
import TemperatureChart from './TemperatureChart';
import { Maximize2, Minimize2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { submitDestinationFeedback } from '@/services/destinationService';

// Duration styles mapping
const durationStyles: { [key: string]: { name: string; days?: string; icon: string } } = {
  'day trip': { name: 'Day trip', days: '1 day', icon: '🚌' },
  'weekend': { name: 'Weekend', days: '2–3 days', icon: '📅' },
  'short trip': { name: 'Short trip', days: '4–6 days', icon: '🧳' },
  'one week': { name: 'One week', days: '7–9 days', icon: '🧭' },
  'long trip': { name: 'Long trip', days: '10+ days', icon: '🌍' },
};

// Add Budget styles mapping
const budgetStyles: { [key: string]: { name: string; description: string; icon: string } } = {
  'budget': {
    name: 'Budget',
    description: 'Hostels, public transport, low-cost meals',
    icon: '💸'
  },
  'mid-range': {
    name: 'Mid-range',
    description: '3-star hotels, restaurants, taxis',
    icon: '💵'
  },
  'luxury': {
    name: 'Luxury',
    description: 'High-end stays, fine dining, private tours',
    icon: '💎'
  },
};

type DestinationDetailModalProps = {
  destination: Destination | null;
  isOpen: boolean;
  onClose: () => void;
};

const DestinationDetailModal: React.FC<DestinationDetailModalProps> = ({
  destination,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !destination) {
    return null;
  }

  // Log destination details for debugging
  console.log('Destination Details:', destination);

  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  // Feedback State
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackStatus, setFeedbackStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [feedbackError, setFeedbackError] = useState<string | null>(null);

  const handleImageLoad = () => setImageLoading(false);
  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  // Reset image state when modal opens with a new destination
  React.useEffect(() => {
    if (isOpen) {
      setImageLoading(true);
      setImageError(false);
      setIsImageZoomed(false);
    }
  }, [isOpen, destination?.id]);

  // Reset feedback state when modal closes or destination changes
  React.useEffect(() => {
    if (!isOpen) {
      setIsFeedbackOpen(false);
      setFeedbackText('');
      setFeedbackStatus('idle');
      setFeedbackError(null);
    }
  }, [isOpen]);

  React.useEffect(() => {
    // Reset if destination changes while open
    if (isOpen) {
      setIsFeedbackOpen(false);
      setFeedbackText('');
      setFeedbackStatus('idle');
      setFeedbackError(null);
    }
  }, [destination?.id, isOpen]);

  const toggleImageZoom = () => setIsImageZoomed(!isImageZoomed);

  // Renamed function: Only opens feedback
  const handleOpenFeedback = () => setIsFeedbackOpen(true);

  const handleSubmitFeedback = async () => {
    if (!feedbackText.trim() || !destination) return;

    setFeedbackStatus('submitting');
    setFeedbackError(null);
    try {
      await submitDestinationFeedback(destination.id, feedbackText);
      setFeedbackStatus('success');
      setFeedbackText(''); // Clear text on success
      // Optional: close feedback section after a delay
      setTimeout(() => {
        setIsFeedbackOpen(false);
        // Reset status after closing animation (if any)
        setTimeout(() => setFeedbackStatus('idle'), 300);
      }, 1500);
    } catch (error: any) {
      console.error("Feedback submission failed:", error);
      setFeedbackStatus('error');
      setFeedbackError(error.message || 'Failed to submit feedback. Please try again.');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] md:max-w-[800px] lg:max-w-[900px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{destination.name}, {destination.country}</DialogTitle>
        </DialogHeader>

        {/* Scrollable Content Area */}
        <div className="flex-grow overflow-y-auto pr-2 pl-1 space-y-6 py-4">
          {/* Image Section - Add transition and conditional height */}
          <div className={`
            w-full relative overflow-hidden rounded-lg bg-gray-200
            transition-all duration-300 ease-in-out
            ${isImageZoomed ? 'h-[90vh]' : 'h-64 md:h-80'}
          `}>
            {/* Image Loading Placeholder */}
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-0">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            {/* Image Display */}
            {destination.image && !imageError ? (
              <img
                src={destination.image}
                alt={destination.name}
                className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
                onLoad={handleImageLoad}
                onError={handleImageError}
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                {imageError ? 'Image Not Available' : 'No Image Provided'}
              </div>
            )}
            {/* Zoom Button - Only show if image exists and loaded */}
            {!imageLoading && destination.image && !imageError && (
              <button
                onClick={toggleImageZoom}
                className="absolute top-2 right-2 z-10 p-1.5 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                aria-label={isImageZoomed ? 'Minimize image' : 'Maximize image'}
              >
                {isImageZoomed ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
              </button>
            )}
          </div>

          {/* Description Section */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-700">{destination.description}</p>
          </div>

          {/* Category Ratings Section */}
          {destination.categoryRatings && Object.keys(destination.categoryRatings).length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Category Ratings</h3>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4 text-sm">
                {Object.entries(destination.categoryRatings)
                  .sort(([keyA], [keyB]) => keyA.localeCompare(keyB)) // Sort alphabetically
                  .map(([category, rating]) => {
                    const ratingValue = typeof rating === 'number' ? Math.max(0, Math.min(5, rating)) : 0; // Clamp rating 0-5
                    const widthPercentage = ratingValue * 20; // 5 * 20 = 100%
                    return (
                      <li key={category} className="space-y-1">
                        <div className="flex justify-between items-baseline">
                          <span className="capitalize font-medium text-gray-800">{category.replace(/_/g, ' ')}</span>
                          <span className="text-xs font-semibold text-gray-600">{rating ?? 'N/A'} / 5</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${ratingValue >= 4 ? 'bg-green-500' : ratingValue >= 2 ? 'bg-yellow-500' : 'bg-red-500'}`}
                            style={{ width: `${widthPercentage}%` }}
                            aria-valuenow={ratingValue}
                            aria-valuemin={0}
                            aria-valuemax={5}
                            role="progressbar"
                            aria-label={`${category} rating: ${ratingValue} out of 5`}
                          ></div>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </div>
          )}

          {/* Budget and Duration Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {destination.budget && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Typical Budget</h3>
                {(() => {
                  const budgetKey = destination.budget.toLowerCase().replace(' ', '-'); // Handle potential variations like "Mid range"
                  const style = budgetStyles[budgetKey];
                  if (style) {
                    return (
                      <div className="grid grid-cols-2 sm:grid-cols-1 gap-3">
                        <div className="flex flex-col items-center justify-center p-3 rounded-lg border border-gray-200 bg-gray-50 text-center">
                          <span className="text-2xl mb-1">{style.icon}</span>
                          <span className="font-medium text-sm text-gray-700">{style.name}</span>
                          <span className="text-xs mt-0.5 text-gray-500">{style.description}</span>
                        </div>
                      </div>
                    );
                  } else {
                    // Fallback to simple display if budget key doesn't match
                    return (
                      <p className="text-gray-700 capitalize bg-blue-100 p-3 rounded text-center font-medium text-blue-800">
                        {destination.budget}
                      </p>
                    );
                  }
                })()}
              </div>
            )}
            {destination.idealDurations && destination.idealDurations.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Ideal Trip Durations</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {destination.idealDurations.map((duration) => {
                    const style = durationStyles[duration.toLowerCase()];
                    const displayName = style?.name || duration; // Fallback to original name if no style found
                    const displayIcon = style?.icon || '✈️'; // Default icon
                    const displayDays = style?.days;

                    return (
                      <div
                        key={duration}
                        className="flex flex-col items-center justify-center p-3 rounded-lg border border-gray-200 bg-gray-50 text-center"
                      >
                        <span className="text-2xl mb-1">{displayIcon}</span>
                        <span className="font-medium text-sm text-gray-700">{displayName}</span>
                        {displayDays && <span className="text-xs mt-0.5 text-gray-500">{displayDays}</span>}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Temperature Section - Keep inside scrollable area */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Average Monthly Temperatures (°C)</h3>
            <TemperatureChart data={destination.monthlyTemperatures} />
          </div>

          {/* Feedback Section - Moved inside scrollable area */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            {/* Conditionally render the button */}
            {!isFeedbackOpen && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleOpenFeedback}
                className="w-full mb-4" // Add margin-bottom if feedback open
              >
                Destination Feedback
              </Button>
            )}

            {/* Conditionally Rendered Feedback Form */}
            {isFeedbackOpen && (
              <div className="mt-0 space-y-3 p-4 border rounded-md bg-gray-50">
                <p className="text-sm text-gray-600">
                  We are constantly improving the destination data. Please let us know if you think
                  this destination's details or image doesn't represent it well.
                </p>
                <Textarea
                  placeholder="Enter your feedback here..."
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  disabled={feedbackStatus === 'submitting' || feedbackStatus === 'success'}
                  rows={3}
                  maxLength={500}
                />
                <Button
                  onClick={handleSubmitFeedback}
                  disabled={!feedbackText.trim() || feedbackStatus === 'submitting' || feedbackStatus === 'success'}
                  size="sm"
                  className="w-full"
                >
                  {feedbackStatus === 'submitting' ? 'Submitting...' : 'Submit Feedback'}
                </Button>
                {feedbackStatus === 'success' && (
                  <p className="text-sm text-green-600 text-center">Thank you for your feedback!</p>
                )}
                {feedbackStatus === 'error' && (
                  <p className="text-sm text-red-600 text-center">Error: {feedbackError}</p>
                )}
              </div>
            )}
          </div>

        </div>

      </DialogContent>
    </Dialog>
  );
};

export default DestinationDetailModal; 