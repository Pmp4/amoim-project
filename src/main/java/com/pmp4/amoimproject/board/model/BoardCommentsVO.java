package com.pmp4.amoimproject.board.model;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class BoardCommentsVO {
    private Long no;
    private Long boardNo;
    private Long userNo;
    private String username;
    private String commentText;
    private Timestamp regdate;
    private String delFlg;
    private Long parentNo;
    private Long parentUserNo;
    private String parentUsername;
}
