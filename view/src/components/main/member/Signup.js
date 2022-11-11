import React, { useCallback, useRef, useState } from 'react';
import MemberService from '../../../api/member/MemberService';
import {is_nickname, is_password, is_email, is_birthDay} from '../../../method/regularExpression';
import {useNavigate} from 'react-router-dom';
import Join from './sub/Join';
import Interest from './sub/Interest';
import { useEffect } from 'react';
import LocationInfo from './sub/LocationInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';


const initialInputValue = {
    name: "",
    gender: "M",
    birthDay: "",
    intro: "",
    userId: "",
    password: "",
    passwordChk: "",
    phoneNumber1: "010",
    phoneNumber2: "",
    phoneNumber3: "",
    email: "",
    intro: ""
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


const initialInterests = [
    {
        interestNo: "",
        categoryCode: "",
        categoryParent: "",
        name: "",
        imageSize: "",
        originalImageName: "",
        imageName: "",
        colorCode: "",
    },
];


// const initialAddress = {
//     addressNo: "",
//     userNo: "",
//     zonecode: "",
//     address: "",
//     roadAddress: "",
//     jibunAddress: "",
//     sido: "",
//     sigungu: "",
//     bcode: "",
//     bname: "",
// }





const Signup = () => {
    const navigator = useNavigate();
    const [inputValue, setInputValue] = useState(initialInputValue); 
    const [checkInputStatus, setCheckInputStatus] = useState(initialStatusValue);
    const [submitBtn, setSubmitBtn] = useState({
        submitText: "다음",
        submitStep: 1
    });

    const [profileState, setProfileState] = useState(false);
    
    

    const [checkStatus, setCheckStatus] = useState({}); //관심사에 대한 데이터
    const [currentCode, setCurrentCode] = useState(0);



    const [address, setAddress] = useState({}); //주소 데이터
    
    
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
        intro,
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
        let resText = "";
        if(submitStep === 1) {
            resText += " step-1"
        }else if(submitStep === 2) {
            resText += " step-2"
        }else if(submitStep === 3) {
            resText += " step-3"
        }

        return resText;
    }



    const checkStatusAction = useCallback((parentCode, code) => {
        setCheckStatus({...checkStatus, [parentCode]: code});
    }, [checkStatus]);

    const deleteCheckStatusAction = useCallback((tempCheckItem) => {
        setCheckStatus(tempCheckItem);
    }, [checkStatus]);

    useEffect(() => {
        // categoryApi("");
    }, []);



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
            if(inputValidation()) setSubmitBtn({...submitBtn, submitStep: 2});
                
            // setSubmitBtn({...submitBtn, submitStep: 2});
            return;
        }else if(submitStep === 2) {
            if(Object.keys(checkStatus).length < 2) {
                alert("관심사는 2개 이상 선택하셔야 합니다.");
                return;
            }

            for(let key in checkStatus) {
                if(checkStatus[key].length === 0) {
                    alert("관심사 별 키워드는 1개 이상 선택하셔야 합니다.");
                    setCurrentCode(parseInt(key));
                    return;
                }
            }

            setSubmitBtn({...submitBtn, submitStep: 3, submitText: "회원가입"});
            return;
        }else if(submitStep === 3) {
            if(Object.keys(address).length === 0) {
                alert("주소가 유효하지 않습니다.");
                return;
            }
        }

        const formData = new FormData();

        if(profileState) {
            const file = profileInputRef.current.files[0];
            formData.append("file", file);
        }


        //POST로 전송할 data set
        const apiData = {
            userInfo: {
                ...inputValue, 
                phoneNumber: phoneNumber1+phoneNumber2+phoneNumber3,
            },
            interests: {
                ...checkStatus
            },
            address,
            profileState
        }

        console.log(apiData);
        delete apiData.userInfo.passwordChk;
        delete apiData.userInfo.phoneNumber1;
        delete apiData.userInfo.phoneNumber2;
        delete apiData.userInfo.phoneNumber3;

        formData.append("restJson", 
            new Blob([JSON.stringify(apiData)], {
                type: "application/json",
            })
        );
        

        MemberService.memberSignup(formData)
            .then(response => {
                if(response.data === 1) {
                    alert("회원가입이 완료되었습니다.");
                    navigator("/");
                }
            })
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

    const prevClickAction = () => {
        if(submitStep === 2) {
            setSubmitBtn({...submitBtn, submitStep: 1});
        }else if(submitStep === 3) {
            setSubmitBtn({...submitBtn, submitStep: 2, submitText: "다음"});
        }
    }




    //메인 카테고리 리스트 api
    //메인 카테고리 리스트 api
    //메인 카테고리 리스트 api
    //메인 카테고리 리스트 api
    // const categoryApi = (type) => {
    //     InterestService.selectCategory(type).then((response) => {
    //         console.log(response);
    //         if (response.data.SUCCESS) {
    //             if(response.data.type) {
    //                 for(let i = 0; i < response.data.list.length; i++)
    //                     response.data.list[i].check = false;
                    
    //                 setInterests(response.data.list);
    //             }
    //         }
    //     });
    // };




    const profileRef = useRef(null);
    const profileInputRef = useRef(null);
    //이미지 업로드 미리보기 로직
    //이미지 업로드 미리보기 로직
    //이미지 업로드 미리보기 로직
    //이미지 업로드 미리보기 로직
    const profileImageAction = (event) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            profileRef.current.style.backgroundImage = `url(${e.target.result})`;
            setProfileState(true);
        };

        reader.readAsDataURL(event.target.files[0]);
    };

    //이미지 업로드 초기화 함수
    //이미지 업로드 초기화 함수
    //이미지 업로드 초기화 함수
    //이미지 업로드 초기화 함수
    const initialFileInput = (event) => {
        inputRef.current.file.value = "";
        inputRef.current.fileBox.style.backgroundImage = `url('')`;
        inputRef.current.fileRemove.className += " fade-out";

        return false;
    };
    

    return (
        <div id='signup-page'>
            <div className='page-wrap' id='signup-main'>
                <div className='title-box'>
                    <div className='profile-image'>
                        <div className='image'
                            ref={element => profileRef.current = element}
                        >
                            {!profileState && <FontAwesomeIcon icon={faImage}/>}
                            <input 
                                ref={element => profileInputRef.current = element}
                                type="file" 
                                name="profile"
                                onChange={(event) => profileImageAction(event)}
                            />
                        </div>
                    </div>
                </div>
                <div className='signup-box'>
                    <h2 className='title'>
                        {submitStep === 1 ? '회원정보' : 
                            submitStep === 2 ? "관심사" :
                            submitStep === 3 ? "지역정보" : ""
                        }
                        {submitStep === 1 ? "" : 
                            submitStep === 2 ? 
                            <span className='sub-title'>
                                선택된 항목&nbsp;
                                {/* <strong>{checkItem.length}개</strong> */}
                                <strong>{Object.keys(checkStatus).length}개</strong>
                            </span> : ""}
                    </h2>
                    {submitStep === 1 ? 
                        <Join 
                            inputValue={inputValue} 
                            inputChange={inputChange} 
                            inputRef={inputRef} 
                            checkInputStatus={checkInputStatus}
                            duplicationCheck={duplicationCheck}/> : 
                        submitStep === 2 ?
                        <Interest 
                            checkStatus={checkStatus} 
                            deleteCheckStatusAction={deleteCheckStatusAction}
                            checkStatusAction={checkStatusAction}
                            current={{currentCode, setCurrentCode}}/> : 
                        submitStep === 3 ? 
                        <LocationInfo addressSet={{address, setAddress}}/> : ""}
                    <div className='button-part mt_xl'>
                        <input 
                            onClick={prevClickAction}
                            className={submitStep === 1 ? 'prev' : 'prev on'}
                            type="submit" 
                            value='이전'/>
                        <input
                            onClick={(event) => joinBtnAction(event)}
                            className={submitBtnClassName()}
                            type="submit"
                            value={submitText}
                        />
                    </div>
                </div>
            </div>
            <div style={{height: "2000px", width: "100%"}}></div>
        </div>
    );
};

export default Signup;