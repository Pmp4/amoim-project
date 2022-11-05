import React from 'react';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import MeetingService from 'api/meeting/MeetingService';

const ViewCount = ({children}) => {
    const [cookies, setCookies, removeCookies] = useCookies([]);
    const param = useParams();

    useEffect(() => {
        checkCookies();
    }, [cookies])


    const checkCookies = () => {
        const now = new Date();
        const nextDate = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()+1}`;

        const moimNo = parseInt(param.meetingNo);
        console.log(cookies);
        if(cookies.moimview !== undefined) {
            if(!(cookies.moimview.includes(moimNo))) {     //이미 조회된 글
                setCookies(
                    "moimview", 
                    cookies.moimview.concat(moimNo), 
                    {expires: new Date(nextDate)}
                );

                viewApi(moimNo);
            }
        }else {
            setCookies(
                "moimview", 
                [moimNo], 
                {expires: new Date(nextDate)}
            );

            viewApi(moimNo);
        }
    }




    const viewApi = async(moimNo) => {
        await MeetingService.viewMoim(moimNo);
    }




    return (
        <div>
            {children}
        </div>
    );
};

export default ViewCount;