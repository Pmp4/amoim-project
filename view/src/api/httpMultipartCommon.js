import axios from 'axios';
export default axios.create({
    baseURL: "http://localhost:8080/rest/v1",
    headers: {
        "Content-type":"multipart/form-data",
        // 'Access-Control-Allow-Origin': 'http://localhost:8080', // 서버 domain
        'X-AUTH-TOKEN': `${localStorage.getItem('X-AUTH-TOKEN')}`
    },
    // withCredentials: true
})