import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import RecommendationsView from '@/components/RecommendationsView';
import { Recommendation } from '@/types'; // Import Recommendation type
import { useUserPreferences } from '@/hooks/useUserPreferences'; // Import the hook

const RecommendationsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { handlers } = useUserPreferences(); // Get handlers from the hook
  const recommendations = location.state?.recommendations as Recommendation[] | undefined;

  // Handle case where recommendations are not passed (e.g., direct navigation)
  if (!recommendations) {
    // Redirect back to preferences or show an error message
    // For now, let's redirect back to the start
    React.useEffect(() => {
      navigate('/');
    }, [navigate]);
    return null; // Render nothing while redirecting
  }

  const handleRegenerateRecommendations = () => {
    // Call the regenerate handler from the hook, providing a navigation callback
    console.log("Regenerate recommendations clicked");
    handlers.handleRegenerateRecommendations((newRecommendations) => {
      // Re-navigate to the same page but with new state
      navigate('/results', { state: { recommendations: newRecommendations }, replace: true });
    });
  };

  const handleBackToForm = () => {
    navigate('/preferences'); // Navigate back to the preferences page
  };

  const handleRestartProcess = () => {
    console.log("Restart process clicked");
    handlers.resetAllPreferences(); // Reset preferences via the hook
    navigate('/preferences'); // Navigate back to the preferences page (will reset to step 1)
  };

  return (
    <PageLayout>
      <RecommendationsView
        recommendations={recommendations}
        onRegenerateRecommendations={handleRegenerateRecommendations}
        onBackToForm={handleBackToForm}
        onRestartProcess={handleRestartProcess}
      />
    </PageLayout>
  );
};

export default RecommendationsPage; 