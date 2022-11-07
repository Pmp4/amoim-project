import httpCommon from '../http-common';
import httpMultipartCommon from 'api/http-multipart-common';

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
// const memberSignup = (rest) => {
//     return httpCommon.post(`/user/signup`, rest);
//}
const memberSignup = (rest) => {
    return httpMultipartCommon.post(`/sign-api/sign-up`, rest);
}




//유저 정보
//유저 정보
//유저 정보
const userInfo = () => {
    return httpCommon.get(`/user/info`);
}



//유저 프로필 이미지 수정
const userProfileEdit = (rest) => {
    return httpCommon.post(`/user/profile/edit`, rest);
}


export default {memberAllSelect, selectTypeCount, memberSignup, userInfo, userProfileEdit};