import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faHeart } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import MeetingService from 'api/meeting/MeetingService';

const MoimItem = (props) => {
    // console.log(props);
    const { item, idx, editState } = props;

    const tagArr = item.TAGS.replace(/\[|\]|"| /g, "").split(",");
    const location = useLocation();
    const navigate = useNavigate();


    const removeButtonAction = (no) => {
        if(window.confirm("삭제하시겠습니까?")) {
            removeApi(no);
        }
    }

    const removeApi = async(no) => {
        const response = await MeetingService.deleteMeeting(no);
        navigate("/moim");
    }


    return (
        <div className="item" 
            key={item.NO} 
        >
            {editState && 
                <div className='delete-button' 
                    onClick={() => removeButtonAction(item.NO)}
                >
                    <span></span>
                </div>
            }
            <div className="image"
                onClick={
                    () => {
                        editState ? navigate(`/moim/edit/${item.NO}`) : 
                            navigate(`/moim/view/${item.NO}`)
                    }
                }
            >
                <img
                    src={`http://localhost:8080/rest/v1/images/${item.IMAGE_NAME}`}
                    alt="이미지"
                    loading='lazy'
                />
            </div>
            <div className="exp-part">
                <div className="title">
                    <span>{item.TITLE}</span>
                </div>
                <div className="exp">
                    <div className="left">
                        <div className="items">
                            <span className="person-number">
                                인원 {item.PERSON_COUNT}/{item.PERSON_NUMBER}
                            </span>
                            <span className="loc">
                                <FontAwesomeIcon icon={faLocationDot} />
                                &nbsp;{item.SIGUNGU}
                            </span>
                            <span className="category">
                                {item.CATEGORY_PARENT} &gt; {item.CATEGORY_NAME}
                            </span>
                        </div>
                        <div className="tags">
                            <span>
                                {tagArr.map((item, idx) => {
                                    if (idx === 0) return "#" + item;
                                    else return " #" + item;
                                })}
                            </span>
                        </div>
                    </div>
                    <div className="right">
                        <div className="like">
                            <FontAwesomeIcon icon={faHeart} />
                        </div>
                        <p>{item.LIKE_COUNT}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MoimItem;
