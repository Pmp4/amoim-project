package com.pmp4.amoimproject.meeting.controller;

import com.pmp4.amoimproject.common.PaginationInfo;
import com.pmp4.amoimproject.error.data.code.DataBaseErrorCode;
import com.pmp4.amoimproject.error.data.exception.TransactionException;
import com.pmp4.amoimproject.jwt.JwtTokenProvider;
import com.pmp4.amoimproject.meeting.model.MeetingAddressVO;
import com.pmp4.amoimproject.meeting.model.MeetingService;
import com.pmp4.amoimproject.meeting.model.MeetingVO;
import com.pmp4.amoimproject.sign.model.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
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
    private final JwtTokenProvider jwtTokenProvider;

    //    @PostMapping("/insert")
//    public Map<String, Object> insertMeeting(@RequestPart(value = "key") Map<String, Object> key,
//                                             @RequestPart(value = "file") MultipartFile multipartFile) {
    @PostMapping("/insert")
    public Map<String, Object> insertMeeting(HttpServletRequest httpServletRequest,
                                             @RequestPart(value = "contentsData") MeetingVO meetingVO,
                                             @RequestPart(value = "addressData") MeetingAddressVO meetingAddressVO,
                                             @RequestPart(value = "tagData") List<String> tagData) {
        logger.info("[insertMeeting] 핸들러 meetingVO={}", meetingVO);
        logger.info("[insertMeeting] 핸들러 meetingAddressVO={}", meetingAddressVO);
        logger.info("[insertMeeting] 핸들러 tagData={}", tagData);

        int result = meetingService.meetingRegister(meetingVO, meetingAddressVO, tagData, httpServletRequest);
        Map<String, Object> resData = new HashMap<>();

        if (result > 0) {
            resData.put("SUCCESS", true);
            resData.put("SUCCESS_TEXT", "업로드 성공");
        } else {
            resData.put("SUCCESS", false);
            resData.put("SUCCESS_TEXT", "서버 DB 에러");
        }

        return resData;
    }

    @DeleteMapping("/delete/{meetingNo}")
    public int deleteMoim(@PathVariable Long meetingNo) {
        logger.info("[insertMeeting] 핸들러 meetingNo={}", meetingNo);

        return meetingService.deleteMoim(meetingNo);
    }


    @PostMapping("/edit/{meetingNo}")
    public int editMoim(HttpServletRequest httpServletRequest,
                         @PathVariable Long meetingNo,
                         @RequestPart(value = "contents") MeetingVO meetingVO,
                         @RequestPart(value = "address") MeetingAddressVO meetingAddressVO,
                         @RequestPart(value = "tags") List<String> tags,
                         @RequestPart(value = "state") Map<String, Object> editState) {
        logger.info("[editMoim] 핸들러 meetingNo : {}", meetingNo);
        logger.info("[editMoim] 핸들러 meetingVO : {}", meetingVO);
        logger.info("[editMoim] 핸들러 meetingAddressVO : {}", meetingAddressVO);
        logger.info("[editMoim] 핸들러 tags : {}", tags);
        logger.info("[editMoim] 핸들러 editState : {}", editState);


        return meetingService.moimEditTransaction(httpServletRequest, meetingVO, meetingAddressVO, tags, editState);
    }



    @PostMapping("/hits/{meetingNo}")
    public int viewCountMoim (@PathVariable Long meetingNo) {
        logger.info("[viewCountMoim] 핸들러 meetingNo : {}", meetingNo);

        PrincipalDetails principal =
                (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Long userNo = principal.getUserVO().getUserNo();
        logger.info("[viewCountMoim] SecurityContextHolder 추출 userNo : {}", userNo);

        return meetingService.hitsMoim(meetingNo, userNo);
    }



    @GetMapping("/user/interest/{code}")
    public List<Map<String, Object>> moimUserInterest(@PathVariable String code) {
        logger.info("[moimUserInterest] 핸들러 code : {}", code);

        PrincipalDetails principal =
                (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Long userNo = principal.getUserVO().getUserNo();
        logger.info("[moimUserInterest] SecurityContextHolder 추출 userNo : {}", userNo);

        return meetingService.moimUserInterest(userNo, code);
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


    //지역별(시, 도) 모임 리스트 12개
    //지역별(시, 도) 모임 리스트 12개
    //지역별(시, 도) 모임 리스트 12개
    @GetMapping("/select/main/loc")
    public Map<String, Object> moimHomeLocList(HttpServletRequest httpServletRequest) {
        logger.info("[moimHomeLocList] 핸들러");

        String token = jwtTokenProvider.resolveToken(httpServletRequest);
        logger.info("[moimHomeLocList] 로그인 여부 token: {}", token);

        String username = "";
        if(token != null && !token.isEmpty() && !token.equals("null") && jwtTokenProvider.validateToken(token)) {
            username = jwtTokenProvider.getUsername(token);
            logger.info("[moimHomeLocList] 유저 아이디 username : {}", username);
        }

        return meetingService.mainLocList(httpServletRequest, username);
    }

    // 메인화면 카테고리별 모임 아이템 리스트
    // 메인화면 카테고리별 모임 아이템 리스트
    // 메인화면 카테고리별 모임 아이템 리스트
    @GetMapping("/select/main/category")
    public Map<String, Object> moimHomeCategoryList(@RequestParam String code,
                                                    @RequestParam int page,
                                                    @RequestParam int length) {
        logger.info("[moimHomeCategoryList] 핸들러 code : {}, page : {}, length : {}",
                code, page, length);

        code = code.substring(0, 3);
        return meetingService.pageItemList("category", code, page, length);
    }


    // 자신이 생성한 모임
    // 자신이 생성한 모임
    // 자신이 생성한 모임
    @GetMapping("/select/own")
    public Map<String, Object> moimOwnList() {
        logger.info("[moimOwnList] 핸들러");
        PrincipalDetails principal =
                (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Long userNo = principal.getUserVO().getUserNo();
        logger.info("[moimOwnList] SecurityContextHolder 추출 userNo : {}", userNo);

        return meetingService.pageItemList("user", String.valueOf(userNo), 1, 4);
    }


    // 유저의 좋아요 리스트
    // 유저의 좋아요 리스트
    // 유저의 좋아요 리스트
    @GetMapping("/select/user/like")
    public Map<String, Object> moimUserLike(@RequestParam int page,
                                            @RequestParam int length) {
        logger.info("[moimUserLike] 핸들러");
        PrincipalDetails principal =
                (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Long userNo = principal.getUserVO().getUserNo();
        logger.info("[moimOwnList] SecurityContextHolder 추출 userNo : {}", userNo);

        return meetingService.moimUserLikeCard(userNo, page, length);
    }


    //유저의 최근 본 목록 (오늘날짜 기준)
    //유저의 최근 본 목록 (오늘날짜 기준)
    //유저의 최근 본 목록 (오늘날짜 기준)
    @GetMapping("/user/view")
    public Map<String, Object> moimUserView(@RequestParam int page,
                                            @RequestParam int length) {
        logger.info("[moimUserView] 핸들러");
        PrincipalDetails principal =
                (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Long userNo = principal.getUserVO().getUserNo();
        logger.info("[moimUserView] SecurityContextHolder 추출 userNo : {}", userNo);

        return meetingService.moimUserTodayView(userNo, page, length);
    }



    // 자신이 생성한 모임 개수
    // 자신이 생성한 모임 개수
    // 자신이 생성한 모임 개수
    @GetMapping("/select/own/count")
    public int moimOwnCount() {
        logger.info("[moimOwnCount] 핸들러");

        PrincipalDetails principal =
                (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Long userNo = principal.getUserVO().getUserNo();
        logger.info("[moimOwnCount] SecurityContextHolder 추출 userNo : {}", userNo);

        return meetingService.moimOwnCount("user", String.valueOf(userNo));
    }


    // 가입한 모임
    // 가입한 모임
    // 가입한 모임
    @GetMapping("/select/subscript")
    public Map<String, Object> moimSubscriptList(@RequestParam(defaultValue = "1") int page,
                                                 @RequestParam(defaultValue = "8") int blockSize) {
        logger.info("[moimSubscriptList] 핸들러");

        PrincipalDetails principal =
                (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Long userNo = principal.getUserVO().getUserNo();
        logger.info("[moimSubscriptList] SecurityContextHolder 추출 userNo : {}", userNo);

        return meetingService.moimSubscript(String.valueOf(userNo), page, blockSize);
    }


    // 모임 보기
    // 모임 보기
    // 모임 보기
    @GetMapping("/view/{no}")
    public Map<String, Object> moimView(@PathVariable Long no) {
        logger.info("[moimView] 핸들러 no : {}", no);

        return meetingService.selectByNoView(no);
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
    public int likeState(@PathVariable Long meetingNo) {
        logger.info("[likeState] 핸들러 meetingNo={}", meetingNo);

        PrincipalDetails principal =
                (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long userNo = principal.getUserVO().getUserNo();
        logger.info("[likeState] SecurityContextHolder 추출 userNo={}", userNo);

        Map<String, Object> dbParam = new HashMap<>();
        dbParam.put("userNo", userNo);
        dbParam.put("meetingNo", meetingNo);

        return meetingService.meetingLikeState(dbParam);
    }


    @PostMapping(value = "/like/add")
    public Map<String, Object> meetingLikeInsert(@RequestBody String meetingNo) {
        logger.info("[meetingLikeInsert] 핸들러 meetingNo={}", meetingNo);

        PrincipalDetails principal =
                (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Long userNo = principal.getUserVO().getUserNo();
        logger.info("[meetingLikeInsert] SecurityContextHolder 추출 userNo={}", userNo);


        Map<String, Object> restData = new HashMap<>();

        int cnt = meetingService.insertMeetingLike(String.valueOf(userNo), meetingNo);
        logger.info("MEETING LIKE 추가 결과 cnt={}", cnt);

        if (cnt > 0) {
            restData.put("SUCCESS", true);
        } else {
            throw new TransactionException(DataBaseErrorCode.INVALID_REQUEST);
        }

        return restData;
    }


    @DeleteMapping(value = "/like/delete/{meetingNo}")
    public Map<String, Object> meetingLikeDelete(@PathVariable Long meetingNo) {
        logger.info("[meetingLikeDelete] 핸들러 meetingNo : {}", meetingNo);

        PrincipalDetails principal =
                (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Long userNo = principal.getUserVO().getUserNo();
        logger.info("[meetingLikeInsert] SecurityContextHolder 추출 userNo={}", userNo);

        Map<String, Object> restData = new HashMap<>();

        int cnt = meetingService.deleteMeetingLike(String.valueOf(userNo), String.valueOf(meetingNo));
        logger.info("MEETING LIKE 삭제 결과 cnt={}", cnt);

        if (cnt > 0) {
            restData.put("SUCCESS", true);
        } else {
            throw new TransactionException(DataBaseErrorCode.INVALID_REQUEST);
        }


        return restData;
    }


    // 가입신청
    // 가입신청
    // 가입신청
    @PostMapping("/subscribe")
    public Map<String, Object> meetingSubscribe(@RequestBody Long meetingNo) {
        logger.info("[meetingSubscribe] 핸들러 meetingNo={}", meetingNo);

        PrincipalDetails principal =
                (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Long userNo = principal.getUserVO().getUserNo();
        logger.info("[meetingSubscribe] SecurityContextHolder 추출 userNo={}", userNo);

        return meetingService.meetingSubscribe(String.valueOf(userNo), String.valueOf(meetingNo));
    }


    // 가입신청 리스트
    // 가입신청 리스트
    // 가입신청 리스트
    @GetMapping("/subscribe/list")
    public Map<String, Object> meetingSubscribeList() {
        logger.info("[meetingSubscribeList] 핸들러");

        PrincipalDetails principal =
                (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Long userNo = principal.getUserVO().getUserNo();
        logger.info("[meetingSubscribeList] SecurityContextHolder 추출 userNo={}", userNo);

        return meetingService.moimSubscribeList(String.valueOf(userNo));
    }


    //해당 유저가 모임 글을 몇개 작성했는지
    //해당 유저가 모임 글을 몇개 작성했는지
    //해당 유저가 모임 글을 몇개 작성했는지
    @GetMapping("/user/count")
    public int selectByUserCount() {
        logger.info("[selectByUserCount] 핸들러");

        PrincipalDetails principal =
                (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Long userNo = principal.getUserVO().getUserNo();
        logger.info("[meetingSubscribeList] SecurityContextHolder 추출 userNo : {}", userNo);

        int cnt = meetingService.selectByUserCount(String.valueOf(userNo));
        logger.info("[meetingSubscribeList] 생성 정보 조회 결과 cnt : {}", cnt);

        return cnt;
    }


    //모임에 가입된 유저 리스트
    //모임에 가입된 유저 리스트
    //모임에 가입된 유저 리스트
    @GetMapping("/member/{meetingNo}")
    public List<Map<String, Object>> moimMemberList(@PathVariable Long meetingNo) {
        logger.info("[selectByUserCount] 핸들러 meetingNo : {}", meetingNo);

        return meetingService.selectUserMeetingList(meetingNo);
    }



    @GetMapping("/search")
    public Map<String, Object> moimSearch(@RequestParam String text,
                                          @RequestParam String cat,
                                          @RequestParam String tags,
                                          @RequestParam int page,
                                          @RequestParam int length) {
        logger.info("[moimSearch] 핸들러 text : {}", text);
        logger.info("[moimSearch] 핸들러 cat : {}", cat);
        logger.info("[moimSearch] 핸들러 tags : {}", tags);
        logger.info("[moimSearch] 핸들러 page : {}", page);
        logger.info("[moimSearch] 핸들러 length : {}", length);

        return meetingService.moimSearchList(text, cat, tags, page, length);
    }










    @GetMapping("/signing")
    public Map<String, Object> selectUserSigning(@RequestParam(required = false, defaultValue = "1") int page,
                                                 @RequestParam(required = false, defaultValue = "8") int length,
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


//    @GetMapping("/select/view/{no}")
//    public Map<String, Object> selectByNo(@PathVariable String no) {
//        logger.info("MEETING 정보 조회 no={}", no);
//
//        Map<String, Object> dbData = meetingService.selectByNo(no);
//        logger.info("MEETING 정보 조회 결과 dbData={}", dbData);
//
//        Map<String, Object> restData = new HashMap<>();
//
//        if(dbData != null) {
//            restData.put("SUCCESS", true);
//            restData.put("rest", dbData);
//        }else {
//            restData.put("SUCCESS", false);
//        }
//
//
//        return restData;
//    }


    @PutMapping("/subscribe/result")
    public int subscribeResult(@RequestBody Map<String, Object> rest) {
        logger.info("[subscribeResult] 핸들러 rest={}", rest);

        return meetingService.moimSubscribeResult(rest);
    }


    @PutMapping("/subscribe/refusal")
    public Map<String, Object> subscribeRefusal(@RequestBody Map<String, Object> rest) {
        logger.info("MEETING 가입 신청 거절 rest={}", rest);

        Map<String, Object> resultData = meetingService.moimSubscribeRefusal(rest);
        logger.info("MEETING 가입 거절 최종확인 resultData={}", resultData);

        return resultData;
    }














//    @ExceptionHandler(value = RuntimeException.class)
//    public ResponseEntity<Map<String, Object>> ExceptionHandler(RuntimeException e) {
//        HttpHeaders responseHeaders = new HttpHeaders();
//        HttpStatus httpStatus = HttpStatus.BAD_REQUEST;
//
//        logger.error("ExceptionHandler 호출, {}, {}", e.getCause(), e.getMessage());
//        Map<String, Object> map = new HashMap<>();
//
//        map.put("error type", httpStatus.getReasonPhrase());
//        map.put("code", "400");
//        map.put("message", e.getMessage());
//
//        return new ResponseEntity<>(map, responseHeaders, httpStatus);
//    }
}
