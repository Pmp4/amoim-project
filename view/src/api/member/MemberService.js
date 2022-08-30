import httpCommon from '../httpCommon';

const memberAllSelect = () => {
    return httpCommon.get(`/user/select`);
}

const selectUserIdCount = (text, type) => {
    return httpCommon.get(`/user/check?value=${text}&type=${type}`);
}

export default {memberAllSelect, selectUserIdCount}; 