import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MoimMain from './sub/MoimMain';
import MoimAdd from './sub/MoimAdd';
import MoimView from './sub/MoimView';

const Moim = () => {
    

    return (
        <div>
            <Routes>
                <Route path='/' element={<MoimMain/>}/>
                <Route path='/add' element={<MoimAdd/>}/>
                <Route path='/view/:meetingNo' element={<MoimView/>}/>
                <Route path='/*' element={"404"}/>
            </Routes>
        </div>
    );
};

export default Moim;