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
      <div className="bg-white rounded-xl shadow-md p-6 md:p-10 space-y-4">
        <div className="relative mb-8">
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
            <h2 className="text-2xl font-bold mb-2" id="most-important-note">
              Most Important Note
            </h2>
            <p className="mt-2">
              We do <strong>not</strong> collect names, emails, IP addresses, or any personally identifying details. Your data is used <strong>only for this academic research</strong> and will be deleted after the project ends. The app, algorithm, and destination database will become open source, but <strong>no user data will ever be shared or included</strong>.
            </p>
            <p className="mt-2">
              However, to evaluate how recommendation quality changes with input, we do temporarily store the preferences you submit, such as your travel interests, ideal temperature range, preferred regions, travel budget, and optional photo-based preferences. We also store your selected travel duration, months, and destination likes/dislikes.
            </p>
            <p className="mt-2">
              Here is an example of the kind of data we store:
            </p>
            <pre className="bg-gray-100 text-sm p-4 rounded overflow-auto mt-2">
              {`{
  "culture": 5,
  "adventure": 5,
  "nature": 5,
  "beaches": 2,
  "nightlife": 1,
  ...
  "originLocation": {
    "name": "München, Bayern, Deutschland",
    "lat": 48.1371079,
    "lon": 11.5753822
  },
  ...
  "photoAnalysis": {
    "imageCount": 1,
    "imageSummary": "...",
    "imageAnalysis": {
      "adventure": 2,
      "nature": 3,
      ...
    }
  }
}`}
            </pre>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-2" id="introduction">1. Introduction to Travolo and Research Motivation</h2>
            <p>
              Travolo is a user-friendly, browser-based travel recommender system designed to balance personalization and privacy. Instead of demanding all your data upfront, it guides you through a step-by-step input flow where you choose how much to share. At any point, Travolo can generate personalized travel suggestions based on the information you've given so far. It never forces you to provide data you're uncomfortable with. The app is part of an academic research project studying the trade-off between recommendation accuracy and user data disclosure. The goal is to show that high-quality travel recommendations are possible without compromising user privacy.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-2" id="introduction">2. How You Build Your Profile</h2>
            <p>
              Travolo guides you through an optional nine-step onboarding journey to build your travel preference profile. Each step gathers a specific type of input about your likes and needs. You can stop at any point – every step is optional – and Travolo will still generate recommendations using whatever information you've given so far. The more steps you complete, the more fine-tuned your trip suggestions can become. Here's how it works, step by step:            </p>
          </div>

          <div>
            <h3 id="themes">2.1 Travel Themes</h3>
            <p>
              Travolo begins by asking what kinds of travel experiences you enjoy. You select from nine fixed themes like Culture, Adventure, Nature, Beaches, and more. Each theme you pick gets a high score in your preference profile. Travolo then favors destinations that match these themes. This creates a strong foundation for personalized recommendations right from the start.
            </p>
          </div>

          <div>
            <h3 id="weather">2.2 Weather Preferences</h3>
            <p>
              You set your ideal temperature range using a simple slider. Travolo uses this to filter out destinations with incompatible weather during your travel months. It prioritizes locations whose historical climate falls within your preferred range. Warm-weather lovers get sunny picks, snow-lovers get alpine ones. This step ensures climate compatibility for your trip.
            </p>
          </div>

          <div>
            <h3 id="months">2.3 Travel Months</h3>
            <p>
              You select the months when you plan to travel. Travolo uses this info to avoid destinations that are off-season, closed, or have poor weather during those months. Destinations that align well with your selected months are prioritized. This ensures seasonal suitability. Your trip timing and destination match perfectly.
            </p>
          </div>

          <div>
            <h3 id="duration">2.4 Travel Duration</h3>
            <p>
              You choose your expected trip length (e.g., Weekend, Short Trip, One Week). Travolo uses this to check which destinations are realistic for the time available. Short trips prioritize nearby destinations, long trips allow for distant or experience-rich ones. The algorithm penalizes distant places if your time is limited. This makes recommendations practical as well as inspiring.
            </p>
          </div>

          <div>
            <h3 id="regions">2.5 Preferred Regions</h3>
            <p>
              You select one or more world regions you're interested in (e.g., Europe, Asia). Travolo focuses only on destinations from those regions when building your shortlist. This sharply narrows down the search space. Your regional preferences are always respected. It ensures geographic relevance in the recommendations.
            </p>
          </div>

          <div>
            <h3 id="origin">2.6 Origin Location</h3>
            <p>
              You enter your starting city or country. Travolo geocodes this and uses it to estimate distance to each destination. Distant places are penalized if your trip is short. This improves feasibility and avoids suggesting exhausting itineraries. Your location also helps with personalization and potential cost estimation.
            </p>
          </div>

          <div>
            <h3 id="budget">2.7 Travel Budget</h3>
            <p>
              You select one or more tiers: Budget, Mid-range, Luxury. Travolo filters out destinations that don't fit your selected price levels. Affordable destinations are prioritized if you selected budget travel. High-end picks appear only if luxury is allowed. This ensures suggestions align with what you can realistically afford.
            </p>
          </div>

          <div>
            <h3 id="rating">2.8 Destination Likes/Dislikes</h3>
            <p>
              You give instant feedback by liking or disliking shown destinations. Travolo uses this to find hidden patterns in your taste via collaborative filtering. Destinations similar to those you liked get a boost; similar to disliked ones get penalized. This step makes recommendations more accurate and personalized. The more ratings you give, the smarter the system becomes.
            </p>
          </div>

          <div>
            <h3 id="photos">2.9 Photo Upload</h3>
            <p>
              You can upload a personal travel photo that inspires you. Travolo analyzes the image using AI to extract visual cues (e.g., mountains, beaches). These cues adjust your theme profile subtly for better alignment. It helps capture aesthetic preferences that may not be obvious from text inputs. The photo is analyzed and discarded never stored or used for identification.            </p>
          </div>
        </div>


        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-2" id="introduction">3. How Travolo Works</h2>
            <p>
              Travolo uses a hybrid two-stage recommendation system that combines the strengths of content-based filtering with collaborative filtering. This architecture allows Travolo to deliver personalized travel destination suggestions to each user, regardless of how much data they choose to share. The algorithm is designed to be flexible: it provides meaningful recommendations from minimal input and improves accuracy as more preferences are revealed.            </p>
          </div>

          <div>
            <h3 id="themes">3.1 Content-Based Filtering</h3>
            <p>
              Travolo begins by evaluating each destination against the user's profile using a multi-factor scoring model applied to approximately 480 manually curated destinations, each enriched with detailed metadata. The algorithm computes a content score for each destination based on several dimensions: Theme Match (35%) is calculated using cosine similarity between the user's 9-dimensional theme vector (e.g., Culture, Adventure, Beaches) and the corresponding vector for each destination. Climate Compatibility is assessed with a Gaussian scoring function, comparing the user's preferred temperature range to each destination's historical monthly averages, with hard exclusions for out-of-range results. Travel Month Fit filters out destinations incompatible with the selected travel months, based on seasonal data this acts as a strict constraint. Budget Match compares the destination's price tier (budget, mid-range, luxury) to the user's selection and applies a penalty if there is a mismatch, scaled by distance between tiers. Region Preference boosts destinations within selected world regions and downranks others. Travel Duration Feasibility ensures that the destination's typical trip length aligns with the user's intended travel duration, applying penalties or exclusions otherwise. If the user specifies an origin, Proximity is considered by penalizing faraway destinations when the trip duration is short. Finally, in the optional Photo Analysis step, computer vision techniques extract semantic tags from uploaded images (e.g., beaches, mountains), which are then used to subtly adjust the theme vector and refine the recommendation further.            </p>
          </div>

          <div>
            <h3 id="themes">3.2 Collaborative Filtering</h3>
            <p>
              Travolo's collaborative filtering module activates when the user provides at least one like or dislike for a destination. It uses a precomputed item-to-item similarity matrix stored in the database, where each destination is linked to its nearest neighbors based on historical co-preference patterns. The algorithm then computes a collaborative score for each unrated destination by averaging its similarity to destinations the user has liked, using a Resnik-style weighted mean. Disliked or unrated items are excluded from the calculation, and destinations already rated by the user are never recommended again. Only positive similarity values contribute to the final score, and safeguards are in place to prevent division-by-zero or propagation of missing data. If no collaborative evidence is available (e.g., for a cold-start user), this layer returns an empty score map. Internally, similarity data is cached in memory to reduce database load, and it is periodically refreshed to incorporate new user ratings and ensure that similarity values remain up to date.            </p>
          </div>

          <div>
            <h3 id="themes">3.3 Hybrid Combination</h3>
            <p>
              After computing scores from both the content-based and collaborative filtering modules, Travolo blends them using a weighted fusion model. If the user has not rated any destinations, the system relies entirely on the content-based score. If ratings are available, the final score for each destination is computed as a weighted sum: 70% content-based and 30% collaborative by default. This balance ensures that explicit user preferences remain the primary driver of recommendations, while collaborative insights fine-tune the results. The top three destinations, ranked by this hybrid score, are returned as recommendations and stored in the database. The fusion process is adaptive: as users provide more ratings, the influence of the collaborative layer can increase dynamically, enhancing personalization without overriding the user's core input.            </p>
          </div>

        </div>

        <div className="flex flex-col gap-4">

          <div>
            <h2 className="text-2xl font-bold mb-2" id="introduction">4. What This Research Explores</h2>
            <p>
              Travolo is not only a travel app but also a research tool for studying how recommendation quality changes as users progressively share more personal data. Users can exit the onboarding at any of the nine steps, allowing the system to track how input depth affects outcomes like accuracy, diversity, and satisfaction. By analyzing anonymized usage data, the study examines whether certain types of input like destination ratings or photo uploads contribute more to personalization than others, and whether adding more data eventually yields diminishing returns. The goal is to identify an optimal balance between personalization and privacy, informing the design of future recommender systems that don't rely on collecting everything up front. Travolo shows that even partial user profiles can produce meaningful recommendations, supporting a privacy-aware approach to personalization. </p>
          </div>

        </div>
      </div>
    </PageLayout>
  );
};

export default Info;