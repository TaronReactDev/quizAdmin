import React, {useEffect, useState} from 'react';
import "../style.scss"
import ModalItem from "./modalItem";


 const Modal = ({display
 , handleCancelAdding, editModal, viewModal, handleFormSubmitAdding, editedQuestion,handleEditQuestionRequest, viewOneQuestion, handleDelete
}) => {

    const [question, setQuestion] = useState("");
    const [answers, setAnswers] = useState(["", "", "", ""]);
    const [correctAnswer, setCorrectAnswer] = useState("");

    const a =viewOneQuestion[0]

     console.log(question)
     console.log(answers)
     console.log(correctAnswer)

    useEffect(()=>{
        if(editModal ){
            setQuestion(editedQuestion[0].question)
            setAnswers(editedQuestion[0].answers)
            setCorrectAnswer(editedQuestion[0].correctAnswer)
        }
    },[editModal])


    useEffect(()=>{

         if(viewModal && viewOneQuestion.length){

            setQuestion(viewOneQuestion[0].question)
             setAnswers(viewOneQuestion[0].answers)
             setCorrectAnswer(viewOneQuestion[0].correctAnswer)
         }
    },[viewModal])

    const clearState = () => {
        setQuestion("");
        setAnswers(["", "", "", ""]);
        setCorrectAnswer('')
    }

    const handleInputChange = (e) => {
       setQuestion(e.target.value)

    }

    const handleInputChangeAnswer = (index) => (e) => {
        answers[index] = e.target.value;
        setAnswers([...answers])
    }

    const handleRadioBtn = (number) => () => {
        if (answers[number]) {
            setCorrectAnswer(answers[number])
        }
    }


    const handleFormSubmit = (e) => {
        e.preventDefault()
        const newQuestion = {
            question,
            answers,
            correctAnswer
        }


        console.log(newQuestion, "newQuestion")
        if(editModal){
            handleEditQuestionRequest(newQuestion, viewModal)
        }
        else {handleFormSubmitAdding(newQuestion)}


    }

    const handleCancelBtn = () => {
        clearState()
        handleCancelAdding()
    }




    const inputs = answers.map(
        (el, index) =>
            <ModalItem index={index}
                      handleInputChangeAnswer={handleInputChangeAnswer}
                      handleRadioBtn={handleRadioBtn}
                       value={answers}
                       editModal={editModal} viewModal={viewModal}
            />)


    return (
        <div className="modalContainer" style={{display}}>
            <div className="modalContainer_background"></div>

            <div className="modalContainer_formContainer">
                <form
                    onSubmit={handleFormSubmit}
                >

                    <label htmlFor="question">Question</label>
                    {editModal ? <input type="text" id="question"
                                        value={question}
                                        onChange={handleInputChange}
                        /> :
                        viewModal ? <p>{question}</p> :

                        <input type="text" id="question" value={question}
                               onChange={handleInputChange}
                        />}

                    {inputs}

                </form>

                {editModal || viewModal ? "" :
                    <button
                        onClick={handleFormSubmit}
                    >Add new question</button>}


                {editModal ? <>
                        <button
                            onClick={handleFormSubmit}
                        > Add Edited question</button>
                        <button onClick={handleDelete(editModal)}>Delete</button>
                    </>
                    :
                  viewModal ? <>
                          <button> Edit question</button>
                          <button onClick={handleDelete(viewModal)}>Delete</button>
                      </>
                      :""
                }
                <button
                    onClick={handleCancelBtn}
                > Cancel</button>
            </div>
        </div>
    );
}

export default Modal;
