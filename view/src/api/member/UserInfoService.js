import httpCommon from '../httpCommon';


// const loginUser = (rest) => {
//     return httpCommon.post(`/user/login`, rest);
// }
const loginUser = (userId, password) => {
    // return httpCommon.post(`/user/login`, rest);
    return httpCommon.post(`/sign-api/sign-in?id=${userId}&password=${password}`);
}


const logout = () => {
    return httpCommon.post(`/user/logout`);
}

const loggedInfo = () => {
    return httpCommon.post('/user/check');
}


const loggedCheck = () => {
    return httpCommon.post(`/user/status`);
}



export default {loggedInfo, loginUser, logout, loggedCheck};