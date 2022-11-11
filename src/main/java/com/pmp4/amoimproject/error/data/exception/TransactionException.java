package com.pmp4.amoimproject.error.data.exception;

import com.pmp4.amoimproject.error.data.code.DataBaseErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class TransactionException extends RuntimeException {
    private final DataBaseErrorCode dataBaseErrorCode;
}
