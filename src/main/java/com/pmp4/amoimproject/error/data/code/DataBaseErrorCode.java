package com.pmp4.amoimproject.error.data.code;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.BAD_REQUEST;


@Getter
@RequiredArgsConstructor
public enum DataBaseErrorCode {
    /* 400 BAD_REQUEST : 잘못된 요청 */
    INVALID_REQUEST(BAD_REQUEST, "유효하지 않은 요청입니다.");


    private final HttpStatus httpStatus;
    private final String message;
}
