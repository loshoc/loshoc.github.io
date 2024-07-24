import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingPanel = ({ isDetailPage }) => {
  const [showPanel, setShowPanel] = useState(!isDetailPage);
  const location = useLocation();
  const navigate = useNavigate();
  const prevLocationRef = useRef(location.pathname);

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDetailPage) return;
      const bottomThreshold = window.innerHeight * 0.70;
      const isInBottomArea = e.clientY >= bottomThreshold;
      setShowPanel(isInBottomArea);
    },
    [isDetailPage]
  );

  useEffect(() => {
    if (isDetailPage) {
      window.addEventListener('mousemove', handleMouseMove);
    } else {
      setShowPanel(true);
    }
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove, isDetailPage]);

  useEffect(() => {
    const prevLocation = prevLocationRef.current;
    prevLocationRef.current = location.pathname;

    if (prevLocation !== location.pathname) {
      setShowPanel(true);
    }
  }, [location]);

  const apps = [
    { name: 'JBL One', link: '/jbl-one', type: 'internal', icon: `${process.env.PUBLIC_URL}/icons/jbl-one.png` },
    { name: 'JBL Headphones', link: '/jbl-headphones', type: 'internal', icon: `${process.env.PUBLIC_URL}/icons/jbl-headphones.png` },
    { name: 'AKG Headphones', link: '/akg-headphones', type: 'internal', icon: `${process.env.PUBLIC_URL}/icons/akg-headphones.png` },
    { name: 'Linfo', link: '/linfo', type: 'internal', icon: `${process.env.PUBLIC_URL}/icons/linfo.png` },
    { name: 'Harman/Catdon', link: '/harman-catdon', type: 'internal', icon: `${process.env.PUBLIC_URL}/icons/harman-catdon.png` },
    { name: 'G Day', link: '/G-Day', type: 'internal', icon: `${process.env.PUBLIC_URL}/icons/g-day.png` },
    { name: 'LinkedIn', link: 'https://www.linkedin.com/in/kiwi-guo/', type: 'external', icon: `${process.env.PUBLIC_URL}/icons/linkedin.png` },
    { name: 'GitHub', link: 'https://github.com/loshoc', type: 'external', icon: `${process.env.PUBLIC_URL}/icons/github.png` },
    { name: 'Email', link: 'mailto:loshochung@gmail.com', type: 'external', icon: `${process.env.PUBLIC_URL}/icons/email.png` },
  ];

  const variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  };

  const handleIconClick = (link) => {
    setTimeout(() => {
      navigate(link);
    }, 300);
  };

  const handleHomeClick = () => {
    setTimeout(() => {
      navigate('/');
    }, 300);
  };

  return (
    <div className="floating-panel-container">
      <AnimatePresence>
        {isDetailPage && (
          <motion.div
            className="detail-page-fade"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: '#fff', zIndex: 999 }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showPanel && (
          <motion.div
            className="floating-panel-wrapper"
            variants={variants}
            initial="exit"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {isDetailPage && (
              <motion.div
                className="home-button"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                onClick={handleHomeClick}
              >
                <span style={{ textDecoration: 'none', color: '#333' }}>Home</span>
              </motion.div>
            )}
            <motion.div className="floating-panel">
              {apps.map((app, index) =>
                app.type === 'internal' ? (
                  <React.Fragment key={index}>
                    <motion.div
                      className="app-icon"
                      onClick={() => handleIconClick(app.link)}
                      initial={{ borderRadius: '18px', opacity: 1 }}
                      whileHover={{ opacity: 0.8 }}
                      whileTap={{ opacity: 0.6 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img src={app.icon} alt={app.name} className="app-icon-img" />
                      <div className="tooltip">{app.name}</div>
                    </motion.div>
                    {index < apps.length - 1 && apps[index + 1].type === 'external' && (
                      <div className="divider"></div>
                    )}
                  </React.Fragment>
                ) : (
                  <a key={index} href={app.link} target="_blank" rel="noopener noreferrer" className="app-icon">
                    <img src={app.icon} alt={app.name} className="app-icon-img" />
                    <div className="tooltip">{app.name}</div>
                  </a>
                )
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingPanel;