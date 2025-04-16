import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Recommendation } from '@/types';

type RecommendationCardProps = {
  recommendation: Recommendation;
  rating: 'like' | 'dislike' | null;
  onRatingChange: (recommendationId: string, rating: 'like' | 'dislike') => void;
};

const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation, rating, onRatingChange }) => {
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
            alt={recommendation.city}
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
            <h3 className="text-xl font-semibold">{recommendation.city}</h3>
            <p className="text-sm text-gray-500">{recommendation.country}</p>
          </div>
          {recommendation.confidence !== undefined && (
            <div className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm font-bold flex items-center whitespace-nowrap">
              {Math.round(recommendation.confidence * 100)}% match
            </div>
          )}
        </div>

        <p className="text-gray-600 mb-4 flex-grow text-sm line-clamp-3">{recommendation.short_description}</p>

        <div className="flex flex-row gap-2 mt-auto pt-4 border-t border-gray-100">
          <Button
            variant={getButtonVariant('like')}
            onClick={() => onRatingChange(recommendation.id, 'like')}
            aria-label={`Like ${recommendation.city}`}
            className="flex-1 flex items-center justify-center gap-2"
          >
            <ThumbsUp className="h-5 w-5" /> Like
          </Button>
          <Button
            variant={getButtonVariant('dislike')}
            onClick={() => onRatingChange(recommendation.id, 'dislike')}
            aria-label={`Dislike ${recommendation.city}`}
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
