import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faHeart } from "@fortawesome/free-solid-svg-icons";
import MoimItem from './MoimItem';
import MeetingService from 'api/meeting/MeetingService';
import { useSelector } from 'react-redux';

const MoimMain = () => {
    const [meetingContents, setMeetingContents] = useState([]);
    const location = useLocation();
    const user = useSelector(state => state.user);

    useEffect(() => {
        myAddMeetingData();
    }, []);

    const myAddMeetingData = () => {
        console.log(user);
        MeetingService.selectByUserNo("").then(response => {
            const {status, data} = response;
            console.log(response);
            if(status === 200) {
                setMeetingContents(data);
            }else {
                alert("서버 ERROR");
            }
        });
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
                        {
                            meetingContents.map((item, idx) => {
                                if(meetingContents.length === 0) return "";

                                return <MoimItem item={item} key={idx}/>
                            })
                        }
                        {
                            meetingContents.length < 4 ? 
                            <div className='add-btn'>
                                <Link to={`${location.pathname}/add`}>+</Link>
                            </div> : ""
                        }
                    </div>
                    {
                        meetingContents.length > 0 &&
                        <button className='moim-edit-btn'>
                            수정
                        </button>
                    }
                </div>
                <div className="sub-title">
                    <h4>함께하는 모임</h4>
                </div>
            </div>
        </div>
    );
};

export default MoimMain;
