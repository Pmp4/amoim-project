package com.pmp4.amoimproject.error.controller;


import com.pmp4.amoimproject.error.data.exception.CustomException;
import com.pmp4.amoimproject.error.data.ErrorResponse;
import com.pmp4.amoimproject.error.data.exception.TransactionException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RequiredArgsConstructor
@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
    private static final Logger LOGGER = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(value = { TransactionException.class })
    protected ResponseEntity<ErrorResponse> handleDataException(TransactionException e) {
        LOGGER.error("handleDataException throw Exception : {}", e.getDataBaseErrorCode());
        return ErrorResponse.toResponseEntity(e.getDataBaseErrorCode());
    }

    @ExceptionHandler(value = { CustomException.class })
    protected ResponseEntity<ErrorResponse> handleCustomException(CustomException e) {
        LOGGER.error("handleCustomException throw CustomException : {}", e.getCustomErrorCode());
        return ErrorResponse.toResponseEntity(e.getCustomErrorCode());
    }
}
