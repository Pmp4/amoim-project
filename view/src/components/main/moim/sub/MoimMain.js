import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faHeart } from "@fortawesome/free-solid-svg-icons";
import MoimItem from "./MoimItem";
import MeetingService from "api/meeting/MeetingService";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { MODAL_OPEN } from "reducer/module/modal";
import MoimList from './MoimList';
import InterestService from 'api/interest/InterestService';
import MoimSlider from './MoimSlider';
import axios from '../../../../api/httpCommon';

const MoimMain = () => {
    const [meetingContents, setMeetingContents] = useState([]);
    const [userInterests, setUserInterests] = useState([]);
    const [currentInterest, setCurrentInterest] = useState("");
    const [interestContents, setInterestContents] = useState([]);

    const [signingList, setSigningList] = useState([]);
    const [pageInfo, setPageInfo] = useState({
        blockSize: 8,
        currentPage: 1,
        lastPage: 0,
        pageSize: 0,
        startPage: 0,
        startRecord: 0,
        totalPage: 0,
        totalRecord: 0,
    });
    const [editState, setEditState] = useState(false);
    const [fixedOn, setFixedOn] = useState(false);

    const location = useLocation();

    const user = useSelector((state) => state.user);
    const modal = useSelector((state) => state.modal);

    const dispatch = useDispatch();

    useEffect(() => {
        async function initialFunc() {
            const a = await MeetingService.moimOwnList();
            const b = await MeetingService.moimSubscript(1);
            const c = await InterestService.selectUserInterest();

            setMeetingContents(a.data.list);

            setSigningList(b.data.list);
            setPageInfo(b.data.pageInfo);

            setUserInterests(c.data);
            setCurrentInterest(c.data[0].CATEGORY_CODE);
            interestUserSelectApi(c.data[0].CATEGORY_CODE);
        }

        initialFunc();

    }, []);



    const myAddMeetingData = async() => {
        // MeetingService.selectByCard("USER_NO", "").then((response) => {
        //     const { status, data } = response;
        //     console.log(response);
        //     if (status === 200) {
        //         setMeetingContents(data.list);
        //         setPageInfo(data.pageInfo);
        //     } else {
        //         alert("서버 ERROR");
        //     }
        // });

        const response = await MeetingService.moimOwnList();
        setMeetingContents(response.data.list);
    };

    //가입 신청 리스트 확인
    //가입 신청 리스트 확인
    //가입 신청 리스트 확인
    const subscribeListBtnAction = () => {
        dispatch({ type: MODAL_OPEN, data: "moim-subscribe-list" });
    };



    //접속중인 유저가 가입한 모임 리스트 항목 API
    //접속중인 유저가 가입한 모임 리스트 항목 API
    //접속중인 유저가 가입한 모임 리스트 항목 API
    const signingUpList = async (page) => {
        // MeetingService.signingList(1).then(response => {
        //     const {status, data} = response;

        //     if(status === 200) {
        //         setSigningList(data.list);
        //     }else {
        //         alert("Server Error");
        //     }
        // })

        const response = await MeetingService.moimSubscript(page);
        
        setSigningList(response.data.list);
        setPageInfo(response.data.pageInfo);
    }



    const editButtonAction = () => {
        setEditState(!editState);
        setFixedOn(true);
    }







    // 해당 유저의 관심사 목록
    // 해당 유저의 관심사 목록
    // 해당 유저의 관심사 목록
    const userInterestApi = async() => {
        const response = await InterestService.selectUserInterest();
        setUserInterests(response.data);
        setCurrentInterest(response.data[0].CATEGORY_CODE);
        interestUserSelectApi(response.data[0].CATEGORY_CODE);
    }


    const interestComp = userInterests.map((item, idx) => (
        <div className={
                currentInterest === item.CATEGORY_CODE ? 
                    "item on" : 'item'
            } 
            key={item.NO}
            onClick={() => interestButtonAction(item.CATEGORY_CODE)}
        >
            {item.NAME}
        </div>
    ))

    const interestButtonAction = (code) => {
        setCurrentInterest(code);
        interestUserSelectApi(code);
    }


    const interestUserSelectApi = async(code) => {
        // MeetingService.selectByCard("BCODE", code).then((response) => {
        //     const { status, data } = response;

        //     if (status === 200) {
        //         setLocMoim(data.list);
        //     } else {
        //         alert("서버 ERROR");
        //     }
        // });

        const response = await MeetingService.userInterestMoim(code);
        setInterestContents(response.data);
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
                {fixedOn && 
                    <div className={editState ? "fixed-on on" : "fixed-on off"}></div>
                }
                <div className="add-moim-part">
                    <div className="moim-sub">
                        <div id="moim-item" className="draggable">
                            {meetingContents.map((item, idx) => {
                                if (meetingContents.length === 0) return "";

                                return <MoimItem item={item} key={idx} editState={editState}/>;
                            })}
                            {!editState &&
                                meetingContents.length < 4 ? (
                                    <div className="add-btn">
                                        <Link to={`${location.pathname}/add`}>
                                            +
                                        </Link>
                                    </div>
                                ) : (
                                    ""
                                )
                            }
{/* 
                            {meetingContents.length < 4 ? (
                                <div className="add-btn">
                                    <Link to={`${location.pathname}/add`}>
                                        +
                                    </Link>
                                </div>
                            ) : (
                                ""
                            )} */}
                        </div>
                    </div>
                    {meetingContents.length > 0 && (
                        <div className="btn-wrap">
                            <button 
                                className={editState ? "moim-edit-btn on" : "moim-edit-btn"}
                                onClick={editButtonAction}
                            >
                                {editState ? "취소" : "수정"}
                            </button>
                            {!editState && 
                                <button
                                    className="moim-confirm-btn"
                                    onClick={() => subscribeListBtnAction()}
                                >
                                    가입 신청 확인
                                </button>
                            }
                            
                        </div>
                    )}
                </div>
                <div className="sub-title">
                    <h4>함께하는 모임</h4>
                    <MoimList items={signingList} pageInfo={pageInfo} pageBtn={signingUpList}/>
                </div>

                <div className="sub-title">
                    <h4>관심 카테고리의 추천</h4>
                    {/* <MoimList items={signingList} pageInfo={pageInfo} pageBtn={signingUpList}/> */}
                    <div className='interest-part'>
                        <div className='interest-moim-part'>
                            <MoimSlider meeting={interestContents}/>
                        </div>
                        <div className='interest-list'>
                            {interestComp}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MoimMain;
