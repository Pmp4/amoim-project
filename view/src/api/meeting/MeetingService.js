import httpMultipartCommon from 'api/httpMultipartCommon';
import httpCommon from 'api/httpCommon';
import { user } from 'reducer/module/user';

const insertMeeting = (data) => {
    return httpMultipartCommon.post(`/meeting/insert`, data);
}

const selectByUserNo = (userNo) => {
    return httpCommon.get(`/meeting/select/${userNo}`);
}


export default {insertMeeting, selectByUserNo};