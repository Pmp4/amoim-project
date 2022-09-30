import React from 'react';
import LoginCheck from '../common/LoginCheck';
import { useState } from 'react';



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
        </div>
    );
};

export default Home;