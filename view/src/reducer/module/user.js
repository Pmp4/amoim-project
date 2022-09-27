const initialUserInfo = {
    logged: false,
    userInfo: {
        id: "",
        no: "",
        name: "",
    },
};

const SUCCESS_LOGGED = 1;
const LOGOUT_LOGGED = 2;

const user = (currentState = initialUserInfo, action) => {
    switch (action.type) {
        case SUCCESS_LOGGED:
            return {
                ...currentState,
                logged: true,
                userInfo: {
                    id: action.data.userId,
                    no: action.data.userNo,
                    name: action.data.name,
                }
            };
        case LOGOUT_LOGGED:
            return {
                ...initialUserInfo
            }

        default:
            return { ...currentState };
    }
};

export { user, SUCCESS_LOGGED, LOGOUT_LOGGED };