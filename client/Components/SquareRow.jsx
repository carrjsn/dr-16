import React from 'react';
import Square from './Square.jsx';

const SquareRow = ({drum, play}) => {
  let squares = [];
  for (let i = 0; i < 16; i++) {
    squares.push(<Square key={Date.now() + Math.random()} play={play} drum={drum} idx={i}/>);
  }

  return (
    <div className="square-row">
      {squares}
    </div>
  )
};

export default SquareRow;