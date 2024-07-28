import React, { useState, useEffect } from 'react';
import { ReactComponent as PrevIcon } from '../assets/prev.svg';
import { ReactComponent as NextIcon } from '../assets/next.svg';
import { ReactComponent as CloseIcon } from '../assets/close.svg';
import { motion, AnimatePresence } from 'framer-motion';

const ExpandedImage = ({ src, onClose, isMobile }) => {
  const handleClick = (e) => {
    if (isMobile || e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="expanded-image-overlay" onClick={handleClick}>
      <div className="expanded-image-container" onClick={(e) => !isMobile && e.stopPropagation()}>
        <img src={src} alt="Expanded view" className="expanded-image" />
        {!isMobile && (
          <button className="close-button" onClick={onClose}>
            <CloseIcon />
          </button>
        )}
      </div>
    </div>
  );
};

const PictureSection = ({ pictures }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [expandedImage, setExpandedImage] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

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

  const handleImageClick = () => {
    setExpandedImage(pictures[currentIndex]);
  };

  const closeExpandedImage = () => {
    setExpandedImage(null);
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  return (
    <div className="picture-section">
      <div className="picture-wrapper">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={currentIndex}
            src={pictures[currentIndex]}
            alt={`Picture ${currentIndex + 1}`}
            className="picture"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            onClick={handleImageClick}
          />
        </AnimatePresence>
      </div>
      {pictures.length > 1 && (
        <>
          <button
            className={`prev-button ${currentIndex === 0 ? 'hidden' : ''}`}
            onClick={showPrevious}
          >
            <PrevIcon />
          </button>
          <button
            className={`next-button ${currentIndex === pictures.length - 1 ? 'hidden' : ''}`}
            onClick={showNext}
          >
            <NextIcon />
          </button>
        </>
      )}
      {expandedImage && (
        <ExpandedImage src={expandedImage} onClose={closeExpandedImage} isMobile={isMobile} />
      )}
    </div>
  );
};

export default PictureSection;