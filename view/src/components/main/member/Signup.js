import React, { useRef, useState } from 'react';
import MemberService from '../../../api/member/MemberService';
import {is_nickname, is_password, is_email, is_birthDay} from '../../../method/regularExpression';
import {Link, useNavigate} from 'react-router-dom';
import Join from './sub/Join';
import Interest from './sub/Interest';


const initialInputValue = {
    name: "",
    gender: "M",
    birthDay: "",
    userId: "",
    password: "",
    passwordChk: "",
    phoneNumber1: "010",
    phoneNumber2: "",
    phoneNumber3: "",
    email: "",
};
const initialStatusValue = {
    userIdCheckStatus: {
        userIdCheckText: "",
        userIdStatus: false,
        userIdInnerTextStatus: false
    },
    emailCheckStatus: {
        emailCheckText: "",
        emailStatus: false,
        emailInnerTextStatus: false
    },
    passwordCheckStatus: {
        passwordCheckText: "",
        passwordStatus: false
    }
}
const valueName = {
    name: "이름",
    gender: "성별",
    birthDay: "생년월일",
    userId: "아이디",
    password: "비밀번호",
    passwordChk: "비밀번호 체크",
    phoneNumber1: "휴대폰 첫 번째 자리",
    phoneNumber2: "휴대폰 두 번째 자리",
    phoneNumber3: "휴대폰 세 번째 자리",
    email: "이메일",
}







const Signup = () => {
    const navigator = useNavigate();
    const [inputValue, setInputValue] = useState(initialInputValue); 
    const [checkInputStatus, setCheckInputStatus] = useState(initialStatusValue);
    const [submitBtn, setSubmitBtn] = useState({
        submitText: "다음",
        submitStep: 1
    });
    const inputRef = useRef({});
    console.log("test!");

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

    const {
        userIdCheckStatus: {
            userIdCheckText,
            userIdStatus,
            userIdInnerTextStatus,
        },
        emailCheckStatus: {
            emailCheckText,
            emailStatus,
            emailInnerTextStatus,
        },
        passwordCheckStatus: {
            passwordCheckText,
            passwordStatus
        }
    } = checkInputStatus;

    const {submitText, submitStep} = submitBtn;

    const submitBtnClassName = () => {
        let resText = "mt_xl";
        if(submitStep === 1) {
            resText += " step-1"
        }else if(submitStep === 2) {
            resText += " step-2"
        }

        return resText;
    }



    const inputChange = (event) => {
        const {value, name} = event.target;
        console.log(`name=${name}, value=${value}`);
        setInputValue({...inputValue, [name] : value});

        if(name === 'userId') {
            setCheckInputStatus({
                ...checkInputStatus, 
                userIdCheckStatus : {
                    userIdCheckText: "",
                    userIdStatus: false,
                    userIdInnerTextStatus: false
                }
            });
        }
        
        if(name === 'email') {
            setCheckInputStatus({
                ...checkInputStatus, 
                emailCheckStatus : {
                    emailCheckText: "", 
                    emailStatus: false, 
                    emailInnerTextStatus: false
                }
            });
        }
        
        if(name === 'passwordChk' || name === 'password') {
            let checkResult = false, checkText = "비밀번호 불일치";
            const pwdChkValue = name === 'passwordChk' ? password : passwordChk;

            if(value === pwdChkValue) {
                checkResult = true;
                checkText = "비밀번호 일치";
            }
            console.log(checkResult);
            setCheckInputStatus({
                ...checkInputStatus, 
                passwordCheckStatus : {
                    passwordStatus: checkResult, 
                    passwordCheckText: checkText
                }
            });
        }
    }


    /**
     * @param {*} type 
     * 1 : userId,
     * 2 : email
     * 
     * 아이디, 이메일 중복체크 함수
     */
    const duplicationCheck = (type) => {
        let apiType;
        if(type === 1) {
            apiType = userId;
            if(userId === "" || !is_nickname(userId)) {
                alert("아이디는 2-10자의 영문과 숫자와 일부 특수문자(._-)만 입력 가능합니다.");
                inputRef.userId.focus();
                return;
            }
        }else if(type === 2) {
            apiType = email;
            if(email === "" || !is_email(email)) {
                alert("이메일 형식에 맞지 않습니다.");
                inputRef.email.focus();
                return;
            }
        }

        MemberService.selectTypeCount(apiType, type)
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

                        setCheckInputStatus({
                            ...checkInputStatus, 
                            userIdCheckStatus : {
                                userIdCheckText: msg, 
                                userIdStatus: chk, 
                                userIdInnerTextStatus: true
                            }
                        });

                    }else if(type === 2) {
                        if(response.data.CHECK) {
                            msg = "사용 가능한 이메일입니다.";
                            chk = true;
                        }else {
                            msg = "가입되어 있는 이메일입니다.";
                        }
                        setCheckInputStatus({
                            ...checkInputStatus, 
                            emailCheckStatus : {
                                emailCheckText: msg, 
                                emailStatus: chk, 
                                emailInnerTextStatus: true
                            }
                        });
                    }
                }else {
                    console.log("API 응답 실패");
                }
            });
    }



    /**
     * 회원가입 REST API
     */
    const joinBtnAction = (event) => {
        event.preventDefault();

        if(submitStep === 1) {
            //유효성 검사
            //유효성 검사
            //유효성 검사
            const nextCheck = inputValidation();
            console.log(nextCheck);
            if(nextCheck) setSubmitBtn({...submitBtn, submitText: "회원가입", submitStep: 2});
        }else if(submitStep === 2) {
            
        }


        //POST로 전송할 data set
        // const apiData = {
        //     ...inputValue, 
        //     phoneNumber: phoneNumber1+phoneNumber2+phoneNumber3,
        // }

        // MemberService.memberSignup(apiData)
        //     .then(response => {
        //         const {SUCCESS} = response.data
        //         if(!SUCCESS) {
        //             console.log('error : DB처리');
        //             return;
        //         }

        //         alert("회원가입에 성공하셨습니다.");
        //         navigator("/");
        //     })
    }

    /**
     * 회원정보 입력 유효성검사
     */
    const inputValidation = () => {
        for(let key of Object.keys(inputValue)) {
            console.log(`key : ${key}, value : ${inputValue[key]}`);

            if(inputValue[key] === '') {
                alert(`${valueName[key]}를(을) 입력해주세요.`);
                inputRef[key].focus();
                return;
            } 
        }

        let refName, chkIf, alertText;
        if(!userIdStatus) {
            chkIf = true;
            refName = "userId";
            alertText = "아이디 중복확인을 해주세요.";
        }else if(!passwordStatus) {
            chkIf = true;
            refName = "passwordChk";
            alertText = "비밀번호가 일치하지 않습니다.";
        }else if(!is_password(password)) {
            chkIf = true;
            refName = "password";
            alertText = "영문과 숫자 조합의 8-20자의 비밀번호를 설정해주세요. 특수문자(!@#$%^&*)도 사용";
        }else if(!emailStatus) {
            chkIf = true;
            refName = "userId";
            alertText = "이메일 중복확인을 해주세요.";
        }else if(isNaN(birthDay) || !is_birthDay(birthDay)) {
            chkIf = true;
            refName = "birthDay";
            alertText = "생년월일 양식에 맞지 않습니다.";
        }else if(isNaN(phoneNumber2)) {
            chkIf = true;
            refName = "phoneNumber2";
            alertText = "휴대폰 번호는 숫자로 입력해주세요.";
        }else if(isNaN(phoneNumber3)) {
            chkIf = true;
            refName = "phoneNumber3";
            alertText = "휴대폰 번호는 숫자로 입력해주세요.";
        }

        if(chkIf) {
            alert(alertText);
            inputRef[refName].focus();
            return false;
        }

        return true;
    }

    

    return (
        <div className='signup-page'>
            <div className='page-wrap'>
                <div className='title-box'></div>
                <div className='signup-box'>
                    <h2 className='title'>{submitStep === 1 ? '회원정보' : "관심사"}</h2>
                    {/* {submitStep === 1 ? 
                        <Join 
                            inputValue={inputValue} 
                            inputChange={inputChange} 
                            inputRef={inputRef} 
                            checkInputStatus={checkInputStatus}
                            duplicationCheck={duplicationCheck}/> : 
                        <Interest/>} */}
                        <Interest/>
                    <input
                        onClick={(event) => joinBtnAction(event)}
                        className={submitBtnClassName()}
                        type="submit"
                        value={submitText}
                    />
                </div>
            </div>
            <div style={{height: "2000px", width: "100%"}}></div>
        </div>
    );
};

export default Signup;