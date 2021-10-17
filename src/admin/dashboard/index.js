import React, {useEffect, useState} from 'react';
import Modal from "./modal"
import axios from "axios"
import UniqueQuestion from "./uniqueQuestion"

const Index = (props) => {
  const [openModal, setOpenModal] = useState("none");
  const [editOrViewId, setEditOrViewId] = useState("");
  //const [viewModal, setViewModal] = useState("");
  const [questionInfo, setQuestionInfo] = useState([])
  const [editedQuestion, setEditedQuestion] = useState([])
  const [viewOneQuestion, setViewOneQuestion] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get('/api/question/list');
        const data = await res.data;
        setQuestionInfo(data)
      } catch (e) {
        console.error(e);
      }
    }
    getData();
  }, [])
  const handleDelete = (id) => () => {
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
    setOpenModal("none")
  }
  const handleFormSubmitAdding = async (data) => {

    const {question, answers, correctAnswer} = data;
    try {
      const res = await axios.post("/api/question/addQuestion",
        {
          question, answers, correctAnswer
        })


      const resData = res.data;
      setQuestionInfo(resData)
      //
      // if (resData.message === "Successfully created") {
      //
      //     setQuestionInfo((prev)=> { return [...prev, data] })
      // }

    } catch (e) {
      console.error('request failed', {
        error: e, data: {
          data
        }
      })
    }


    setOpenModal("none")
    //setEditOrViewId("")
    setEditedQuestion([])
    setViewOneQuestion([])

  }
  const handleEditQuestionRequest = (data, id) => {
    const {question, answers, correctAnswer} = data;
    axios.put(`/api/question/list/edit/${id}`, {
      id,
      question,
      answers,
      correctAnswer

    }).then(res => setQuestionInfo((prev) => {
      return [...prev, res.data]
    })).catch(e => console.log(e))


    setOpenModal("none")
    // setEditOrViewId("")
    setEditedQuestion([])
    setViewOneQuestion([])


  }


  const handleOpenModal = () => {
    setOpenModal("flex")
  }
  const handleCancelAdding = () => {
    setOpenModal("none")
    // setEditOrViewId("")
    setEditedQuestion([])
    setViewOneQuestion([])
  }
  const handleViewOrEdit = (id, actionType) => () => {
    setOpenModal("flex");
    setEditOrViewId(id);
    const filteredQuestion = questionInfo.filter((el) => {
      return el._id == id
    });
    actionType === "edit" ? setEditedQuestion(filteredQuestion) : setViewOneQuestion(filteredQuestion)
  }


  const uniqueQuestion = questionInfo.map((el, index) => {
    return <UniqueQuestion key={el._id} id={el._id}
                           el={el}
                           handleViewOrEdit={handleViewOrEdit}
                           handleDelete={handleDelete}
    />
  })
  return (
    <div className="dashboardContainer">
      <div className="dashboardContainer_navigation">
        <button onClick={handleOpenModal}> + add new question</button>
      </div>
      <table className="dashboardTable">
        <tr>
          <th> ID</th>
          <th> Question</th>
          <th> Answers</th>
          <th> Correct answer</th>
          <th> Action</th>
        </tr>
        {uniqueQuestion}
      </table>
      <Modal display={openModal}
             id={editOrViewId}
        // editModal={editModal}
             handleCancelAdding={handleCancelAdding}
             handleFormSubmitAdding={handleFormSubmitAdding}
             editedQuestion={editedQuestion}
             viewOneQuestion={viewOneQuestion}
             handleEditQuestionRequest={handleEditQuestionRequest}
             handleDelete={handleDelete}
        //  handleEditFromViewModal={handleEdit}
      />
    </div>
  );
}

export default Index;
