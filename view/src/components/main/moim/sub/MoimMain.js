import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faHeart } from "@fortawesome/free-solid-svg-icons";
import MoimItem from "./MoimItem";
import MeetingService from "api/meeting/MeetingService";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { MODAL_OPEN } from "reducer/module/modal";

const MoimMain = () => {
    const [meetingContents, setMeetingContents] = useState([]);

    const location = useLocation();

    const user = useSelector((state) => state.user);
    const modal = useSelector((state) => state.modal);

    const dispatch = useDispatch();

    useEffect(() => {
        myAddMeetingData();
    }, []);

    const myAddMeetingData = () => {
        console.log(user);
        MeetingService.selectByCard("USER_NO", "").then((response) => {
            const { status, data } = response;
            console.log(response);
            if (status === 200) {
                setMeetingContents(data);
            } else {
                alert("서버 ERROR");
            }
        });
    };

    //가입 신청 리스트 확인
    //가입 신청 리스트 확인
    //가입 신청 리스트 확인
    const subscribeListBtnAction = () => {
        dispatch({ type: MODAL_OPEN, data: "moim-subscribe-list" });
    };

    return (
        <div id="moim-page">
            {/* <div className="page-wrap">
                <div className="title-part">
                    <div className="title-wrap">
                        <div className="title">
                            <h3>🥹 내 - 모임</h3>
                            <p>모임을 만들어보세요!</p>
                        </div>
                        <Link to={`${location.pathname}/add`}>+</Link>
                    </div>
                </div>
            </div> */}
            <div className="page-wrap main-part">
                <div className="add-moim-part">
                    <div className="moim-sub">
                        <div id="moim-item" className="draggable">
                            {meetingContents.map((item, idx) => {
                                if (meetingContents.length === 0) return "";

                                return <MoimItem item={item} key={idx} />;
                            })}
                            {meetingContents.length < 4 ? (
                                <div className="add-btn">
                                    <Link to={`${location.pathname}/add`}>
                                        +
                                    </Link>
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                    {meetingContents.length > 0 && (
                        <div className="btn-wrap">
                            <button className="moim-edit-btn">수정</button>
                            <button
                                className="moim-confirm-btn"
                                onClick={() => subscribeListBtnAction()}
                            >
                                가입 신청 확인
                            </button>
                        </div>
                    )}
                </div>
                <div className="sub-title">
                    <h4>함께하는 모임</h4>
                </div>
            </div>
        </div>
    );
};

export default MoimMain;
