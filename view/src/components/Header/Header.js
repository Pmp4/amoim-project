import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../images/logo-4.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Menu from "./Menu";
import Search from "./Search";
import { useDispatch, useSelector } from "react-redux";
import {LOGOUT_LOGGED} from '../../reducer/module/user';
import UserInfoService from 'api/member/UserInfoService';
import { MODAL_OPEN } from 'reducer/module/modal';

const Header = ({ loginPopup }) => {
    const navigate = useNavigate();

    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const logged = Boolean(localStorage.getItem("logged"));

    const loginBtnAction = () => {
        if(logged) {
            if(window.confirm("로그아웃 하시겠습니까?")) {
                UserInfoService.logout()
                    .then((response) => {
                        if(response.data.SUCCESS) {
                            dispatch({
                                type: LOGOUT_LOGGED
                            });
                            localStorage.clear();
                            alert(`${user.userInfo.name}님 로그아웃되었습니다.`);
                            navigate("/");
                        }
                    });
            }
        }else {
            // loginPopup("ON");
            dispatch({type: MODAL_OPEN, data: "login"})
        }
    }

    return (
        <header>
            <div id="header-wrap">
                <h1 className="logo">
                    <Link to="/">
                        <img src={Logo} alt="logo" />
                    </Link>
                </h1>
                <Menu />


                <div className="account" onClick={loginBtnAction}>
                    {logged ? <span>LOGOUT</span> : <span>LOGIN</span>}
                </div>

                {/* <div className='menu'>
                    <div className='menu-btn'>
                        <div className='menu-btn-icon'>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        <span>MENU</span>
                    </div>
                </div>
                <h1 className='logo'>
                    <Link to='/'>
                        <img src={Logo} alt='logo'/>
                    </Link>
                </h1>
                <div className='account' onClick={() => loginPopup("ON")}>
                    <span>LOGIN</span>
                    <FontAwesomeIcon icon={faUser}/>
                </div> */}
            </div>
            {/* <Search/> */}
            {/* <button>TEST</button> */}
        </header>
    );
};

export default Header;
