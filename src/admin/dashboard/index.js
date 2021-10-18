import React, {useEffect, useState} from 'react';
import Modal from "./modal"
import axios from "axios"
import UniqueQuestion from "./uniqueQuestion"
import DashboardHeaders from "./dashboardHeaders";
import DeleteBtn from "./shared buttons/deleteBtn";
import EditBtn from "./shared buttons/editBtn";
import CancelBtn from "./shared buttons/cancelBtn";
import ModalItem from "./modalItem";

const Index = (props) => {

  //**************** opening modal *************************************************
  const [addingModalShow, setAddingModalShow] = useState(false)
  const [editModalShow, setEditModalShow] = useState(false)
  const [viewModalShow, setViewModalShow] = useState(false)
  //********************************************************************************

  const [openModal, setOpenModal] = useState("none");
  const [editOrViewId, setEditOrViewId] = useState("");

  //const [viewModal, setViewModal] = useState("");
  const [questionInfo, setQuestionInfo] = useState([])
  const [editedQuestion, setEditedQuestion] = useState()
  const [viewOneQuestion, setViewOneQuestion] = useState()
  //**************** Ading question state********************************************
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState();
  //*********************************************************************************
  useEffect(() => {
    if (editedQuestion) {
      setQuestion(editedQuestion[0].question)
      setAnswers(editedQuestion[0].answers)
      setCorrectAnswer(editedQuestion[0].correctAnswer)
    }
  }, [editedQuestion])


  useEffect(() => {

    if (viewOneQuestion && viewOneQuestion.length) {

      setQuestion(viewOneQuestion[0].question)
      setAnswers(viewOneQuestion[0].answers)
      setCorrectAnswer(viewOneQuestion[0].correctAnswer)
    }
  }, [viewOneQuestion])


  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get('/api/question/list');
        setQuestionInfo(res.data)
      } catch (e) {
        console.error(e);
      }
    }
    getData();
  }, [])


  //Adding question ******************************************
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
  //***********************************************************


  const clearState = () => {
    setQuestion("");
    setAnswers(["", "", "", ""]);
    setCorrectAnswer()
  }
  // const handleCancelAdding = (type) => {
  //  if(type === "adding"){
  //    setAddingModalShow(false)
  //    clearState()
  //  }
  //
  //
  //
  //
  //
  //   }
  // //   setOpenModal("none")
  // //   setEditOrViewId("")
  // //   setEditedQuestion()
  // //   setViewOneQuestion()
  // // }


  const handleCancelBtn = (type) => () => {
    switch (type) {
      case "adding" :
        setAddingModalShow((prev) => !prev);
        clearState();
        break;
      case "edit" :
        setEditModalShow((prev) => !prev);
        clearState();
        break;
      case "view" :
        setViewModalShow((prev) => !prev);
        break;
    }
  }


//********API Part ******************************************************
  const handleDelete = (id) => {
    axios.delete(`/api/question/list/delete/${id}`).then(res => {
        if (res.status < 300) {
          let filteredQuestion = questionInfo.filter((el) => {
            return el._id !== id;
          })
          setQuestionInfo(filteredQuestion)
        }
      }
    ).catch((e) => {
      console.log('request failed')
    })
  }

  const handleFormSubmitAdding = async (data) => {

    try {
      const res = await axios.post("/api/question/addQuestion", data)
      setQuestionInfo((prevState) => [...prevState, res.data])
    } catch (e) {
      console.error('request failed', {
        error: e, data: {
          data
        }
      })
    }
   // handleCancelAdding()
  }


  const handleEditQuestionRequest = (data, id) => {
    const {question, answers, correctAnswer} = data;
    axios.put(`/api/question/list/edit/${id}`, {
      id,
      question,
      answers,
      correctAnswer

    }).then(res => (
        console.log("res.data", res.data)
      )
    ).catch(e => console.log(e))

   // handleCancelAdding()
  }

//********API Part ******************************************************


  const handleFormSubmit = (e) => {
    e.preventDefault()
    const newQuestion = {
      question,
      answers,
      correctAnswer
    }
    handleFormSubmitAdding(newQuestion)
    handleCancelBtn()
  }


  const handleDisplayModal = (type) => () => {
    switch (type) {
      case "add":
        setAddingModalShow((prev) => !prev);
        break;
      case "view":
        setViewModalShow((prev) => !prev);
        break;
      case "edit":
        setEditModalShow((prev) => !prev);
        break;
    }
  }


  const handleViewOrEdit = (id, actionType) => () => {

    setEditOrViewId(id);
    const filteredQuestion = questionInfo.filter((el) => {
      return el._id == id
    });

    actionType === "edit" ? setEditedQuestion(filteredQuestion) : setViewOneQuestion(filteredQuestion);
    actionType === "edit" ? setEditModalShow(true) : setViewModalShow(true);

  }


  const uniqueQuestion = questionInfo.map((el, index) => {
    return <UniqueQuestion key={el._id} id={el._id}
                           el={el}
                           handleViewOrEdit={handleViewOrEdit}
                           handleDelete={handleDelete}
    />
  })


  const handleEditQuestionRequestModal = (id) => (e) => {
    e.preventDefault()
    const editedQuestion = {
      question,
      answers,
      correctAnswer
    }
    handleEditQuestionRequest(editedQuestion, id)
  }


  const handleOunDelete = (id) => {
    handleDelete(id);
    clearState();
   // handleCancelAdding();
  }

  // const inputs = answers?.map(
  //     (el, index) =>
  //         <ModalItem index={index}
  //                    handleInputChangeAnswer={handleInputChangeAnswer}
  //                    handleRadioBtn={handleRadioBtn}
  //                    value={answers}
  //             // editModal={editModal} viewModal={viewModal}
  //                    correctAnswer={correctAnswer}
  //                    edit={!!editedQuestion}
  //                    view={!!viewOneQuestion}
  //         />)


  return (
    <div className="dashboardContainer">
      <div className="dashboardContainer_navigation">
        <button onClick={handleDisplayModal("add")}> + add new question</button>
      </div>
      <table className="dashboardTable">
        <DashboardHeaders/>
        {uniqueQuestion}
      </table>


      {/*//***************************************************************************************************************/}

      <Modal modalShow={addingModalShow}>
        <div className="modalContainer">
          <div className="modalContainer_background" onClick={handleDisplayModal("add")}></div>
          <div className="modalContainer_formContainer">
            <form onSubmit={handleFormSubmit}>
              <label htmlFor="question" className="modalContainer_view">Question</label>
              <input type="text" id="question" value={question} onChange={handleInputChange}/>

              <div>
                <input type="radio" name={`answer}`}
                       checked={answers[0] === correctAnswer ? true : false}
                       onClick={handleRadioBtn(0)}/>
                <input type="text"
                       id={`answer0`}
                       value={answers[0]}
                       onChange={handleInputChangeAnswer(0)}/>
              </div>
              <div>
                <input type="radio" name={`answer}`}
                       checked={answers[1] === correctAnswer ? true : false}
                       onClick={handleRadioBtn(1)}/>
                <input type="text" id={`answer1`}
                       value={answers[1]}
                       onChange={handleInputChangeAnswer(1)}/>
              </div>
              <div>
                <input type="radio" name={`answer}`}
                       checked={answers[2] === correctAnswer ? true : false}
                       onClick={handleRadioBtn(2)}/>
                <input type="text" id={`answer2`}
                       value={answers[2]}
                       onChange={handleInputChangeAnswer(2)}/>
              </div>
              <div>
                <input type="radio" name={`answer}`}
                       checked={answers[3] === correctAnswer ? true : false}
                       onClick={handleRadioBtn(3)}/>
                <input type="text" id={`answer3`}
                       value={answers[3]}
                       onChange={handleInputChangeAnswer(3)}/>
              </div>

            </form>
            <button onClick={handleFormSubmit}>Add new question</button>
            <CancelBtn text="Cancel" type="adding" handleCancelBtn={handleCancelBtn}/>
          </div>
        </div>

      </Modal>
      {/*//***************************************************************************************************************/}

      <Modal modalShow={viewModalShow}>
        <div className="modalContainer">
          <div className="modalContainer_background" onClick={handleDisplayModal("view")}></div>
          <div className="modalContainer_formContainer">
            <label htmlFor="question" className="modalContainer_view">Question</label>
            <span className="modalContainer_view">{question}</span>
            <div>
              <input type="radio" name={`answer}`} checked={answers[0] == correctAnswer ? true : false}
                     onClick={handleRadioBtn(0)}/>
              <span className="modalContainer_view"> {answers[0]} </span>
            </div>
            <div>
              <input type="radio" name={`answer}`} checked={answers[1] == correctAnswer ? true : false}
                     onClick={handleRadioBtn(1)}/>
              <span className="modalContainer_view"> {answers[1]} </span>
            </div>
            <div>
              <input type="radio" name={`answer}`} checked={answers[2] == correctAnswer ? true : false}
                     onClick={handleRadioBtn(2)}/>
              <span className="modalContainer_view"> {answers[2]} </span>
            </div>
            <div>
              <input type="radio" name={`answer}`} checked={answers[3] == correctAnswer ? true : false}
                     onClick={handleRadioBtn(3)}/>
              <span className="modalContainer_view"> {answers[3]} </span>
            </div>
          </div>
        </div>

        {/*<EditBtn text="Edit question"*/}
        {/*         id={id} type="edit"*/}
        {/*         handleViewOrEdit={handleViewOrEdit}*/}
        {/*/>*/}
        {/*<DeleteBtn text="Delete"*/}
        {/*           handleDelete={handleOunDelete} id={id}*/}
        {/*/>*/}

        <CancelBtn text="Cancel" type="view" handleCancelBtn={handleCancelBtn}/>

      </Modal>

      {/*//***************************************************************************************************************/}

      {/*<Modal addingModalShow={editModalShow}>*/}

      {/*    <form onSubmit={handleEditQuestionRequestModal(editedQuestion)}>*/}

      {/*        <label htmlFor="question" className="modalContainer_view">Question</label>*/}
      {/*        <input type="text" id="question" value={question} onChange={handleInputChange}/>*/}

      {/*        {inputs}*/}

      {/*    </form>*/}


      {/*    <button*/}
      {/*        //   onClick={handleEditQuestionRequestModal(id)}*/}
      {/*    > Add Edited question*/}
      {/*    </button>*/}
      {/*    <DeleteBtn text="Delete"*/}
      {/*        // handleDelete={handleOunDelete}*/}
      {/*        // id={id}*/}
      {/*    />*/}


      {/*    <CancelBtn text="Cancel" handleCancelBtn={handleCancelBtn}/>*/}


      {/*</Modal>*/}
    </div>
  );
}

export default Index;
