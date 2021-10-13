import React from 'react';

const ModalItem= ({index, handleInputChangeAnswer, handleRadioBtn, checked, value,viewModal, editModal})=> {


    return (
        <>
            <label htmlFor={`answer+${index + 1}`}>Answer {index+1}</label>

            {
                editModal?  <div>
                    <input type="radio" name={`answer}`}  onClick={handleRadioBtn(index)}/>
                    <input type="text" id={`answer+${index + 1}`} value={value[index]} onChange={ handleInputChangeAnswer(index)}/>
                </div> : viewModal?  <div>
                    <input type="radio" name={`answer}`}  onClick={handleRadioBtn(index)}/>
                    <p > {value[index]} </p>
                </div> :
                    <div>
                        <input type="radio" name={`answer}`}  onClick={handleRadioBtn(index)}/>
                        <input type="text" id={`answer+${index + 1}`} value={value[index]} onChange={ handleInputChangeAnswer(index)}/>
                    </div>
            }

        </>
    );
}

export default ModalItem;