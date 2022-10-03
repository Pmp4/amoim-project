import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MoimMain from './sub/MoimMain';
import MoimAdd from './sub/MoimAdd';

const Moim = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<MoimMain/>}/>
                <Route path='/add' element={<MoimAdd/>}/>
            </Routes>
        </div>
    );
};

export default Moim;