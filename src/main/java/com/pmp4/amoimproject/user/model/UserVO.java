package com.pmp4.amoimproject.user.model;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class UserVO {
    private Long userNo;
    private String userId;
    private String password;
    private String name;
    private String phoneNumber;
    private String birthDay;
    private String socialLoginHost;
    private String socialLoginKey;
    private char gender;    //'남자 M, 여자 F',
    private Timestamp startDate;
    private Timestamp outDate;
    private String email;
    private String salt;
    private String profileImage;
    private String intro;
}
