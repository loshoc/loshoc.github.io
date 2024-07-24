import React, { useState } from 'react';
import { ReactComponent as PrevIcon } from '../assets/prev.svg'; // Import SVG icon for previous button
import { ReactComponent as NextIcon } from '../assets/next.svg'; // Import SVG icon for next button
import { motion, AnimatePresence } from 'framer-motion';

const PictureSection = ({ pictures }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const showNext = () => {
    if (currentIndex < pictures.length - 1) {
      setDirection(1);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const showPrevious = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div className="picture-section">
      <button
        className={`prev-button ${currentIndex === 0 ? 'hidden' : ''}`}
        onClick={showPrevious}
      >
        <PrevIcon />
      </button>
      <div className="picture-wrapper">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={currentIndex}
            src={pictures[currentIndex]}
            alt="Display"
            className="picture"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.4 },
            }}
          />
        </AnimatePresence>
      </div>
      <button
        className={`next-button ${currentIndex === pictures.length - 1 ? 'hidden' : ''}`}
        onClick={showNext}
      >
        <NextIcon />
      </button>
    </div>
  );
};

export default PictureSection;