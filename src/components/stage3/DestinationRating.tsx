
import React from 'react';

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
          <div key={destination.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/3 h-48 md:h-auto">
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 md:p-6 w-full md:w-2/3">
                <h4 className="text-lg font-semibold">{destination.name}, {destination.country}</h4>
                <div className="flex flex-wrap gap-2 my-2">
                  {destination.type.map((type, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                      {type}
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 mb-4">{destination.description}</p>
                
                <div className="flex items-center justify-between mt-2">
                  <div className="text-sm text-gray-500">Your opinion:</div>
                  <div className="flex gap-3">
                    {reactionEmojis.map((emoji, index) => (
                      <button 
                        key={index}
                        className={`text-2xl transition-all hover:scale-125 ${
                          ratings[destination.id] === 5-index ? 'scale-125' : ''
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default DestinationRating;
