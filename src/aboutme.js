import React from 'react';
import styled from 'styled-components';
import ReactTyped from 'react-typed';


// Create a styled component for the typewriter container
const TypewriterContainer = styled.div`
  height: 44vw;
  width: 80vw;
`;

const Erc = styled.div`
  margin-bottom: 4vh;
  cursor: pointer;
  `;

const Typewriter = ({ handleAboutMeClick }) => {
  return (
    // Use the styled component in your JSX
    <TypewriterContainer>
      <Erc>
      <p onClick={handleAboutMeClick}>[Erc]</p>
      </Erc>
      <p>
        Kiwi is{' '}
        <ReactTyped
          strings={['an User Experience Designer', 'Gigi\'s girlfriend', 'an evil storyteller who uses technology as medium</br>Crafting narratives that resonate with users</br>And stay with them long after the interaction</br></br>Press ENTER to learn more about Kiwi']}
          startDelay={100}
          endDelay={100}
          typeSpeed={50}
          // loop
          backSpeed={50}
          cursorChar=" >"
          showCursor={true}
        />
      </p>
    </TypewriterContainer>
  );
};


export default Typewriter;
