import React, { useEffect, useState } from 'react';
import HomePage from './pages/HomePage';
import CaseStudyPage from './pages/CaseStudyPage';
import './App.css';

const App = () => {
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return (
    <div className="app-container">
      {hash === '#case/pulse-6' ? <CaseStudyPage /> : <HomePage />}
    </div>
  );
};

export default App;
