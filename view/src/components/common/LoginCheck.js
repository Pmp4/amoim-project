import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserInfoService from "../../api/member/UserInfoService";
import { LOGOUT_LOGGED } from "../../reducer/module/user";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginCheck = ({ children }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);

    useEffect(() => {
        if(Boolean(sessionStorage.getItem("logged"))) {
            UserInfoService.loggedCheck().then((response) => {
                if (!response.data.logged) {
                    console.log("1");
                    dispatch({ type: LOGOUT_LOGGED });
                    sessionStorage.clear();
                    navigate("/");
                    alert("로그인 후 이용해주세요.");
                }
            });
        }else {
            console.log("2");
            navigate("/");
            alert("로그인 후 이용해주세요.");
        }
    });

    return <div>{user.logged && children}</div>;
};

export default LoginCheck;
