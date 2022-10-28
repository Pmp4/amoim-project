package com.pmp4.amoimproject.sign.model;

import lombok.*;

@Data
@NoArgsConstructor
@ToString
public class SignInResultVO {
    private boolean success;
    private int code;
    private String msg;
    private String token;

    @Builder
    public SignInResultVO(boolean success, int code, String msg, String token) {
        this.success = success;
        this.code = code;
        this.msg = msg;
        this.token = token;
    }

}
