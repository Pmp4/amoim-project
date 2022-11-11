import axios from 'axios';


const instance = axios.create({
    // baseURL: "http://p-mp4.iptime.org:8080/rest/v1",
    baseURL: "http://localhost:8080/rest/v1",
    headers: {
        "Content-type":"application/json",
        // 'X-AUTH-TOKEN': `${localStorage.getItem('X-AUTH-TOKEN')}`
    },
    // withCredentials: true   //쿠키 조회 권한
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
    return response;
}, async(error) => {
    const {
        config,
        response: { status },
    } = error;


    if(status === 400) {            //서비스 로직 오류
        const msg = error.response.data.message;
        alert(msg);

    } else if(status === 401) {     //토큰 유효시간 지날 때
        return refresh(config);

    } else if(status === 403) {
        alert("인증 실패");
        localStorage.clear();
        window.location.replace("/");
        
    } else if(status === 500) {     //서버 문제
        alert("Server Error");
        window.location.replace("/");
    }

    return error.response;
});



const refresh = async(config) => {
    const response = await instance.post(`/sign-api/refresh`);
    if(response.data.success) {
        localStorage.setItem("X-AUTH-TOKEN", response.data.token);
        config.headers = {
            'Content-Type': 'application/json',
            'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
        };

        return await axios(config);
    } else {
        alert("로그인 후, 시도해주세요.");
        localStorage.clear();
        window.location.replace("/");
    }
}

export default instance;