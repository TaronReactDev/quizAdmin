import React, {useState} from 'react';
import "../style.scss"

const Modal = ({display, handleCancelAdding, editModal}) => {

  const [question, setQuestion] = useState();
  const [answer1, setAnswer1] = useState({
    answer: "",
    isChecked: false,
  });
  const [answer2, setAnswer2] = useState({
    answer: "",
    isChecked: false,
  });
  const [answer3, setAnswer3] = useState({
    answer: "",
    isChecked: false,
  });
  const [answer4, setAnswer4] = useState({
    answer: "",
    isChecked: false,
  });
  const [correctAnswer, setCorrectAnswer] = useState('')



  const clearState = () => {
  setQuestion("");
  setAnswer1({
    answer: "",
      isChecked: false,
  });
  setAnswer2({
    answer: "",
      isChecked: false,
  });
  setAnswer3({
    answer: "",
      isChecked: false,
  });
  setAnswer4({
    answer: "",
      isChecked: false,
  });
}

  const handleInputChange = (type) => (e) => {
    if (type === "question") {
      setQuestion(e.target.value)
    } else if (type === "answer1") {
      setAnswer1({answer1: e.target.value})
    } else if (type === "answer2") {
      setAnswer2({answer2: e.target.value})
    } else if (type === "answer3") {
      setAnswer3({answer3: e.target.value})
    } else if (type === "answer4") {
      setAnswer4({answer4: e.target.value})
    }

  }

  const handleRadioBtn = (number) => () => {
    if (number === 1) {
      setCorrectAnswer(answer1.answer)
      setAnswer1({...answer1, isChecked: true})
      setAnswer2({...answer1, isChecked: false})
      setAnswer3({...answer1, isChecked: false})
      setAnswer4({...answer1, isChecked: false})
    } else if (number === 2) {
      setCorrectAnswer(answer2.answer)
      setAnswer1({...answer1, isChecked: false})
      setAnswer2({...answer1, isChecked: true})
      setAnswer3({...answer1, isChecked: false})
      setAnswer4({...answer1, isChecked: false})
    } else if (number === 3) {
      setCorrectAnswer(answer3.answer)
      setAnswer1({...answer1, isChecked: false})
      setAnswer2({...answer1, isChecked: false})
      setAnswer3({...answer1, isChecked: true})
      setAnswer4({...answer1, isChecked: false})
    } else if (number === 4) {
      setCorrectAnswer(answer4.answer)
      setAnswer1({...answer1, isChecked: false})
      setAnswer2({...answer1, isChecked: false})
      setAnswer3({...answer1, isChecked: false})
      setAnswer4({...answer1, isChecked: true})
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()

    const answers = [answer1, answer2, answer3, answer4];

    const questionForSubmit = {
      question,
      answers,
      correctAnswer,
    }
  }

  const handleCancelBtn = () => {
    clearState()
    handleCancelAdding()
  }

  return (
    <div className="modalContainer" style={{display}}>
      <div className="modalContainer_background"></div>

      <div className="modalContainer_formContainer">
        <form onSubmit={handleFormSubmit}>

          <label htmlFor="question">Question</label>
          <input type="text" id="question" value={question} onChange={handleInputChange("question")}/>

          <label htmlFor="answer1">Answer 1</label>
          <div>
            <input type="radio" name="answer" onClick={handleRadioBtn(1)}/>
            <input type="text" id="answer1" value={answer1.answer} onChange={handleInputChange("answer1")}/>
          </div>

          <label htmlFor="answer1">Answer 2</label>
          <div>
            <input type="radio" name="answer" onClick={handleRadioBtn(2)}/>
            <input type="text" id="answer2" value={answer2.answer} onChange={handleInputChange("answer2")}/>
          </div>

          <label htmlFor="answer3">Answer 3</label>
          <div>
            <input type="radio" name="answer" onClick={handleRadioBtn(3)}/>
            <input type="text" id="answer3" value={answer3.answer} onChange={handleInputChange("answer3")}/>
          </div>

          <label htmlFor="answer4">Answer 4</label>
          <div>
            <input type="radio" name="answer" onClick={handleRadioBtn(4)}/>
            <input type="text" id="answer4" value={answer4.answer} onChange={handleInputChange("answer4")}/>
          </div>

        </form>

        <button onClick={handleFormSubmit}>Add new question</button>
        <button onClick={handleCancelBtn}> Cancel</button>

        {editModal ? <>
          <button> Edit</button>
          <button>Delete</button>
        </>
          :
          ""
          }
      </div>
    </div>
  );
}

export default Modal;
