package com.pmp4.amoimproject.meeting.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pmp4.amoimproject.common.ConstUtil;
import com.pmp4.amoimproject.common.FileUploadUtil;
import com.pmp4.amoimproject.meeting.model.MeetingAddressVO;
import com.pmp4.amoimproject.meeting.model.MeetingService;
import com.pmp4.amoimproject.meeting.model.MeetingVO;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/meeting")
public class MeetingController {
    private static final Logger logger = LoggerFactory.getLogger(MeetingController.class);

    private final MeetingService meetingService;
    private final FileUploadUtil fileUploadUtil;

//    @PostMapping("/insert")
//    public Map<String, Object> insertMeeting(@RequestPart(value = "key") Map<String, Object> key,
//                                             @RequestPart(value = "file") MultipartFile multipartFile) {
    @PostMapping("/insert")
    public Map<String, Object> insertMeeting(HttpServletRequest httpServletRequest,
                                             @RequestPart(value = "contentsData") MeetingVO meetingVO,
                                             @RequestPart(value = "addressData") MeetingAddressVO meetingAddressVO,
                                             @RequestPart(value = "tagData") List<String> tagData) {
        logger.info("MEETING 등록 meetingVO={}", meetingVO);
        logger.info("MEETING 등록 meetingAddressVO={}", meetingAddressVO);
        logger.info("MEETING 등록 tagData={}", tagData);

        int result = meetingService.meetingRegister(meetingVO, meetingAddressVO, tagData, httpServletRequest);
        Map<String, Object> resData = new HashMap<>();

        if(result > 0) {
            resData.put("SUCCESS", true);
            resData.put("SUCCESS_TEXT", "업로드 성공");
        }else {
            resData.put("SUCCESS", false);
            resData.put("SUCCESS_TEXT", "서버 DB 에러");
        }

        return resData;
    }


    @GetMapping(value = {"/select/{userNo}", "/select"})
    public List<Map<String, Object>> selectByUserNo(@PathVariable (required = false) Long userNo,
                                                    HttpSession httpSession) {
        logger.info("MEETING 유저 생성 조회 userNo={}", userNo);

        if(userNo == null) userNo = (Long) httpSession.getAttribute("userNo");

        List<Map<String, Object>> responseData = meetingService.selectByUserNoCard(userNo);
        logger.info("MEETING 유저 생성 조회 결과 resData.size={}", responseData.size());

        return responseData;
    }


    @GetMapping("/select/view/{no}")
    public Map<String, Object> selectByNo(@PathVariable String no) {
        logger.info("MEETING 정보 조회 no={}", no);

        Map<String, Object> dbData = meetingService.selectByNo(no);
        logger.info("MEETING 정보 조회 결과 dbData={}", dbData);

        Map<String, Object> restData = new HashMap<>();

        if(dbData != null) {
            restData.put("SUCCESS", true);
            restData.put("rest", dbData);
        }else {
            restData.put("SUCCESS", false);
        }


        return restData;
    }



    @GetMapping(value = {"/user/count/{userNo}", "/user/count"})
    public int selectByUserCount(@PathVariable (required = false) String userNo,
                                 HttpSession httpSession) {
        logger.info("MEETING USER 생성 정보 조회 userNo={}", userNo);

        if(userNo == null) userNo = String.valueOf(httpSession.getAttribute("userNo"));

        int cnt = meetingService.selectByUserCount(userNo);
        logger.info("MEETING USER 생성 정보 조회 결과 cnt={}", cnt);


        return cnt;
    }
}
