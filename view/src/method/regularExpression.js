const is_nickname = (asValue) => {
    const regExp = /^(?=.*[a-zA-Z])[-a-zA-Z0-9_.]{2,10}$/;
    return regExp.test(asValue);
}
//아이디는 2-10자의 영문과 숫자와 일부 특수문자(._-)만 입력 가능

const is_password = (asValue) => {
    const regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]{8,20}$/;
    return regExp.test(asValue);
}
//영문과 숫자 조합의 8-20자의 비밀번호를 설정해주세요. 특수문자(!@#$%^&*)도 사용


const is_email = (asValue) => {
    const regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    return regEmail.test(asValue);
}

const is_birthDay = (asValue) => {
    const regBirthDay = /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/;
    
    return regBirthDay.test(asValue);
}

export {is_nickname, is_password, is_email, is_birthDay};