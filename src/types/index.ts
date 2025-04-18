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
  // Step 1: Travel Themes - Individual properties
  culture: number;
  adventure: number;
  nature: number;
  beaches: number;
  nightlife: number;
  cuisine: number;
  wellness: number;
  urban: number;
  seclusion: number;

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
  travelBudget: string[];

  // Step 8: Destination Ratings - Changed to store 'like', 'dislike', or null
  destinationRatings: Record<string, 'like' | 'dislike' | null>;

  // Step 9: Photo Analysis Summary
  photoAnalysis: { imageCount: number; imageSummary: string; imageAnalysis: Record<string, number> | null; adjustmentSuccessful: boolean };

  // Step 10: Conversation Summary
  conversationSummary: { userMessageCount: number };
};

export type MonthlyTemperature = {
  avg: number;
  max: number;
  min: number;
};

export type Destination = {
  id: string;
  city: string;
  country: string;
  region: string;
  short_description: string;
  image_url: string;

  // Replace categoryRatings with individual fields
  culture: number | null;
  adventure: number | null;
  nature: number | null;
  beaches: number | null;
  nightlife: number | null;
  cuisine: number | null;
  wellness: number | null;
  urban: number | null;
  seclusion: number | null;

  avg_temp_monthly: Record<string, MonthlyTemperature> | null;
  ideal_durations: string[] | null;
  budget_level: string | null;
};

export type Recommendation = {
  id: string;
  city: string;
  country: string;
  region?: string;
  short_description: string;
  image_url?: string;

  culture?: number;
  adventure?: number;
  nature?: number;
  beaches?: number;
  nightlife?: number;
  cuisine?: number;
  wellness?: number;
  urban?: number;
  seclusion?: number;

  avg_temp_monthly?: Record<string, MonthlyTemperature>;
  ideal_durations?: string[];
  budget_level?: string;
  confidence?: number;
};
