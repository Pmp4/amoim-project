import LoginCheck from 'components/common/LoginCheck';
import React from 'react';
import { Route, Routes } from 'react-router';
import MyPage from './MyPage';
import Signup from './Signup';

const Account = () => {
    return (
        <div>
            <Routes>
                <Route path='/signup' element={<Signup/>}></Route>
                <Route path='/my' element={
                    <LoginCheck>
                        <MyPage/>
                    </LoginCheck>
                }></Route>
                <Route path='*' element={"404Page"}></Route>
            </Routes>
        </div>
    );
};

export default Account;