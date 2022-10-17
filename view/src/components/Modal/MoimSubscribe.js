import { faCircleCheck, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useSelector } from 'react-redux';

const MoimSubscribe = () => {
    const profileImgPath = useSelector(state => state.path.profileImagePath);

    return (
        <div className='moim-sub-list'>
            <div className='title'>
                가입 신청
            </div>
            {/* <div className='colum-part'>
                <div className='colum'>
                    <span>모임명</span>
                    <span>이름</span>
                    <span>나이</span>
                    <span>이름</span>
                    <span>이름</span>
                </div>
            </div> */}
            <div className='list'>
                <div className='moim-box'>
                    <p>모임명입니다.</p>
                    <div className='sub-list draggable'>
                        <div className='item'>
                            <div className='cover'></div>
                            <div className='on-cover'></div>
                            <div className='profile-image'>
                                <img src={profileImgPath + "default_profile.png"} alt='#'/>
                            </div>
                            <div className='exp'>
                                <div className='name'>
                                    홍길동
                                </div>
                                <div className='email'>
                                    test@gmail.com
                                </div>
                                <div className='age'>
                                    만 21세
                                </div>
                            </div>
                            <div className='check'>
                                <FontAwesomeIcon icon={faCheck}/>
                            </div>
                        </div>
                    </div>
                    <div className='line'></div>
                    <div className='btn-box'>
                        <button className='result-btn'>수락</button>
                        <button className='refusal-btn'>거절</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MoimSubscribe;