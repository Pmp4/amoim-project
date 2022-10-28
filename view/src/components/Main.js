import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Member from './main/member/Member';
import Home from './main/Home';
import Moim from './main/moim/Moim';
import PrivateRoute from './common/PrivateRoute';

const Main = () => {

    return (
        <div id='main-wrap'>
            <Routes>
                <Route path='/' element={<Home/>}></Route> 
                <Route path='/moim/*' 
                    element={
                        <PrivateRoute>
                            <Moim/>
                        </PrivateRoute>
                    }/>
                <Route path='/member/*' element={<Member/>}></Route>
                <Route path='*' element={"404Page"}></Route>
            </Routes>
        </div>
    );
};

export default Main;