package com.pmp4.amoimproject.meeting.model;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class MeetingVO {
    private Long no;
    private Long userNo;
    private String title;
    private String content;
    private String categoryCode;
    private String personNumber;
    private String dues;
    private String delFlg;
    private Timestamp regdate;
    private Timestamp revisedDate;
}
