import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSelector } from "react-redux";
import { faHeart, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

const MoimList = ({ items }) => {
    const imgPath = useSelector((state) => state.path.imagePath);
    const navigate = useNavigate();

    if (items.length === 0) return;

    const content = items.map((item, idx) => {
        const tagArr = item.TAGS.replace(/\[|\]|"| /g, "").split(",");

        return (
            <div className="item" key={item.NO} onClick={() => navigate(`/moim/view/${item.NO}`)}>
                <div className="left">
                    <div className="thumbnail">
                        <img
                            src={imgPath + item.IMAGE_NAME}
                            alt={item.TITLE + " 이미지"}
                        />
                    </div>
                    <div className="exp">
                        <p>{item.TITLE}</p>
                        <div className="sub-exp">
                            <span className="person">
                                인원 {item.PERSON_COUNT}/{item.PERSON_NUMBER}
                            </span>
                            <span className="loc">
                                <FontAwesomeIcon icon={faLocationDot} /> 위치
                            </span>
                            <span className="cat">
                                {item.CATEGORY_PARENT} &gt; {item.CATEGORY_NAME}
                            </span>
                            <span className="tag">
                                {tagArr.map((item, idx) => {
                                    if (idx === 0) return "#" + item;

                                    return " #" + item;
                                })}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="right">
                    <FontAwesomeIcon icon={faHeart} />
                </div>
            </div>
        );
    });

    return <div id="moim-search-list">{content}</div>;
};

export default MoimList;
