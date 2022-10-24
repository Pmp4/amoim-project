package com.pmp4.amoimproject.board.model;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

public interface MeetingBoardService {
    int boardRegister(HttpServletRequest request, MeetingBoardVO meetingBoardVO);

    List<Map<String, Object>> selectByMeetingNo(Map<String, Object> map);
}
