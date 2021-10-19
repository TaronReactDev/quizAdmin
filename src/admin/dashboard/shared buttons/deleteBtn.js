import React from 'react';
import Del from "./png/delete.png"
import "./../../style.scss"

const DeleteBtn = ({text, handleDelete, id,type}) => {
  return (
    <button onClick={()=>handleDelete(id,type)}><img alt={text}  className="btnIcon" src={Del}/></button>
  );
}

export default DeleteBtn;
