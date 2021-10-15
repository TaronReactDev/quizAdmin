import React, {useEffect, useState} from 'react';
import Modal from "./modal"
import axios from "axios"
import UniqueQuestion from "./uniqueQuestion"

const Index = (props) => {
    const [openModal, setOpenModal] = useState("none");


    const [editModal, setEditModal] = useState("");
    const [viewModal, setViewModal] = useState("");
    const [questionInfo, setQuestionInfo] = useState([])
    const [editedQuestion, setEditedQuestion] = useState([])
    const [viewOneQuestion, setViewOneQuestion] = useState([])

//*
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
//*
//*
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
//*

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
        setEditModal("")
        setViewModal("")
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

        }).then(res => setQuestionInfo((prev)=>{return [...prev, res.data]})).catch(e => console.log(e))


        setOpenModal("none")
        setEditModal("")
        setViewModal("")
        setEditedQuestion([])
        setViewOneQuestion([])


    }


//*
    const handleOpenModal = () => {
        setOpenModal("flex")
    }
//*
    //*
    const handleCancelAdding = () => {
        setOpenModal("none")
        setEditModal("")
        setViewModal("")
        setEditedQuestion([])
        setViewOneQuestion([])
    }
//*

//*
    const handleEdit = (id) => () => {
        setOpenModal("flex");
        setEditModal(id);
        const edited = questionInfo.filter((el) => {
            return el._id == id
        });
        setEditedQuestion(edited)
    }

//*
    //*
    const handleView = (id) => () => {
        setOpenModal("flex");
        setViewModal(id);
        const viewOne = questionInfo.filter((el) => {
            return el._id == id
        });
        setViewOneQuestion(viewOne)

    }

    //*


    const uniqueQuestion = questionInfo.map((el, index) => {
        return <UniqueQuestion key={el._id} id={el._id} question={el.question} answers={el.answers}
                               correctAnswer={el.correctAnswer}
                               handleEdit={handleEdit}
                               handleDelete={handleDelete}
                               handleView={handleView}
        />

    })

    return (
        <div className="dashboardContainer">
            <div className="dashboardContainer_navigation">
                <button

                    onClick={handleOpenModal}

                > + add new question
                </button>
                {/*// <button> delete bulk</button>*/}
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
                   viewModal={viewModal}
                   editModal={editModal}
                   handleCancelAdding={handleCancelAdding}


                   handleFormSubmitAdding={handleFormSubmitAdding}
                   editedQuestion={editedQuestion}
                   viewOneQuestion={viewOneQuestion}
                   handleEditQuestionRequest={handleEditQuestionRequest}
                   handleDelete={handleDelete}
                   handleEditFromViewModal={handleEdit}

            />
        </div>
    );
}

export default Index;
