import React from 'react';
import { ReactComponent as BackgroundSVG } from '../assets/kiwibg.svg';

const Background = () => {
  return (
    <div className="background">
      <BackgroundSVG className="background-svg" />
      {/* Other content if needed */}
    </div>
  );
};

export default Background;
