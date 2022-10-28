package com.pmp4.amoimproject.meeting.api;

import com.pmp4.amoimproject.common.FileUploadUtil;
import com.pmp4.amoimproject.common.PaginationInfo;
import com.pmp4.amoimproject.meeting.model.MeetingAddressVO;
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




//    @GetMapping("/select")
//    public Map<String, Object> selectByCard(@RequestParam String type,
//                                                  @RequestParam String key,
//                                                  @RequestParam (required = false, defaultValue = "1") int page,
//                                                  @RequestParam (required = false, defaultValue = "8") int length,
//                                                  HttpSession httpSession) {
//        String userNo = String.valueOf(httpSession.getAttribute("userNo"));
//        logger.info("MEETING 카드 조회 type={}, key={}, page={}, length={}", type, key, page, length);
//
//        switch (type) {
//            case "USER_NO":
//                key = userNo;
//                length = 12;
//                break;
//            case "CATEGORY_CODE":
//                type = "i." + type;
//                key = key.substring(0, 3);
//                break;
//            case "SIGNING":
//                key = userNo;
//                break;
//        }
//
//        PaginationInfo paginationInfo = new PaginationInfo(length, page);
//
//        logger.info("MEETING 카드 조회 필터 type={}, key={}", type, key);
//
//        Map<String, Object> dbType = new HashMap<>();
//        dbType.put("type", type);
//        dbType.put("key", key);
//        dbType.put("length", paginationInfo.getBlockSize());
//        dbType.put("start", paginationInfo.getStartRecord());
//        dbType.put("number", false);
//
//        List<Map<String, Object>> list = meetingService.selectByUserNoCard(dbType);
//
//        dbType.put("number", true);
//        int totalRecord = meetingService.selectByUserNoCardPageCount(dbType);
//
//        logger.info("MEETING 카드 조회 결과 list.size={}, totalRecord={}", list.size(), totalRecord);
//
//
//        paginationInfo.setTotalRecord(totalRecord);
//        logger.info("MEETING 카드 조회 paginationInfo={}", paginationInfo);
//
//        Map<String, Object> responseData = new HashMap<>();
//        responseData.put("list", list);
//        responseData.put("pageInfo", paginationInfo);
//
//        return responseData;
//    }


    @GetMapping("/select/main/loc")
    public Map<String, Object> moimHomeLocList(HttpServletRequest httpServletRequest) {
        logger.info("[moimHomeLocList] 핸들러");

        return meetingService.mainLocList(httpServletRequest);
    }

    @GetMapping("/select/main/category")
    public Map<String, Object> moimHomeCategoryList(@RequestParam String code,
                                                    @RequestParam int page,
                                                    @RequestParam int length) {
        logger.info("[moimHomeCategoryList] 핸들러 code : {}, page : {}, length : {}",
                code, page, length);

        code = code.substring(0, 3);
        return meetingService.pageItemList("category", code, page, length);
    }



    @GetMapping("/signing")
    public Map<String, Object> selectUserSigning(@RequestParam (required = false, defaultValue = "1") int page,
                                                 @RequestParam (required = false, defaultValue = "8") int length,
                                                 HttpSession httpSession) {
        String userNo = String.valueOf(httpSession.getAttribute("userNo"));

        logger.info("MEETING 가입된 모임 정보 조회 userNo={}, page={}, length={}", userNo, page, length);

        PaginationInfo paginationInfo = new PaginationInfo(length, page);

        Map<String, Object> dbType = new HashMap<>();
        dbType.put("userNo", userNo);
        dbType.put("length", paginationInfo.getBlockSize());
        dbType.put("start", paginationInfo.getStartRecord());

        List<Map<String, Object>> dbData = meetingService.signingUpMoim(dbType);
        int count = meetingService.signingUpMoimCount(dbType);

        logger.info("MEETING 가입된 모임 정보 조회 결과 dbData={}, count={}", dbData, count);
        paginationInfo.setTotalRecord(count);

        Map<String, Object> responseData = new HashMap<>();
        responseData.put("list", dbData);
        responseData.put("count", count);

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


    //해당 유저가 모임 글을 몇개 작성했는지
    //해당 유저가 모임 글을 몇개 작성했는지
    //해당 유저가 모임 글을 몇개 작성했는지
    @GetMapping(value = {"/user/count/{userNo}", "/user/count"})
    public int selectByUserCount(@PathVariable (required = false) String userNo,
                                 HttpSession httpSession) {
        logger.info("MEETING USER 생성 정보 조회 userNo={}", userNo);

        if(userNo == null) userNo = String.valueOf(httpSession.getAttribute("userNo"));

        int cnt = meetingService.selectByUserCount(userNo);
        logger.info("MEETING USER 생성 정보 조회 결과 cnt={}", cnt);


        return cnt;
    }


    //모임의 좋아요 개수만 따로 조회하는
    //모임의 좋아요 개수만 따로 조회하는
    //모임의 좋아요 개수만 따로 조회하는
    @GetMapping("/like/count/{meetingNo}")
    public int likeCount(@PathVariable String meetingNo) {
        logger.info("MEETING LIKE 개수 meetingNo={}", meetingNo);

        int cnt = meetingService.likeCount(meetingNo);
        logger.info("MEETING LIKE 개수 결과 cnt={}", cnt);

        return cnt;
    }


    //해당 모임 글에 유저가 좋아요를 눌렀는지 아닌지
    //해당 모임 글에 유저가 좋아요를 눌렀는지 아닌지
    //해당 모임 글에 유저가 좋아요를 눌렀는지 아닌지
    @GetMapping("/like/state/{meetingNo}")
    public int likeState(@PathVariable String meetingNo, HttpSession httpSession) {
        logger.info("MEETING LIKE 상태 확인 meetingNo={}", meetingNo);

        String userNo = String.valueOf(httpSession.getAttribute("userNo"));
        int cnt;
        if(userNo != null && !userNo.isEmpty()) {
            cnt = meetingService.meetingLikeState(userNo, meetingNo);
            logger.info("MEETING LIKE 상태 확인 결과 cnt={}", cnt);
        }else {
            cnt = -1;
        }

        return cnt;
    }



    @PostMapping(value = "/like/add")
    public Map<String, Object> meetingLikeInsert(@RequestBody String meetingNo, HttpSession httpSession) {
        logger.info("MEETING LIKE 추가 meetingNo={}", meetingNo);

        String userNo = String.valueOf(httpSession.getAttribute("userNo"));

        Map<String, Object> restData = new HashMap<>();

        if(userNo != null && !userNo.isEmpty()) {
            int cnt = 0;

            cnt = meetingService.insertMeetingLike(userNo, meetingNo);
            logger.info("MEETING LIKE 추가 결과 cnt={}", cnt);

            if(cnt > 0) {
                restData.put("SUCCESS", true);
            }else {
                restData.put("SUCCESS", false);
                restData.put("SUCCESS_MSG", "Server DB Error");
            }
        }else {
            restData.put("SUCCESS", false);
            restData.put("SUCCESS_MSG", "로그인 후 시도해주세요.");
        }


        return restData;
    }

    @DeleteMapping(value = "/like/delete/{meetingNo}")
    public Map<String, Object> meetingLikeDelete(@PathVariable String meetingNo, HttpSession httpSession) {
        logger.info("MEETING LIKE 삭제 meetingNo={}", meetingNo);

        String userNo = String.valueOf(httpSession.getAttribute("userNo"));

        Map<String, Object> restData = new HashMap<>();

        if(userNo != null && !userNo.isEmpty()) {
            int cnt = 0;

            cnt = meetingService.deleteMeetingLike(userNo, meetingNo);
            logger.info("MEETING LIKE 삭제 결과 cnt={}", cnt);

            if(cnt > 0) {
                restData.put("SUCCESS", true);
            }else {
                restData.put("SUCCESS", false);
                restData.put("SUCCESS_MSG", "Server DB Error");
            }
        }else {
            restData.put("SUCCESS", false);
            restData.put("SUCCESS_MSG", "로그인 후 시도해주세요.");
        }


        return restData;
    }



    @PostMapping("/subscribe")
    public Map<String, Object> meetingSubscribe(@RequestBody String meetingNo, HttpSession httpSession) {
        logger.info("MEETING 가입 신청 meetingNo={}", meetingNo);
        String userNo = String.valueOf(httpSession.getAttribute("userNo"));

        Map<String, Object> resultData = new HashMap<>();
        if(userNo != null && !userNo.isEmpty()) {
            resultData = meetingService.meetingSubscribe(userNo, meetingNo);
        }else {
            resultData.put("SUCCESS", false);
            resultData.put("SUCCESS_TEXT", "로그인 후 시도해주세요.");
        }

        return resultData;
    }




    @GetMapping("/subscribe/list")
    public Map<String, Object> meetingSubscribeList(HttpSession httpSession) {
        String userNo = String.valueOf(httpSession.getAttribute("userNo"));

        logger.info("MEETING 가입 신청 리스트 조회 userNo={}", userNo);
        Map<String, Object> resultData = new HashMap<>();

        if(userNo != null && !userNo.isEmpty()) {
            List<Map<String, Object>> dbData = meetingService.moimSubscribeList(userNo);
            logger.info("MEETING 가입 신청 리스트 조회 결과 dbData.size={}", dbData.size());

            resultData.put("SUCCESS", true);
            resultData.put("DATA", dbData);
        }else {
            resultData.put("SUCCESS", false);
            resultData.put("SUCCESS_TEXT", "로그인 후 시도해주세요.");
        }

        return resultData;
    }




    @PutMapping("/subscribe/result")
    public Map<String, Object> subscribeResult (@RequestBody Map<String, Object> rest) {
        logger.info("MEETING 가입 신청 수락 rest={}", rest);

        Map<String, Object> resultData = meetingService.moimSubscribeResult(rest);
        logger.info("MEETING 가입 신청 최종확인 resultData={}", resultData);

        return resultData;
    }


    @PutMapping("/subscribe/refusal")
    public Map<String, Object> subscribeRefusal (@RequestBody Map<String, Object> rest) {
        logger.info("MEETING 가입 신청 거절 rest={}", rest);

        Map<String, Object> resultData = meetingService.moimSubscribeRefusal(rest);
        logger.info("MEETING 가입 거절 최종확인 resultData={}", resultData);

        return resultData;
    }
}
