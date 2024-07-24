import React from 'react';
import FloatingPanel from '../components/FloatingPanel';
import PictureSection from '../components/PictureSection';

const DetailPage = ({ title, description, date, skills, content }) => {
  return (
    <div className="detail-page">
      <div className="detail-content">
        
        <div className="content-wrapper">
          <div className="text-section">
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
          <div className="additional-content">
            <div className="date">{date}</div>
            <div className="skills">
              <pre>{skills}</pre>
            </div>
          </div>
        </div>
        {content.slice(0).map((item, index) => {
          if (item.type === 'picture') {
            return <PictureSection key={index} pictures={[item.src]} />;
          } else if (item.type === 'description') {
            return (
              <div key={index} className="content-wrapper">
                <div className="text-section">
                  <p>{item.text}</p>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
      <FloatingPanel isDetailPage={true} />
    </div>
  );
};

export default DetailPage;