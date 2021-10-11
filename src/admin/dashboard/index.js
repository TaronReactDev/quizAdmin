import React, {useEffect, useState} from 'react';
import Modal from "./modal"
import axios from "axios"

const Index = (props) => {
  const [openModal, setOpenModal] = useState("none");
  const [editModal, setEditModal] = useState(false);
  const [questionInfo, setQuestionInfo] = useState()


  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get('/api/post/list');
        const data = await res.data;
        setQuestionInfo(data)
      } catch (e) {
        console.error(e);
      }
    }
    getData();


  }, [])


  const handleOpenModal = () => {
    setOpenModal("flex")
  }

  const handleCancelAdding = () => {
    setOpenModal("none")
  }


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


      </table>


      <Modal display={openModal} handleCancelAdding={handleCancelAdding} editModal={editModal}/>
    </div>
  );
}

export default Index;
