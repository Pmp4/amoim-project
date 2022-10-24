import httpMultipartCommon from 'api/httpMultipartCommon';

const insertBoard = (rest) => {
    return httpMultipartCommon.post("/board/insert", rest);
}


export default {insertBoard};