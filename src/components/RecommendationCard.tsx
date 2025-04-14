import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

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
  const [rating, setRating] = useState<'like' | 'dislike' | null>(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const getButtonVariant = (type: 'like' | 'dislike') => {
    return rating === type ? 'default' : 'outline';
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  const handleRatingChange = (newRating: 'like' | 'dislike') => {
    setRating(prevRating => prevRating === newRating ? null : newRating);
  };

  return (
    <Card className="overflow-hidden rounded-xl transition-all duration-300 flex flex-col md:flex-row recommendation-card">
      <div className="w-full md:w-1/3 relative overflow-hidden bg-gray-200" style={{ minHeight: '250px', maxHeight: '350px' }}>
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        {recommendation.image && !imageError ? (
          <img
            src={recommendation.image}
            alt={recommendation.name}
            className={`w-full h-full object-cover recommendation-image ${imageLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{ aspectRatio: '4/5' }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500 bg-gray-100">
            {imageError ? 'Image Not Available' : 'No Image'}
          </div>
        )}
      </div>

      <div className="p-5 md:p-6 w-full md:w-2/3 flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-xl font-semibold">{recommendation.name}</h3>
            <p className="text-sm text-gray-500">{recommendation.country}</p>
          </div>
          <div className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm font-bold flex items-center whitespace-nowrap">
            {recommendation.matchScore}% match
          </div>
        </div>

        <div className="flex flex-wrap gap-2 my-3">
          {recommendation.features.map((feature, index) => (
            <span key={index} className="px-2.5 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700">
              {feature}
            </span>
          ))}
        </div>

        <p className="text-gray-600 mb-4 flex-grow text-sm line-clamp-3">{recommendation.description}</p>

        <div className="flex flex-row gap-2 mt-auto pt-4 border-t border-gray-100">
          <Button
            variant={getButtonVariant('like')}
            onClick={() => handleRatingChange('like')}
            aria-label={`Like ${recommendation.name}`}
            className="flex-1 flex items-center justify-center gap-2"
          >
            <ThumbsUp className="h-5 w-5" /> Like
          </Button>
          <Button
            variant={getButtonVariant('dislike')}
            onClick={() => handleRatingChange('dislike')}
            aria-label={`Dislike ${recommendation.name}`}
            className="flex-1 flex items-center justify-center gap-2"
          >
            <ThumbsDown className="h-5 w-5" /> Dislike
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default RecommendationCard;
