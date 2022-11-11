package com.pmp4.amoimproject.error.data;


import com.pmp4.amoimproject.error.data.code.DataBaseErrorCode;
import com.pmp4.amoimproject.error.data.code.ErrorCode;
import lombok.Builder;
import lombok.Getter;
import org.springframework.http.ResponseEntity;

@Getter
@Builder
public class ErrorResponse {
    private final int status;
    private final String error;
    private final String code;
    private final String message;


    public static ResponseEntity<ErrorResponse> toResponseEntity(ErrorCode errorCode) {
        return ResponseEntity
                .status(errorCode.getHttpStatus())
                .body(ErrorResponse.builder()
                        .status(errorCode.getHttpStatus().value())
                        .error(errorCode.getHttpStatus().name())
                        .code(errorCode.name())
                        .message(errorCode.getMessage())
                        .build()
                );
    }

    public static ResponseEntity<ErrorResponse> toResponseEntity(DataBaseErrorCode dataBaseErrorCode) {
        return ResponseEntity
                .status(dataBaseErrorCode.getHttpStatus())
                .body(ErrorResponse.builder()
                        .status(dataBaseErrorCode.getHttpStatus().value())
                        .error(dataBaseErrorCode.getHttpStatus().name())
                        .code(dataBaseErrorCode.name())
                        .message(dataBaseErrorCode.getMessage())
                        .build()
                );
    }
}
