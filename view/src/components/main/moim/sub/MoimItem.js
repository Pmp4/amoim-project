import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faHeart } from "@fortawesome/free-solid-svg-icons";

const MoimItem = (props) => {
    console.log(props);
    const {item, idx} = props;
    const tagArr = item.TAGS.replace(/\[|\]|"| /g,"").split(",");

    return (
        <div id="moim-item" key={item.NO}>
            <div className="item">
                <div className="image">
                    <img src={`http://localhost:8080/rest/v1/images/${item.IMAGE_NAME}`} alt="이미지" />
                </div>
                <div className="exp-part">
                    <div className="left">
                        <div className="title">
                            <span>{item.TITLE}</span>
                        </div>
                        <div className="exp">
                            <div className="items">
                                <span className="person-number">인원 {item.PERSON_COUNT}/{item.PERSON_NUMBER}</span>
                                <span className="loc">
                                    <FontAwesomeIcon icon={faLocationDot} />
                                    &nbsp;{item.SIGUNGU}
                                </span>
                                <span className="category">{item.CATEGORY_NAME} &gt; {item.CATEGORY_PARENT}</span>
                            </div>
                            <div className="tags">
                                <span>{tagArr.map((item, idx) => {
                                    if(idx === 0) return ("#" + item);
                                    else return (" #" + item)
                                })}</span>
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
