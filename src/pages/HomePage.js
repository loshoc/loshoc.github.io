import React from 'react';
import Background from '../components/Background';
import FloatingPanel from '../components/FloatingPanel';

const HomePage = () => {
  return (
    <div className="home-page">
      <Background />
      <FloatingPanel isDetailPage={false} />
    </div>
  );
};

export default HomePage;