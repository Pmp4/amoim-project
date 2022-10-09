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
}
