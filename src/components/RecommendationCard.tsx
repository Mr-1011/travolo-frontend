
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

export type Recommendation = {
  id: string;
  name: string;
  country: string;
  description: string;
  image: string;
  matchScore: number;
  features: string[];
  activities: string[];
};

type RecommendationCardProps = {
  recommendation: Recommendation;
};

const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation }) => {
  const [liked, setLiked] = React.useState(false);
  
  return (
    <Card className="overflow-hidden rounded-3xl transition-all duration-300 hover:shadow-lg bg-white flex flex-col h-full">
      {/* Image section with gradient overlay and details */}
      <div className="relative w-full h-[280px]">
        <img 
          src={recommendation.image} 
          alt={recommendation.name}
          className="object-cover w-full h-full"
        />
        
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
        {/* Dot indicators to suggest multiple images like in the reference design */}
        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-white/50"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-white/50"></div>
        </div>
        
        {/* Title and location */}
        <div className="absolute bottom-0 left-0 p-6 w-full">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-bold text-white tracking-wide text-shadow-lg">{recommendation.name}</h3>
              <p className="text-sm text-gray-200 mt-1">{recommendation.country}</p>
            </div>
            <div className="bg-white/90 rounded-full px-3 py-1 text-sm font-bold flex items-center">
              <span className="text-travel-blue">{recommendation.matchScore}% match</span>
            </div>
          </div>
          
          {/* Short description */}
          <p className="text-sm text-gray-300 mt-2 line-clamp-2">{recommendation.description}</p>
        </div>
        
        {/* Like button - top right */}
        <button 
          onClick={() => setLiked(!liked)}
          className="absolute top-4 right-4 bg-black/30 p-2 rounded-full hover:bg-black/50 transition-colors"
        >
          <Heart 
            className={`h-5 w-5 ${liked ? 'fill-red-500 text-red-500' : 'text-white'}`}
          />
        </button>
      </div>
      
      {/* Card content */}
      <CardContent className="p-6 pt-4 flex-grow">
        {/* Feature tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {recommendation.features.slice(0, 3).map((feature, index) => (
            <span 
              key={index} 
              className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-medium"
            >
              {feature}
            </span>
          ))}
          {recommendation.features.length > 3 && (
            <span className="text-xs text-gray-500 flex items-center">
              +{recommendation.features.length - 3} more
            </span>
          )}
        </div>
        
        {/* Top activities section */}
        <div className="space-y-1">
          <h4 className="font-medium text-sm text-gray-500">Top activities:</h4>
          <ul className="space-y-1">
            {recommendation.activities.slice(0, 2).map((activity, index) => (
              <li key={index} className="text-gray-700 text-sm flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-travel-blue"></span>
                {activity}
              </li>
            ))}
            {recommendation.activities.length > 2 && (
              <li className="text-xs text-travel-blue font-medium cursor-pointer hover:underline">
                See all activities
              </li>
            )}
          </ul>
        </div>
      </CardContent>
      
      <CardFooter className="px-6 pb-6 pt-0">
        <Button className="w-full bg-travel-blue hover:bg-travel-darkBlue text-white rounded-full py-6">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecommendationCard;
