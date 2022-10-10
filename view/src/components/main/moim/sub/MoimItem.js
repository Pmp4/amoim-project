import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faHeart } from "@fortawesome/free-solid-svg-icons";

const MoimItem = () => {
    return (
        <div id="moim-item">
            <div className="item">
                <div className="image">
                    <img src="/upload/img_upload/test.png" alt="이미지" />
                </div>
                <div className="exp-part">
                    <div className="left">
                        <div className="title">
                            <span>미노이와 함께하는 히팝</span>
                        </div>
                        <div className="exp">
                            <div className="items">
                                <span className="person-number">인원 1/10</span>
                                <span className="loc">
                                    <FontAwesomeIcon icon={faLocationDot} />
                                    &nbsp;금천구
                                </span>
                                <span className="category">음악 > 힙합</span>
                            </div>
                            <div className="tags">
                                <span>#힙합 #미노이</span>
                            </div>
                        </div>
                    </div>

                    <div className="right">
                        <div className="like">
                            <FontAwesomeIcon icon={faHeart} />
                        </div>
                        <p>42</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MoimItem;
