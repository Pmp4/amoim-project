import React, { useState } from 'react';


const initialValue = {
    name: "",
    gender: "",
    birthDay: "",
    userId: "",
    password: "",
    passwordChk: "",
    phoneNumber: "",
    email: "",
};
const Signup = () => {
    const [inputValue, setInputValue] = useState(initialValue); 

    const {
        name, 
        gender, 
        birthDay, 
        userId, 
        password, 
        passwordChk, 
        phoneNumber, 
        email
    } = inputValue;

    const inputChange = (event) => {
        const {value, name} = event.target;
        console.log(`name=${name}, value=${value}`)
        setInputValue({...inputValue, [name] : value});
    }


    return (
        <div className='signup-page'>
            <div className='page-wrap'>
                <div className='title-box'></div>
                <div className='signup-box'>
                    <label>
                        <p>이름</p>
                        <input 
                            type='text'
                            name='name' 
                            onChange={(event) => inputChange(event)}
                            defaultValue={name}/>
                    </label>
                    <label>
                        <p>성별</p>
                        <input 
                            type='text'
                            name='gender' 
                            onChange={(event) => inputChange(event)}
                            defaultValue={gender}/>
                    </label>
                    <label>
                        <p>생년월일</p>
                        <input 
                            type='text'
                            name='birthDay' 
                            onChange={(event) => inputChange(event)}
                            defaultValue={birthDay}/>
                    </label>
                    <label>
                        <p>아이디</p>
                        <input 
                            type='text'
                            name='userId' 
                            onChange={(event) => inputChange(event)}
                            defaultValue={userId}/>
                    </label>
                    <label>
                        <p>비밀번호</p>
                        <input 
                            type='password' 
                            name='password' 
                            onChange={(event) => inputChange(event)}
                            defaultValue={password}/>
                    </label>
                    <label>
                        <p>비밀번호 확인</p>
                        <input 
                            type='password' 
                            name='passwordChk' 
                            onChange={(event) => inputChange(event)}
                            defaultValue={passwordChk}/>
                    </label>
                    <label>
                        <p>이메일</p>
                        <input 
                            type='text'
                            name='email' 
                            onChange={(event) => inputChange(event)}
                            defaultValue={email}/>
                    </label>
                    <label>
                        <p>핸드폰 번호</p>
                        <input 
                            type='text'
                            name='phoneNumber' 
                            onChange={(event) => inputChange(event)}
                            defaultValue={phoneNumber}/>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Signup;