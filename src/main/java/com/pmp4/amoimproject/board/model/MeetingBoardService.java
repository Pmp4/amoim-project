package com.pmp4.amoimproject.board.model;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

public interface MeetingBoardService {
    int boardRegister(HttpServletRequest request, MeetingBoardVO meetingBoardVO);
}
