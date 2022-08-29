import httpCommon from '../httpCommon';

const memberAllSelect = () => {
    return httpCommon.get(`/user/select`);
}

const selectUserIdCount = (userId) => {
    return httpCommon.get(`/user/check?userId=${userId}`);
}

export default {memberAllSelect, selectUserIdCount}; 