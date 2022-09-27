import React from 'react';
import { useSelector } from 'react-redux';

const MyPage = () => {
    const user = useSelector(state => state.user);

    return (
        <div>
            나의 페이지<br/>
            이름 : {user.userInfo.name}
        </div>
    );
};

export default MyPage;