import React, { useCallback, useRef, useState } from 'react';
import MemberService from '../../../api/member/MemberService';
import {is_nickname, is_password, is_email, is_birthDay} from '../../../method/regularExpression';
import {useNavigate} from 'react-router-dom';
import Join from './sub/Join';
import Interest from './sub/Interest';
import InterestService from 'api/interest/InterestService';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCheck} from '@fortawesome/free-solid-svg-icons';



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






const Signup = () => {
    const navigator = useNavigate();
    const [inputValue, setInputValue] = useState(initialInputValue); 
    const [checkInputStatus, setCheckInputStatus] = useState(initialStatusValue);
    const [submitBtn, setSubmitBtn] = useState({
        submitText: "다음",
        submitStep: 1
    });
    const inputRef = useRef({});


    const [interests, setInterests] = useState(initialInterests);
    const [checkStatus, setCheckStatus] = useState({
        checkItem: [],
        checkKeywords: [],
    });

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
        let resText = "";
        if(submitStep === 1) {
            resText += " step-1"
        }else if(submitStep === 2) {
            resText += " step-2"
        }

        return resText;
    }



    const checkStatusAction = useCallback((name, data) => {
        setCheckStatus({...checkStatus, [name]: data});
    }, [checkStatus]);

    useEffect(() => {
        categoryApi("");
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

    const prevClickAction = () => {
        setSubmitBtn({
            submitText: "다음",
            submitStep: 1
        })
    }




    //메인 카테고리 리스트 api
    //메인 카테고리 리스트 api
    //메인 카테고리 리스트 api
    //메인 카테고리 리스트 api
    const categoryApi = (type) => {
        InterestService.selectCategory(type).then((response) => {
            console.log(response);
            if (response.data.SUCCESS) {
                if(response.data.type) {
                    for(let i = 0; i < response.data.list.length; i++)
                        response.data.list[i].check = false;
                    
                    setInterests(response.data.list);
                }
            }
        });
    };



    // 메인 카테고리 요소 설정
    // 메인 카테고리 요소 설정
    // 메인 카테고리 요소 설정
    // 메인 카테고리 요소 설정
    const divRef = useRef([]);
    const [keywords, setKeywords] = useState(initialInterests);
    const [currentCode, setCurrentCode] = useState(0);
    const [moved, setMoved] = useState(false);
    const {
        checkItem,
        checkKeywords
    } = checkStatus;



    //마우스 클릭 or 드래그 감지
    //마우스 클릭 or 드래그 감지
    //마우스 클릭 or 드래그 감지
    let moveCount = 0;
    const downListener = () => {
        clearTimeout(moveSet());
        moveCount--;
        setMoved(false);
    }
    
    const moveListener = () => {
        if(moveCount === 0) {
            moveSet();
            moveCount++;
        }
    }

    const moveSet = () => {
        setTimeout(() => {
            setMoved(true);
        }, 100);
    }

    const upListener = (code, idx) => {
        // console.log(idx);
        if (moved) {
            console.log('moved')
        } else {
            console.log('not moved');
            clickCategory(code, idx);
        }
    }


    const setCategoryObj = interests.map((item, idx) => {
        if(interests.length === 1) return "";
        
        return(
            <div
                ref={element => divRef.current[idx] = element}
                key={idx}
                >
                <div 
                    className={!item.check ? 'item' : 
                        (parseInt(item.categoryCode) === currentCode) ? "item current" : "item on"} 
                    onMouseUp={() => upListener(parseInt(item.categoryCode), idx)}
                    onMouseMove={moveListener}
                    onMouseDown={downListener}>
                    <div className="title-img">
                        <div className='click-part'>
                            <FontAwesomeIcon icon={faCheck} />
                        </div>
                        <img 
                            src={item.imageName != null ? `/upload/images/${item.imageName}` : "/default_image.png"} 
                            alt={item.name}/>
                    </div>
                    <span className="cat-title">{item.name}</span>
                </div>
            </div>
        )
    });



    //요소 클릭 시, 체크 여부를 확인함
    //요소 클릭 시, 체크 여부를 확인함
    //요소 클릭 시, 체크 여부를 확인함
    //이미 클릭 했던 요소면? 현재 current 비교 후, 삭제
    const clickCategory = (code, idx) => {
        if(checkItem.indexOf(code) !== -1) {    //이미 클릭한 요소일 때
            // console.log("hello");
            if(currentCode === code) {  //현재 보고있는 카테고리일 경우만 삭제
                const tempArray = [...interests];
                tempArray[idx].check = false;
                const tempCheckItem = checkItem.filter(item => item !== code);

                setInterests(tempArray);
                // setCheckItem(tempCheckItem);
                checkStatusAction('checkItem', tempCheckItem);

                if(tempCheckItem.length !== 0) {    //선택한 요소가 있을 경우
                    const tempCode = tempCheckItem[tempCheckItem.length - 1];

                    categoryApi(tempCode);
                    setCurrentCode(tempCode);
                }else {
                    setKeywords(initialInterests);
                }
                return;
            }

            categoryApi(code);
            setCurrentCode(code);
        }else { //클릭한 요소가 아닐 때, 추가
            if(checkItem.length === 4) {
                alert("관심사는 최대 4개까지 선택 가능합니다.");
                return;
            }



            const tempArray = [...interests];
            tempArray[idx].check = true;
            // console.log(tempArray);

            setInterests(tempArray);
            // setCheckItem(checkItem.concat(code));

            checkStatusAction('checkItem', checkItem.concat(code));
            setCurrentCode(code);
            categoryApi(code);
        }
    }






    //키워드 카테고리 리스트
    const setKeywordObj = keywords.map((item, idx) => {
        const code = parseInt(item.categoryCode);
        if(keywords.length === 1) {
            return ("");
        }

        return (
            <span 
                onClick={() => clickKeywordAction(code)}
                className={checkKeywords.indexOf(code) !== -1 ? 'item on' : "item"} 
                key={idx}>
                {item.name}
            </span>
        )
    });

    //키워드 클릭 시
    const clickKeywordAction = (code) => {
        console.log(code);
        if(checkKeywords.indexOf(code) === -1) {
            if(checkKeywords.length === 5) {
                alert("키워드는 최대 5개까지 선택 가능합니다.");
                return;
            }

            checkStatusAction('checkKeywords', checkKeywords.concat(code));
        }else {
            checkStatusAction('checkKeywords', checkKeywords.filter((e) => e !== code));
        }
    }
    

    return (
        <div className='signup-page'>
            <div className='page-wrap'>
                <div className='title-box'></div>
                <div className='signup-box'>
                    <h2 className='title'>
                        {submitStep === 1 ? '회원정보' : 
                            "관심사" 
                        }
                        {submitStep === 1 ? "" : 
                            <span className='sub-title'>
                                선택된 항목&nbsp;
                                <strong>{checkItem.length}개</strong>
                            </span>}
                    </h2>
                    {submitStep === 1 ? 
                        <Join 
                            inputValue={inputValue} 
                            inputChange={inputChange} 
                            inputRef={inputRef} 
                            checkInputStatus={checkInputStatus}
                            duplicationCheck={duplicationCheck}/> : 
                        <Interest 
                            checkStatus={checkStatus} 
                            checkStatusAction={checkStatusAction}
                            interestsValue={{interests, setInterests}}
                            setKeywordObj={setKeywordObj}
                            setCategoryObj={setCategoryObj}/>
                    }
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