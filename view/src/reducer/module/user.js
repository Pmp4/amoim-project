const initialUserInfo = {
    logged: false
};

const SUCCESS_LOGGED = 1;
const LOGOUT_LOGGED = 2;

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