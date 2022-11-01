import httpMultipartCommon from 'api/httpMultipartCommon';
import httpCommon from 'api/http-common';
import { user } from 'reducer/module/user';

const insertMeeting = (data) => {
    return httpMultipartCommon.post(`/meeting/insert`, data);
}


//메인화면에서 필요한 api
//로그인 권한 필요없음
const mainSelectLoc = () => {
    return httpCommon.get(`/meeting/select/main/loc`);
}
const mainSelectCategoryList = (code, page = 1, length = 8) => {
    return httpCommon.get(`/meeting/select/main/category?code=${code}&page=${page}&length=${length}`);
}
//메인화면에서 필요한 api
//로그인 권한 필요없음




//자신이 생성한 모임 조회 API
const moimOwnList = () => {
    return httpCommon.get(`/meeting/select/own`);
}

//자신이 가입중인 모임 조회 api
const moimSubscript = (page = 1, blockSize = 8) => {
    return httpCommon.get(`/meeting/select/subscript?page=${page}&blockSize=${blockSize}`);
}

//모임 자세히 보기
const moimByNoView = (no) => {
    return httpCommon.get(`/meeting/view/${no}`);
}


//멤버 조회 api
const moimMemberSelect = (meetingNo) => {
    return httpCommon.get(`/meeting/member/${meetingNo}`);
}






const selectByCard = (type, key, page = 1, length = 8) => {
    return httpCommon.get(`/meeting/select?type=${type}&key=${key}&page=${page}&length=${length}`);
}

const signingList = (page = 1, length = 8) => {
    return httpCommon.get(`/meeting/signing?&page=${page}&length=${length}`);
}

const selectByNo = (no) => {
    return httpCommon.get(`/meeting/select/view/${no}`);
}


const countMeeting = () => {
    return httpCommon.get(`/meeting/user/count`);
}


const meetingLikeCount = (meetingNo) => {
    return httpCommon.get(`/meeting/like/count/${meetingNo}`);
}

const meetingLikeState = (meetingNo) => {
    return httpCommon.get(`/meeting/like/state/${meetingNo}`);
}

const meetingLikeInsert = (meetingNo) => {
    return httpCommon.post(`/meeting/like/add`, meetingNo);
}

const meetingLikeDelete = (meetingNo) => {
    return httpCommon.delete(`/meeting/like/delete/${meetingNo}`);
}

const meetingSubscribe = (meetingNo) => {
    return httpCommon.post(`/meeting/subscribe`, meetingNo);
}

const meetingSubscribeList = () => {
    return httpCommon.get('/meeting/subscribe/list');
}


const subscribeResult = (rest) => {
    return httpCommon.put(`/meeting/subscribe/result`, rest);
}

const subscribeRefusal = (rest) => {
    return httpCommon.put(`/meeting/subscribe/refusal`, rest);
}




export default {
    insertMeeting, 
    selectByCard, 
    selectByNo, 
    signingList,
    countMeeting, 
    meetingLikeState,
    meetingLikeInsert,
    meetingLikeDelete,
    meetingLikeCount,
    meetingSubscribe,
    meetingSubscribeList,
    subscribeResult,
    subscribeRefusal,

    mainSelectLoc,
    mainSelectCategoryList,
    moimOwnList,
    moimSubscript,
    moimByNoView,
    moimMemberSelect
};