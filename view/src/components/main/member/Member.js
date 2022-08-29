import React from 'react';
import { Route, Routes } from 'react-router';
import Signup from './Signup';

const Account = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<div>MEMBERMEMBERMEMBERMEMBERMEMBERMEMBERMEMBERMEMBER</div>}></Route>
                <Route path='/signup' element={<Signup/>}></Route>
            </Routes>
        </div>
    );
};

export default Account;