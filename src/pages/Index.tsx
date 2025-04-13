import React from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import PageLayout from '@/components/layout/PageLayout';
import TitleScreen from '@/components/TitleScreen';

const Index = () => {
  const navigate = useNavigate();

  const handleStartApp = () => {
    navigate('/preferences?step=1'); // Navigate to the new preferences route
  };

  return (
    <PageLayout>
      <TitleScreen onStart={handleStartApp} />
    </PageLayout>
  );
};

export default Index;
