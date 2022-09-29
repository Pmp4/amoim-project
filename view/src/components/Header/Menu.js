import React from "react";
import { Link, useLocation } from 'react-router-dom';

const Menu = () => {
    const location = useLocation();

    return (
        <div className="menu-part">
            <ul>
                <li className={location.pathname === "/" ? "on" : ""}>
                    <Link to="/">아-모임</Link>
                    <div></div>
                </li>
                <li className={location.pathname === "/moim" ? "on" : ""}>
                    <Link to="/moim">내-모임</Link>
                    <div></div>
                </li>
                <li className={location.pathname === "/member/my" ? "on" : ""}>
                    <Link to="/member/my">마이페이지</Link>
                    <div></div>
                </li>
            </ul>
        </div>
    );
};

export default Menu;
