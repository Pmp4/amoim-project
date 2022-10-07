import httpMultipartCommon from 'api/httpMultipartCommon';

const insertMeeting = (data) => {
    return httpMultipartCommon.post(`/meeting/insert`, data);
}



export default {insertMeeting};