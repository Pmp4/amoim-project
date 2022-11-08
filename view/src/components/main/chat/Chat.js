import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpLong } from '@fortawesome/free-solid-svg-icons';
import ChatService from "api/chat/ChatService";
import MeetingService from "api/meeting/MeetingService";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const Chat = ({ webSocket, meetingNo }) => {
    const [members, setMembers] = useState([]);
    const [inputMsg, setInputMsg] = useState("");           
    const [socketData, setSocketData] = useState(null);     //소켓 데이터를 바로 채팅 데이터로 못쓰기 때문에 따로 보관
    const [chatt, setChatt] = useState([]);                 //채팅 데이터 저장
    const [msgState, setMsgState] = useState(true);
    const [topNo, setTopNo] = useState(0);

    const profileImgPath = useSelector((state) => state.path.profileImagePath);
    const user = useSelector((state) => state.user);

    // const ws = useRef(null);
    const inputRef = useRef({});
    const listRef = useRef(null);
    const chatRef = useRef({});

    // 새로고침 시, webSocket의 session을 초기화해줘야함
    // 새로고침 시, webSocket의 session을 초기화해줘야함
    // 새로고침 시, webSocket의 session을 초기화해줘야함
    window.addEventListener("beforeunload", (event) => {
        webSocket.current.close();
    });

    useEffect(() => {
        memberSelectApi();
        webSocketLogin();
        chatHistory();
        // console.log(chatt);
    }, []);

    useEffect(() => {
        if (socketData !== null) {
            setChatt(chatt.concat(socketData));
        }
    }, [socketData]);


    useEffect(() => {
        if(chatt.length > 0) {
            if(msgState) {
                listRef.current.scrollTop += listRef.current.childNodes[0].offsetHeight;
                setMsgState(false);
            }else {
                listRef.current.scrollTop += 
                    chatRef.current[topNo].offsetTop - document.querySelector(".pulling").offsetHeight;
            }
        }
    }, [chatt]) 






    const msgBoxComp = chatt.map((item, idx) => {
        if (chatt === null) return "";
        const dbDate = new Date(item.regdate);
        const date = dbDate.toLocaleString().substr(dbDate.toLocaleString().lastIndexOf(".") + 2);

        let profileImg;
        let username;
        let userid;
        for (let i = 0; i < members.length; i++) {
            if (members[i].USER_NO === parseInt(item.userNo)) {
                profileImg = members[i].PROFILE_IMAGE;
                username = members[i].NAME;
                userid = members[i].USER_ID;
                break;
            }
        }

        if (parseInt(item.userNo) !== parseInt(user.userInfo.no)) {
            return (
                <div className="other" 
                    key={idx} 
                    ref={element => chatRef.current[item.no] = element}
                >
                    <div className="profile-img">
                        <img
                            src={profileImgPath + profileImg}
                            alt={username + "의 프로필 이미지"}
                        />
                    </div>
                    <div className="right">
                        <div className="info">
                            {username} <span>{userid}</span>
                        </div>
                        <div className="text-box">
                            {item.message}
                            <div className="date">{date}</div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="one" 
                    key={idx}
                    ref={element => chatRef.current[item.no] = element}
                >
                    <div className="text-box">
                        <div className="date">{date}</div>
                        {item.message}
                    </div>
                </div>
            );
        }
    });

    const onInputActionEvent = (event) => {
        setInputMsg(event.target.value);
    };

    const webSocketLogin = () => {
        // console.log(webSocket.current);
        if (webSocket.current === null) {
            webSocket.current = new WebSocket(
                `ws://p-mp4.iptime.org:8080/rest/v1/socket/chatt/${meetingNo}`
            );
        }

        webSocket.current.onmessage = (message) => {
            console.log("수신!");
            const data = JSON.parse(message.data);
            setMsgState(true);
            setSocketData(data);
        };
    };

    const send = () => {
        if (inputMsg !== "") {
            const data = {
                regdate: new Date().toString().replace(" (한국 표준시)", ""),
                message: inputMsg,
                userNo: user.userInfo.no,
            }; //전송 데이터(JSON)

            const temp = JSON.stringify(data);

            const promise = chatRegistrationApi({
                meetingNo,
                userNo: user.userInfo.no,
                message: inputMsg,
            });

            promise.then((res) => {
                if (res) {
                    if (webSocket.current.readyState === 0) {
                        //readyState는 웹 소켓 연결 상태를 나타냄
                        webSocket.current.onopen = () => {
                            //webSocket이 맺어지고 난 후, 실행
                            webSocket.current.send(temp);
                        };
                    } else {
                        webSocket.current.send(temp);
                    }
                }
            });
        } else {
            alert("메세지를 입력하세요.");
            inputRef.current.msg.focus();
            return;
        }
        setInputMsg("");
    };

    //멤버 조회 api
    //멤버 조회 api
    //멤버 조회 api
    const memberSelectApi = async () => {
        const response = await MeetingService.moimMemberSelect(meetingNo);
        setMembers(response.data);
    };

    const memberList = () =>
        members.map((item, idx) => {
            if (members.length === 0) return "";

            return (
                <div className="item" key={8000 + idx}>
                    <div className="profile-img">
                        <img
                            src={profileImgPath + item.PROFILE_IMAGE}
                            alt={item.NAME + "의 프로필 이미지"}
                        />
                    </div>
                    <div className="profile-exp">
                        <p>{item.NAME}</p>
                        <span>{item.INTRO}</span>
                    </div>
                    {/* <div className="state"></div> */}
                </div>
            );
        });

    // 채팅 서버에 등록 api
    // 채팅 서버에 등록 api
    // 채팅 서버에 등록 api
    const chatRegistrationApi = async (rest) => {
        const response = await ChatService.registractionChat(rest);
        if (response.data > 0) {
            return true;
        } else {
            alert("채팅 오류");
            return false;
        }
    };


    // 채팅 기록 조회 api
    // 채팅 기록 조회 api
    // 채팅 기록 조회 api
    const chatHistory = async(no = null) => {
        const response = await ChatService.chatHistory(meetingNo, no);
        const tempChat = [...response.data];
        tempChat.push(...chatt);
        // console.log(response.data);
        // console.log(tempChat);

        setChatt([...tempChat]);
    }




    // 이전 내용 불러오기 버튼
    // 이전 내용 불러오기 버튼
    // 이전 내용 불러오기 버튼
    const pullingActionEvent = () => {
        // console.log(chatt[0].no);
        setTopNo(chatt[0].no);
        chatHistory(chatt[0].no);
    }







    const onKeyDown = (event) => {
        if (event.keyCode === 13) {
            send();
        }
    };

    return (
        <div id="chatt-page" className="page-wrap">
            <div className="main-part">
                <div className="member-list">
                    <div className="title">대화하기</div>
                    <div className="member">{memberList()}</div>
                </div>
                <div className="chatt-box">
                    <div className="chatt-list-wrap" 
                        ref={element => listRef.current = element}
                    >
                        {/* <div className="other">
                            <div className="profile-img">
                                <img
                                    src={profileImgPath + "default_profile.png"}
                                    alt={"의 프로필 이미지"}
                                />
                            </div>
                            <div className="text-box">
                                테스트 대화입니다람쥐
                            </div>
                        </div>
                        <div className="one">
                            <div className="text-box">테스트 대화입니다.</div>
                        </div> */}
                        <div className='list'>
                            <button className='pulling' onClick={pullingActionEvent}>
                                <FontAwesomeIcon icon={faArrowUpLong}/>
                            </button>
                            {msgBoxComp}
                        </div>
                    </div>
                    <div className="input-box">
                        <input
                            name="text"
                            value={inputMsg}
                            ref={(element) => (inputRef.current.msg = element)}
                            onChange={(event) => onInputActionEvent(event)}
                            onKeyDown={onKeyDown}
                        />
                        <button onClick={() => send()}>+</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;
