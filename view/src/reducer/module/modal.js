const initialModal = {
    modalState: false,
    modalType: "",
    modalParam: ""
};
const MODAL_CLOSE = "MODAL_CLOSE";
const MODAL_OPEN = "MODAL_OPEN";

const modal = (state = initialModal, action) => {
    switch(action.type) {
        case MODAL_CLOSE :
            return {...initialModal};
        case MODAL_OPEN :
            return {
                ...state,
                modalState: true,
                modalType: action.data,
                modalParam: action.param,
            };

        default :
            return {...state};
    }
}

export {modal, MODAL_CLOSE, MODAL_OPEN}