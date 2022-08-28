import { React, useState } from 'react';
import Login from './Login';
import Error from './Error';

const Modal = ({type, loginPopup}) => {
    const [modalState, setModalState] = useState(true);

    const modalType = () => {
        switch(type) {
            case "login" : 
                return (<Login />);

            default : return(<Error/>);
        }
    }

    const modalClose = () => {
        setModalState(false);
        setTimeout(() => {
            loginPopup("OFF");
        }, 300);
    }

    return (
        <div className={modalState ? 'modal-wrap' : 'modal-wrap fade-out'}>
            <div 
                onClick={modalClose} 
                className="modal-background"></div>
            {modalType()}
        </div>
    );
};

export default Modal;