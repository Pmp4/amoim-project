import MeetingService from "api/meeting/MeetingService";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const Chat = ({ webSocket, meetingNo }) => {
    const [members, setMembers] = useState([]);
    const [inputMsg, setInputMsg] = useState("");
    const [socketData, setSocketData] = useState([]);

    const profileImgPath = useSelector((state) => state.path.profileImagePath);
    const user = useSelector((state) => state.user);

    // const ws = useRef(null);
    const inputRef = useRef({});

    useEffect(() => {
        memberSelectApi();
        webSocketLogin();
    }, []);

    const msgBoxComp = socketData.map((item, idx) => {

        let profileImg;
        let username;
        let userid;
        for(let i = 0; i < members.length; i++) {
            if(members[i].USER_NO === parseInt(item.userno)) {
                profileImg = members[i].PROFILE_IMAGE;
                username = members[i].NAME;
                userid = members[i].USER_ID;
                break;
            }
        }

        // const profileImg
        if(item.socket) {
            return (
                <div className="other" key={idx}>
                    <div className="profile-img">
                        <img
                            src={profileImgPath + profileImg}
                            alt={username + "의 프로필 이미지"}
                        />
                    </div>
                    <div className="text-box">{item.msg}</div>
                    <div className="">{username + " ("+ userid + ")"}</div>
                </div>
            )
        }else {
            return (
                <div className="one" key={idx}>
                    <div className="text-box">{item.msg}</div>
                </div>
            )
        }
        
    });

    const onInputActionEvent = (event) => {
        setInputMsg(event.target.value);
    };

    const webSocketLogin = useCallback(() => {
        webSocket.current = new WebSocket(
            `ws://localhost:8080/rest/v1/socket/chatt/${meetingNo}/${user.userInfo.no}`
        );

        webSocket.current.onmessage = (message) => {
            setSocketData(socketData.concat({...JSON.parse(message.data)}));
        };
    });

    const send = useCallback(() => {
        if (inputMsg !== "") {
            const data = {
                date: new Date().toLocaleString(),
                msg: inputMsg,
                userno: user.userInfo.no,
            }; //전송 데이터(JSON)

            const temp = JSON.stringify(data);

            if (webSocket.current.readyState === 0) {
                //readyState는 웹 소켓 연결 상태를 나타냄
                webSocket.current.onopen = () => {
                    //webSocket이 맺어지고 난 후, 실행
                    webSocket.current.send(temp);
                };
            } else {
                webSocket.current.send(temp);
            }


            setSocketData(socketData.concat(data));
        } else {
            alert("메세지를 입력하세요.");
            inputRef.current.msg.focus();
            return;
        }

        setInputMsg("");
    });

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
                    <div className="state"></div>
                </div>
            );
        });





    const onKeyDown = (event) => {
        if(event.keyCode === 13) {
            send();
        }
    }

    return (
        <div id="chatt-page" className="page-wrap">
            <div className="main-part">
                <div className="member-list">
                    <div className="title">대화하기</div>
                    <div className="member">{memberList()}</div>
                </div>
                <div className="chatt-box">
                    <div className="chatt-list-box">
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
                        {msgBoxComp}
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
