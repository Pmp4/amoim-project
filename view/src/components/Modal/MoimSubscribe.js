import { faCircleCheck, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import MeetingService from "api/meeting/MeetingService";

const MoimSubscribe = () => {
    const [content, setContent] = useState([]);
    const [checkList, setCheckList] = useState({});
    const [userState, setUserState] = useState(false);

    const profileImgPath = useSelector((state) => state.path.profileImagePath);

    useEffect(() => {
        MoimSubscribeListAPI();
    }, []);

    const listSet = content.map((item, idx) => {
        if (content.length === 0 || item.USER_LIST.length === 0) return "";

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
                                        ???{" "}
                                        {new Date().getFullYear() -
                                            new Date(
                                                member.BIRTH_DAY
                                            ).getFullYear()}
                                        ???
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
                        ??????
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
                        ??????
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
                    if (data.DATA.length !== 0) {
                        for(let i = 0; i < data.DATA.length; i++) {
                            if(data.DATA[i].USER_LIST.length !== 0) {
                                setUserState(true);
                                break;
                            }
                        }
                    }
                } else {
                    alert(data.SUCCESS_TEXT);
                }
            } else {
                alert("Server DB Error");
            }
        });
    };

    /**
     * @param {*} meetingNo MEETING ???????????? ?????????
     * @param {*} userMeetingNo USER_MEETING ???????????? ?????????
     *
     * 1. ??? ??? ??????
     * 2. ?????? ??? ?????? ??????
     * 3. ??????????????? ????????? ??? ??????
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
                    //??????
                    tempArr.push(userMeetingNo);
                } else {
                    //??????
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
     * @param {*} type Result/Refusal ??????
     * @param {*} meetingNo MEETING ???????????? ?????????
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
            alert("?????? ?????? ????????? ???????????? ????????????.");
        }
    };

    const resultAPI = async (rest, idx) => {
        const response = await MeetingService.subscribeResult(rest).then((response) => {
            const {status, data} = response;

            if(status === 200) {
                const {SUCCESS, SUCCESS_TEXT} = data;

                if(SUCCESS) {
                    refreshList(rest, idx);
                }else {
                    alert(SUCCESS_TEXT);
                }
            }
        });



        if(response.data.SUCCESS) {
            
        }
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
            }
        });
    };


    /**
     * @param {*} rest ????????? ?????????
     * @param {*} idx ?????? ??????
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
            <div className="title">?????? ??????</div>
            {/* <div className='colum-part'>
                <div className='colum'>
                    <span>?????????</span>
                    <span>??????</span>
                    <span>??????</span>
                    <span>??????</span>
                    <span>??????</span>
                </div>
            </div> */}
            <div className="list">
                {userState ? listSet : <div className='empty-box'>???????????? ????????????.</div>}
                {/* <div className="moim-box">
                    <p>??????????????????.</p>
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
                                <div className="name">?????????</div>
                                <div className="email">test@gmail.com</div>
                                <div className="age">??? 21???</div>
                            </div>
                            <div className="check">
                                <FontAwesomeIcon icon={faCheck} />
                            </div>
                        </div>
                    </div>
                    <div className="line"></div>
                    <div className="btn-box">
                        <button className="result-btn">??????</button>
                        <button className="refusal-btn">??????</button>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default MoimSubscribe;
