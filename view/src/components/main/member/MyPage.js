import React from 'react';
import { useSelector } from 'react-redux';

const MyPage = ({Test}) => {
    const user = useSelector(state => state.user);

    return (
        <div className='my-page'>
            나의 페이지<br/>
            이름 : {user.userInfo.name}<br/>
        </div>
    );
};

export default MyPage;