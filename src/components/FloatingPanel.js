import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingPanel = ({ isDetailPage }) => {
  const [showPanel, setShowPanel] = useState(!isDetailPage);
  const [hoveredApp, setHoveredApp] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const prevLocationRef = useRef(location.pathname);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showSideProjectsCards, setShowSideProjectsCards] = useState(false);
  const sideProjectsRef = useRef(null);

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDetailPage || isMobile) return;
      const bottomThreshold = window.innerHeight * 0.70;
      const isInBottomArea = e.clientY >= bottomThreshold;
      setShowPanel(isInBottomArea);
    },
    [isDetailPage, isMobile]
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isDetailPage && !isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
    } else if (!isDetailPage) {
      setShowPanel(true);
    }
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove, isDetailPage, isMobile]);

  useEffect(() => {
    const prevLocation = prevLocationRef.current;
    prevLocationRef.current = location.pathname;

    if (prevLocation !== location.pathname) {
      setShowPanel(true);
    }
  }, [location]);

  const sideProjects = [
    {
      name: 'String Extractor',
      link: '/string-extractor',
      icon: `${process.env.PUBLIC_URL}/icons/string-extractor.png`,
      description: 'A tool for extracting strings from various file formats.'
    },
    {
      name: 'Harman/Catdon',
      link: '/harman-catdon',
      icon: `${process.env.PUBLIC_URL}/icons/harman-catdon.png`,
      description: 'An innovative audio project combining Harman and AI technologies.'
    },
    {
      name: 'G Day',
      link: '/g-day',
      icon: `${process.env.PUBLIC_URL}/icons/g-day.png`,
      description: 'A productivity app to help you plan and track your daily goals.'
    },
  ];

  const apps = [
    { name: 'JBL One', link: '/jbl-one', type: 'internal', icon: `${process.env.PUBLIC_URL}/icons/jbl-one.png` },
    { name: 'JBL Headphones', link: '/jbl-headphones', type: 'internal', icon: `${process.env.PUBLIC_URL}/icons/jbl-headphones.png` },
    { name: 'AKG Headphones', link: '/akg-headphones', type: 'internal', icon: `${process.env.PUBLIC_URL}/icons/akg-headphones.png` },
    { name: 'Linfo', link: '/linfo', type: 'internal', icon: `${process.env.PUBLIC_URL}/icons/linfo.png` },
    { name: 'Side Projects', link: '#', type: 'internal', icon: `${process.env.PUBLIC_URL}/icons/side-projects.png` },
    { name: 'LinkedIn', link: 'https://www.linkedin.com/in/kiwi-guo/', type: 'external', icon: `${process.env.PUBLIC_URL}/icons/linkedin.png` },
    { name: 'GitHub', link: 'https://github.com/loshoc', type: 'external', icon: `${process.env.PUBLIC_URL}/icons/github.png` },
    { name: 'Email', link: 'mailto:loshochung@gmail.com', type: 'external', icon: `${process.env.PUBLIC_URL}/icons/email.png` },
  ];

  const variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  };

  const iconVariants = {
    initial: { y: 0 },
    hover: { y: -4, transition: { type: "tween", ease: "easeInOut", duration: 0.25 } },
  };

  const handleIconClick = (link) => {
    console.log("handleIconClick called with link:", link);
    setShowPanel(false);
    navigate(link);
  }

  const handleHomeClick = () => {
    setShowPanel(false);
    navigate('/');
  };

  const handleSideProjectsClick = (e) => {
    e.stopPropagation();
    console.log("Side projects clicked, current state:", showSideProjectsCards);
    setShowSideProjectsCards(!showSideProjectsCards);
  };

  const handleCardClick = (link) => {
    console.log("handleCardClick called with link:", link);
    setShowSideProjectsCards(false);
    setShowPanel(false);
    console.log("About to navigate to:", link);
    navigate(link);
    console.log("Navigation completed");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showSideProjectsCards && !e.target.closest('.side-projects-cards')) {
        setShowSideProjectsCards(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showSideProjectsCards]);

  useEffect(() => {
    if (sideProjectsRef.current) {
      const cards = sideProjectsRef.current.querySelectorAll('.project-card');
      cards.forEach(card => {
        const randomRotation = Math.random() * 20 - 10; // Random value between -10 and 10
        card.style.setProperty('--random-rotation', `${randomRotation}deg`);
      });
    }
  }, [showSideProjectsCards]); // Re-run when cards are shown

  console.log("FloatingPanel rendering, showSideProjectsCards:", showSideProjectsCards);

  const testNavigation = () => {
    console.log("Testing navigation...");
    navigate('/string-extractor');
  };

  if (isDetailPage && isMobile) {
    return null;
  }

  return (
    <div className={`floating-panel-container ${isMobile ? 'mobile' : ''}`}>
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
            {isDetailPage && !isMobile && (
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
            <motion.div className={`floating-panel ${isMobile ? 'mobile-grid' : ''}`}>
              {apps.map((app, index) =>
                app.type === 'internal' ? (
                  <React.Fragment key={index}>
                    <div className="app-icon-container">
                      <motion.div
                        className="app-icon"
                        onClick={app.name === 'Side Projects' ? handleSideProjectsClick : () => handleIconClick(app.link)}
                        onMouseEnter={() => setHoveredApp(app.name)}
                        onMouseLeave={() => setHoveredApp(null)}
                        initial="initial"
                        whileHover="hover"
                        variants={iconVariants}
                      >
                        {app.name === 'Side Projects' ? (
                          <div className="side-projects-icon">
                            <img src={`${process.env.PUBLIC_URL}/icons/string-extractor.png`} alt="String Extractor" className="mini-icon" />
                            <img src={`${process.env.PUBLIC_URL}/icons/harman-catdon.png`} alt="Harman/Catdon" className="mini-icon" />
                            <img src={`${process.env.PUBLIC_URL}/icons/g-day.png`} alt="G Day" className="mini-icon" />
                          </div>
                        ) : (
                          <img src={app.icon} alt={app.name} className="app-icon-img" />
                        )}
                      </motion.div>
                      {!isMobile && hoveredApp === app.name && (
                        <div className="tooltip">{app.name}</div>
                      )}
                    </div>
                    {!isMobile && index < apps.length - 1 && apps[index + 1].type === 'external' && (
                      <div className="divider"></div>
                    )}
                  </React.Fragment>
                ) : (
                  <div className="app-icon-container" key={index}>
                    <motion.a
                      href={app.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="app-icon"
                      onMouseEnter={() => setHoveredApp(app.name)}
                      onMouseLeave={() => setHoveredApp(null)}
                      initial="initial"
                      whileHover="hover"
                      variants={iconVariants}
                    >
                      <img src={app.icon} alt={app.name} className="app-icon-img" />
                    </motion.a>
                    {!isMobile && hoveredApp === app.name && (
                      <div className="tooltip">{app.name}</div>
                    )}
                  </div>
                )
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {showSideProjectsCards && (
        <div 
          ref={sideProjectsRef}
          className="side-projects-cards"
          onClick={(e) => {
            console.log("Clicked on side-projects-cards container");
            e.stopPropagation();
          }}
        >
          {sideProjects.map((project, index) => (
            <div 
              key={index} 
              className="project-card" 
              onClick={(e) => {
                e.stopPropagation();
                console.log("Clicked on project card:", project.name);
                handleCardClick(project.link);
              }}
            >
              <div className="icon-container">
                <img src={project.icon} alt={project.name} className="project-icon" />
              </div>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default FloatingPanel;