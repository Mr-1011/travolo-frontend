
import React from 'react';
import { Card } from '@/components/ui/card';

type Destination = {
  id: string;
  name: string;
  country: string;
  description: string;
  image: string;
  type: string[];
};

type DestinationRatingProps = {
  destinations: Destination[];
  ratings: Record<string, number>;
  onRatingChange: (destinationId: string, rating: number) => void;
};

const DestinationRating: React.FC<DestinationRatingProps> = ({ 
  destinations, 
  ratings, 
  onRatingChange 
}) => {
  // Emoji reactions from 😍 (Love) → 🙂 → 😐 → 🙁 → 😖 (Dislike)
  const reactionEmojis = ['😍', '🙂', '😐', '🙁', '😖'];
  
  return (
    <div className="w-full">
      <h3 className="text-xl font-semibold mb-2">Rate these vacation destinations</h3>
      <p className="text-gray-600 mb-6">This helps us understand your preferences better</p>
      
      <div className="space-y-6">
        {destinations.map((destination) => (
          <Card key={destination.id} className="overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/3 h-64 md:h-auto relative">
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent md:bg-gradient-to-t md:from-black/60 md:via-black/30 md:to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 p-4 md:hidden">
                  <h4 className="text-lg font-semibold text-white">{destination.name}</h4>
                  <p className="text-sm text-gray-200">{destination.country}</p>
                </div>
              </div>
              
              <div className="p-6 w-full md:w-2/3">
                <div className="hidden md:block">
                  <h4 className="text-lg font-semibold">{destination.name}, {destination.country}</h4>
                </div>
                
                <div className="flex flex-wrap gap-2 my-3">
                  {destination.type.map((type, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700">
                      {type}
                    </span>
                  ))}
                </div>
                
                <p className="text-gray-600 mb-6">{destination.description}</p>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-gray-500">Your rating:</div>
                  <div className="flex gap-3">
                    {reactionEmojis.map((emoji, index) => (
                      <button 
                        key={index}
                        className={`text-2xl transition-all hover:scale-125 ${
                          ratings[destination.id] === 5-index 
                            ? 'scale-125 bg-gray-100 rounded-full p-1'
                            : 'p-1'
                        }`}
                        onClick={() => onRatingChange(destination.id, 5-index)}
                      >
                        {emoji}
                      </button>
                    ))}
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

export default DestinationRating;
