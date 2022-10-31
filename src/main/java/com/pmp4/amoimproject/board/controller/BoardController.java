package com.pmp4.amoimproject.board.controller;


import com.pmp4.amoimproject.board.model.*;
import com.pmp4.amoimproject.sign.model.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
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
        logger.info("[insertBoard] 핸들러 meetingBoardVO : {}", meetingBoardVO);
        PrincipalDetails principal =
                (PrincipalDetails)SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Long userNo = principal.getUserVO().getUserNo();

        Map<String, Object> responseData = new HashMap<>();
        meetingBoardVO.setUserNo(userNo);

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


    @GetMapping("/select")
    public Map<String, Object> moimBoardSelect(@RequestParam Long meetingNo,
                                               @RequestParam (defaultValue = "1") int page,
                                               @RequestParam (defaultValue = "8") int length) {
        logger.info("[moimBoardSelect] 핸들러 meetingNo : {}, page : {}, length : {}",
                meetingNo, page, length);

        return meetingBoardService.selectBoard(meetingNo, page, length);
    }


    @GetMapping("/view/{no}")
    public MeetingBoardFileVO moimBoardView(@PathVariable Long no) {
        logger.info("[moimBoardView] 핸들러 no : {}", no);

        return meetingBoardService.boardView(no);
    }









    @PostMapping("/comment/insert")
    public int moimBoardCommentInsert(@RequestBody BoardCommentsVO boardCommentsVO) {
        logger.info("[moimBoardCommentInsert] 핸들러 boardCommentsVO : {}", boardCommentsVO);

        return meetingBoardService.insertComment(boardCommentsVO);
    }




    @GetMapping("/comment/list")
    public Map<String, Object> moimBoardCommentsList(@RequestParam Long boardNo,
                                                            @RequestParam int page,
                                                            @RequestParam int length) {
        logger.info("[moimBoardCommentsList] 핸들러 boardNo : {}, page : {}, length : {}", boardNo, page, length);

        return meetingBoardService.selectCommentList(boardNo, page, length);
    }


//    @GetMapping("/select")
//    public Map<String, Object> moimBoardSelect(@RequestParam Long meetingNo,
//                                               @RequestParam (defaultValue = "1") int page,
//                                               @RequestParam (defaultValue = "8") int length,
//                                               HttpSession httpSession) {
//        logger.info("BOARD 글 조회 meetingNo={}", meetingNo);
//
//        String userNo = String.valueOf(httpSession.getAttribute("userNo"));
//        Map<String, Object> responseData = new HashMap<>();
//        PaginationInfo paginationInfo = new PaginationInfo(length, page);
//
//        List<Map<String, Object>> list = null;
//
//        if(!userNo.isEmpty()) {
//            Map<String, Object> dbSet = new HashMap<>();
//
//            dbSet.put("length", paginationInfo.getBlockSize());
//            dbSet.put("start", paginationInfo.getStartRecord());
//            dbSet.put("meetingNo", meetingNo);
//
//            list = meetingBoardService.selectByMeetingNo(dbSet);
//            int cnt = meetingBoardService.selectByMeetingNoCount(dbSet);
//            logger.info("BOARD 글 조회 결과 list.size={}", list.size());
//            logger.info("BOARD 글 조회 총 개수 cnt={}", cnt);
//
//            paginationInfo.setTotalRecord(cnt);
//
//            if(list != null) {
//                responseData.put("SUCCESS", true);
//                responseData.put("list", list);
//                responseData.put("pageInfo", paginationInfo);
//            }else {
//                responseData.put("SUCCESS", false);
//                responseData.put("SUCCESS_TEXT", "Server DB Error");
//            }
//        }else {
//            responseData.put("SUCCESS", false);
//            responseData.put("SUCCESS_TEXT", "로그인 후, 시도해주세요.");
//        }
//
//        return responseData;
//    }
}
