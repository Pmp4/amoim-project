import httpMultipartCommon from 'api/httpMultipartCommon';
import httpCommon from 'api/httpCommon';

const insertBoard = (rest) => {
    return httpMultipartCommon.post("/board/insert", rest);
}

const moimBoardSelect = (meetingNo, page = 1, length = 8) => {
    return httpCommon.get(`/board/select?meetingNo=${meetingNo}&page=${page}&length=${length}`);
}


export default {insertBoard, moimBoardSelect};