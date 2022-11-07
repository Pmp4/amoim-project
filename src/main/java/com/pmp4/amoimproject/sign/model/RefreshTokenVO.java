package com.pmp4.amoimproject.sign.model;


import lombok.Data;

import java.sql.Timestamp;

@Data
public class RefreshTokenVO {
    private Long no;
    private String accessToken;
    private String refreshToken;
    private String userId;
    private Timestamp regdate;
}
