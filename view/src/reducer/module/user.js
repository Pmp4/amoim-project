const initialUserInfo = {
    logged: false,
    userInfo: {
        id: "",
        username: "",
    },
};

const SUCCESS_LOGGED = 1;

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

        default:
            return { ...currentState };
    }
};

export { user, SUCCESS_LOGGED };