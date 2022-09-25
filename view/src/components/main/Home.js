import React from 'react';
import { useSelector, useDispatch } from 'react-redux';



const Home = () => {
    const number = useSelector(state => state.number);
    const dispatch = useDispatch();

    return (
        <div className='home-page'>
            <div className='title-wrap'>
                <h2>
                    안녕하세요.<br/>
                    <p className='mt_md'>
                        사람들의 모임서비스 <br/>
                        <span>A-MOIM</span> 입니다.
                    </p>
                </h2>
            </div>
            <div style={{marginTop: "50px"}}>
                {number}
                <button onClick={() => dispatch({type: "PLUS"})}>증가</button>
            </div>
        </div>
    );
};

export default Home;