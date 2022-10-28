const initialUserInfo = {
    logged: false,
    userInfo: {
        no: "",
        id: "",
        username: "",
    }
};

const SUCCESS_LOGGED = "SUCCESS_LOGGED";
const LOGOUT_LOGGED = "LOGOUT_LOGGED";

const user = (currentState = initialUserInfo, action) => {
    switch (action.type) {
        case SUCCESS_LOGGED:
            return {
                ...currentState,
                logged: true,
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