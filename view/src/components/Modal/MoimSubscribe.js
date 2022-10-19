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
                                        MEETING.MEETING_NO,
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
                                MEETING.MEETING_NO,
                                parseInt(MEETING.PERSON_NUMBER),
                                idx
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
                                MEETING.MEETING_NO,
                                parseInt(MEETING.PERSON_NUMBER),
                                idx
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
    const buttonActionEvent = (type, meetingNo, cut, idx) => {
        let check = false;
        if (
            Object.keys(checkList).findIndex(
                (item) => parseInt(item) === meetingNo
            ) !== -1
        ) {
            const memberList = checkList[meetingNo];
            const rest = {
                meetingNo,
                list: memberList,
            };

            if(type === 1) {
                if (0 < memberList.length && memberList.length <= cut) {
                    check = true;
                    resultAPI(rest, idx);
                }
            }else {
                if(0 < memberList.length) {
                    check = true;
                    refusalAPI(rest, idx);
                }
            }
        }

        if (!check) {
            alert("허용 가능 인원이 유효하지 않습니다.");
        }
    };

    const resultAPI = (rest, idx) => {
        MeetingService.subscribeResult(rest).then((response) => {
            const {status, data} = response;

            if(status === 200) {
                const {SUCCESS, SUCCESS_TEXT} = data;

                if(SUCCESS) {
                    refreshList(rest, idx);
                }else {
                    alert(SUCCESS_TEXT);
                }
            }else {
                alert("Server Error");
            }
        });
    };

    const refusalAPI = (rest, idx) => {
        MeetingService.subscribeRefusal(rest).then((response) => {
            const {status, data} = response;

            if(status === 200) {
                const {SUCCESS, SUCCESS_TEXT} = data;

                if(SUCCESS) {
                    refreshList(rest, idx);
                }else {
                    alert(SUCCESS_TEXT);
                }
            }else {
                alert("Server Error");
            }
        });
    };


    /**
     * @param {*} rest 선택한 데이터
     * @param {*} idx 부모 요소
     */
    const refreshList = (rest, idx) => {
        const tempArr = [...content[idx].USER_LIST];

        for(let i = 0; i < tempArr.length; i++) {
            for(let j = 0; j < rest.list.length; j++) {
                console.log(tempArr[i].USER_MEETING_NO);
                if(rest.list[j] === tempArr[i].USER_MEETING_NO) {
                    tempArr.splice(i, 1);
                }
            }
        }

        let resData = [...content];
        resData.splice(idx, 1, {MEETING: {...content[idx].MEETING}, USER_LIST: tempArr});

        setContent(resData);
    }


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
