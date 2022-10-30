import httpMultipartCommon from 'api/http-multipart-common';
import httpCommon from 'api/http-common';

const insertBoard = (rest) => {
    return httpMultipartCommon.post("/board/insert", rest);
}

const moimBoardSelect = (meetingNo, page = 1, length = 8) => {
    return httpCommon.get(`/board/select?meetingNo=${meetingNo}&page=${page}&length=${length}`);
}


const boardView = (no) => {
    return httpCommon.get(`/board/view/${no}`);
}


export default {insertBoard, moimBoardSelect, boardView};