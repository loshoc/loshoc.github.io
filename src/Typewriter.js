import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  white-space: pre-line; /* Preserve line breaks and spaces */
  text-align: left; /* Left-align the text */
`;

const Typewriter = ({ text }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => prevIndex + 1);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Slice the text based on the current index
  const displayedText = text.slice(0, index).replace(/^\s+/g, '');

  return <Wrapper>{displayedText}</Wrapper>;
};

export default Typewriter;
