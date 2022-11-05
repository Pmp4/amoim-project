package com.pmp4.amoimproject.board.model;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface CommentsDAO {
    int insertComment(BoardCommentsVO boardCommentsVO);

    List<BoardCommentsVO> selectCommentList(Map<String, Object> dbParam);

    int commentCount(Long boardNo);

    List<BoardCommentsVO> selectReplyList(Map<String, Object> dbParam);
}
