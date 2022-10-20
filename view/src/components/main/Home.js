import React from 'react';
import LoginCheck from '../common/LoginCheck';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faStar } from '@fortawesome/free-solid-svg-icons';
import { Slider } from 'react-slick';
import MoimSlider from './moim/sub/MoimSlider';



const Home = () => {
    
    return (
        <div id='home-page'>
            <div className='title-wrap'>
                <h2>
                    안녕하세요.<br/>
                    <p className='mt_md'>
                        사람들의 모임서비스 <br/>
                        <span>A-MOIM</span> 입니다.
                    </p>
                </h2>
            </div>
            <div className='moim-contents-part page-wrap'>
                <div className='loc-part'>
                    <div className='title'>
                        <h3><span className='loc'><FontAwesomeIcon icon={faLocationDot}/> 서울</span> 근처 인기항목</h3>
                    </div>
                    <MoimSlider/>
                </div>
            </div>
            <div className='moim-contents-part page-wrap'>
                <div className='loc-part'>
                    <div className='title'>
                        <h3><span className='cat'><FontAwesomeIcon icon={faStar}/></span> 카테고리 별</h3>
                    </div>
                </div>
                <div className='category-list'>
                    
                </div>
            </div>
        </div>
    );
};

export default Home;