import React from 'react';
import "../style.scss"

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
        <button
          onClick={handleViewOrEdit(id, "edit")}
        >edit
        </button>
        <button
          onClick={handleDelete(id)}
        >del
        </button>
      </td>
    </tr>
  );
}

export default UniqueQuestion;
