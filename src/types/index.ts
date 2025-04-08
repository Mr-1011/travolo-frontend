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
  // Step 1: Travel Themes
  travelThemes: string[];

  // Step 2: Preferred Weather
  temperatureRange: number[];

  // Step 3: Best Months to Travel
  travelMonths: string[];

  // Step 4: Travel Duration
  travelDuration: string;

  // Step 5: Preferred Region
  preferredRegions: string[];

  // New Step: Origin Location
  originLocation: { name: string; lat: number; lon: number } | null;

  // Step 6 becomes Step 7: Travel Budget
  travelBudget: string;

  // Step 8: Destination Ratings
  destinationRatings: Record<string, number>;

  // Step 9: Photo Upload
  photos: { url: string; caption: string }[];

  // Step 10: Conversation Insights
  conversationInsights: string[];
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
