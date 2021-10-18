import React from 'react';
import  Edit from "./png/edit.png"
import "./../../style.scss"


const EditBtn= ({text,handleViewOrEdit, id, type}) => {
  return (
    <button
      onClick={handleViewOrEdit(id, type)}
    > <img alt={text}  className="btnIcon" src={Edit} />
    </button>
  );
}

export default EditBtn;
