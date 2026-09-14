import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import designSystemCover from '../assets/design-system-cover.png';
import jblOneLogo from '../assets/jbl-one-logo.png';
import launchHeadphones from '../assets/launch-sticker-headphones.png';
import launchSpeaker from '../assets/launch-sticker-speaker.png';
import launchLamp from '../assets/launch-sticker-lamp.png';
import launchRadio from '../assets/launch-sticker-radio.png';
import launchHarman from '../assets/launch-sticker-harman.png';
import hkOneLogo from '../assets/hk-one-logo.svg';
import harmanKardonUpcomingCover from '../assets/harman-kardon-upcoming-cover.png';
import toolsLogoOne from '../assets/tools-logo-one.png';
import toolsLogoTwo from '../assets/tools-logo-two.png';
import toolsLogoThree from '../assets/tools-logo-three.png';
import pulse6Cover from '../assets/pulse-6-cover.png';

const projects = [
  { id: 'pulse-6', eyebrow: 'Flagship NPI · 2026', title: 'JBL Pulse 6', phrase: 'Light in motion', descriptor: 'UI/UX · Lighting · Installation', art: 'pulse', tint: 'pulse', start: '#407387', end: '#90a8a5' },
  { id: 'platform', eyebrow: 'Digital Platform · 2024–2026', title: 'One Platform', phrase: 'One connected layer', descriptor: 'Product ecosystems · Cross-brand', art: 'platform', tint: 'platform', start: '#171a20', end: '#3e6d75' },
  { id: 'design-to-code', eyebrow: 'Design System · 2024–2026', title: 'Design-to-Code System', phrase: 'Built to ship', descriptor: 'Design Engineering', art: 'system', tint: 'system', start: '#252222', end: '#5a5555' },
  { id: 'launches', eyebrow: 'NPI · 2022–2026', title: 'Selected Launches', phrase: 'Product in practice', descriptor: 'Audio · Lighting', art: 'launches', tint: 'launches', start: '#728d3d', end: '#93b65e' },
  { id: 'tools', eyebrow: 'Indie Dev · 2024–now', title: 'Tools & Community', phrase: 'Made for makers', descriptor: 'Tools · Open source', art: 'tools', tint: 'tools', start: '#ff704f', end: '#d88ddd' },
  { id: 'hk-flagship', eyebrow: 'Flagship NPI · Upcoming', title: 'Coming Soon', phrase: 'Coming soon', descriptor: 'Coming soon', art: 'harman-kardon', tint: 'harman-kardon', start: '#eae2d2', end: '#d3a878' },
];

const getOffset = (index, activeIndex, length) => {
  let offset = index - activeIndex;
  if (offset > length / 2) offset -= length;
  if (offset < -length / 2) offset += length;
  return offset;
};

const formatDotSeparated = (value) => value.split('·').map((part, index) => (
  <React.Fragment key={`${part}-${index}`}>
    {index > 0 && <span className="dot-separator">·</span>}
    {part.trim()}
  </React.Fragment>
));

const CoverArt = ({ kind }) => (
  <span className={`cover-art cover-art--${kind}`} aria-hidden="true">
    {kind === 'pulse' && <img className="cover-image" src={pulse6Cover} alt="" />}
    {kind === 'platform' && <span className="logo-stack"><img className="logo-stack__logo logo-stack__logo--jbl" src={jblOneLogo} alt="" /><img className="logo-stack__logo logo-stack__logo--hk" src={hkOneLogo} alt="" /></span>}
    {kind === 'system' && <img className="cover-image" src={designSystemCover} alt="" />}
    {kind === 'launches' && <span className="launch-stickers"><img className="launch-sticker launch-sticker--headphones" src={launchHeadphones} alt="" /><img className="launch-sticker launch-sticker--speaker" src={launchSpeaker} alt="" /><img className="launch-sticker launch-sticker--lamp" src={launchLamp} alt="" /><img className="launch-sticker launch-sticker--radio" src={launchRadio} alt="" /><img className="launch-sticker launch-sticker--harman" src={launchHarman} alt="" /></span>}
    {kind === 'harman-kardon' && <img className="cover-image" src={harmanKardonUpcomingCover} alt="" />}
    {kind === 'tools' && <span className="tools-stack"><img className="tools-logo tools-logo--one" src={toolsLogoOne} alt="" /><img className="tools-logo tools-logo--two" src={toolsLogoThree} alt="" /><img className="tools-logo tools-logo--three" src={toolsLogoTwo} alt="" /></span>}
    <span className="cover-sheen" />
  </span>
);

const HomePage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [loopTransition, setLoopTransition] = useState(null);
  const [resettingIndex, setResettingIndex] = useState(null);
  const activeIndexRef = useRef(0);
  const loopTimer = useRef(null);
  const lastWheelAt = useRef(0);
  const activeProject = projects[activeIndex];
  const enteringProject = loopTransition ? projects[loopTransition.enteringIndex] : null;

  const orderedProjects = useMemo(() => projects.map((project, index) => ({ ...project, index, offset: getOffset(index, activeIndex, projects.length) })).filter((project) => Math.abs(project.offset) <= 2), [activeIndex]);

  const advanceProject = useCallback((direction = 1) => {
    const currentIndex = activeIndexRef.current;
    const exiting = direction > 0
      ? (currentIndex - 2 + projects.length) % projects.length
      : (currentIndex + 2) % projects.length;
    const entering = direction > 0
      ? (currentIndex + 3) % projects.length
      : (currentIndex - 3 + projects.length) % projects.length;
    setLoopTransition({
      exitingIndex: exiting,
      enteringIndex: entering,
      exitingOffset: direction > 0 ? -3 : 3,
      enteringOffset: direction > 0 ? 2 : -2,
      enterFromOffset: direction > 0 ? 3 : -3,
    });
    const nextIndex = (currentIndex + direction + projects.length) % projects.length;
    activeIndexRef.current = nextIndex;
    setActiveIndex(nextIndex);
    window.clearTimeout(loopTimer.current);
    loopTimer.current = window.setTimeout(() => {
      setLoopTransition(null);
      setResettingIndex(exiting);
      window.requestAnimationFrame(() => window.requestAnimationFrame(() => setResettingIndex(null)));
    }, 620);
  }, []);

  useEffect(() => {
    if (isPaused) return undefined;
    const timer = window.setInterval(() => advanceProject(1), 3000);
    return () => window.clearInterval(timer);
  }, [advanceProject, isPaused]);

  useEffect(() => () => window.clearTimeout(loopTimer.current), []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
      event.preventDefault();
      advanceProject(event.key === 'ArrowDown' ? 1 : -1);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [advanceProject]);

  const handleWheel = (event) => {
    if (!event.deltaY) return;
    event.preventDefault();
    const now = Date.now();
    if (now - lastWheelAt.current < 100) return;
    lastWheelAt.current = now;
    window.clearTimeout(loopTimer.current);
    setLoopTransition(null);
    setResettingIndex(null);
    const direction = event.deltaY > 0 ? 1 : -1;
    const nextIndex = (activeIndexRef.current + direction + projects.length) % projects.length;
    activeIndexRef.current = nextIndex;
    setActiveIndex(nextIndex);
  };

  return (
    <main className={`portfolio-player player--${activeProject.tint}`} style={{ '--player-start': activeProject.start, '--player-end': activeProject.end }}>
      <div className="ambient" aria-hidden="true"><div className="ambient__grain" /></div>
      <a className="identity" href="#about" aria-label="About Kiwi Guo"><span>about</span><strong>KIWI</strong></a>
      <section className="project-stack" aria-label="Selected projects" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)} onFocus={() => setIsPaused(true)} onBlur={() => setIsPaused(false)} onWheel={handleWheel}>
        <div className="selected-gradient" aria-hidden="true" />
        {orderedProjects.filter((project) => project.index === loopTransition?.exitingIndex || project.index !== loopTransition?.enteringIndex).map((project) => {
          const depth = Math.abs(project.offset);
          const isActive = project.index === activeIndex;
          const isExiting = project.index === loopTransition?.exitingIndex;
          const isResetting = project.index === resettingIndex;
          return <button className={`project-player project-player--${project.tint} depth-${depth} ${isActive ? 'is-active' : ''} ${isExiting ? 'is-exiting' : ''} ${isResetting ? 'is-resetting' : ''}`} key={project.id} style={{ '--offset': isExiting ? loopTransition.exitingOffset : project.offset, '--depth': depth, '--card-start': project.start, '--card-end': project.end }} type="button" aria-pressed={isActive} aria-label={`${project.title}: ${project.phrase}`} onClick={() => { activeIndexRef.current = project.index; setActiveIndex(project.index); }}>
            <CoverArt kind={project.art} />
            <span className="project-copy"><span className="project-eyebrow">{formatDotSeparated(project.eyebrow)}</span><span className="project-title">{project.title}</span><span className="project-phrase">{project.phrase}</span></span>
          </button>;
        })}
        {enteringProject && <div className={`project-player project-player--${enteringProject.tint} depth-2 is-entering`} style={{ '--offset': loopTransition.enteringOffset, '--enter-offset': loopTransition.enterFromOffset, '--depth': 2, '--card-start': enteringProject.start, '--card-end': enteringProject.end }} aria-hidden="true">
          <CoverArt kind={enteringProject.art} />
          <span className="project-copy"><span className="project-eyebrow">{formatDotSeparated(enteringProject.eyebrow)}</span><span className="project-title">{enteringProject.title}</span><span className="project-phrase">{enteringProject.phrase}</span></span>
        </div>}
      </section>
      <p className="project-descriptor" key={activeProject.id}>{formatDotSeparated(activeProject.descriptor)}</p>
      <footer className="site-footer"><a href="https://www.linkedin.com/in/kiwi-guo/" target="_blank" rel="noreferrer">LinkedIn</a><span>/</span><a href="https://github.com/loshoc" target="_blank" rel="noreferrer">GitHub</a><span>/</span><a href="mailto:kiwiguo1231@gmail.com">Email</a></footer>
    </main>
  );
};

export default HomePage;
