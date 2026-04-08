import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Toast = ({ message, onClose }) => (
  <motion.div
    className="toast"
    initial={{ opacity: 0, y: 40, x: '-50%' }}
    animate={{ opacity: 1, y: 0, x: '-50%' }}
    exit={{ opacity: 0, y: 20, x: '-50%' }}
    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
  >
    {message}
  </motion.div>
);

const useRects = (spanRef, parentRef, isHovered) => {
  const [data, setData] = useState({ rects: [], bbox: null });

  const measure = useCallback(() => {
    if (!spanRef.current || !parentRef.current) return;
    const spanRects = spanRef.current.getClientRects();
    const parentRect = parentRef.current.getBoundingClientRect();
    if (spanRects.length === 0) return;

    const rects = [];
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (let i = 0; i < spanRects.length; i++) {
      const r = spanRects[i];
      const x = r.left - parentRect.left;
      const y = r.top - parentRect.top;
      rects.push({ x, y, bottom: r.bottom - parentRect.top, width: r.width, height: r.height });
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x + r.width);
      maxY = Math.max(maxY, r.bottom - parentRect.top);
    }
    const pad = 10;
    setData({
      rects,
      bbox: {
        x: minX - pad, y: minY - pad,
        width: maxX - minX + pad * 2,
        height: maxY - minY + pad * 2,
      },
    });
  }, [spanRef, parentRef]);

  useEffect(() => {
    if (isHovered) measure();
  }, [isHovered, measure]);

  useEffect(() => {
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  return data;
};

const HandwriteCircle = ({ children, isHovered, parentRef }) => {
  const spanRef = useRef(null);
  const { bbox } = useRects(spanRef, parentRef, isHovered);

  const circlePath = bbox
    ? `M${bbox.width * 0.08} ${bbox.height * 0.45}
       C${bbox.width * 0.02} ${bbox.height * 0.15}, ${bbox.width * 0.35} ${-bbox.height * 0.08}, ${bbox.width * 0.55} ${bbox.height * 0.05}
       C${bbox.width * 0.78} ${bbox.height * 0.12}, ${bbox.width * 1.02} ${bbox.height * 0.35}, ${bbox.width * 0.97} ${bbox.height * 0.55}
       C${bbox.width * 0.92} ${bbox.height * 0.8}, ${bbox.width * 0.65} ${bbox.height * 1.05}, ${bbox.width * 0.42} ${bbox.height * 0.98}
       C${bbox.width * 0.18} ${bbox.height * 0.92}, ${bbox.width * 0.0} ${bbox.height * 0.7}, ${bbox.width * 0.05} ${bbox.height * 0.48}`
    : '';

  return (
    <>
      <span ref={spanRef}>{children}</span>
      {bbox && (
        <svg
          style={{
            position: 'absolute',
            left: bbox.x,
            top: bbox.y,
            width: bbox.width,
            height: bbox.height,
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.4s ease',
            pointerEvents: 'none',
            overflow: 'visible',
          }}
          viewBox={`0 0 ${bbox.width} ${bbox.height}`}
        >
          <path
            d={circlePath}
            fill="none"
            stroke="#FF5901"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </>
  );
};

const HandwriteLine = ({ children, isHovered, parentRef }) => {
  const spanRef = useRef(null);
  const { rects } = useRects(spanRef, parentRef, isHovered);

  return (
    <>
      <span ref={spanRef}>{children}</span>
      {rects.map((r, i) => {
        const w = r.width + 8;
        return (
          <svg
            key={i}
            style={{
              position: 'absolute',
              left: r.x - 4,
              top: r.bottom - 1,
              width: w,
              height: 10,
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.4s ease',
              pointerEvents: 'none',
              overflow: 'visible',
            }}
            viewBox={`0 0 ${w} 10`}
            preserveAspectRatio="none"
          >
            <path
              d={`M2 6 C${w * 0.12} 3, ${w * 0.18} 8, ${w * 0.3} 5 C${w * 0.42} 2, ${w * 0.48} 7, ${w * 0.6} 4.5 C${w * 0.72} 2, ${w * 0.82} 7.5, ${w * 0.92} 5 L${w - 2} 4`}
              fill="none"
              stroke="#FF5901"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        );
      })}
    </>
  );
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const nameVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 },
  },
};

const footerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, delay: 0.9 },
  },
};

const Paragraph1 = ({ isHovered, parentRef }) => (
  <>
    I am a <HandwriteCircle isHovered={isHovered} parentRef={parentRef}>Design Engineer</HandwriteCircle> architecting the bridge between aesthetic intuition
    and production. At <em>Harman</em>, I lead the{' '}
    <HandwriteLine isHovered={isHovered} parentRef={parentRef}>AI-native Design System</HandwriteLine>, streamlining
    complex NPI requirements into natural language that redefine efficiency.{' '}<svg className="arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 17L17 7M17 7H8M17 7V16" stroke="#FF5901" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
  </>
);

const Paragraph2 = ({ isHovered, parentRef }) => (
  <>
    As the <HandwriteCircle isHovered={isHovered} parentRef={parentRef}>Lead UIUX Designer</HandwriteCircle> for a portfolio of Iconic Products, I define the{' '}
    <HandwriteLine isHovered={isHovered} parentRef={parentRef}>signature lighting experiences</HandwriteLine> for <em>JBL</em> and <em>Harman/Kardon</em>. This
    encompasses the end-to-end evolution&mdash;from its
    foundational logic to a generative, shader-driven ecosystem.{' '}<svg className="arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 17L17 7M17 7H8M17 7V16" stroke="#FF5901" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
  </>
);

const Paragraph3 = ({ isHovered, parentRef }) => (
  <>
    Beyond my core roles, I explore the frontiers of human-computer
    interaction through{' '}
    <HandwriteLine isHovered={isHovered} parentRef={parentRef}>Experiments &amp; Side Projects</HandwriteLine>,
    ranging from <HandwriteLine isHovered={isHovered} parentRef={parentRef}>AI-driven tools to open-source contributions</HandwriteLine>.{' '}<svg className="arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 17L17 7M17 7H8M17 7V16" stroke="#FF5901" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
  </>
);

const paragraphData = [
  { id: 'design-system', Component: Paragraph1 },
  { id: 'iconic-products', Component: Paragraph2 },
  { id: 'experiments', Component: Paragraph3 },
];

const ParagraphBlock = ({ id, Component, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const pRef = useRef(null);

  return (
    <motion.div
      key={id}
      className="home-paragraph"
      variants={itemVariants}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <p ref={pRef} style={{ position: 'relative' }}><Component isHovered={isHovered} parentRef={pRef} /></p>
    </motion.div>
  );
};

const HomePage = () => {
  const [toast, setToast] = useState(null);
  const [emailCopied, setEmailCopied] = useState(false);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleClick = () => {
    setToast('Coming soon');
  };

  return (
    <div className="home-page-redesign">
      <motion.div
        className="home-name"
        variants={nameVariants}
        initial="hidden"
        animate="visible"
      >
        Kiwi Guo
      </motion.div>

      <motion.div
        className="home-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {paragraphData.map((p) => (
          <ParagraphBlock key={p.id} {...p} onClick={handleClick} />
        ))}
      </motion.div>

      <motion.div
        className="home-footer"
        variants={footerVariants}
        initial="hidden"
        animate="visible"
      >
        <a href="https://www.linkedin.com/in/kiwi-guo/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <span className="footer-sep">/</span>
        <a href="https://github.com/loshoc" target="_blank" rel="noopener noreferrer">GitHub</a>
        <span className="footer-sep">/</span>
        {emailCopied ? (
          <span className="footer-copied">Copied</span>
        ) : (
          <button className="footer-email-btn" onClick={() => {
            navigator.clipboard.writeText('kiwiguo1231@gmail.com');
            setEmailCopied(true);
            setTimeout(() => setEmailCopied(false), 3000);
          }}>Email</button>
        )}
      </motion.div>

      <AnimatePresence>
        {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;
