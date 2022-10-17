import { React, useState } from 'react';
import Login from './Login';
import Error from './Error';
import { useDispatch } from 'react-redux';
import { MODAL_CLOSE } from 'reducer/module/modal';
import { useSelector } from 'react-redux';
import MoimSubscribe from './MoimSubscribe';

const Modal = ({loginPopup}) => {
    const [modalState, setModalState] = useState(true);

    const modal = useSelector(state => state.modal);
    const dispatch = useDispatch();

    const modalType = () => {
        switch(modal.modalType) {
            case "login" : 
                return (<Login modalClose={modalClose}/>);
            case "moim-subscribe-list" :
                return (<MoimSubscribe modalClose={modalClose}/>);

            default : return(<Error/>);
        }
    }

    const modalClose = () => {
        setModalState(false);
        setTimeout(() => {
            dispatch({type: MODAL_CLOSE});
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