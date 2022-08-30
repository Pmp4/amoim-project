import React, { useRef, useState } from 'react';
import MemberService from '../../../api/member/MemberService';
import {is_nickname, is_password, is_email} from '../../../method/regularExpression';


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
    const [userIdCheckStatus, setUserIdCheckStatus] = useState({
        userIdCheckText: "",
        userIdStatus: false,
        userIdInnerTextStatus: false
    });
    const [emailCheckStatus, setEmailCheckStatus] = useState({
        emailCheckText: "",
        emailStatus: false,
        emailInnerTextStatus: false
    });

    const inputRef = useRef({});

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

    const {userIdCheckText, userIdStatus, userIdInnerTextStatus} = userIdCheckStatus;
    const {emailCheckText, emailStatus, emailInnerTextStatus} = emailCheckStatus;


    const inputChange = (event) => {
        const {value, name} = event.target;
        console.log(`name=${name}, value=${value}`)
        setInputValue({...inputValue, [name] : value});

        if(name === 'userId') {
            setUserIdCheckStatus({
                ...userIdCheckStatus, 
                userIdCheckText: "", userIdStatus: false, userIdInnerTextStatus: false
            });
        }

        if(name === 'email') {
            setEmailCheckStatus({
                ...emailCheckStatus, 
                emailCheckText: "", emailStatus: false, emailInnerTextStatus: false
            });
        }
    }

    const innerUserIdCheckText = 
        <span className={
            userIdStatus ? 
                'res-msg success' : 'res-msg fail'}>{userIdCheckText}</span>;


    /**
     * @param {*} type 
     * 1 : userId,
     * 2 : email
     */
    const innerCheckText = (type) => {
        let state, checkText;
        if(type === 1) {
            state = userIdStatus;
            checkText = userIdCheckText;
        }else if(type === 2) {
            state = emailStatus;
            checkText = emailCheckText;
        }

        return(
            <span className={
                state ? 
                    'res-msg success' : 'res-msg fail'}>{checkText}</span>
        );
    };



    /**
     * @param {*} type 
     * 1 : userId,
     * 2 : email
     */
    const duplicationCheck = (type) => {
        let apiType;
        if(type === 1) {
            apiType = userId;
            if(userId === "" || !is_nickname(userId)) {
                alert("아이디는 2-10자의 영문과 숫자와 일부 특수문자(._-)만 입력 가능합니다.");
                return;
            }
        }else if(type === 2) {
            apiType = email;
            if(email === "" || !is_email(email)) {
                alert("이메일 형식에 맞지 않습니다.");
                return;
            }
        }

        MemberService.selectUserIdCount(apiType, type)
            .then((response) => {
                console.log(response);
                if(response.data.SUCCESS) {
                    let msg = "", chk = false;
                    if(type === 1) {
                        if(response.data.CHECK) {
                            msg = "사용 가능한 아이디입니다.";
                            chk = true;
                        }else {
                            msg = "가입되어 있는 아이디입니다.";
                        }
    
                        setUserIdCheckStatus({
                            ...userIdCheckStatus, 
                            userIdCheckText: msg, userIdStatus: chk, userIdInnerTextStatus: true
                        });
                    }else if(type === 2) {
                        if(response.data.CHECK) {
                            msg = "사용 가능한 이메일입니다.";
                            chk = true;
                        }else {
                            msg = "가입되어 있는 이메일입니다.";
                        }
    
                        setEmailCheckStatus({
                            ...emailCheckStatus, 
                            emailCheckText: msg, emailStatus: chk, emailInnerTextStatus: true
                        });
                    }
                }else {
                    console.log("API 응답 실패");
                }
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
                                <p>아이디 <span>2-10자의 영문과 숫자와 일부 특수문자(._-)만 입력 가능</span></p>
                                <div className='button-input-box'>
                                    <input 
                                        ref={element => inputRef.userId = element}
                                        id='userId'
                                        placeholder='아이디'
                                        type='id'
                                        name='userId' 
                                        onChange={(event) => inputChange(event)}
                                        defaultValue={userId}/>
                                    <input 
                                        type='button'  
                                        onClick={() => duplicationCheck(1)}
                                        defaultValue='중복확인'/>
                                </div>
                                {userIdInnerTextStatus && innerCheckText(1)}
                            </label>
                            <label htmlFor='password'>
                                <p>비밀번호<span>영문과 숫자 조합의 8-20자의 비밀번호를 설정해주세요. 특수문자(!@#$%^&*)도 사용</span></p>
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
                                    type='date'
                                    name='birthDay' 
                                    onChange={(event) => inputChange(event)}
                                    defaultValue={birthDay}/>
                            </label>
                            <label htmlFor='email'>
                                <p>이메일</p>
                                <div className='button-input-box'>
                                    <input 
                                        id='email'
                                        placeholder='이메일'
                                        type='email'
                                        name='email' 
                                        onChange={(event) => inputChange(event)}
                                        defaultValue={email}/>
                                    <input 
                                        type='button'  
                                        onClick={() => duplicationCheck(2)}
                                        defaultValue='중복확인'/>
                                </div>
                                {emailInnerTextStatus && innerCheckText(2)}
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
            <div style={{height: "2000px", width: "100%"}}></div>
        </div>
    );
};

export default Signup;