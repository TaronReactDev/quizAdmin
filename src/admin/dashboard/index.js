import React, {useEffect, useState} from 'react';
import Modal from "./modal"
import axios from "axios"
import UniqueQuestion from "./uniqueQuestion"

const Index = (props) => {
  const [openModal, setOpenModal] = useState("none");
  const [editModal, setEditModal] = useState(false);
  const [questionInfo, setQuestionInfo] = useState([])


  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get('/api/post/list');
        const data = await res.data;
        setQuestionInfo( data)
      } catch (e) {
        console.error(e);
      }
    }
    getData();
  }, [])

  const handleFormSubmitAdding = async (data) => {

    const {question, answers, correctAnswer} = data;
    try {
      const res = await axios.post("/api/post",
          [{
            question,
            answers,
            correctAnswer
          }
          ]
      )
      const resData = res.data;

      if(resData.message === "Successfully created"){

        setQuestionInfo( data)
      }

    } catch (e) {
      console.error('request failed', {
        error: e, data: {
          question,
          answers,
          correctAnswer,
        }
      })
    }

  }



  const handleOpenModal = () => {
    setOpenModal("flex")
  }

  const handleCancelAdding = () => {
    setOpenModal("none")
  }


const uniqueQuestion = questionInfo.map((el, index) => {
  return   <UniqueQuestion key={el._id} index={index} question={el.question} answers={el.answers}/>

})

  return (
    <div className="dashboardContainer">
      <div className="dashboardContainer_navigation">
        <button onClick={handleOpenModal}> + add new question</button>
        <button> delete bulk</button>
      </div>

      <table className="dashboardTable">
        <tr>
          <th><input type="checkbox"/> select all</th>
          <th> Index</th>
          <th> Question</th>
          <th> Answers</th>
          <th> Correct answer</th>
          <th> Action</th>
        </tr>

        {uniqueQuestion}

      </table>


      <Modal display={openModal} handleCancelAdding={handleCancelAdding} editModal={editModal} handleFormSubmitAdding={handleFormSubmitAdding}/>
    </div>
  );
}

export default Index;
