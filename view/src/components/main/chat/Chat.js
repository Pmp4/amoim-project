import ChatService from "api/chat/ChatService";
import MeetingService from "api/meeting/MeetingService";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const Chat = ({ webSocket, meetingNo }) => {
    const [members, setMembers] = useState([]);
    const [inputMsg, setInputMsg] = useState("");
    const [socketData, setSocketData] = useState(null);
    const [chatt, setChatt] = useState([]);

    const profileImgPath = useSelector((state) => state.path.profileImagePath);
    const user = useSelector((state) => state.user);

    // const ws = useRef(null);
    const inputRef = useRef({});
    const listRef = useRef(null);

    // 새로고침 시, webSocket의 session을 초기화해줘야함
    // 새로고침 시, webSocket의 session을 초기화해줘야함
    // 새로고침 시, webSocket의 session을 초기화해줘야함
    window.addEventListener("beforeunload", (event) => {
        webSocket.current.close();
    });

    useEffect(() => {
        memberSelectApi();
        webSocketLogin();
        // console.log(chatt);
    }, []);

    useEffect(() => {
        if (socketData !== null) {
            setChatt(chatt.concat(socketData));
        }
    }, [socketData]);


    useEffect(() => {
        listRef.current.scrollTop += listRef.current.childNodes[0].offsetHeight;
    }, [chatt]) 






    const msgBoxComp = chatt.map((item, idx) => {
        if (chatt === null) return "";
        const date = item.date.substr(item.date.lastIndexOf(".") + 2);

        let profileImg;
        let username;
        let userid;
        for (let i = 0; i < members.length; i++) {
            if (members[i].USER_NO === parseInt(item.userno)) {
                profileImg = members[i].PROFILE_IMAGE;
                username = members[i].NAME;
                userid = members[i].USER_ID;
                break;
            }
        }

        if (parseInt(item.userno) !== parseInt(user.userInfo.no)) {
            return (
                <div className="other" key={idx}>
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
                            {item.msg}
                            <div className="date">{date}</div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="one" key={idx}>
                    <div className="text-box">
                        <div className="date">{date}</div>
                        {item.msg}
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
                `ws://localhost:8080/rest/v1/socket/chatt/${meetingNo}`
            );
        }

        webSocket.current.onmessage = (message) => {
            console.log("수신!");
            const data = JSON.parse(message.data);
            setSocketData(data);
        };
    };

    const send = () => {
        if (inputMsg !== "") {
            const data = {
                date: new Date().toLocaleString(),
                msg: inputMsg,
                userno: user.userInfo.no,
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
