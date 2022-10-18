import { faCircleCheck, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import MeetingService from "api/meeting/MeetingService";

const MoimSubscribe = () => {
    const [content, setContent] = useState([]);
    const [checkList, setCheckList] = useState({});

    const profileImgPath = useSelector((state) => state.path.profileImagePath);

    useEffect(() => {
        MoimSubscribeListAPI();
    }, []);

    const listSet = content.map((item, idx) => {
        if (content.length === 0) return "";
        if (item.USER_LIST.length === 0) return "";

        const { USER_LIST, MEETING } = item;

        return (
            <div className="moim-box" key={600 + idx}>
                <p>{MEETING.TITLE}</p>
                <div className="sub-list draggable">
                    {USER_LIST.map((member, idx) => {
                        let classNameSet = "item";
                        const keyArr = Object.keys(checkList);
                        if(keyArr.length !== 0) {
                            for(let i = 0; i < keyArr.length; i++) {
                                const key = keyArr[i];
                                const checkArr = checkList[key];

                                for(let j = 0; j < checkArr.length; j++) {
                                    if(checkArr[j] === member.USER_MEETING_NO) {
                                        classNameSet += " on";
                                    }
                                }
                            }
                        }
                        

                        return (
                            <div
                                className={classNameSet}
                                key={1200 + idx}
                                onClick={() =>
                                    memberClickAction(MEETING.NO, member.USER_MEETING_NO)
                                }
                            >
                                <div className="cover"></div>
                                <div className="on-cover"></div>
                                <div className="profile-image">
                                    <img
                                        src={
                                            profileImgPath +
                                            "default_profile.png"
                                        }
                                        alt="#"
                                    />
                                </div>
                                <div className="exp">
                                    <div className="name">{member.NAME}</div>
                                    <div className="email">{member.EMAIL}</div>
                                    <div className="age">
                                        만{" "}
                                        {new Date().getFullYear() -
                                            new Date(
                                                member.BIRTH_DAY
                                            ).getFullYear()}
                                        세
                                    </div>
                                </div>
                                <div className="check">
                                    <FontAwesomeIcon icon={faCheck} />
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="line"></div>
                <div className="btn-box">
                    <button className="result-btn">수락</button>
                    <button className="refusal-btn">거절</button>
                </div>
            </div>
        );
    });

    const MoimSubscribeListAPI = () => {
        MeetingService.meetingSubscribeList().then((response) => {
            const { status, data } = response;
            if (status === 200) {
                if (data.SUCCESS) {
                    setContent(data.DATA);
                } else {
                    alert(data.SUCCESS_TEXT);
                }
            } else {
                alert("Server DB Error");
            }
        });
    };

    const memberClickAction = (meetingNo, userMeetingNo) => {
        let temp;
        const keyArr = Object.keys(checkList);

        if(keyArr.length !== 0) {
            All:
            for(let i = 0; i < keyArr.length; i++) {
                const key = keyArr[i];
                const checkArr = [...checkList[key]];

                for(let j = 0; j < checkArr.length; j++) {
                    if(checkArr[j] === userMeetingNo) {
                        checkArr.splice(j, 1);
                        temp = checkArr;
                        break All;
                    }
                }

                if(parseInt(key) === meetingNo) {   //이미 있는 키(meetingNo)
                    temp = checkArr.concat(userMeetingNo);
                }else { //이미 있는 키가 아닐 때(meetingNo)
                    temp = [userMeetingNo];
                }
            }
        }else {
            temp = [userMeetingNo];
        }
        
        setCheckList({
            ...checkList, 
            [meetingNo]: temp
        });
    };

    return (
        <div className="moim-sub-list">
            <div className="title">가입 신청</div>
            {/* <div className='colum-part'>
                <div className='colum'>
                    <span>모임명</span>
                    <span>이름</span>
                    <span>나이</span>
                    <span>이름</span>
                    <span>이름</span>
                </div>
            </div> */}
            <div className="list">
                {listSet}
                {/* <div className="moim-box">
                    <p>모임명입니다.</p>
                    <div className="sub-list draggable">
                        <div className="item">
                            <div className="cover"></div>
                            <div className="on-cover"></div>
                            <div className="profile-image">
                                <img
                                    src={profileImgPath + "default_profile.png"}
                                    alt="#"
                                />
                            </div>
                            <div className="exp">
                                <div className="name">홍길동</div>
                                <div className="email">test@gmail.com</div>
                                <div className="age">만 21세</div>
                            </div>
                            <div className="check">
                                <FontAwesomeIcon icon={faCheck} />
                            </div>
                        </div>
                    </div>
                    <div className="line"></div>
                    <div className="btn-box">
                        <button className="result-btn">수락</button>
                        <button className="refusal-btn">거절</button>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default MoimSubscribe;
