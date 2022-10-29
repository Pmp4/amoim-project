import httpMultipartCommon from 'api/http-multipart-common';
import httpCommon from 'api/http-common';

const insertBoard = (rest) => {
    return httpMultipartCommon.post("/board/insert", rest);
}

const moimBoardSelect = (meetingNo, page = 1, length = 8) => {
    return httpCommon.get(`/board/select?meetingNo=${meetingNo}&page=${page}&length=${length}`);
}


export default {insertBoard, moimBoardSelect};