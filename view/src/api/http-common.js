import axios from 'axios';


const instance = axios.create({
    baseURL: "http://localhost:8080/rest/v1",
    headers: {
        "Content-type":"application/json",
        // 'X-AUTH-TOKEN': `${localStorage.getItem('X-AUTH-TOKEN')}`
    },
});

instance.interceptors.request.use(
    config => {
        config.headers["X-AUTH-TOKEN"] = localStorage.getItem('X-AUTH-TOKEN');
        
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject(error);
    }
)

instance.interceptors.response.use(response => {
    // console.log(response);
    return response;
}, error => {
    if(error.response.status === 401) {     //토큰 유효시간 지날 때
        alert("로그인 후, 시도하세요.");
        localStorage.clear();
        window.location.replace("/");
    } else if(error.response.status === 400) {
        alert("Server DB Error");
        window.location.reload();
    } else if(error.response.status === 500 && error.response.status === 404) {
        alert("Server Error");
        window.location.replace("/");
    }

    return error.response;
});

export default instance;