import httpCommon from '../httpCommon';

const memberAllSelect = () => {
    return httpCommon.get(`/user/select`);
}

//아이디, 이메일 중복체크
//아이디, 이메일 중복체크
//아이디, 이메일 중복체크
const selectTypeCount = (text, type) => {
    return httpCommon.get(`/user/check?value=${text}&type=${type}`);
}

//회원가입
//회원가입
//회원가입
const memberSignup = (rest) => {
    return httpCommon.post(`/user/signup`, rest);
}


export default {memberAllSelect, selectTypeCount, memberSignup};