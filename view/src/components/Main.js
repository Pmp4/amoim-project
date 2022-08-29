import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './main/home/Home'
import Member from './main/member/Member';

const Main = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home/>}></Route>
                <Route path='/member/*' element={<Member/>}></Route>
            </Routes>
        </div>
    );
};

export default Main;