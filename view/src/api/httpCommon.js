import axios from 'axios';
export default axios.create({
    baseURL: "/rest/v1",
    headers: {
        "Content-type":"application/json",
        'Access-Control-Allow-Origin': 'http://localhost:8080' // 서버 domain
    },

    withCredentials: true
});