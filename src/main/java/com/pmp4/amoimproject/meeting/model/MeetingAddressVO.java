package com.pmp4.amoimproject.meeting.model;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class MeetingAddressVO {
    private Long addressNo;
    private Long meetingNo;
    private String zonecode;
    private String address;
    private String roadAddress;
    private String jibunAddress;
    private String sido;
    private String sigungu;
    private String bcode;
    private String bname;
    private String placeName;
    private double latY;
    private double lonX;
    private Timestamp regdate;
    private String delFlag;
}
