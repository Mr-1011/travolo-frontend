
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';

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
  return (
    <Card className="w-full transition-card animate-scale-in">
      <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
        <img 
          src={recommendation.image} 
          alt={recommendation.name}
          className="object-cover w-full h-full"
        />
        <div className="absolute top-2 right-2 bg-white/90 rounded-full px-2 py-1 text-sm font-bold flex items-center">
          <span className="mr-1">Match:</span>
          <span className="text-travel-teal">{recommendation.matchScore}%</span>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <span>{recommendation.name}, {recommendation.country}</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-gray-600">{recommendation.description}</p>
        
        <div>
          <h4 className="font-medium mb-2">Matched features:</h4>
          <div className="flex flex-wrap gap-2">
            {recommendation.features.map((feature, index) => (
              <span 
                key={index} 
                className="bg-travel-teal/10 text-travel-teal px-2 py-1 rounded-md text-sm"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-medium mb-2">Top activities:</h4>
          <ul className="list-disc list-inside space-y-1">
            {recommendation.activities.map((activity, index) => (
              <li key={index} className="text-gray-600">{activity}</li>
            ))}
          </ul>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col items-start gap-2">
        <div className="w-full">
          <h4 className="font-medium mb-1">Rate this recommendation:</h4>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} className="text-2xl hover:scale-110 transition-transform">
                ⭐
              </button>
            ))}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RecommendationCard;
