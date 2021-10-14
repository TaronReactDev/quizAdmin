import React from 'react';
import "../style.scss"

const UniqueQuestion = ({
                            id, question, answers, correctAnswer,
                            handleEdit, handleDelete, handleView
                        }) => {

    const answersMap = answers.join(",")

    return (
        <tr >


            <td className="uniqueQuestionItem" onClick={handleView(id)} >{id}</td>
            <td className="uniqueQuestionItem" onClick={handleView(id)} >{question}</td>
            <td className="uniqueQuestionItem" onClick={handleView(id)} >{answersMap}</td>
            <td className="uniqueQuestionItem" onClick={handleView(id)} >{correctAnswer}</td>


            <td>
                <button
                    onClick={handleEdit(id)}
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