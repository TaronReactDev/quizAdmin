import React from 'react';

const DeleteBtn = ({text, handleDelete, id}) => {
  return (
    <button onClick={handleDelete(id)}>{text}</button>
  );
}

export default DeleteBtn;
