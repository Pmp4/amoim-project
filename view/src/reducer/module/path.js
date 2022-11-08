// const initialPath = {
//     imagePath: 'http://localhost:8080/rest/v1/images/',
//     profileImagePath: "http://localhost:8080/rest/v1/profile/images/"
// }

const initialPath = {
    imagePath: 'http://p-mp4.iptime.org:12345/amoim/img_upload/',
    profileImagePath: "http://p-mp4.iptime.org:12345/amoim/profile/",
    image: "http://p-mp4.iptime.org:12345/amoim/images/"
}


const path = (currentState = initialPath, action) => {
    return currentState;
}

export {path}