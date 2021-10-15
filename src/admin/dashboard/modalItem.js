import React from 'react';

const ModalItem= ({index, handleInputChangeAnswer, handleRadioBtn, checked, value,viewModal, editModal,correctAnswer})=> {


    return (
        <>
            <label htmlFor={`answer+${index + 1}`} className="modalContainer_view">Answer {index+1}</label>


            {
                editModal?  <div>
                    <input type="radio" name={`answer}`} checked={ value[index] === correctAnswer ? true:false} onClick={handleRadioBtn(index)}/>
                    <input type="text" id={`answer+${index + 1}`} value={value[index]} onChange={ handleInputChangeAnswer(index)}/>
                </div> :
                    viewModal?  <div>
                    <input type="radio" name={`answer}`} checked={ value[index] === correctAnswer ? true:false}  onClick={handleRadioBtn(index)}/>
                    <span className="modalContainer_view" > {value[index]} </span>
                </div> :
                    <div>
                        <input type="radio" name={`answer}`}  checked={ value[index] === correctAnswer ? true:false}  onClick={handleRadioBtn(index)}/>
                        <input type="text" id={`answer+${index + 1}`} value={value[index]} onChange={ handleInputChangeAnswer(index)}/>
                    </div>
            }

        </>
    );
}

export default ModalItem;