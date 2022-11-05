import React from 'react';
import { useSelector } from 'react-redux';

const MyPage = ({Test}) => {
    const user = useSelector(state => state.user);
    const path = useSelector(state => state.path);

    return (
        <div id="my-page" className='page-wrap'>
            <div className='info-part draggable'>
                <div className='profile-img-info'>
                    <div className='profile-img'>
                        <img 
                            src={path.profileImagePath + "default_profile.png"}
                            alt={"프로필 이미지"}
                        />
                        <div className='edit-button'>
                            Edit
                            <input type="file"/>
                        </div>
                    </div>
                </div>
                <div className='exp-info'>
                    <div className='name b1'>
                        이름입니다
                        <span>userId</span>
                    </div>
                    <div className='line intro'>한줄소개입니다.</div>
                </div>
            </div>
            나의 페이지<br/>
            이름 : {user.userInfo.name}<br/>
        </div>
    );
};

export default MyPage;