import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import FloatingPanel from '../components/FloatingPanel';
import PictureSection from '../components/PictureSection';

const NavigationMenu = ({ tags, activeTag, onClick }) => {
  return (
    <div className="navigation-menu">
      {tags.map((tag, index) => (
        <button
          key={index}
          className={`nav-button ${activeTag === tag ? 'active' : ''}`}
          onClick={() => onClick(tag)}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

const MobileHomeButton = () => (
  <Link to="/" className="mobile-home-button">
    Back to Home
  </Link>
);

const DetailPage = ({ title, description, date, skills, content, links }) => {
  const [activeTag, setActiveTag] = useState('');
  const contentRefs = useRef({});
  const observerRef = useRef(null);

  const uniqueTags = [...new Set(content.map(item => item.tag))];

  const handleIntersection = useCallback((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveTag(entry.target.dataset.tag);
      }
    });
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(handleIntersection, {
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    });

    uniqueTags.forEach((tag) => {
      if (contentRefs.current[tag]) {
        observerRef.current.observe(contentRefs.current[tag]);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [uniqueTags, handleIntersection]);

  const handleTagClick = (tag) => {
    setActiveTag(tag);
    contentRefs.current[tag].scrollIntoView({ behavior: 'smooth' });
  };

  const renderTextWithLineBreaks = (text) => {
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < text.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  const renderSkills = () => {
    if (!skills) {
      return null;
    }

    if (typeof skills === 'string') {
      return <span className="skill">{skills}</span>;
    }

    if (Array.isArray(skills)) {
      return skills.map((skill, index) => (
        <span key={index} className="skill">
          {skill}
        </span>
      ));
    }

    if (typeof skills === 'object') {
      return Object.entries(skills).map(([key, value], index) => (
        <span key={index} className="skill">
          {`${key}: ${value}`}
        </span>
      ));
    }

    return <span className="skill">{String(skills)}</span>;
  };

  return (
    <div className="detail-page">
      <MobileHomeButton />
      <NavigationMenu
        tags={uniqueTags}
        activeTag={activeTag}
        onClick={handleTagClick}
      />
      <div className="detail-content">
        <div className="content-wrapper">
          <div className="text-section">
            <div className="title-section">
              <h1>{title}</h1>
              <div>{date}</div>              
            </div>
            <div className='skill-section'>{renderSkills()}</div>
            <p id="description-section">{renderTextWithLineBreaks(description)}</p>
          </div>
        </div>
        {uniqueTags.map((tag, tagIndex) => (
          <div key={tagIndex} ref={el => contentRefs.current[tag] = el} data-tag={tag}>
            {content.filter(item => item.tag === tag).map((item, index) => {
              if (item.type === 'picture') {
                return <PictureSection key={index} pictures={[item.src]} />;
              } else if (item.type === 'description') {
                return (
                  <div key={index} className="content-wrapper">
                    <div className="text-section">
                    <p>{renderTextWithLineBreaks(item.text)}</p>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        ))}
        {links && links.length > 0 && (
          <div className="content-wrapper link-section">
            <h2>Related Links</h2>
            <ul>
              {links.map((link, index) => (
                <li key={index}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">{link.title}</a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <FloatingPanel isDetailPage={true} />
    </div>
  );
};

export default DetailPage;