import React from 'react';


const Modal = ({modalShow, children}) => {
    console.log(modalShow)
    if (!modalShow) {
        return null
    } else {
        return (

            <>   {children} </>


        );
    }
}

export default Modal;
