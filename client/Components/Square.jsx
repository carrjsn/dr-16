import React from 'react';


const Square = ({drum, play, pad, changeStatus}) => {
  let classList = pad.isActive ? 'square active' : 'square inactive';

  return (
    <div className={classList} onClick={() => changeStatus(pad, drum)}></div>
  );

}

export default Square;


