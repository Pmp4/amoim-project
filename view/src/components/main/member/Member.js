import React from 'react';
import { Route, Routes } from 'react-router';
import Signup from './Signup';

const Account = () => {
    return (
        <div>
            <Routes>
                <Route path='/signup' element={<Signup/>}></Route>
                <Route path='*' element={"404Page"}></Route>
            </Routes>
        </div>
    );
};

export default Account;