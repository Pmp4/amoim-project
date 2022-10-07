import axios from 'axios';
export default axios.create({
    baseURL: "/rest/v1",
    headers: {
        "Content-type":"multipart/form-data",
        'Access-Control-Allow-Origin': 'http://localhost:8080' // 서버 domain
    },
    withCredentials: true
})