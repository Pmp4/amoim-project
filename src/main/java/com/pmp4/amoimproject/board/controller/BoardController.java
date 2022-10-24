package com.pmp4.amoimproject.board.controller;


import com.pmp4.amoimproject.board.model.MeetingBoardService;
import com.pmp4.amoimproject.board.model.MeetingBoardVO;
import com.pmp4.amoimproject.meeting.model.MeetingService;
import com.pmp4.amoimproject.meeting.model.MeetingVO;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/board")
public class BoardController {
    private static final Logger logger = LoggerFactory.getLogger(BoardController.class);

    private final MeetingBoardService meetingBoardService;


    @PostMapping("/insert")
    public Map<String, Object> insertBoard(@RequestPart(value = "contents") MeetingBoardVO meetingBoardVO,
                                           HttpServletRequest httpServletRequest) {
        logger.info("BOARD 글쓰기 meetingBoardVO={}", meetingBoardVO);

        Map<String, Object> responseData = new HashMap<>();

        int cnt = meetingBoardService.boardRegister(httpServletRequest, meetingBoardVO);
        logger.info("BOARD 글쓰기 결과 cnt={}", cnt);

        if(cnt > 0) {
            responseData.put("SUCCESS", true);
        }else {
            responseData.put("SUCCESS", false);
            responseData.put("SUCCESS_TEXT", "Server DB Error");
        }

        return responseData;
    }
}
