import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSelector } from "react-redux";
import { faHeart, faLocationDot } from "@fortawesome/free-solid-svg-icons";

const MoimList = ({ items }) => {
    const imgPath = useSelector((state) => state.path.imagePath);

    if (items.length === 0) return;

    const content = items.map((item, idx) => (
        <div className="item">
            <div className="left">
                <div className="thumbnail">
                    <img src={imgPath + "_DSC2806_20221020105800745.jpg"} />
                </div>
                <div className="exp">
                    <p>제목입니다</p>
                    <div className="sub-exp">
                        <span className="person">인원 1/5</span>
                        <span className="loc">
                            <FontAwesomeIcon icon={faLocationDot} /> 위치
                        </span>
                        <span className="cat">태그</span>
                        <span className="tag">인원 1/5</span>
                    </div>
                </div>
            </div>
            <div className="right">
                <FontAwesomeIcon icon={faHeart} />
            </div>
        </div>
    ));

    return <div id="moim-search-list">{content}</div>;
};

export default MoimList;
