import React from 'react';
import { useParams } from 'react-router';

const MoimView = () => {
    const param = useParams();
    const meetingNo = param.meetingNo;
    console.log(param);
    

    return (
        <div id='view-page'>
            TEST
        </div>
    );
};

export default MoimView;