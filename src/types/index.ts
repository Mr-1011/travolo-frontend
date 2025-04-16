export type QuestionStep =
  | 'travel-themes'
  | 'preferred-weather'
  | 'travel-months'
  | 'travel-duration'
  | 'preferred-region'
  | 'origin-location'
  | 'travel-budget'
  | 'rate-destinations'
  | 'upload-photo'
  | 'refine-preferences';

export type UserPreferences = {
  // Step 1: Travel Themes - Now a Record for ratings
  travelThemes: Record<string, number>;

  // Step 2: Preferred Weather
  temperatureRange: number[];

  // Step 3: Best Months to Travel
  travelMonths: string[];

  // Step 4: Travel Duration
  travelDuration: string[];

  // Step 5: Preferred Region
  preferredRegions: string[];

  // New Step: Origin Location
  originLocation: { name: string; lat: number; lon: number } | null;

  // Step 6 becomes Step 7: Travel Budget
  travelBudget: string;

  // Step 8: Destination Ratings - Changed to store 'like', 'dislike', or null
  destinationRatings: Record<string, 'like' | 'dislike' | null>;

  // Step 9: Photo Analysis Summary
  photoAnalysis: { photoCount: number; adjustmentSuccessful: boolean };

  // Step 10: Conversation Summary
  conversationSummary: { userMessageCount: number };
};

export type Destination = {
  id: string;
  name: string;
  country: string;
  description: string;
  image: string;
  type: string[];
};

export type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
};

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
