import React from 'react';
import LoginCheck from '../common/LoginCheck';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faStar } from '@fortawesome/free-solid-svg-icons';
import { Slider } from 'react-slick';
import MoimSlider from './moim/sub/MoimSlider';
import { useEffect } from 'react';
import MeetingService from 'api/meeting/MeetingService';
import MoimList from './moim/sub/MoimList';
import InterestService from 'api/interest/InterestService';



const Home = () => {
    const [locMeeting, setLocMeeting] = useState([]);
    const [category, setCategory] = useState([]);
    const [categoryState, setCategoryState] = useState(0);

    useEffect(() => {
        locAPI();
        categoryAPI();
    }, []);
    

    const locAPI = () => {
        MeetingService.selectByCard("BCODE", '11').then(response => {
            const {status, data} = response;

            if(status === 200) {
                setLocMeeting(data);
            }else {
                alert("서버 ERROR");
            }
        });
    }

    const categoryAPI = () => {
        InterestService.selectCategory("").then(response => {
            if (response.data.SUCCESS) {
                if(response.data.type) {
                    setCategory(response.data.list);
                    firstCategorySet(response.data.list);
                }
            }
        })
    }

    const categorySelectActionAPI = (code) => {
        MeetingService.selectByCard("CATEGORY_CODE", code).then(response => {

        });
    }


    const firstCategorySet = (list) => {
        if(list.length === 0) return;

        setCategoryState(parseInt(list[0].categoryCode));
    }


    const setCategoryComp = category.map((item, idx) => {
        if(category.length === 0) return "";

        return (
            <div 
                className={categoryState === parseInt(item.categoryCode) ? 
                    'item on' : 'item'
                } 
                onClick={() => categoryBtnAction(parseInt(item.categoryCode))}
                key={item.categoryCode}>
                {item.name}
            </div>
        )
    });

    const categoryBtnAction = (code) => {
        setCategoryState(code);
        categorySelectActionAPI(code);
    }

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
                    <MoimSlider meeting={locMeeting}/>
                </div>
            </div>
            <div className='moim-contents-part page-wrap'>
                <div className='category-part'>
                    <div className='title'>
                        <h3><span className='cat'><FontAwesomeIcon icon={faStar}/></span> 카테고리 별</h3>
                    </div>
                </div>
                <div className='category-list draggable'>
                    <div className='select'>
                        {setCategoryComp}
                    </div>
                    <MoimList/>
                </div>
            </div>
        </div>
    );
};

export default Home;