const { default: axios } = require('axios');

axios.interceptors.request.use(function(config) {
    const token = localStorage.getItem('token')
    if(token) {
        config.headers.Authorization = process.env.REACT_APP_TOKEN_PREFIX + ' ' + token
    }
    return config;
})

axios.interceptors.response.use(
    success => success,
    async(error) => {
        const errorCode = error.response.data.code
        console.log("adfasd");

        if(errorCode === 'TOKEN-0001') {
            const originRequest = error.config

            await axios.post('/api/auth/reissue')
            .then(result => {
                localStorage.setItem('token', result.data.response.accessToken)
                window.location.reload()
            })
            .catch(error => {
                localStorage.removeItem('token')
            })
            return Promise.reject(error)
        }
    }
)