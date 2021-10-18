import React from 'react';
import Cancel from "./png/cancel.png"

const CancelBtn=({text,handleCancelBtn}) => {
  return (
    <button
      onClick={handleCancelBtn}
    > <img alt={text} src={Cancel}/></button>
  );
}

export default CancelBtn;
