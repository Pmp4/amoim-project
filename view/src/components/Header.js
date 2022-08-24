import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    return (
        <header>
            <div id='header-wrap'>
                <div className='menu'>
                    <p className='menu-btn'>
                        <div className='menu-btn-icon'>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        <span>MENU</span>
                    </p>
                </div>
                <h1 className='logo'>
                    <Link to='/test'>
                    {/* A-MOIM */}
                        {/* <img src={Logo} alt='logo'/> */}
                    </Link>
                </h1>
                <div className='account'>
                    <FontAwesomeIcon icon={faUser}/>
                </div>
            </div>
        </header>
    );
};

export default Header;