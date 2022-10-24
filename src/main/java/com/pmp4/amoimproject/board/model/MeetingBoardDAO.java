package com.pmp4.amoimproject.board.model;

import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

@Mapper
public interface MeetingBoardDAO {
    int insertBoard(MeetingBoardVO meetingBoardVO);
    int insertBoardUploadFile(Map<String, Object> map);
}
