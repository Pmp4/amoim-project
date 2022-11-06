import httpCommon from 'api/http-common';

const selectByKeyword = (keyword) => {
    return httpCommon.get(`/tag/select/${keyword}`);
}

export default {selectByKeyword};