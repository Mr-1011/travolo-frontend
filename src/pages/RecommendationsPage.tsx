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
  const recommendationRecordId = location.state?.recommendationRecordId as string | undefined; // Retrieve the ID

  // Handle case where recommendations or ID are not passed (e.g., direct navigation)
  if (!recommendations || !recommendationRecordId) { // Check for ID as well
    // Redirect back to preferences or show an error message
    // For now, let's redirect back to the start
    React.useEffect(() => {
      navigate('/');
    }, [navigate]);
    return null; // Render nothing while redirecting
  }

  const handleRestartProcess = () => {
    console.log("Restart process clicked");
    handlers.resetAllPreferences(); // Reset preferences via the hook
    navigate('/preferences'); // Navigate back to the preferences page (will reset to step 1)
  };

  return (
    <PageLayout>
      <RecommendationsView
        recommendations={recommendations}
        recommendationRecordId={recommendationRecordId} // Pass the ID
        onRestartProcess={handleRestartProcess}
      />
    </PageLayout>
  );
};

export default RecommendationsPage; 