package com.pmp4.amoimproject.error.data.exception;

import com.pmp4.amoimproject.error.data.code.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class CustomException extends RuntimeException{
    private final ErrorCode customErrorCode;
}
