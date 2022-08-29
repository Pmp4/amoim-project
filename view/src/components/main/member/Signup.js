import React, { useState } from 'react';
import MemberService from '../../../api/member/MemberService';


const initialValue = {
    name: "",
    gender: "",
    birthDay: "",
    userId: "",
    password: "",
    passwordChk: "",
    phoneNumber1: "010",
    phoneNumber2: "",
    phoneNumber3: "",
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
        phoneNumber1,
        phoneNumber2,
        phoneNumber3,
        email,
    } = inputValue;

    const inputChange = (event) => {
        const {value, name} = event.target;
        console.log(`name=${name}, value=${value}`)
        setInputValue({...inputValue, [name] : value});
    }



    const userIdCheck = () => {
        MemberService.selectUserIdCount(userId)
            .then((response) => {
                console.log(response);
            });
    }


    return (
        <div className='signup-page'>
            <div className='page-wrap'>
                <div className='title-box'></div>
                <div className='signup-box'>
                    <h2 className='title'>회원가입</h2>
                    <form>
                        <div className='input-box'>
                            <label htmlFor='userId'>
                                <p>아이디</p>
                                <div className='id-check'>
                                    <input 
                                        id='userId'
                                        placeholder='아이디'
                                        type='id'
                                        name='userId' 
                                        onChange={(event) => inputChange(event)}
                                        defaultValue={userId}/>
                                    <input 
                                        type='button'  
                                        onClick={userIdCheck}
                                        defaultValue='중복확인'/>
                                </div>
                            </label>
                            <label htmlFor='password'>
                                <p>비밀번호</p>
                                <input 
                                    id='password'
                                    placeholder='비밀번호'
                                    type='password' 
                                    name='password' 
                                    onChange={(event) => inputChange(event)}
                                    defaultValue={password}/>
                                <input 
                                    placeholder='비밀번호 확인'
                                    type='password' 
                                    name='passwordChk' 
                                    onChange={(event) => inputChange(event)}
                                    defaultValue={passwordChk}/>
                            </label>
                            <label htmlFor='name'>
                                <p>이름</p>
                                <input 
                                    id='name'
                                    placeholder='이름'
                                    type='name'
                                    name='name' 
                                    onChange={(event) => inputChange(event)}
                                    defaultValue={name}/>
                            </label>
                            <label htmlFor='gender'>
                                <p>성별</p>
                                <select 
                                    id='gender'
                                    name='gender' 
                                    onChange={(event) => inputChange(event)}>
                                    <option value="M">남자</option>
                                    <option value="F">여자</option>
                                </select>
                                {/* <input 
                                    type='text'
                                    name='gender' 
                                    onChange={(event) => inputChange(event)}
                                    defaultValue={gender}/> */}
                            </label>
                            <label htmlFor='birthDay'>
                                <p>생년월일</p>
                                <input 
                                    id='birthDay'
                                    type='text'
                                    name='birthDay' 
                                    onChange={(event) => inputChange(event)}
                                    defaultValue={birthDay}/>
                            </label>
                            <label htmlFor='email'>
                                <p>이메일</p>
                                <input 
                                    id='email'
                                    placeholder='이메일'
                                    type='email'
                                    name='email' 
                                    onChange={(event) => inputChange(event)}
                                    defaultValue={email}/>
                            </label>
                            <label htmlFor='phoneNumber1'>
                                <p>핸드폰 번호</p>
                                <div id='phoneNumber'>
                                    <select 
                                        name='phoneNumber1'
                                        id='phoneNumber1'
                                        onChange={(event) => inputChange(event)}>
                                        <option value="010">010</option>
                                        <option value="011">011</option>
                                        <option value="016">016</option>
                                        <option value="017">017</option>
                                        <option value="019">019</option>
                                    </select>
                                    -
                                    <input 
                                        id='phoneNumber2'
                                        maxLength='4'
                                        type='tel'
                                        name='phoneNumber2' 
                                        onChange={(event) => inputChange(event)}
                                        defaultValue={phoneNumber2}/>
                                    -
                                    <input 
                                        id='phoneNumber3'
                                        maxLength='4'
                                        type='tel'
                                        name='phoneNumber3' 
                                        onChange={(event) => inputChange(event)}
                                        defaultValue={phoneNumber3}/>
                                </div>
                            </label>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;