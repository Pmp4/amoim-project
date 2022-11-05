import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MoimMain from './sub/MoimMain';
import MoimAdd from './sub/MoimAdd';
import MoimView from './sub/MoimView';
import ViewCount from 'components/common/ViewCount';

const Moim = () => {
    

    return (
        <div>
            <Routes>
                <Route path='/' element={<MoimMain/>}/>
                <Route path='/add' element={<MoimAdd mode={"add"}/>}/>
                <Route path='/view/:meetingNo' 
                    element={
                        <ViewCount>
                            <MoimView/>
                        </ViewCount>
                    }
                />
                <Route path='/edit/:meetingNo' element={<MoimAdd mode={"edit"}/>}/>
                <Route path='/*' element={"404"}/>
            </Routes>
        </div>
    );
};

export default Moim;