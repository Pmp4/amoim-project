import { React, useState } from 'react';
import Login from './Login';
import Error from './Error';
import { useDispatch } from 'react-redux';
import { MODAL_CLOSE } from 'reducer/module/modal';
import { useSelector } from 'react-redux';
import MoimSubscribe from './MoimSubscribe';
import BoardAdd from './BoardAdd';
import { useParams } from 'react-router';
import BoardView from './BoardView';
import { useEffect } from 'react';

const Modal = ({loginPopup}) => {
    const [modalState, setModalState] = useState(true);

    const modal = useSelector(state => state.modal);
    const dispatch = useDispatch();

    useEffect(() => {
        toggleScrolling();
    }) ;

    const modalType = () => {
        switch(modal.modalType) {
            case "login" : 
                return (<Login modalClose={modalClose}/>);
            case "moim-subscribe-list" :
                return (<MoimSubscribe modalClose={modalClose}/>);
            case "board-add" : 
                return (<BoardAdd modalClose={modalClose}/>);
            case "board-view" :
                return (<BoardView modalClose={modalClose}/>)
            
            default : return(<Error/>);
        }
    }

    const modalClose = () => {
        setModalState(false);
        setTimeout(() => {
            dispatch({type: MODAL_CLOSE});
        }, 300);
    }

    const toggleScrolling = () => {
        const body = document.querySelector("body");
        if(modalState) {
            body.style.overflow = "hidden";
        }else {
            body.style.overflow = "";
        }
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