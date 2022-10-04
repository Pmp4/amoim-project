import React, { useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';

const Menu = () => {
    const location = useLocation();

    // useEffect(() => {
    //     pathFind();
    // }, []); 

    const pathFind = (pathText) => {
        const path = location.pathname;
        let res = false;
    
        if(path.includes(pathText) 
            || path.includes(`${pathText}/`)) res = true;
        return res;
    }

    return (
        <div className="menu-part">
            <ul>
                <li className={location.pathname === '/' ? 'on' : ''}>
                    <Link to="/">아-모임</Link>
                    <div></div>
                </li>
                <li className={pathFind('/moim') ? 'on' : ''}>
                    <Link to="/moim">내-모임</Link>
                    <div></div>
                </li>
                <li className={pathFind('/member') ? location.pathname !== '/member/signup' ? 'on' : '' : ''}>
                    <Link to="/member/my">마이페이지</Link>
                    <div></div>
                </li>
            </ul>
        </div>
    );
};

export default Menu;
