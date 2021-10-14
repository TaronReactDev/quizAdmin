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
    }
//*






    const handleFormSubmitAdding = async (data) => {



        try {
            const res = await axios.post("/api/question/addQuestion",
                data
            )
            console.log(res.data, "asdasd")

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

    }

    console.log("setquestionInfo", questionInfo)






    const handleEditQuestionRequest = async (data, id) => {
        console.log("data", data)

        let edit = await axios.put(``, {
            data
        }).then(res => console.log(res)).catch(e => console.log(e))


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
    console.log("EditedQuestion Mek harci edit", editedQuestion)
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
    console.log("viewOneQuestion Mek harci view", viewOneQuestion)
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
            />
        </div>
    );
}

export default Index;
