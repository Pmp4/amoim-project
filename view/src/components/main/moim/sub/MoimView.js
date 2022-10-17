import MeetingService from "api/meeting/MeetingService";
import React from "react";
import { useParams } from "react-router";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faHeart } from "@fortawesome/free-solid-svg-icons";
import { staticMapSet } from "components/api/KakaoMapScript"

const MoimView = () => {
    const [contents, setContents] = useState({});
    const [members, setMembers] = useState([]);
    const [likeState, setLikeState] = useState(false);

    const imgPath = useSelector((state) => state.path.imagePath);
    const profileImgPath = useSelector((state) => state.path.profileImagePath);
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    const param = useParams();
    const meetingNo = param.meetingNo;

    useEffect(() => {
        selectViewApi();
        userLikeStateAPI();
    }, []);

    const selectViewApi = () => {
        MeetingService.selectByNo(meetingNo).then((response) => {
            const { status, data } = response;
            if (status === 200) {
                const { SUCCESS, rest } = data;
                if (SUCCESS) {
                    setContents(rest.CONTENTS);
                    setMembers(rest.MEMBERS);
                    staticMapSet({lat: rest.LAT_Y, lng: rest.LON_X}, "map");
                } else {
                    alert("잘못된 모임 정보입니다.");
                    navigate(-1);
                }
            } else {
                alert("Server DB Error");
            }
        });
    };

    const membershipBtn = () => {
        if (members.length > 0) {
            let check = true;
            for (let i = 0; i < members.length; i++) {
                if (members[i].USER_NO === user.userInfo.no) check = false;
            }

            if (check)
                return (
                    <div className="membership-button-wrap">
                        <button onClick={() => subscribeActionAPI()}>가입 신청하기</button>
                    </div>
                );
        }
    };

    const likeCountAPI = () => {
        MeetingService.meetingLikeCount(meetingNo).then((response) => {
            const { status, data } = response;
            console.log(response);

            if (status === 200) {
                setContents({ ...contents, LIKE_COUNT: data });
            } else {
                alert("Server Error");
            }
        });
    };

    //좋아요 상태 확인 API
    //좋아요 상태 확인 API
    //좋아요 상태 확인 API
    const userLikeStateAPI = () => {
        MeetingService.meetingLikeState(meetingNo).then((response) => {
            const { status, data } = response;
            if (status === 200) {
                if (data === 1) {
                    setLikeState(false);
                } else if (data === 0) {
                    setLikeState(true);
                } else {
                    alert("로그인 후 다시 시도해주세요.");
                    navigate(-1);
                }
            } else {
                alert("Server Error");
            }
        });
    };

    //좋아요 누르면
    //좋아요 누르면
    //좋아요 누르면
    const likeButtonActionAPI = () => {
        if (!likeState) {
            //likeState 가 false면 delete
            MeetingService.meetingLikeDelete(meetingNo).then((response) => {
                const { status, data } = response;

                if (status === 200) {
                    if (data.SUCCESS) {
                        setLikeState(true);
                        likeCountAPI();
                    } else {
                        alert(data.SUCCESS_MSG);
                    }
                } else {
                    alert("Server Error");
                }
            });
        } else {
            //likeState 가 true면 insert
            MeetingService.meetingLikeInsert(meetingNo).then((response) => {
                const { status, data } = response;

                if (status === 200) {
                    if (data.SUCCESS) {
                        setLikeState(false);
                        likeCountAPI();
                    } else {
                        alert(data.SUCCESS_MSG);
                    }
                } else {
                    alert("Server Error");
                }
            });
        }
    };

    const memberList = () =>
        members.map((item, idx) => {
            if (members.length === 0) return "";

            return (
                <div className="item" key={8000 + idx}>
                    <div className="profile-img">
                        <img
                            src={profileImgPath + item.PROFILE_IMAGE}
                            alt={item.NAME + "의 프로필 이미지"}
                        />
                    </div>
                    <div className="profile-exp">
                        <p>
                            {item.NAME}{" "}
                            {item.USER_NO === contents.USER_NO && (
                                <span>관리자</span>
                            )}
                        </p>
                        <span>{item.INTRO}</span>
                    </div>
                </div>
            );
        });


    const subscribeActionAPI = () => {
        MeetingService.meetingSubscribe(meetingNo).then(response => {
            const {status, data} = response;
            if(status === 200) {
                const {SUCCESS, SUCCESS_TEXT} = data;
                alert(SUCCESS_TEXT);
            }else {
                alert("Server Error");
            }
        });
    }

    return (
        <div id="view-page">
            <div className="page-wrap">
                <div className="left">
                    <div className="img-box">
                        {Object.keys(contents).length !== 0 && (
                            <img
                                src={`${imgPath}${contents.IMAGE_NAME}`}
                                alt={contents.TITLE}
                            />
                        )}
                    </div>

                    {membershipBtn()}
                </div>
                <div className="right">
                    <div className="title-sub">
                        <div className="left">
                            <h3>{contents.TITLE}</h3>
                            <div className="sub-exp">
                                <div className="tags-wrap">
                                    <div className="tags box">
                                        {Object.keys(contents).length !== 0 &&
                                            contents.TAGS.replace(
                                                /\[|\]|"| /g,
                                                ""
                                            )
                                                .split(",")
                                                .map((item, idx) => {
                                                    if (idx === 0)
                                                        return (
                                                            <span
                                                                key={idx + 101}
                                                            >
                                                                #{item}
                                                            </span>
                                                        );
                                                    else
                                                        return (
                                                            <span
                                                                key={idx + 101}
                                                            >
                                                                {" "}
                                                                #{item}
                                                            </span>
                                                        );
                                                })}
                                    </div>
                                </div>
                                <div className="sub-wrap">
                                    <div className="loc box">
                                        <FontAwesomeIcon icon={faLocationDot} />
                                        &nbsp;
                                        {contents.PLACE_NAME !== undefined
                                            ? contents.PLACE_NAME
                                            : contents.JIBUN_ADDRESS}
                                    </div>
                                    <div className="category box">
                                        {contents.CATEGORY_PARENT_NAME} &gt;{" "}
                                        {contents.CATEGORY_NAME}
                                    </div>
                                    <div className="person-number box">
                                        인원 {contents.PERSON_COUNT}/
                                        {contents.PERSON_NUMBER}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="right">
                            <div
                                className={
                                    !likeState
                                        ? "like-btn draggable on"
                                        : "like-btn draggable"
                                }
                                onClick={() => likeButtonActionAPI()}
                            >
                                <div className="like">
                                    <FontAwesomeIcon icon={faHeart} />
                                </div>
                                <p>{contents.LIKE_COUNT}</p>
                            </div>
                        </div>
                    </div>
                    <div className="content">{contents.CONTENT}</div>
                    <div className="sub-content">
                        <div id="map"></div>
                        <div className="member">
                            <div className="title">멤버</div>
                            <div className="member-list">
                                {/* <div className='item'>
                                    <div 
                                        className='profile-img'
                                        // style={{
                                        //     backgroundImage: `url(${profileImgPath}default_profile.png)`
                                        // }}
                                        >
                                        <img src={profileImgPath + 'default_profile.png'} />
                                    </div>
                                    <div className='profile-exp'>
                                        <p>홍길동</p>
                                        <span>한줄소개</span>
                                    </div>
                                </div> */}
                                {memberList()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MoimView;
