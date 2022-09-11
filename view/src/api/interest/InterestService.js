import httpCommon from '../httpCommon'



const selectCategory = (type) => {
    return httpCommon.get(`/interest/category?type=${type}`);
}

export default {selectCategory}