import MeetingService from "api/meeting/MeetingService";
import React from "react";
import { useParams } from "react-router";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faHeart } from "@fortawesome/free-solid-svg-icons";

// const initialContents = {

// NO
// :
// 13
// MEETING_NO
// :
// 13
// CATEGORY_CODE
// :
// "60010200"
// IMAGE_NAME
// :
// "스크린샷 2022-08-31 오전 1.40.39_20221009195936603.png"
// ZONECODE
// :
// ""
// SIDO
// :
// "서울"
// REGDATE
// :
// "2022-10-09T19:59:36.000+00:00"
// DEL_FLAG
// :
// "N"
// BNAME
// :
// "서초동"
// PLACE_NAME
// :
// "힙합클럽NB"
// BCODE
// :
// "1165010800"
// LIKE_COUNT
// :
// 0
// USER_NO
// :
// 21
// CATEGORY_PARENT_NAME
// :
// "음악/악기"
// ADDRESS_NO
// :
// 7
// ROAD_ADDRESS
// :
// ""
// ADDRESS
// :
// "서울 서초구 서초동 1308-4"
// TITLE
// :
// "미노이와 함께하는 히팝 교실"
// CONTENT
// :
// "안녕\n나랑 히팝 할 사람"
// CATEGORY_NAME
// :
// "랩/힙합/DJ"
// JIBUN_ADDRESS
// :
// "서울 서초구 서초동 1308-4"
// CATEGORY_PARENT
// :
// "60000000"
// TAGS
// :
// "[\"힙합\", \"미노이\", \"연예인\"]"
// SIGUNGU
// :
// "서초구"
// new entry
// :
// }

const MoimView = () => {
    const [contents, setContents] = useState({});
    const [members, setMembers] = useState([]);

    const imgPath = useSelector((state) => state.path.imagePath);
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    const param = useParams();
    const meetingNo = param.meetingNo;

    useEffect(() => {
        selectViewApi();
    }, []);

    const selectViewApi = () => {
        MeetingService.selectByNo(meetingNo).then((response) => {
            const { status, data } = response;
            if (status === 200) {
                const { SUCCESS, rest } = data;
                if (SUCCESS) {
                    setContents(rest.CONTENTS);
                    setMembers(rest.MEMBERS);
                    console.log(rest);
                } else {
                    alert("잘못된 모임 정보입니다.");
                    navigate(-1);
                }
            } else {
                alert("Server DB Error");
            }
        });
    };


    const membershipBtn = () => {
        if(members.length > 0) {
            let check = true;
            for(let i = 0; i < members.length; i++) {
                if(members[i].USER_NO === user.userInfo.no) check = false;
            }

            if(!check) return (
                <div className='membership-button-wrap'>
                    <button>
                        가입 신청하기
                    </button>
                </div>
            )
        }
    }

    

    return (
        <div id="view-page">
            <div className="page-wrap">
                <div className="left">
                    <div className="img-box">
                        {Object.keys(contents).length !== 0 && (
                            <img
                                src={`${imgPath}${contents.IMAGE_NAME}`}
                                alt={contents.TITLE}
                            />
                        )}
                    </div>
                </div>
                <div className="right">
                    <div className="title-sub">
                        <div className="left">
                            <h3>{contents.TITLE}</h3>
                            <div className="sub-exp">
                                <div className="tags-wrap">
                                    <div className="tags box">
                                        {Object.keys(contents).length !== 0 &&
                                            contents.TAGS.replace(
                                                /\[|\]|"| /g,
                                                ""
                                            )
                                                .split(",")
                                                .map((item, idx) => {
                                                    if (idx === 0)
                                                        return (
                                                            <span
                                                                key={idx + 101}
                                                            >
                                                                #{item}
                                                            </span>
                                                        );
                                                    else
                                                        return (
                                                            <span
                                                                key={idx + 101}
                                                            >
                                                                {" "}
                                                                #{item}
                                                            </span>
                                                        );
                                                })}
                                    </div>
                                </div>
                                <div className="sub-wrap">
                                    <div className="loc box">
                                        <FontAwesomeIcon icon={faLocationDot} />
                                        &nbsp;
                                        {contents.PLACE_NAME !== undefined
                                            ? contents.PLACE_NAME
                                            : contents.JIBUN_ADDRESS}
                                    </div>
                                    <div className="category box">
                                        {contents.CATEGORY_PARENT_NAME} &gt;{" "}
                                        {contents.CATEGORY_NAME}
                                    </div>
                                    <div className="person-number box">
                                        인원 {contents.PERSON_COUNT}/
                                        {contents.PERSON_NUMBER}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="right">
                            <div className='like-btn draggable'>
                                <div className="like">
                                    <FontAwesomeIcon icon={faHeart} />
                                </div>
                                <p>{contents.LIKE_COUNT}</p>
                            </div>
                        </div>
                    </div>
                    <div className="content">{contents.CONTENT}</div>
                    {membershipBtn()}
                </div>
            </div>
        </div>
    );
};

export default MoimView;
