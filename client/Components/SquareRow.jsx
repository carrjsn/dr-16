import React from 'react';

const SquareRow = ({drum, play}) => {
  let squares = [];
  for (let i = 0; i < 16; i++) {
    squares.push(<div key={i} className='square' onClick={() => play(drum)}></div>)
  }

  return (
    <div className="square-row">
      {squares}
    </div>
  )
};

export default SquareRow;