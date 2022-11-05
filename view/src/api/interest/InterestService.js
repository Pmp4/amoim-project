import httpCommon from '../httpCommon'


/**
 * 
 * @param {*} type String
 * @returns 
 * 공백일 경우 parentCode
 */
const selectCategory = (type) => {
    return httpCommon.get(`/interest/category?type=${type}`);
}


const selectUserInterest = () => {
    return httpCommon.get(`/interest/user`);
}

export default {selectCategory, selectUserInterest}