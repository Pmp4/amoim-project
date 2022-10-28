import React, { useCallback, useRef, useState } from "react";
import { Link } from "react-router-dom";
import UserInfoService from "api/member/UserInfoService";
import { useDispatch } from "react-redux";
import { SUCCESS_LOGGED } from "reducer/module/user";

const initialInfo = {
    userId: "",
    password: "",
};

const Login = ({ modalClose }) => {
    const [loginInfo, setLoginInfo] = useState({ ...initialInfo });
    const inputRef = useRef({});

    const dispatch = useDispatch();

    const { userId, password } = loginInfo;

    //input 상태감지
    //input 상태감지
    //input 상태감지
    const infoChange = useCallback((target) => {
        const { name, value } = target;
        setLoginInfo({ ...loginInfo, [name]: value });
    });

    //enter 감지
    //enter 감지
    //enter 감지
    const infoKeyEvent = useCallback((event) => {
        const { name } = event.target;

        if (event.keyCode === 13) {
            if (name === "userId") {
                inputRef.password.focus();
            } else if (name === "password") {
            }
        }
    });

    //로그인 유효성 검사
    //로그인 유효성 검사
    //로그인 유효성 검사
    const loginInfoCheck = useCallback(() => {
        if (userId === "") {
            alert(`아이디를 입력하세요.`);
            inputRef.userId.focus();
            return;
        } else if (password === "") {
            alert(`비밀번호를 입력하세요.`);
            inputRef.password.focus();
            return;
        }

        // UserInfoService.loginUser(userId, password)
        //     .then(response => {
        //         const {successText: msg, SUCCESS, userVo: userInfo} = response.data;
        //         if(SUCCESS) {
        //             console.log(userInfo);
        //             dispatch({
        //                 type: SUCCESS_LOGGED,
        //                 data: {
        //                     id: userInfo.userId,
        //                     no: userInfo.userNo,
        //                     name: userInfo.name
        //                 }});
        //             sessionStorage.setItem("logged", true);
        //             modalClose();
        //         }

        //         alert(msg);
        //     });

        UserInfoService.loginUser(userId, password).then((response) => {
            const { status, data } = response;
            console.log(response);
            if (status === 200) {
                dispatch({type: SUCCESS_LOGGED});
                localStorage.setItem("logged", true);
                localStorage.setItem("X-AUTH-TOKEN", data.token);
                modalClose();
            }
        });
    });

    //회원가입 버튼 클릭
    //회원가입 버튼 클릭
    //회원가입 버튼 클릭
    const signupBtn = () => modalClose();

    return (
        <div className="login popup">
            <h2 className="title">로그인</h2>
            <div className="login-input mt_xl">
                <label name="userId">
                    <p>아이디</p>
                    <input
                        ref={(element) => (inputRef.userId = element)}
                        type="text"
                        name="userId"
                        defaultValue={userId}
                        placeholder="아이디를 입력해주세요."
                        onKeyUp={(event) => infoKeyEvent(event)}
                        onChange={(event) => infoChange(event.target)}
                    />
                </label>
                <label name="password">
                    <p className="mt_sm">비밀번호</p>
                    <input
                        ref={(element) => (inputRef.password = element)}
                        type="password"
                        name="password"
                        defaultValue={password}
                        placeholder="비밀번호를 입력해주세요."
                        onChange={(event) => infoChange(event.target)}
                    />
                </label>
            </div>
            <div className="login-sub mt_md clearfix">
                <label>
                    <input type="checkbox" />
                    <p>아이디 저장</p>
                </label>

                <div className="account">
                    <Link to="">아이디 찾기</Link>
                    &nbsp;|&nbsp;
                    <Link to="">비밀번호 찾기</Link>
                </div>
            </div>
            <div className="login-btn mt_md">
                <button onClick={loginInfoCheck}>로그인</button>
                <Link to="/member/signup" onClick={signupBtn}>
                    회원가입
                </Link>
            </div>
        </div>
    );
};

export default Login;
