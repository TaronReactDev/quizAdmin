import React, {useEffect, useState} from 'react';
import Modal from "./modal"
import axios from "axios"
import UniqueQuestion from "./uniqueQuestion"

const Index = (props) => {
    const [openModal, setOpenModal] = useState("none");
    const [editModal, setEditModal] = useState("");
    const [viewModal, setViewModal] = useState("");
    const [questionInfo, setQuestionInfo] = useState([])
    const [editedQuestion, setEditedQuestion] =useState([])
    const [viewOneQuestion, setViewOneQuestion] =useState([])


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

            if (resData.message === "Successfully created") {

                setQuestionInfo(data)
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

    const handleEditQuestionRequest = async  (data) =>{
        console.log("data", data)
    }

    const handleOpenModal = () => {
        setOpenModal("flex")
    }

    const handleCancelAdding = () => {
        setOpenModal("none")
        setEditModal("")
        setEditedQuestion([])
        setViewOneQuestion([])
    }

    const handleEdit = (id) =>() => {
        setOpenModal("flex");
        setEditModal(id);
        const edited = questionInfo.filter((el)=>{return el._id == id});
        setEditedQuestion(edited)


    }

    const handleView =(id)=>()=>{
        setOpenModal("flex");
        setViewModal(id);
        const viewOne = questionInfo.filter((el)=>{return el._id == id});
        setViewOneQuestion(viewOne)
    }

    console.log("viewOneQuestion, " , viewOneQuestion)

    const handleDelete = () => {
    }

    const uniqueQuestion = questionInfo.map((el, index) => {
        return <UniqueQuestion key={el._id} id={el._id} question={el.question} answers={el.answers}
                               correctAnswer={el.correctAnswer}
                               handleEdit={handleEdit}
                               handleDelete={handleDelete}
                               handleView={handleView}/>

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
                    <th> ID</th>
                    <th> Question</th>
                    <th> Answers</th>
                    <th> Correct answer</th>
                    <th> Action</th>
                </tr>

                {uniqueQuestion}

            </table>


            <Modal display={openModal} handleCancelAdding={handleCancelAdding} editModal={editModal}
                   viewModal={{viewModal}}
                   handleFormSubmitAdding={handleFormSubmitAdding}
                   editedQuestion={editedQuestion}
                   viewOneQuestion={viewOneQuestion}
                   handleEditQuestionRequest={handleEditQuestionRequest}/>
        </div>
    );
}

export default Index;
