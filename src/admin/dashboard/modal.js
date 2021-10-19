import React from 'react';


const Modal = ({modalShow, children}) => {
    if (!modalShow) {
        return null
    } else {
        return (

            <>   {children} </>


        );
    }
}

export default Modal;
