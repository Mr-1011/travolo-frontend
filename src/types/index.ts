
export type PrivacyLevel = 'minimal' | 'low' | 'medium' | 'high' | 'highest';

export type Stage = 1 | 2 | 3 | 4 | 5;

export type UserPreferences = {
  // Stage 1 - Minimal Privacy
  theme: string;
  temperature: number[];
  region: string;
  
  // Stage 2 - Detailed Preferences
  activities: string[];
  budget: string;
  duration: string;
  mood: string;
  
  // Stage 3 - Destination Ratings
  destinationRatings: Record<string, number>;
  
  // Stage 4 - Conversation
  conversationInsights: string[];
  
  // Stage 5 - Photo Upload
  photos: string[];
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
