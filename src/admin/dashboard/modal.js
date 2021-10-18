import React from 'react';


const Modal = ({modalShow, children}) => {

    if (!modalShow) {
        return null
    } else {
        return (

            <div>   {children} </div>


        );
    }
}

export default Modal;
