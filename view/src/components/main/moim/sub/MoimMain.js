import React from "react";
import { Link, useLocation } from 'react-router-dom';

const MoimMain = () => {
    const location = useLocation();

    return (
        <div id='moim-page'>
            <div className="page-wrap">
                <div className="title-wrap">
                    <div className="title">
                        <h3>🥹 내 - 모임</h3>
                        <p>모임을 만들어보세요!</p>
                    </div>
                    <Link to={`${location.pathname}/add`}>+</Link>
                </div>
            </div>
            <div className="page-wrap main-part">
                <div className="sub-title">
                    <h4>나의 모임</h4>
                </div>
                <div className="sub-title">
                    <h4>함께하는 모임</h4>
                </div>
            </div>
        </div>
    );
};

export default MoimMain;
