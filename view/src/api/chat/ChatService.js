import httpCommon from 'api/http-common';

const registractionChat = (rest) => {
    return httpCommon.post("/chat/add", rest);
}

export default {registractionChat}