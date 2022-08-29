import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './main/home/Home'
import Account from './main/account/Account';

const Main = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home/>}></Route>
                <Route path='/account' element={<Account/>}></Route>
            </Routes>
        </div>
    );
};

export default Main;