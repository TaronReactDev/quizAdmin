import React from 'react';

const CancelBtn=({text,handleCancelBtn}) => {
  return (
    <button
      onClick={handleCancelBtn}
    > {text}</button>
  );
}

export default CancelBtn;
