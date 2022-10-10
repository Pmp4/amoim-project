import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faHeart } from "@fortawesome/free-solid-svg-icons";
import MoimItem from './MoimItem';

const MoimMain = () => {
    const location = useLocation();

    const myAddMeetingData = () => {
        
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
                <div className="sub-title add-moim-part">
                    <div className="moim-sub">
                        <MoimItem/>
                        <div className='add-btn'>
                            <Link to={`${location.pathname}/add`}>+</Link>
                        </div>
                    </div>
                </div>
                <div className="sub-title">
                    <h4>함께하는 모임</h4>
                </div>
            </div>
        </div>
    );
};

export default MoimMain;
