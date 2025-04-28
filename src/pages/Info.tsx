import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const Info = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <PageLayout>
      <div className="bg-white rounded-xl shadow-md p-6 md:p-10">
        <div className="relative mb-6">
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-0"
            onClick={handleBack}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800">Hybrid Travel Recommender System</h1>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <h2 id="introduction">Introduction</h2>
            <p>
              Travolo implements a hybrid travel recommender system architecture. It integrates multiple recommendation strategies, primarily leveraging collaborative filtering principles through explicit user feedback and content-based filtering derived from user-specified preferences and optional multimodal inputs (e.g., images). The core objective is to generate personalized travel destination suggestions by constructing a comprehensive user profile through a multi-stage preference elicitation process.
            </p>
          </div>

          <div>
            <h2 id="preference-elicitation">Preference Elicitation Methodology</h2>
            <p>
              The system employs a structured, step-by-step approach to gather diverse user preferences, constraints, and stylistic inclinations. Each step targets a specific dimension of travel preference:
            </p>
          </div>

          <div>
            <h3 id="themes">1. Travel Themes</h3>
            <p>
              Users select preferred travel themes (e.g., Culture, Adventure, Nature). This step captures high-level categorical interests. These selections serve as initial features for content-based filtering, mapping user interests to destination characteristics, and can inform collaborative filtering by identifying users with similar thematic preferences.
            </p>
          </div>

          <div>
            <h3 id="weather">2. Weather Preferences</h3>
            <p>
              Users specify their preferred temperature range (°C) using an interactive slider. This constitutes an explicit constraint, enabling the system to filter potential destinations based on climate data corresponding to the user's desired travel period.
            </p>
          </div>

          <div>
            <h3 id="months">3. Travel Months</h3>
            <p>
              Users select potential months for travel. Similar to weather preferences, this acts as a temporal constraint, allowing the system to filter destinations based on seasonality, events, and optimal travel times.
            </p>
          </div>

          <div>
            <h3 id="duration">4. Travel Duration</h3>
            <p>
              Users indicate their intended trip duration (e.g., Weekend, One week, Long trip). This preference helps tailor recommendations by considering the feasibility of travel based on distance and the typical time required to experience a destination.
            </p>
          </div>

          <div>
            <h3 id="regions">5. Preferred Regions</h3>
            <p>
              Users select desired global regions using an interactive map. This provides explicit geographical constraints, significantly narrowing the search space for recommendations and aligning suggestions with the user's willingness to travel to specific parts of the world.
            </p>
          </div>

          <div>
            <h3 id="origin">6. Origin Location</h3>
            <p>
              Users provide their origin location (city or country). This information is geocoded to obtain coordinates (latitude, longitude). While primarily used in this implementation to potentially refine relevance based on proximity or calculate travel factors (e.g., estimated flight times, although not currently implemented), it's a standard input for personalization.
            </p>
          </div>

          <div>
            <h3 id="budget">7. Travel Budget</h3>
            <p>
              Users select a budget category (e.g., Budget, Mid-range, Luxury). This preference directly influences the recommendation of destinations, accommodations, and activities, ensuring suggestions align with the user's financial expectations.
            </p>
          </div>

          <div>
            <h3 id="rating">8. Destination Rating</h3>
            <p>
              Users rate a set of presented destinations as 'like' or 'dislike'. This explicit feedback is a cornerstone of collaborative filtering, allowing the system to learn user tastes directly and identify correlations between users and items (destinations). The swipe interface (on mobile) facilitates rapid implicit feedback collection.
            </p>
          </div>

          <div>
            <h3 id="photos">9. Photo Upload (Optional)</h3>
            <p>
              Optionally, users can upload photos from past trips they enjoyed. These images are processed using a backend vision analysis service (e.g., Google Cloud Vision AI or similar) to extract visual features and infer underlying aesthetic or thematic preferences (e.g., preference for beaches, mountains, urban landscapes). This serves as a content-based modality to enrich the user profile beyond explicit selections. The extracted features can adjust the weights of the initially selected themes.
            </p>
          </div>

          <div>
            <h3 id="refinement">10. Refinement Chat (Optional)</h3>
            <p>
              An optional conversational interface allows users to refine their preferences using natural language. The system summarizes the currently understood preferences and prompts the user for further input. This step utilizes Natural Language Processing (NLP) on the backend to interpret free-form text, capturing nuances, specific requests, or constraints not easily expressed through structured inputs.
            </p>
          </div>

          <div>
            <h2 id="recommendation-generation">Recommendation Generation</h2>
            <p>
              The aggregated preference data from these steps forms a comprehensive user profile. This profile is processed by the backend recommendation engine, which employs a hybrid algorithm combining the collected constraints, explicit ratings, thematic interests, and inferred preferences to generate a ranked list of personalized travel destination recommendations. The specific hybridization technique (e.g., weighted, switching, cascaded) is implemented server-side.
            </p>
          </div>

          <div>
            <h2 id="conclusion">Conclusion</h2>
            <p>
              Travolo aims to provide effective and personalized travel recommendations by employing a detailed, multi-faceted preference elicitation process. By combining explicit user inputs, constraints, ratings, and optional multimodal data, the system constructs a rich user model suitable for a hybrid recommendation strategy, addressing the complexities of travel preference modeling.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Info;