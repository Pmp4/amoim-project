package com.pmp4.amoimproject.board.model;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.context.annotation.Bean;

import java.util.List;
import java.util.Map;

@Mapper
public interface MeetingBoardDAO {
    int insertBoard(MeetingBoardVO meetingBoardVO);
    int insertBoardUploadFile(Map<String, Object> map);

    List<Map<String, Object>> selectByMeetingNo(Map<String, Object> map);

    int selectByMeetingNoCount(Long meetingNo);


    MeetingBoardFileVO selectByBoardNo(Long no);






    int insertComment(BoardCommentsVO boardCommentsVO);

    List<BoardCommentsVO> selectCommentList(Map<String, Object> dbParam);

    List<BoardCommentsVO> selectReplyList(Map<String, Object> dbParam);

    int commentCount(Long boardNo);
}
