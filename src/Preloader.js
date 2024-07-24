import React from 'react';
import Rive from '@rive-app/react-canvas';

import preloader from './assets/babyKiwisFolder.riv';

const Preloader = () => {
    return (
        <div className='preloader-container'>
        <div className="preloader">
            <Rive
                src={preloader} // Replace with your animation import
                style={{ width: '150px', height: '150px' }} // Adjust size as needed
                autoplay // Start animation automatically
                fit="cover" // Scale to fit container
            />
            {/* <p>Let's shape a better world!</p> */}
        </div>
        {/* <p style={{ marginTop: '92vh', fontSize: '0.8em' }}>Thanks to Gigi for the infinite love and support</p> */}
        </div>
    );
};

export default Preloader;