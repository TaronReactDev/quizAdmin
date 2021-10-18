import React from 'react';
import Del from "./png/delete.png"
import "./../../style.scss"

const DeleteBtn = ({text, handleDelete, id}) => {
  return (
    <button onClick={()=>handleDelete(id)}><img alt={text}  className="btnIcon" src={Del}/></button>
  );
}

export default DeleteBtn;
