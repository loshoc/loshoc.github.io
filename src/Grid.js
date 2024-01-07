import React, { useState } from 'react';
import styled from 'styled-components';
import GridCell from './GridCell';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 8.8vw); /* Adjust size as needed */
  grid-template-rows: repeat(5, 8.8vw); /* Adjust size as needed */
  gap: 0px; /* Adjust gap between cells */
  justify-content: center;
  background-color: ${props => (props.isCellHovered ? 'rgba(255, 254, 249, 0.2)' : 'rgba(255, 254, 249)')};
  backdrop-filter: blur(8px); /* Apply a 20px background blur */
  transition: background-color 0.3s ease; /* Add a smooth transition effect */
`;

const CellContent = ({ onMouseEnter, onMouseLeave, children }) => (
  <span
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    style={{ display: 'inline-block' }}
    dangerouslySetInnerHTML={{ __html: children }}
  />
);


const Grid = ({ onCellHover }) => {
  const [isCellHovered, setIsCellHovered] = useState(false);
  const [hoveredCellContent, setHoveredCellContent] = useState('');

  const handleCellMouseEnter = (content) => {
    setIsCellHovered(true);
    setHoveredCellContent(content);
    onCellHover(content);
  };

  const handleCellMouseLeave = () => {
    setIsCellHovered(false);
    setHoveredCellContent('');
    onCellHover('');
  };

  const renderCellContent = (index) => {
    const content = cellContents.find(item => item.index === index);
    return content ? (
      <CellContent
        key={content.index}
        onMouseEnter={() => handleCellMouseEnter(content.text)}
        onMouseLeave={handleCellMouseLeave}
      >
        {content.text}
      </CellContent>
    ) : null;
  };
  

  const cellContents = [
    { index: 4, text: 'Interactive Installations' },
    { index: 10, text: 'US' },
    { index: 12, text: 'PROLIV' },
    { index: 17, text: 'SwiftUI<br />Experiments' },
    { index: 25, text: 'AKG<br />Headphones' },
    { index: 35, text: 'JBL One' },
    { index: 38, text: 'Xiaoai<br />Teacher' },
    // Add more cell contents as needed
  ];

  return (
    <GridContainer isCellHovered={isCellHovered}>
      {Array.from({ length: 45 }, (_, index) => (
        <GridCell key={index}>
          {renderCellContent(index)}
        </GridCell>
      ))}
    </GridContainer>
  );
};

export default Grid;
