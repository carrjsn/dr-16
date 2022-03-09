import React from 'react';
import Square from './Square.jsx';

const SquareRow = ({drum, play, pads=[], changeStatus}) => {

  return (
    <div className="square-row">
      {pads.map((pad, idx) => <Square key={idx} play={play} drum={drum} pad={pad} changeStatus={changeStatus}/>)}
    </div>
  )
};

export default SquareRow;