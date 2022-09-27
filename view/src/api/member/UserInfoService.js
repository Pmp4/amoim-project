import httpCommon from '../httpCommon';


const loginUser = (rest) => {
    return httpCommon.post(`/user/login`, rest);
}

const loggedInfo = () => {
    return httpCommon.post('/user/check');
}



export default {loggedInfo, loginUser};