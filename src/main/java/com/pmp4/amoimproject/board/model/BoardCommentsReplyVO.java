package com.pmp4.amoimproject.board.model;

import lombok.Data;

import java.util.List;

@Data
public class BoardCommentsReplyVO {
    private BoardCommentsVO boardCommentsVO;
    private List<BoardCommentsVO> replyList;
}
