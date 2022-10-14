import httpMultipartCommon from 'api/httpMultipartCommon';
import httpCommon from 'api/httpCommon';
import { user } from 'reducer/module/user';

const insertMeeting = (data) => {
    return httpMultipartCommon.post(`/meeting/insert`, data);
}

const selectByUserNo = (userNo) => {
    return httpCommon.get(`/meeting/select/${userNo}`);
}

const selectByNo = (no) => {
    return httpCommon.get(`/meeting/select/view/${no}`);
}


const countMeeting = (userNo) => {
    return httpCommon.get(`/meeting/user/count/${userNo}`);
}


const meetingLikeState = (meetingNo) => {
    return httpCommon.get(`/meeting/like/state/${meetingNo}`);
}


const meetingLike = (meetingNo) => {
    return httpCommon.post(`/meeting/like`, meetingNo);
}


export default {insertMeeting, selectByUserNo, selectByNo, countMeeting, meetingLike, meetingLikeState};