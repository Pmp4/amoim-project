import React, { useCallback, useState } from 'react';

const initialInfo = {
    userId: "",
    password: ""
}

const Login = () => {
    const [loginInfo, setLoginInfo] = useState({...initialInfo});

    const {userId, password} = loginInfo;

    const infoChange = useCallback((target) => {
        const {name, value} = target;
        setLoginInfo({...loginInfo, [name] : value});
    });

    return (
        <div className='login popup'>
            <h2 className='title'>로그인</h2>
            <div className='login-input mt_xl'>
                <label name='userId'>
                    <p>아이디</p>
                    <input type='text' 
                        name="userId" 
                        defaultValue={userId}
                        placeholder="아이디를 입력해주세요."
                        onChange={(event) => infoChange(event.target)}/>
                </label>
                <label name='password'>
                    <p className='mt_md'>비밀번호</p>
                    <input type='password' 
                        name="password" 
                        defaultValue={password}
                        placeholder="비밀번호를 입력해주세요."
                        onChange={(event) => infoChange(event.target)}/>
                </label>
            </div>
            <div className='login-sub'>
                
            </div>
            <div className='login-btn'></div>
        </div>
    );
};

export default Login;