import React from 'react';


const Square = ({drum, play, pad, changeStatus, currBeat, isPlaying}) => {
  let classList = pad.isActive ? 'square active' : 'square inactive';

  // if (currBeat === pad.beat && pad.isActive && isPlaying) {
  //   play(drum);
  //   classList += ' curr-beat-played'
  // }

  return (
    <div className={classList} onClick={() => changeStatus(pad, drum)}></div>
  );

}

export default Square;


