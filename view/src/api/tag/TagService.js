import httpCommon from 'api/httpCommon';

const selectByKeyword = (keyword) => {
    return httpCommon.get(`/tag/select/${keyword}`);
}

export default {selectByKeyword};