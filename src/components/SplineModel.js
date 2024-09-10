import React from 'react';

const SplineModel = () => {
  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
      <iframe
        src="https://my.spline.design/untitled-c39f6583d38f35e2dbb76a7149311965/"
        frameBorder="0"
        width="100%"
        height="100%"
        style={{ pointerEvents: 'auto' }} // Allows interaction with the iframe
        title="Spline Model"
      ></iframe>
    </div>
  );
};

export default SplineModel;