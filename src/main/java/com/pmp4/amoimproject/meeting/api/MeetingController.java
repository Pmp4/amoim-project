package com.pmp4.amoimproject.meeting.api;

import com.pmp4.amoimproject.common.ConstUtil;
import com.pmp4.amoimproject.common.FileUploadUtil;
import com.pmp4.amoimproject.meeting.model.MeetingService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;
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

    @PostMapping("/insert")
    public Map<String, Object> insertMeeting(HttpServletRequest httpServletRequest,
                                             @RequestPart(value = "key") Map<String, Object> key
//                                             @RequestPart(value = "file") MultipartFile multipartFile,
    ) {
        logger.info("MEETING 등록, key={}", key);
        List<Map<String, Object>> fileList = new ArrayList<>();
        try {
            fileList = fileUploadUtil.mulitiFileUpload(httpServletRequest, ConstUtil.UPLOAD_IMAGE_FLAG);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        logger.info("파일 업로드, fileList={}", fileList);
        /**
         * 로직 순서
         * [1] 게시글 등록
         * [2] 태그 등록
         * [3] 이미지 파일 등록
         * [4] 주소 등록
         *
         */


        /**
         * key={
         *  title=제목,
         *  content=내용,
         *  tagAdd=[태그1, 태그2],
         *  address={
         *      zonecode=,
         *      address=제주특별자치도 제주시 영평동 2273,
         *      roadAddress=,
         *      jibunAddress=제주특별자치도 제주시 영평동 2273,
         *      sido=제주특별자치도,
         *      sigungu=제주시,
         *      bname=영평동,
         *      bcode=5011013600
         *  },
         *  categoryCode=50010000,
         *  dues=123}
         */

        Map<String, Object> resData = new HashMap<>();

        return resData;
    }
}
