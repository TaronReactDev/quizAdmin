import React from 'react';

const EditBtn= ({text,handleViewOrEdit, id, type}) => {
  return (
    <button
      onClick={handleViewOrEdit(id, type)}
    >{text}
    </button>
  );
}

export default EditBtn;
