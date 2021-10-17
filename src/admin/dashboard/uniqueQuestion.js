import React from 'react';
import "../style.scss"
import DeleteBtn from "./shared buttons/deleteBtn";
import EditBtn from "./shared buttons/editBtn";

const UniqueQuestion = ({id, el,handleViewOrEdit, handleDelete}) => {

  const {question, answers, correctAnswer} = el
  const answersMap = answers.join(",")

  return (
    <tr>
      <td className="uniqueQuestionItem" onClick={handleViewOrEdit(id, "view")}>{id}</td>
      <td className="uniqueQuestionItem" onClick={handleViewOrEdit(id, "view")}>{question}</td>
      <td className="uniqueQuestionItem" onClick={handleViewOrEdit(id, "view")}>{answersMap}</td>
      <td className="uniqueQuestionItem" onClick={handleViewOrEdit(id, "view")}>{correctAnswer}</td>
      <td>
        <EditBtn text="edit" id={id} handleViewOrEdit={handleViewOrEdit} type="edit"/>
         <DeleteBtn text="Del" handleDelete={handleDelete} id={id}/>
        </td>
    </tr>
  );
}

export default UniqueQuestion;
