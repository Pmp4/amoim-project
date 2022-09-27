import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../images/logo-4.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Menu from "./Menu";
import Search from "./Search";
import { useDispatch, useSelector } from "react-redux";
import {LOGOUT_LOGGED} from '../../reducer/module/user';

const Header = ({ loginPopup }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const loginBtnAction = () => {
        if(user.logged) {
            if(window.confirm("로그아웃 하시겠습니까?")) {
                dispatch({
                    type: LOGOUT_LOGGED
                });
                alert(`${user.userInfo.name}님 로그아웃되었습니다.`);
                navigate("/");
            }
        }else {
            loginPopup("ON");
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
                    {user.logged ? <span>LOGOUT</span> : <span>LOGIN</span>}
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
