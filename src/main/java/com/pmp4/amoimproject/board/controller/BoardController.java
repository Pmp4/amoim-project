package com.pmp4.amoimproject.board.controller;


import com.pmp4.amoimproject.board.model.MeetingBoardService;
import com.pmp4.amoimproject.board.model.MeetingBoardVO;
import com.pmp4.amoimproject.common.PaginationInfo;
import com.pmp4.amoimproject.meeting.model.MeetingService;
import com.pmp4.amoimproject.meeting.model.MeetingVO;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
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
        String userNo = String.valueOf(httpServletRequest.getSession().getAttribute("userNo"));

        Map<String, Object> responseData = new HashMap<>();

        if(!userNo.isEmpty()) {
            meetingBoardVO.setUserNo(Long.valueOf(userNo));

            int cnt = meetingBoardService.boardRegister(httpServletRequest, meetingBoardVO);
            logger.info("BOARD 글쓰기 결과 cnt={}", cnt);

            if(cnt > 0) {
                responseData.put("SUCCESS", true);
            }else {
                responseData.put("SUCCESS", false);
                responseData.put("SUCCESS_TEXT", "Server DB Error");
            }
        }else {
            responseData.put("SUCCESS", false);
            responseData.put("SUCCESS_TEXT", "로그인 후, 시도해주세요.");
        }

        return responseData;
    }


    @GetMapping("/select")
    public Map<String, Object> moimBoardSelect(@RequestParam Long meetingNo,
                                               @RequestParam (defaultValue = "1") int page,
                                               @RequestParam (defaultValue = "8") int length,
                                               HttpSession httpSession) {
        logger.info("BOARD 글 조회 meetingNo={}", meetingNo);

        String userNo = String.valueOf(httpSession.getAttribute("userNo"));
        Map<String, Object> responseData = new HashMap<>();
        PaginationInfo paginationInfo = new PaginationInfo(length, page);

        List<Map<String, Object>> list = null;

        if(!userNo.isEmpty()) {
            Map<String, Object> dbSet = new HashMap<>();

            dbSet.put("length", paginationInfo.getBlockSize());
            dbSet.put("start", paginationInfo.getStartRecord());
            dbSet.put("meetingNo", meetingNo);

            list = meetingBoardService.selectByMeetingNo(dbSet);
            int cnt = meetingBoardService.selectByMeetingNoCount(dbSet);
            logger.info("BOARD 글 조회 결과 list.size={}", list.size());
            logger.info("BOARD 글 조회 총 개수 cnt={}", cnt);

            paginationInfo.setTotalRecord(cnt);

            if(list != null) {
                responseData.put("SUCCESS", true);
                responseData.put("list", list);
                responseData.put("pageInfo", paginationInfo);
            }else {
                responseData.put("SUCCESS", false);
                responseData.put("SUCCESS_TEXT", "Server DB Error");
            }
        }else {
            responseData.put("SUCCESS", false);
            responseData.put("SUCCESS_TEXT", "로그인 후, 시도해주세요.");
        }

        return responseData;
    }
}
