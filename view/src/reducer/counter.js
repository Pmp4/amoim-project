const initial = {
    number: 1,
};

const counter = (currentState = initial, action) => {
    const tempState = { ...currentState };

    switch (action.type) {
        case "PLUS":
            tempState.number++
            break;

        default:
            tempState.number--;
    }

    return tempState;
};

export default counter;
