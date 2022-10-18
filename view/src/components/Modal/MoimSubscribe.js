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
        console.log(item);

        return (
            <div className="moim-box" key={600 + idx}>
                <p>{MEETING.TITLE}</p>
                <div className="sub-list draggable">
                    {USER_LIST.map((member, idx) => {
                        let classNameSet = "item";
                        const keyArr = Object.keys(checkList);
                        if (keyArr.length !== 0) {
                            for (let i = 0; i < keyArr.length; i++) {
                                const key = keyArr[i];
                                const checkArr = checkList[key];

                                for (let j = 0; j < checkArr.length; j++) {
                                    if (
                                        checkArr[j] === member.USER_MEETING_NO
                                    ) {
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
                                    memberClickAction(
                                        MEETING.NO,
                                        member.USER_MEETING_NO
                                    )
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
                    <button
                        className="result-btn"
                        onClick={() =>
                            buttonActionEvent(
                                1,
                                MEETING.NO,
                                parseInt(MEETING.PERSON_NUMBER)
                            )
                        }
                    >
                        수락
                    </button>
                    <button
                        className="refusal-btn"
                        onClick={() =>
                            buttonActionEvent(
                                2,
                                MEETING.NO,
                                parseInt(MEETING.PERSON_NUMBER)
                            )
                        }
                    >
                        거절
                    </button>
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

    /**
     * @param {*} meetingNo MEETING 테이블의 기본키
     * @param {*} userMeetingNo USER_MEETING 테이블의 기본키
     *
     * 1. 빈 값 체크
     * 2. 클릭 한 부모 구분
     * 3. 체크했는지 안했는 지 구분
     */
    const memberClickAction = (meetingNo, userMeetingNo) => {
        let tempArr;
        const keyArr = Object.keys(checkList);

        if (keyArr.length !== 0) {
            if (
                keyArr.findIndex((item) => parseInt(item) === meetingNo) !== -1
            ) {
                tempArr = [...checkList[meetingNo]];

                if (
                    tempArr.findIndex((item) => item === userMeetingNo) === -1
                ) {
                    //등록
                    tempArr.push(userMeetingNo);
                } else {
                    //삭제
                    tempArr = tempArr.filter((item) => item !== userMeetingNo);
                }
            } else {
                tempArr = [userMeetingNo];
            }
        } else {
            tempArr = [userMeetingNo];
        }

        setCheckList({
            ...checkList,
            [meetingNo]: tempArr,
        });
    };

    /**
     * @param {*} type Result/Refusal 구분
     * @param {*} meetingNo MEETING 테이블의 기본키
     *
     */
    const buttonActionEvent = (type, meetingNo, cut) => {
        let check = false;
        if (
            Object.keys(checkList).findIndex(
                (item) => parseInt(item) === meetingNo
            )
        ) {
            const memberList = checkList[meetingNo];
            if (memberList.length <= cut) {
                check = true;
                const rest = {
                    meetingNo,
                    list: memberList,
                };

                if(type === 1) {
                    resultAPI(rest);
                } else {
                    refusalAPI(rest);
                }
            }
        }

        if (!check) {
            alert("");
        }
    };

    const resultAPI = (rest) => {
        MeetingService.subscribeResult(rest).then((response) => {});
    };

    const refusalAPI = (rest) => {
        MeetingService.subscribeResult().then((response) => {});
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
