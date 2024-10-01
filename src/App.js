// App.js
import React from 'react';
import { HashRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import projectData from './projectData';
import './App.css';

const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.8,
  },
  in: {
    opacity: 1,
    scale: 1,
  },
  out: {
    opacity: 0,
    scale: 1.2,
  },
};

const pageTransition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
};

const App = () => {
  const location = useLocation();

  return (
    <div className="app-container">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <motion.div
                className="page"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <HomePage />
              </motion.div>
            }
          />
          <Route
            path="/jbl-one"
            element={
              <motion.div
                className="page"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <DetailPage {...projectData.jblOne} />
              </motion.div>
            }
          />
          <Route
            path="/jbl-headphones"
            element={
              <motion.div
                className="page"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <DetailPage {...projectData.jblHp} />
              </motion.div>
            }
          />
          <Route
            path="/akg-headphones"
            element={
              <motion.div
                className="page"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <DetailPage {...projectData.akgHp} />
              </motion.div>
            }
          />
           <Route
            path="/string-extractor"
            element={
              <motion.div
                className="page"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <DetailPage {...projectData.stringExtractor} />
              </motion.div>
            }
          />
          <Route
            path="/linfo"
            element={
              <motion.div
                className="page"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <DetailPage {...projectData.linfo} />
              </motion.div>
            }
          />
          <Route
            path="/harman-catdon"
            element={
              <motion.div
                className="page"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <DetailPage {...projectData.harmanCatdon} />
              </motion.div>
            }
          />
          <Route
            path="/mixed-text-style"
            element={
              <motion.div
                className="page"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <DetailPage {...projectData.mixedTextStyle} />
              </motion.div>
            }
          />
          <Route
            path="/haptichub"
            element={
              <motion.div
                className="page"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <DetailPage {...projectData.haptichub} />
              </motion.div>
            }
          />
        </Routes>
        
      </AnimatePresence>
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;