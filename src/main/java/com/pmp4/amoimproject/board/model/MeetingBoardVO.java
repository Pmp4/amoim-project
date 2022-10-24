package com.pmp4.amoimproject.board.model;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class MeetingBoardVO {
    private Long no;
    private String title;
    private String content;
    private Long userNo;
    private Long meetingNo;
    private Timestamp regdate;
    private char delFlag;
    private Long categoryNo;
}
