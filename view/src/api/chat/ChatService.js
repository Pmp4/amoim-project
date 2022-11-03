import httpCommon from 'api/http-common';

//채팅 등록
//채팅 등록
//채팅 등록
const registractionChat = (rest) => {
    return httpCommon.post("/chat/add", rest);
}



//채팅 기록
const chatHistory = (meetingNo, no) => {
    return httpCommon.get(`/chat/list?meetingNo=${meetingNo}&no=${no}`);
}


export default {registractionChat, chatHistory}