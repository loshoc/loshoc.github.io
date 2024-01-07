// GridCell.js
import React from 'react';
import styled from 'styled-components';

const GridCellWrapper = styled.div`
  position: relative;
  aspect-ratio: 1;
  border: 1px solid rgba(214, 214, 214, 0.2);
  margin: -0.5px;
  


  &:hover {
    .left-top-rectangle {
      height: 2px;
      margin-bottom: 0.5px;
    }
    .left-top-rectangleh{
        width: 2px;
        margin-left: 0.5px;
    }
  }
`;

const Rectangle = styled.div`
  position: absolute;
  background-color: #000;
`;

//w
const TopLeft = styled(Rectangle)`
position: absolute;
  width: 10px;
  height: 1px;
  top: 0;
  left: 0px;
  transform: translate(-50%, -50%);
  transition: height 0.3s ease;
`;

const TopRight = styled(Rectangle)`
position: absolute;
  width: 10px;
  height: 1px;
  top: 0;
  right: 0px;
  transform: translate(50%, -50%);
`;

const BottomLeft = styled(Rectangle)`
position: absolute;
width: 10px;
height: 1px;
bottom: 0px;
left: 0px;
transform: translate(-50%, 100%);
`;

const BottomRight = styled(Rectangle)`
position: absolute;
width: 10px;
height: 1px;
bottom: 0px;
right: 0px;
transform: translate(50%, 100%);
`;

//h
const TopLefth = styled(Rectangle)`
position: absolute;
  width: 1px;
  height: 10px;
  top: 0;
  left: 0px;
  transform: translate(-100%, -50%);
`;
const TopRighth = styled(Rectangle)`
position: absolute;
  width: 1px;
  height: 10px;
  top: 0;
  right: 0px;
  transform: translate(100%, -50%);
`;

const BottomLefth = styled(Rectangle)`
position: absolute;
  width: 1px;
  height: 10px;
  bottom: 0;
  left: 0px;
  transform: translate(-100%, 50%);
`;

const BottomRighth = styled(Rectangle)`
position: absolute;
  width: 1px;
  height: 10px;
  bottom: 0;
  right: 0px;
  transform: translate(100%, 50%);
`;

const Content = styled.div`
  padding: 10%;
  overflow: hidden;
  
  text-overflow: ellipsis;
  color: #333;
  font-size: 0.9em;
`;

const GridCell = ({ children }) => {
    
    

  return (
    <GridCellWrapper>
      <TopLeft className="left-top-rectangle" />
      <TopLefth className="left-top-rectangleh" />
      <TopRight />
      <TopRighth />
      <BottomLeft />
      <BottomLefth />
      <BottomRight />
      <BottomRighth />
      <Content>{children}</Content>
    </GridCellWrapper>
  );
};

export default GridCell;
