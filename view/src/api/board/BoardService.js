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



const commentList = (boardNo, page, length = 10) => {
    return httpCommon.get(`/board/comment/list?boardNo=${boardNo}&page=${page}&length=${length}`);
}

const commentInsert = (rest) => {
    return httpCommon.post("/board/comment/insert", rest);
}


export default {insertBoard, moimBoardSelect, boardView, commentInsert, commentList};