import axios from "axios";

const instance = axios.create({
    baseURL: "http://p-mp4.iptime.org:8080/rest/v1",
    // baseURL: "http://localhost:8080/rest/v1",
    headers: {
        "Content-type": "multipart/form-data",
        // 'X-AUTH-TOKEN': `${localStorage.getItem('X-AUTH-TOKEN')}`
    },
});

instance.interceptors.request.use(
    (config) => {
        config.headers["X-AUTH-TOKEN"] = localStorage.getItem("X-AUTH-TOKEN");
        return config;
    },
    (error) => {
        console.log(error);
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const {
            config,
            response: { status },
        } = error;

        if (status === 401) {
            //토큰 유효시간 지날 때
            // alert("로그인 후, 시도하세요.");
            console.log(error.response);
            return refresh(config);
        } else if (status === 400) {
            console.log(error.response);
            alert("에러");
            window.location.reload();
        } else if (status === 500) {
            alert("Server Error");
            window.location.replace("/");
        }

        return error.response;
    }
);

const refresh = async (config) => {
    const response = await instance.post(`/sign-api/refresh`);
    if (response.data.success) {
        localStorage.setItem("X-AUTH-TOKEN", response.data.token);
        config.headers = {
            "Content-Type": "application/json",
            "X-AUTH-TOKEN": localStorage.getItem("X-AUTH-TOKEN"),
        };

        return await axios(config);
    } else {
        alert("로그인 후, 시도해주세요.");
        localStorage.clear();
        window.location.replace("/");
    }
};

export default instance;
