package com.pmp4.amoimproject.error.data.code;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;

@RequiredArgsConstructor
@Getter
public enum ErrorCode {
    /* 400 BAD_REQUEST : 잘못된 요청 */
    PASSWORD_DOES_NOT_MATCH(BAD_REQUEST, "비밀번호가 일치하지 않습니다."),
    ACCOUNTS_NOT_EXIST(BAD_REQUEST, "존재하지 않는 계정입니다."),
    OVER_STAFFED(BAD_REQUEST, "허용 가능 인원 수가 초과됩니다."),


    /* 401 UNAUTHORIZED : 인증되지 않은 사용자 */
    NO_ACCESS_AUTHORITY(UNAUTHORIZED, "접근 권한이 없습니다.")
    ;



    private final HttpStatus httpStatus;
    private final String message;
}
