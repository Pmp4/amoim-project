import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    return (
        <header>
            <div id='header-wrap'>
                <div className='menu'>
                    <p className='menu-btn'>
                        <FontAwesomeIcon icon={faBars} />
                        MENU
                    </p>
                </div>
                <h1 className='logo'>
                    <Link to='/test'>
                    {/* A-MOIM */}
                        {/* <img src={Logo} alt='logo'/> */}
                    </Link>
                </h1>
            </div>
        </header>
    );
};

export default Header;