import React from 'react';
import Cancel from "./png/cancel.png"

const CancelBtn=({text,handleCancelBtn, type}) => {
  return (
    <button
      onClick={handleCancelBtn(type)}
    > <img alt={text} src={Cancel}/></button>
  );
}

export default CancelBtn;
