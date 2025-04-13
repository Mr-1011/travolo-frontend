
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

type Destination = {
  id: string;
  name: string;
  country: string;
  description: string;
  image: string;
  type: string[];
};

type DestinationRatingStepProps = {
  destinations: Destination[];
  ratings: Record<string, number>;
  onRatingChange: (destinationId: string, rating: number) => void;
};

const DestinationRatingStep: React.FC<DestinationRatingStepProps> = ({ 
  destinations, 
  ratings, 
  onRatingChange 
}) => {
  // Emoji reactions from 😍 (Love) → 🙂 → 😐 → 🙁 → 😖 (Dislike)
  const reactionEmojis = ['😍', '🙂', '😐', '🙁', '😖'];
  const emojiLabels = ['Very appealing', 'Pretty appealing', 'Neutral', 'Slightly', 'Not at all'];
  
  const reversedRating = (rating: number) => {
    // Convert 1-5 scale to 5-1 (for display purposes)
    return 6 - rating;
  };
  
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-2">Rate These Destinations</h2>
      <p className="text-gray-600 mb-6">How appealing do these places seem to you?</p>
      
      <div className="space-y-6">
        {destinations.map((destination) => (
          <Card key={destination.id} className="overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300 destination-card">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/3 h-64 md:h-auto relative overflow-hidden">
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="w-full h-full object-cover destination-image"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent md:bg-gradient-to-t md:from-black/60 md:via-black/30 md:to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 p-4 md:hidden">
                  <h4 className="text-lg font-semibold text-white">{destination.name}</h4>
                  <p className="text-sm text-gray-200">{destination.country}</p>
                </div>
              </div>
              
              <div className="p-6 w-full md:w-2/3">
                <div className="hidden md:block">
                  <h4 className="text-xl font-semibold">{destination.name}, {destination.country}</h4>
                </div>
                
                <div className="flex flex-wrap gap-2 my-3">
                  {destination.type.map((type, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700">
                      {type}
                    </span>
                  ))}
                </div>
                
                <p className="text-gray-600 mb-6">{destination.description}</p>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4">
                  <div className="text-sm text-gray-500 mb-2 sm:mb-0">Your rating:</div>
                  <div className="flex gap-3">
                    {reactionEmojis.map((emoji, index) => {
                      const ratingValue = 5 - index;
                      const isSelected = ratings[destination.id] === ratingValue;
                      
                      return (
                        <button 
                          key={index}
                          className={`
                            group text-2xl transition-all rating-emoji
                            ${isSelected ? 'rating-emoji-selected bg-gray-100 rounded-full p-1' : 'p-1'}
                          `}
                          onClick={() => onRatingChange(destination.id, ratingValue)}
                          title={emojiLabels[index]}
                        >
                          {emoji}
                          <span className={`
                            absolute -bottom-8 left-1/2 transform -translate-x-1/2 
                            text-xs bg-gray-800 text-white px-2 py-1 rounded 
                            opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap
                          `}>
                            {emojiLabels[index]}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DestinationRatingStep;
