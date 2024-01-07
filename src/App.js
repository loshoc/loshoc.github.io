import React, { useState } from 'react';
import Grid from './Grid';
import AboutMeContent from './aboutme';
import styled from 'styled-components';

const AppWrapper = styled.div`
  position: relative;
  background-color: #FFFEF9; /* Set the background color */
  display: flex;
  flex-direction: column; /* Stack items vertically */
  align-items: center; /* Center vertically */
  justify-content: center; /* Center horizontally */
  height: 100vh;
  font-family: 'Andale Mono', monospace;
  
`;

const TextLayer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 0; /* Set the z-index to be above the GridContainer */
  font-size: 8em;
  max-width: 90vw;
`;

const TextLayertop = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2; /* Set the z-index to be above the GridContainer */
  max-width: 90vw;
  font-size: 0.9em;
  
`;

const GridWrapper = styled.div`
  position: relative;
  width: 90vw;
  z-index: 1; /* Set the z-index to be below the TextLayer */
`;

const MeWrapper = styled.div`
  width: 80vw;
  padding-top: 40px;
  display: flex;
  justify-content: space-between;
  font-size: 0.9em;
`;

const LeftAligned = styled.p`
  text-align: left;
  margin: 0;
  width: 60%;
`;

const RightAligned = styled.p`
  text-align: right;
  margin: 0;
`;



function App() {
  const [hoveredCellContent, setHoveredCellContent] = useState('');
  const [showAboutMe, setShowAboutMe] = useState(false);

  const handleCellHover = (content) => {
    setHoveredCellContent(content);
  };

  const handleAboutMeClick = () => {
    setShowAboutMe(!showAboutMe);
  };

  return (
    <AppWrapper>
      {showAboutMe ? (
        // Render content from aboutme.js
        <AboutMeContent handleAboutMeClick={handleAboutMeClick} />
      ) : (
        // Render grid and other components
        <>
          <GridWrapper>
            <TextLayer>
              <p dangerouslySetInnerHTML={{ __html: hoveredCellContent.replace(/\n/g, '<br />') }} />
            </TextLayer>
            <Grid onCellHover={handleCellHover} />
            <TextLayertop onClick={handleAboutMeClick}>About Me</TextLayertop>
          </GridWrapper>
          </>
      )}
          <MeWrapper>
            <LeftAligned>© KIWI GUO 2023</LeftAligned>
        <RightAligned>LinkedIn</RightAligned>
        <RightAligned>GitHub</RightAligned>
        <RightAligned>Behance</RightAligned>
        <RightAligned>Email</RightAligned>
        </MeWrapper>
        
    </AppWrapper>
  );
}

export default App;