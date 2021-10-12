import React from 'react';
import "../style.scss"

const UniqueQuestion = ({index, question, answers}) => {

     const answersMap = answers.join(",")

    return (
        <tr>
            <td className="uniqueQuestionItem" >  <input type="checkbox"/> </td>
            <td className="uniqueQuestionItem" >{index +1 }</td>
            <td className="uniqueQuestionItem">{question}</td>
            <td className="uniqueQuestionItem">{answersMap}</td>
            <td className="uniqueQuestionItem">{answersMap}</td>
            <td>hg</td>


        </tr>
    );
}

export default UniqueQuestion;