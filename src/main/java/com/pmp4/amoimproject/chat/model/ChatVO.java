package com.pmp4.amoimproject.chat.model;

import lombok.Data;

import java.sql.Date;
import java.sql.Timestamp;

@Data
public class ChatVO {
    private Long no;
    private String message;
    private Long userNo;
    private Long meetingNo;
    private Timestamp regdate;
}
