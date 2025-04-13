import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import RecommendationsView from '@/components/RecommendationsView';
import { Recommendation } from '@/types'; // Import Recommendation type

const RecommendationsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
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
    // This likely needs more complex logic, potentially involving navigating back
    // to the preferences page or re-triggering the generation process.
    // For now, just log a message.
    console.log("Regenerate recommendations clicked - further implementation needed");
    // Possibly navigate back to preferences with a flag to regenerate?
    // navigate('/preferences', { state: { regenerate: true } });
  };

  const handleBackToForm = () => {
    navigate('/preferences'); // Navigate back to the preferences page
  };

  const handleRestartProcess = () => {
    // Consider clearing preferences state here if necessary
    navigate('/'); // Navigate back to the start page
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