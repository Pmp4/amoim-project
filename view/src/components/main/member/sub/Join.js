import React, { useRef, useState } from 'react';

const Join = ({inputValue, inputChange, inputRef, checkInputStatus, duplicationCheck}) => {
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



    /**
     * @param {*} type 
     * 1 : userId,
     * 2 : email
     * 3 : password
     * 
     * 아이디, 이메일 중복체크 관련 메세지
     */
    const innerCheckText = (type) => {
        let state, checkText;
        if(type === 1) {
            state = userIdStatus;
            checkText = userIdCheckText;
        }else if(type === 2) {
            state = emailStatus;
            checkText = emailCheckText;
        }else if(type === 3) {
            state = passwordStatus;
            checkText = passwordCheckText;
        }

        return(
            <span className={
                state ? 
                    'res-msg success' : 'res-msg fail'}>{checkText}</span>
        );
    };


    return (
        <div>
            <form method="post">
                <div className="input-box">
                    <label htmlFor="userId">
                        <p>
                            아이디{" "}
                            <span>
                                2-10자의 영문과 숫자와 일부 특수문자(._-)만 입력
                                가능
                            </span>
                        </p>
                        <div className="button-input-box">
                            <input
                                ref={(element) => (inputRef.userId = element)}
                                id="userId"
                                placeholder="아이디"
                                type="id"
                                name="userId"
                                onChange={(event) => inputChange(event)}
                                defaultValue={userId}
                            />
                            <input
                                type="button"
                                onClick={() => duplicationCheck(1)}
                                defaultValue="중복확인"
                            />
                        </div>
                        {userIdInnerTextStatus && innerCheckText(1)}
                    </label>
                    <label htmlFor="password">
                        <p>
                            비밀번호
                            <span>
                                영문과 숫자 조합의 8-20자의 비밀번호를
                                설정해주세요. 특수문자(!@#$%^&*)도 사용
                            </span>
                            {password.length !== 0 && innerCheckText(3)}
                        </p>
                        <input
                            ref={(element) => (inputRef.password = element)}
                            id="password"
                            placeholder="비밀번호"
                            type="password"
                            name="password"
                            onChange={(event) => inputChange(event)}
                            defaultValue={password}
                        />
                        <input
                            ref={(element) => (inputRef.passwordChk = element)}
                            placeholder="비밀번호 확인"
                            type="password"
                            name="passwordChk"
                            onChange={(event) => inputChange(event)}
                            defaultValue={passwordChk}
                        />
                    </label>
                    <label htmlFor="name">
                        <p>이름</p>
                        <input
                            maxLength="10"
                            ref={(element) => (inputRef.name = element)}
                            id="name"
                            placeholder="이름"
                            type="name"
                            name="name"
                            onChange={(event) => inputChange(event)}
                            defaultValue={name}
                        />
                    </label>
                    <label htmlFor="gender">
                        <p>성별</p>
                        <select
                            ref={(element) => (inputRef.gender = element)}
                            id="gender"
                            name="gender"
                            onChange={(event) => inputChange(event)}
                        >
                            <option value="M">남자</option>
                            <option value="F">여자</option>
                        </select>
                        {/* <input 
                                    type='text'
                                    name='gender' 
                                    onChange={(event) => inputChange(event)}
                                    defaultValue={gender}/> */}
                    </label>
                    <label htmlFor="birthDay">
                        <p>생년월일</p>
                        <input
                            ref={(element) => (inputRef.birthDay = element)}
                            placeholder="8자리를 입력해주세요."
                            maxLength="8"
                            id="birthDay"
                            type="text"
                            name="birthDay"
                            onChange={(event) => inputChange(event)}
                            defaultValue={birthDay}
                        />
                    </label>
                    <label htmlFor="email">
                        <p>이메일</p>
                        <div className="button-input-box">
                            <input
                                ref={(element) => (inputRef.email = element)}
                                id="email"
                                placeholder="이메일"
                                type="email"
                                name="email"
                                onChange={(event) => inputChange(event)}
                                defaultValue={email}
                            />
                            <input
                                type="button"
                                onClick={() => duplicationCheck(2)}
                                defaultValue="중복확인"
                            />
                        </div>
                        {emailInnerTextStatus && innerCheckText(2)}
                    </label>
                    <label htmlFor="phoneNumber1">
                        <p>핸드폰 번호</p>
                        <div id="phoneNumber">
                            <select
                                ref={(element) =>
                                    (inputRef.phoneNumber1 = element)
                                }
                                name="phoneNumber1"
                                id="phoneNumber1"
                                onChange={(event) => inputChange(event)}
                            >
                                <option value="010">010</option>
                                <option value="011">011</option>
                                <option value="016">016</option>
                                <option value="017">017</option>
                                <option value="019">019</option>
                            </select>
                            -
                            <input
                                ref={(element) =>
                                    (inputRef.phoneNumber2 = element)
                                }
                                id="phoneNumber2"
                                maxLength="4"
                                type="tel"
                                name="phoneNumber2"
                                onChange={(event) => inputChange(event)}
                                defaultValue={phoneNumber2}
                            />
                            -
                            <input
                                ref={(element) =>
                                    (inputRef.phoneNumber3 = element)
                                }
                                id="phoneNumber3"
                                maxLength="4"
                                type="tel"
                                name="phoneNumber3"
                                onChange={(event) => inputChange(event)}
                                defaultValue={phoneNumber3}
                            />
                        </div>
                    </label>
                </div>
            </form>
        </div>
    );
};

export default Join;