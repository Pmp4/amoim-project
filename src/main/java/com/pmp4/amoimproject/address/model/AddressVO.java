package com.pmp4.amoimproject.address.model;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class AddressVO {
    private Long addressNo;
    private Long userNo;
    private String zonecode;
    private String address;
    private String roadAddress;
    private String jibunAddress;
    private String sido;
    private String sigungu;
    private String bcode;
    private String bname;
    private Timestamp regdate;
    private char delFlag;
}
