import React, {useEffect, useState} from 'react';
import Modal from "./modal"
import axios from "axios"
import UniqueQuestion from "./uniqueQuestion"
import DashboardHeaders from "./dashboardHeaders";
import DeleteBtn from "./shared buttons/deleteBtn";
import EditBtn from "./shared buttons/editBtn";
import CancelBtn from "./shared buttons/cancelBtn";

const Index = (props) => {

    //**************** opening modal *************************************************
    const [addingModalShow, setAddingModalShow] = useState(false)
    const [editModalShow, setEditModalShow] = useState(false)
    const [viewModalShow, setViewModalShow] = useState(false)
    //********************************************************************************
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
                clearState();
                break;
        }
    }


//********API Part ******************************************************
    const handleDelete = (id, type) => {

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

        switch (type) {
            case "view":
                clearState();
                setEditOrViewId("");
                setViewModalShow(prev => !prev);
                break;
            case "edit":
                clearState();
                setEditOrViewId("");
                setEditModalShow(prev => !prev)
        }


    }

    const handleAddingNewQuestion = async (e) => {

        e.preventDefault()
        const newQuestion = {
            question,
            answers,
            correctAnswer
        }

        try {
            const res = await axios.post("/api/question/addQuestion", newQuestion)
            console.log(res.status)

            let newQuestionInfo = [...questionInfo, res.data];
            console.log("res.data", res.data)
            console.log("newQuestionInfo", newQuestionInfo)
            // setQuestionInfo((prevState) => [...prevState, res.data]);

        } catch (e) {
            console.error('request failed', {
                error: e, data: {
                    newQuestion
                }
            })
        }
        setAddingModalShow((prev) => !prev);
        clearState();

    }


    const handleEditQuestionRequest = (id) => () => {

        axios.put(`/api/question/list/edit/${id}`, {
            _id: id,
            question,
            answers,
            correctAnswer

        }).then(res => {

                const newQuestionInfo = questionInfo.map(el => {
                    if (el._id === id) {
                        return el = res.data;
                    } else {
                        return el
                    }
                })
                setQuestionInfo(newQuestionInfo)
            }
        ).catch(e => console.log(e))
        setEditModalShow((prev) => !prev);
        clearState();

    }


//********API Part End******************************************************


    const handleDisplayModal = () => {

        setAddingModalShow((prev) => !prev);


    }

    const handleViewOrEdit = (id, actionType) => () => {
        setEditOrViewId(id);
        const filteredQuestion = questionInfo.filter((el) => {
            return el._id == id
        });

        switch (actionType) {
            case "edit" :
                setEditedQuestion(filteredQuestion);
                setEditModalShow(true);
                setViewModalShow(false);
                break;
            case  "view":
                setViewOneQuestion(filteredQuestion);
                setViewModalShow(true);
        }
    }


    const disabledAddingBtn = () => {
        if (question && correctAnswer && answers[0] && answers[1] && answers[2] && answers[3]) {
            return false
        } else {
            return true
        }
    }


    return (
        <div className="dashboardContainer">
            <div className="dashboardContainer_navigation">
                <button onClick={handleDisplayModal}> + add new question</button>
            </div>
            <table className="dashboardTable">
                <DashboardHeaders/>
                {questionInfo.map((el, index) => {
                    return <UniqueQuestion key={el._id} id={el._id}
                                           el={el}
                                           handleViewOrEdit={handleViewOrEdit}
                                           handleDelete={handleDelete}/>
                })
                }
            </table>
            {/*//***************************************************************************************************************/}
            <Modal modalShow={addingModalShow}>
                <div className="modalContainer">
                    <div className="modalContainer_background" onClick={handleCancelBtn("adding")}></div>
                    <div className="modalContainer_formContainer">
                        <form onSubmit={handleAddingNewQuestion}>
                            <label htmlFor="question" className="modalContainer_view">Question</label>
                            <input type="text" id="question" value={question} onChange={handleInputChange}/>

                            <label htmlFor={`answer0`} className="modalContainer_view">Answer 1</label>
                            <div>
                                <input type="radio" name={`answer}`}
                                       checked={answers[0] === correctAnswer ? true : false}
                                       onClick={handleRadioBtn(0)}/>
                                <input type="text"
                                       id={`answer0`}
                                       value={answers[0]}
                                       onChange={handleInputChangeAnswer(0)}/>
                            </div>

                            <label htmlFor={`answer1`} className="modalContainer_view">Answer 2</label>
                            <div>
                                <input type="radio" name={`answer}`}
                                       checked={answers[1] === correctAnswer ? true : false}
                                       onClick={handleRadioBtn(1)}/>
                                <input type="text" id={`answer1`}
                                       value={answers[1]}
                                       onChange={handleInputChangeAnswer(1)}/>
                            </div>

                            <label htmlFor={`answer2`} className="modalContainer_view">Answer 3</label>
                            <div>
                                <input type="radio" name={`answer}`}
                                       checked={answers[2] === correctAnswer ? true : false}
                                       onClick={handleRadioBtn(2)}/>
                                <input type="text" id={`answer2`}
                                       value={answers[2]}
                                       onChange={handleInputChangeAnswer(2)}/>
                            </div>
                            <label htmlFor={`answer3`} className="modalContainer_view">Answer 4</label>
                            <div>
                                <input type="radio" name={`answer}`}
                                       checked={answers[3] === correctAnswer ? true : false}
                                       onClick={handleRadioBtn(3)}/>
                                <input type="text" id={`answer3`}
                                       value={answers[3]}
                                       onChange={handleInputChangeAnswer(3)}/>
                            </div>

                        </form>
                        <button disabled={disabledAddingBtn()} onClick={handleAddingNewQuestion}>Add new question
                        </button>
                        <CancelBtn text="Cancel" type="adding" handleCancelBtn={handleCancelBtn}/>
                    </div>
                </div>

            </Modal>
            {/*//***************************************************************************************************************/}

            <Modal modalShow={viewModalShow}>
                <div className="modalContainer">
                    <div className="modalContainer_background" onClick={handleCancelBtn("view")}></div>
                    <div className="modalContainer_formContainer">
                        <label htmlFor="question" className="modalContainer_view">Question</label>
                        <span className="modalContainer_view">{question}</span>

                        <label htmlFor={`answer0`} className="modalContainer_view">Answer 1</label>
                        <div>
                            <input type="radio" name={`answer}`} checked={answers[0] == correctAnswer ? true : false}/>
                            <span className="modalContainer_view"> {answers[0]} </span>
                        </div>

                        <label htmlFor={`answer1`} className="modalContainer_view">Answer 2</label>
                        <div>
                            <input type="radio" name={`answer}`} checked={answers[1] == correctAnswer ? true : false}/>
                            <span className="modalContainer_view"> {answers[1]} </span>
                        </div>

                        <label htmlFor={`answer2`} className="modalContainer_view">Answer 3</label>
                        <div>
                            <input type="radio" name={`answer}`} checked={answers[2] == correctAnswer ? true : false}/>
                            <span className="modalContainer_view"> {answers[2]} </span>
                        </div>

                        <label htmlFor={`answer3`} className="modalContainer_view">Answer 4</label>
                        <div>
                            <input type="radio" name={`answer}`} checked={answers[3] == correctAnswer ? true : false}/>
                            <span className="modalContainer_view"> {answers[3]} </span>
                        </div>

                        <EditBtn text="Edit question"
                                 id={editOrViewId} type="edit"
                                 handleViewOrEdit={handleViewOrEdit}
                        />
                        <DeleteBtn text="Delete" type="view" handleDelete={handleDelete} id={editOrViewId}
                        />

                        <CancelBtn text="Cancel" type="view" handleCancelBtn={handleCancelBtn}/>

                    </div>
                </div>


            </Modal>

            {/*//***************************************************************************************************************/}

            <Modal modalShow={editModalShow}>
                <div className="modalContainer">
                    <div className="modalContainer_background" onClick={handleCancelBtn("edit")}></div>
                    <div className="modalContainer_formContainer">
                        <form onSubmit={handleEditQuestionRequest(editedQuestion)}>

                            <label htmlFor="question" className="modalContainer_view">Question</label>
                            <input type="text" id="question" value={question} onChange={handleInputChange}/>

                            <label htmlFor={`answer0`} className="modalContainer_view">Answer 1</label>
                            <div>
                                <input type="radio" name={`answer}`}
                                       checked={answers[0] === correctAnswer ? true : false}
                                       onClick={handleRadioBtn(0)}/>
                                <input type="text"
                                       id={`answer0`}
                                       value={answers[0]}
                                       onChange={handleInputChangeAnswer(0)}/>
                            </div>

                            <label htmlFor={`answer1`} className="modalContainer_view">Answer 2</label>
                            <div>
                                <input type="radio" name={`answer}`}
                                       checked={answers[1] === correctAnswer ? true : false}
                                       onClick={handleRadioBtn(1)}/>
                                <input type="text" id={`answer1`}
                                       value={answers[1]}
                                       onChange={handleInputChangeAnswer(1)}/>
                            </div>

                            <label htmlFor={`answer2`} className="modalContainer_view">Answer 3</label>
                            <div>
                                <input type="radio" name={`answer}`}
                                       checked={answers[2] === correctAnswer ? true : false}
                                       onClick={handleRadioBtn(2)}/>
                                <input type="text" id={`answer2`}
                                       value={answers[2]}
                                       onChange={handleInputChangeAnswer(2)}/>
                            </div>
                            <label htmlFor={`answer3`} className="modalContainer_view">Answer 4</label>
                            <div>
                                <input type="radio" name={`answer}`}
                                       checked={answers[3] === correctAnswer ? true : false}
                                       onClick={handleRadioBtn(3)}/>
                                <input type="text" id={`answer3`}
                                       value={answers[3]}
                                       onChange={handleInputChangeAnswer(3)}/>
                            </div>


                        </form>


                        <button
                            onClick={handleEditQuestionRequest(editOrViewId)}
                        > Add Edited question
                        </button>
                        <DeleteBtn text="Delete"
                                   type="edit"
                                   handleDelete={handleDelete}
                                   id={editOrViewId}
                        />
                        <CancelBtn text="Cancel" type="edit" handleCancelBtn={handleCancelBtn}/>
                    </div>
                </div>

            </Modal>
        </div>
    );
}

export default Index;
