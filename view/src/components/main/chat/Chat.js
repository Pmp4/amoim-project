import MeetingService from "api/meeting/MeetingService";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const Chat = ({ meetingNo }) => {
    const [members, setMembers] = useState([]);
    const [inputMsg, setInputMsg] = useState("");
    const [chatt, setChatt] = useState([]);
    const [chkLog, setChkLog] = useState(false);
    const [socketData, setSocketData] = useState();

    const profileImgPath = useSelector((state) => state.path.profileImagePath);

    const ws = useRef(null);
    const inputRef = useRef({});

    useEffect(() => {
        // memberSelectApi();
        webSocketLogin();
    }, []);
    





    const onInputActionEvent = event => {
        setInputMsg(event.target.value);
    }

    
    const webSocketLogin = useCallback(() => {
        ws.current = new WebSocket(
            `ws://localhost:8080/rest/v1/socket/chatt/${meetingNo}?token=${localStorage.getItem("X-AUTH-TOKEN")}`
            );

        ws.current.onmessage = (message) => {
            const dataSet = JSON.parse(message.data);
            setSocketData(dataSet);
        }
    });


    const send = useCallback(() => {
        if(inputMsg !== ''){
            const data = {
                date: new Date().toLocaleString(),
            };  //전송 데이터(JSON)

            const temp = JSON.stringify(data);
            
            if(ws.current.readyState === 0) {   //readyState는 웹 소켓 연결 상태를 나타냄
                ws.current.onopen = () => { //webSocket이 맺어지고 난 후, 실행
                    console.log(ws.current.readyState);
                    ws.current.send(temp);
                }
            }else {
                ws.current.send(temp);
            }
        }else {
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

    return (
        <div id="chatt-page" className="page-wrap">
            <div className="main-part">
                <div className="member-list">
                    <div className="title">대화하기</div>
                    <div className="member">{memberList()}</div>
                </div>
                <div className="chatt-box">
                    <div className="chatt-list-box">
                        <div className="other">
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
                        </div>
                    </div>
                    <div className="input-box">
                        <input 
                            name="text" 
                            value={inputMsg} 
                            ref={(element) => inputRef.current.msg = element }
                            onChange={(event) => onInputActionEvent(event)}
                        />
                        <button>+</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;
