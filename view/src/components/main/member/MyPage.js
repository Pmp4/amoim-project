import MemberService from "api/member/MemberService";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import MoimList from '../moim/sub/MoimList';
import MeetingService from 'api/meeting/MeetingService';

const initialUserInfo = {
    userNo: "",
    userId: "",
    password: "",
    name: "",
    phoneNumber: "",
    birthDay: "",
    socialLoginHost: "",
    socialLoginKey: "",
    gender: "",
    startDate: "",
    revisedDate: "",
    outDate: "",
    email: "",
    salt: "",
    profileImage: "default_profile.png",
    intro: "",
};

const MyPage = ({ Test }) => {
    const user = useSelector((state) => state.user);
    const path = useSelector((state) => state.path);

    const [userInfo, setUserInfo] = useState(initialUserInfo);
    const [likeMoim, setLikeMoim] = useState([]);
    const [likeMoimPageInfo, setLikeMoimPageInfo] = useState({
        blockSize: 8,
        currentPage: 1,
        lastPage: 0,
        pageSize: 0,
        startPage: 0,
        startRecord: 0,
        totalPage: 0,
        totalRecord: 0,
    });

    const [todayViewMoim, setTodayViewMoim] = useState([]);
    const [todayViewMoimPageInfo, setTodayViewMoimPageInfo] = useState({
        blockSize: 8,
        currentPage: 1,
        lastPage: 0,
        pageSize: 0,
        startPage: 0,
        startRecord: 0,
        totalPage: 0,
        totalRecord: 0,
    });

    const {
        userNo,
        userId,
        password,
        name,
        phoneNumber,
        birthDay,
        socialLoginHost,
        socialLoginKey,
        gender,
        email,
        salt,
        profileImage,
        intro,
    } = userInfo;

    useEffect(() => {
        async function a () {
            await userInfoApi();
            await userLikeApi(1);
            await todayMoimViewApi(1);
        }

        a();
    }, []);

    const userInfoApi = async () => {
        const response = await MemberService.userInfo();
        setUserInfo(response.data);
    };

    
    const dateSet = () => {
        if(birthDay !== "") {
            const date = new Date(birthDay);
            return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
        }

        return ""
    };



    const userLikeApi = async(page) => {
        const response = await MeetingService.moimUserLike(page);

        setLikeMoim(response.data.list);
        setLikeMoimPageInfo(response.data.pageInfo);
    }



    const likeMoimButtonAction = (page) => {
        userLikeApi(page);
    };


    const todayMoimViewApi = async(page) => {
        const response = await MeetingService.moimUserView(page);
        setTodayViewMoim(response.data.list);
        setTodayViewMoimPageInfo(response.data.pageInfo);
    }

    const todayMoimButtonAction = (page) => {
        todayMoimViewApi(page);
    };


    return (
        <div id="my-page" className="page-wrap">
            <div className="info-part draggable">
                <div className="profile-img-info">
                    <div className="profile-img">
                        <img
                            src={path.profileImagePath + "default_profile.png"}
                            alt={"프로필 이미지"}
                        />
                        <div className="edit-button">
                            Edit
                            <input type="file" />
                        </div>
                    </div>
                </div>
                <div className="exp-info">
                    <div className="name b1">
                        {name} <span className='userid'>{userId}</span>
                    </div>
                    <div className="line intro">
                        {intro === null ? <span className='null'>한줄 소개가 없습니다</span> : intro}
                    </div>
                    <div className="birth mt">
                        <p className='sub'>생년월일</p>
                        <span className='con b1'>{dateSet()}</span>
                    </div>
                    <div className='edit-password mt'>
                        <button className=''>비밀번호 변경</button>
                    </div>
                </div>
            </div>
            <div className='like-moim part'>
                <h2>좋아요한 모임</h2>
                <MoimList 
                    items={likeMoim}
                    pageInfo={likeMoimPageInfo}
                    pageBtn={likeMoimButtonAction}
                />
            </div>
            <div className='like-moim part'>
                <h2>최근 본 모임</h2>
                <MoimList 
                    items={todayViewMoim}
                    pageInfo={todayViewMoimPageInfo}
                    pageBtn={todayMoimButtonAction}
                />
            </div>
        </div>
    );
};

export default MyPage;
