import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../images/logo-3.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';

const Header = ({loginPopup}) => {

    return (
        <header>
            <div id='header-wrap'>
                <div className='menu'>
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
                </div>
            </div>
            {/* <button>TEST</button> */}
        </header>
    );
};

export default Header;