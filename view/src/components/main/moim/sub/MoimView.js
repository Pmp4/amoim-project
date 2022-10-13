import MeetingService from 'api/meeting/MeetingService';
import React from 'react';
import { useParams } from 'react-router';
import { useEffect } from 'react';

const MoimView = () => {
    const param = useParams();
    const meetingNo = param.meetingNo;
    
    useEffect(() => {
        selectViewApi();
    }, []);

    const selectViewApi = () => {
        MeetingService.selectByNo(meetingNo).then(response => {
            const{status, data} = response;
            if(status === 200) {

            }else {
                alert("Server DB Error");
            }
        });
    }
    

    return (
        <div id='view-page'>
            <div className='page-wrap'>
                <div className='left'>
                    <div className='img-box'>
                        <img src="" alt=''/>
                    </div>
                </div>
                <div className='right'></div>
            </div>
            
        </div>
    );
};

export default MoimView;