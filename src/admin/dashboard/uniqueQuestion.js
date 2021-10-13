import React from 'react';
import "../style.scss"

const UniqueQuestion = ({id, question, answers, correctAnswer, handleEdit, handleDelete,handleView }) => {

     const answersMap = answers.join(",")

    return (
        <tr onClick={handleView(id)}>
            <td className="uniqueQuestionItem" >  <input type="checkbox"/> </td>
            <td className="uniqueQuestionItem" >{id}</td>
            <td className="uniqueQuestionItem">{question}</td>
            <td className="uniqueQuestionItem">{answersMap}</td>
            <td className="uniqueQuestionItem">{correctAnswer}</td>
            <td>
                <button onClick={handleEdit(id)}>edit</button>
                <button onClick={handleDelete}>del</button>

            </td>


        </tr>
    );
}

export default UniqueQuestion;