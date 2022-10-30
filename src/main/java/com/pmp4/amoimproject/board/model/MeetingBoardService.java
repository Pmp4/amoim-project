package com.pmp4.amoimproject.board.model;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

public interface MeetingBoardService {
    int boardRegister(HttpServletRequest request, MeetingBoardVO meetingBoardVO);

    Map<String, Object> selectBoard(Long meetingNo, int page, int length);


    MeetingBoardFileVO boardView(Long no);
}
