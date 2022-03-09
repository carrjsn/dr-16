import React from 'react';
import Square from './Square.jsx';

const SquareRow = ({beat, drum, play, pads=[], changeStatus, isPlaying}) => {

  return (
    <div className="square-row">
      {pads.map((pad, idx) => <Square key={idx} play={play} drum={drum} pad={pad} changeStatus={changeStatus} currBeat={beat} isPlaying={isPlaying}/>)}
    </div>
  )
};

export default SquareRow;