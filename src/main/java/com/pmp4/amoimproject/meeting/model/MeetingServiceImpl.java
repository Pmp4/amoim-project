package com.pmp4.amoimproject.meeting.model;

import com.pmp4.amoimproject.address.model.UserAddressDAO;
import com.pmp4.amoimproject.common.ConstUtil;
import com.pmp4.amoimproject.common.FileUploadUtil;
import com.pmp4.amoimproject.common.PaginationInfo;
import com.pmp4.amoimproject.jwt.JwtTokenProvider;
import com.pmp4.amoimproject.sign.model.UserVO;
import com.pmp4.amoimproject.tag.model.TagDAO;
import com.pmp4.amoimproject.tag.model.TagVO;
import com.pmp4.amoimproject.user.model.UserDAO;
import com.pmp4.amoimproject.user.model.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.util.*;

@Service
@RequiredArgsConstructor
public class MeetingServiceImpl implements MeetingService {
    private static final Logger logger = LoggerFactory.getLogger(MeetingServiceImpl.class);
    private final MeetingDAO meetingDAO;
    private final MeetingAddressDAO meetingAddressDAO;
    private final MeetingImageDAO meetingImageDAO;
    private final MeetingTagDAO meetingTagDAO;
    private final TagDAO tagDAO;
    private final UserAddressDAO userAddressDAO;
    private final UserDAO userDAO;
    private final JwtTokenProvider jwtTokenProvider;



    /*
      로직 순서
      [1] 게시글 등록
      [2] 태그 등록
            - 태그 DB에 있는 지 확인
      [3] 이미지 파일 등록
      [4] 주소 등록
    */
    @Override
    @Transactional
    public int meetingRegister(MeetingVO meetingVO,
                               MeetingAddressVO meetingAddressVO,
                               List<String> tagArr,
                               HttpServletRequest request) {
        int result = 0;
        List<Map<String, Object>> fileList = null;
        FileUploadUtil fileUploadUtil = new FileUploadUtil();

        try {
            result = meetingDAO.insertMeeting(meetingVO);
            logger.info("MEETING: MEETING DB INSERT 결과 result={}", result);

            if(result > 0) {
                int cnt = 0;
                for(String tagName : tagArr) {
                    TagVO tagVO = tagDAO.selectByTag(tagName);
                    logger.info("MEETING: 기존 태그 검색 tagVO={}", tagVO);

                    if(tagVO != null) {    //기존 태그가 있는 경우
                        result = meetingTagDAO.meetingTagAdd(meetingVO.getNo(), tagVO.getTagNo());
                        logger.info("MEETING: 기존 태그 등록 결과 result={}", result);

                    }else {     //기존 태그가 없는 경우
                        TagVO tempTagVO = new TagVO();
                        tempTagVO.setTagName(tagName);

                        cnt = tagDAO.insertTag(tempTagVO);
                        logger.info("MEETING: 태그 DB 등록 결과 cnt={}", cnt);
                        if(cnt > 0) {
                            result = meetingTagDAO.meetingTagAdd(meetingVO.getNo(), tempTagVO.getTagNo());
                            logger.info("MEETING: 태그 연결 결과 cnt={}", result);
                        }
                    }
                }

                if(result > 0) {
                    fileList = fileUploadUtil.mulitiFileUpload(request, ConstUtil.UPLOAD_IMAGE_FLAG);

                    for(Map<String, Object> file : fileList) {
                        file.put("meetingNo", meetingVO.getNo());
                        result = meetingImageDAO.insertMeetingImage(file);
                        logger.info("MEETING: 이미지 등록 결과 cnt={}", result);
                    }

                    if(result > 0) {
                        meetingAddressVO.setMeetingNo(meetingVO.getNo());
                        result = meetingAddressDAO.insertMeetingAddress(meetingAddressVO);
                        logger.info("MEETING: 주소 등록 결과 cnt={}", result);
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            result = -1;
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
        }

        if(!(result > 0)) {
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            String filePath = fileUploadUtil.getUploadPath(request, ConstUtil.UPLOAD_IMAGE_FLAG);

            if(fileList != null) {
                for(Map<String, Object> file : fileList) {
                    File delFile = new File(filePath, (String) file.get("fileName"));
                    if(delFile.exists()) {
                        boolean fileBool = delFile.delete();
                        logger.info("MEETING: 파일 삭제 여부: {}", fileBool);
                    }
                }
            }
        }


        return result;
    }

    /*
     * 모임 정보 수정
     * 태그 수정
     *  - 기존 꺼 삭제 후, 등록
     * 주소 수정
     * 파일 수정
     */
    /*
     * [editMoim] 핸들러 meetingAddressVO : MeetingAddressVO(addressNo=null, meetingNo=null, zonecode=null, address=null, roadAddress=null, jibunAddress=null, sido=null, sigungu=null, bcode=null, bname=null, placeName=null, latY=0.0, lonX=0.0, regdate=null, delFlag=null)
     * [editMoim] 핸들러 tags : [퓨쳐리스틱스웨버, 래퍼]
     * [editMoim] 핸들러 userNo : 21
     * [editMoim] 핸들러 editState : {fileState=false, addressEditState=false}
     */
    @Override
    @Transactional
    public int moimEditTransaction(HttpServletRequest httpServletRequest,
                                                   MeetingVO meetingVO,
                                                   MeetingAddressVO meetingAddressVO,
                                                   List<String> tags,
                                                   Map<String, Object> editState) {
        logger.info("[moimEditTransaction] 서비스 로직");

        FileUploadUtil fileUploadUtil = new FileUploadUtil();
        List<Map<String, Object>> fileList = null;
        List<Map<String, Object>> originalFileList = null;
        boolean addressState = (boolean) editState.get("addressEditState");
        boolean fileState = (boolean) editState.get("fileState");

        int result = -1;
        try {
            int cnt = meetingDAO.editMoim(meetingVO);
            logger.info("[moimEditTransaction] 모임 정보 수정 결과 cnt : {}", cnt);

            if(cnt > 0) {
                cnt = meetingDAO.deleteMoimTag((meetingVO.getNo()));
                logger.info("[moimEditTransaction] 태그 삭제 결과 cnt : {}", cnt);

                if(cnt > 0) {
                    for(String tagName : tags) {
                        TagVO tagVO = tagDAO.selectByTag(tagName);
                        logger.info("[moimEditTransaction] 기존 태그 검색 tagVO={}", tagVO);

                        if(tagVO != null) {    //기존 태그가 있는 경우
                            logger.info("[moimEditTransaction] 기존 태그 있음");

                            cnt = meetingTagDAO.meetingTagAdd(meetingVO.getNo(), tagVO.getTagNo());
                            logger.info("[moimEditTransaction] 기존 태그 등록 결과 result={}", result);

                            if(!(cnt > 0)) throw new Exception();
                        }else {     //기존 태그가 없는 경우
                            logger.info("[moimEditTransaction] 기존 태그 없음");

                            TagVO tempTagVO = new TagVO();
                            tempTagVO.setTagName(tagName);

                            cnt = tagDAO.insertTag(tempTagVO);
                            logger.info("[moimEditTransaction] 태그 DB 등록 결과 cnt={}", cnt);
                            if(cnt > 0) {
                                cnt = meetingTagDAO.meetingTagAdd(meetingVO.getNo(), tempTagVO.getTagNo());
                                logger.info("[moimEditTransaction] 태그 연결 결과 cnt={}", cnt);

                                if(!(cnt > 0)) throw new Exception();
                            }else {
                                throw new Exception();
                            }
                        }
                    }



                    meetingAddressVO.setMeetingNo(meetingVO.getNo());

                    if(addressState) {
                        logger.info("[moimEditTransaction] 주소 수정");
                        cnt = meetingAddressDAO.updateMoimAddress(meetingAddressVO);

                        logger.info("[moimEditTransaction] 주소 수정 결과 cnt : {}", cnt);

                        if(!(cnt > 0)) throw new Exception();
                    }


                    if(fileState) {
                        logger.info("[moimEditTransaction] 이미지 수정");

                        originalFileList = meetingImageDAO.selectMoimFileList(meetingVO.getNo());
                        logger.info("[moimEditTransaction] 이전 이미지 파일 정보 originalFileList : {}", originalFileList);

                        cnt = meetingImageDAO.deleteMoimImage(meetingVO.getNo());

                        logger.info("[moimEditTransaction] 이미지 삭제 결과 cnt : {}", cnt);

                        if(cnt > 0) {
                            fileList = fileUploadUtil.mulitiFileUpload(httpServletRequest,
                                    ConstUtil.UPLOAD_IMAGE_FLAG);

                            for(Map<String, Object> file : fileList) {
                                file.put("meetingNo", meetingVO.getNo());
                                cnt = meetingImageDAO.insertMeetingImage(file);
                                logger.info("[moimEditTransaction] 이미지 등록 결과 cnt : {}", cnt);

                                if(!(cnt > 0)) throw new Exception();
                            }
                        }else {
                            throw new Exception();
                        }
                    }

                    logger.info("[moimEditTransaction] 로직 완료");
                    result = 1;
                }
            }
        } catch (Exception e) {
            result = -1;
            e.printStackTrace();
            logger.info("[moimEditTransaction] 데이터 베이스 오류로 롤백");
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
        }

        if(result == -1) throw new RuntimeException();
        else {
            if(fileState) {
                logger.info("[moimEditTransaction] 이전 파일 삭제");

                List<Map<String, Object>> oldFileList = new ArrayList<>();
                for(Map<String, Object> oldFile : originalFileList) {
                    Map<String, Object> deleteFile = new HashMap<>();
                    deleteFile.put("fileName", oldFile.get("IMAGE_NAME"));

                    oldFileList.add(deleteFile);
                }

                String filePath = fileUploadUtil.getUploadPath(httpServletRequest, ConstUtil.UPLOAD_IMAGE_FLAG);
                boolean deleteCheck = fileUploadUtil.deleteFileList(oldFileList, filePath);

                logger.info("[moimEditTransaction] 이전 파일 삭제 결과 deleteCheck : {}", deleteCheck);
            }
        }


        return result;
    }

    @Override
    public int deleteMoim(Long meetingNo) {
        logger.info("[deleteMoim] 서비스 로직");

        int cnt = meetingDAO.deleteMoim(meetingNo);
        logger.info("[deleteMoim] 결과 cnt : {}", cnt);

        return cnt;
    }

    @Override
    public Long selectMoimUserNo(Long meetingNo) {
        return meetingDAO.selectMoimUserNo(meetingNo);
    }

    @Override
    public int hitsMoim(Long meetingNo, Long userNo) {
        logger.info("[hitsMoim] 서비스 로직");

        int cnt = meetingDAO.insertViewCountMoim(String.valueOf(userNo), String.valueOf(meetingNo));
        logger.info("[hitsMoim] 결과 cnt : {}", cnt);

        return cnt;
    }


    @Override
    public Map<String, Object> mainLocList(HttpServletRequest request, String username) {
        logger.info("[mainLocList] 서비스 로직");

//        String token = jwtTokenProvider.resolveToken(request);
//        logger.info("[mainLocList] 토큰 추출 token : {}", token);


//        if(!token.isEmpty() && jwtTokenProvider.validateToken(token)) {
//            String username = jwtTokenProvider.getUsername(token);
//            logger.info("[mainLocList] 토큰에서 값 추출 username : {}", username);
//        }

        Map<String, Object> responseData = new HashMap<>();
        Map<String, Object> userAddressData = null;

        String sido = "서울";
        if(username != null && !username.isEmpty()) {
            UserVO userVO = userDAO.getUserInfo(username);
            userAddressData = userAddressDAO.selectUserSido(userVO.getUserNo());
            logger.info("[mainLocList] 유저 주소 추출 userAddressData : {}", userAddressData);

            sido = (String) userAddressData.get("SIDO");
        }

        responseData.put("sido", sido);


        String bcode = "11";
        if(userAddressData != null) {
            bcode = (String) userAddressData.get("BCODE");
            logger.info("[mainLocList] 유저 법정동 코드 추출 bcode : {}", bcode);

            bcode = bcode.substring(0, 2);
        }
        List<Map<String, Object>> list = meetingDAO.locSelectCard(bcode);
        logger.info("[mainLocList] 리스트 조회 결과 list.size : {}", list.size());


        responseData.put("list", list);



        return responseData;
    }

    @Override
    public Map<String, Object> pageItemList(String type, String key, int page, int blockSize) {
        logger.info("[pageItemList] 서비스 로직 type : {}, page : {}, blockSize : {}",
                type, page, blockSize);

        PaginationInfo paginationInfo = new PaginationInfo(blockSize, page);

        Map<String, Object> dbParam = new HashMap<>();

        dbParam.put("type", type);
        dbParam.put("key", key);
        dbParam.put("blockSize", blockSize);
        dbParam.put("start", paginationInfo.getStartRecord());
        dbParam.put("count", false);

        List<Map<String, Object>> list = meetingDAO.moimItemList(dbParam);
        logger.info("[pageItemList] 리스트 조회 결과 list.size : {}", list.size());

        dbParam.put("count", true);
        int count = meetingDAO.moimItemCount(dbParam);
        logger.info("[pageItemList] 리스트 총 개수 count : {}", count);

        paginationInfo.setTotalRecord(count);
        logger.info("[pageItemList] 페이지 정보 paginationInfo : {}", paginationInfo);

        Map<String, Object> responseData = new HashMap<>();
        responseData.put("list", list);
        responseData.put("pageInfo", paginationInfo);

        return responseData;
    }

    @Override
    public int moimOwnCount(String type, String key) {
        logger.info("[moimOwnCount] 서비스 로직 key : {}", key);

        Map<String, Object> dbParam = new HashMap<>();
        dbParam.put("type", type);
        dbParam.put("key", key);
        dbParam.put("count", true);

        int count = meetingDAO.moimItemCount(dbParam);
        logger.info("[moimOwnCount] 리스트 총 개수 count : {}", count);

        return count;
    }

    @Override
    public Map<String, Object> moimSubscript(String key, int page, int blockSize) {
        logger.info("[moimSubscript] 서비스 로직 key : {}, page : {}, blockSize : {}", key, page, blockSize);

        PaginationInfo paginationInfo = new PaginationInfo(blockSize, page);

        Map<String, Object> dbParam = new HashMap<>();
        dbParam.put("key", key);
        dbParam.put("blockSize", blockSize);
        dbParam.put("start", paginationInfo.getStartRecord());

        List<Map<String, Object>> list = meetingDAO.moimSubscriptList(dbParam);
        logger.info("[moimSubscript] 리스트 조회 결과 list.size : {}", list.size());

        dbParam.put("count", true);
        int count = meetingDAO.moimSubscriptCount(dbParam);

        paginationInfo.setTotalRecord(count);
        logger.info("[moimSubscript] 페이지 정보 paginationInfo : {}", paginationInfo);

        Map<String, Object> responseData = new HashMap<>();
        responseData.put("list", list);
        responseData.put("pageInfo", paginationInfo);

        return responseData;
    }

    public Map<String, Object> selectByNoView(Long no) {
        logger.info("[selectByNoView] 서비스 로직");

        Map<String, Object> dbData = meetingDAO.selectByNoView(no);
        logger.info("[selectByNoView] 조회 결과 dbData : {}", dbData);


        Map<String, Object> responseData = new HashMap<>();
        responseData.put("rest", dbData);

        if(dbData == null) {
            responseData.put("SUCCESS", false);
        }else {
            responseData.put("SUCCESS", true);
        }

        return responseData;
    }

    @Override
    public List<Map<String, Object>> selectUserMeetingList(Long meetingNo) {
        logger.info("[selectUserMeetingList] 서비스 로직");

        List<Map<String, Object>> list = meetingDAO.meetingUserList(meetingNo);
        logger.info("[selectUserMeetingList] 조회 결과 list.size : {}", list.size());

        return list;
    }

    @Override
    public List<Map<String, Object>> moimUserInterest(Long userNo, String code) {
        logger.info("[moimUserInterest] 서비스 로직");

        String parentCode = code.substring(0, 3);
        logger.info("[moimUserInterest] parentCode : {}", parentCode);

        List<Map<String, Object>> list = meetingDAO.moimUserInterest(String.valueOf(userNo), code, parentCode);
        logger.info("[moimUserInterest] 결과 list.size : {}", list.size());

        return list;
    }


    @Override
    public List<Map<String, Object>> selectByUserNoCard(Map<String, Object> map) {
        return meetingDAO.selectByUserNoCard(map);
    }

    @Override
    public int selectByUserNoCardPageCount(Map<String, Object> map) {
        return meetingDAO.selectByUserNoCardPageCount(map);
    }

    @Override
    public Map<String, Object> moimUserLikeCard(Long userNo, int page, int blockSize) {
        logger.info("[moimUserLikeCard] 서비스 로직");

        PaginationInfo paginationInfo = new PaginationInfo(blockSize, page);

        Map<String, Object> dbParam = new HashMap<>();
        dbParam.put("userNo", userNo);
        dbParam.put("length", blockSize);
        dbParam.put("start", paginationInfo.getStartRecord());

        List<Map<String, Object>> list = meetingDAO.moimUserLikeCard(dbParam);
        int totalRecord = meetingDAO.moimUserLikeCount(userNo);
        logger.info("[moimUserLikeCard] 조회 결과 list.size : {}, totalRecord : {}", list.size(), totalRecord);

        paginationInfo.setTotalRecord(totalRecord);

        Map<String, Object> responseDate = new HashMap<>();
        responseDate.put("list", list);
        responseDate.put("pageInfo", paginationInfo);

        return responseDate;
    }

    @Override
    public Map<String, Object> moimUserTodayView(Long userNo, int page, int blockSize) {
        logger.info("[moimUserTodayView] 서비스 로직");

        PaginationInfo paginationInfo = new PaginationInfo(blockSize, page);
        Calendar now = Calendar.getInstance();
        String today =
                now.get(Calendar.YEAR) + "-" +
                        (now.get(Calendar.MONTH)+1) + "-" +
                        (now.get(Calendar.DATE) < 10 ? "0" + now.get(Calendar.DATE) : now.get(Calendar.DATE));
        logger.info("[moimUserTodayView] today : {}", today);

        Map<String, Object> dbParam = new HashMap<>();
        dbParam.put("userNo", userNo);
        dbParam.put("length", blockSize);
        dbParam.put("start", paginationInfo.getStartRecord());
        dbParam.put("today", today);

        List<Map<String, Object>> list = meetingDAO.moimUserTodayView(dbParam);
        int totalRecord = meetingDAO.moimUserTodayViewCount(dbParam);
        logger.info("[moimUserTodayView] 조회 결과 list.size : {}, totalRecord : {}", list, totalRecord);

        paginationInfo.setTotalRecord(totalRecord);

        Map<String, Object> responseDate = new HashMap<>();
        responseDate.put("list", list);
        responseDate.put("pageInfo", paginationInfo);

        return responseDate;
    }

    @Override
    public Map<String, Object> moimSearchList(String text, String cat, String tags, int page, int length) {
        logger.info("[moimSearchList] 서비스 로직");

        String dbCat = null;
        if(cat != null && !cat.isEmpty()) {
//            10900000
            dbCat = cat.substring(0, 3);
            logger.info("[moimSearchList] 부모 카테고리 dbCat : {}", dbCat);
        }

        List<String> dbTags = null;
        if(tags != null && !tags.isEmpty()) {
            dbTags = Arrays.asList(tags.split(","));
            logger.info("[moimSearchList] 태그 배열 dbTags : {}", dbTags);
        }

        PaginationInfo paginationInfo = new PaginationInfo(length, page);

        Map<String, Object> dbParam = new HashMap<>();
        dbParam.put("text", text);
        dbParam.put("parentCode", dbCat);
        dbParam.put("tags", dbTags);
        dbParam.put("length", length);
        dbParam.put("start", paginationInfo.getStartRecord());


        List<Map<String, Object>> list = meetingDAO.moimSearchList(dbParam);
        int count = meetingDAO.moimSearchCount(dbParam);

        logger.info("[moimSearchList] 조회 결과 list.size : {}, count : {}", list.size(), count);

        paginationInfo.setTotalRecord(count);

        Map<String, Object> responseData = new HashMap<>();
        responseData.put("list", list);
        responseData.put("pageInfo", paginationInfo);

        return responseData;
    }


//    @Override
//    public Map<String, Object> selectByNo(String no) {
//        return meetingDAO.selectByNo(no);
//    }

    @Override
    public int selectByUserCount(String userNo) {
        return meetingDAO.selectByUserCount(userNo);
    }

    @Override
    public int likeCount(String meetingNo) {
        return meetingDAO.likeCount(meetingNo);
    }

    @Override
    public int meetingLikeState(Map<String, Object> dbParam) {
        logger.info("[meetingLikeState] 서비스 로직");

        int cnt = meetingDAO.meetingLikeState(dbParam);
        logger.info("[meetingLikeState] 상태 결과 cnt : {}", cnt);

        return cnt;
    }

    @Override
    public int insertMeetingLike(String userNo, String meetingNo) {
        return meetingDAO.insertMeetingLike(userNo, meetingNo);
    }

    @Override
    public int deleteMeetingLike(String userNo, String meetingNo) {
        return meetingDAO.deleteMeetingLike(userNo, meetingNo);
    }

    @Override
    @Transactional
    public Map<String, Object> meetingSubscribe(String userNo, String meetingNo) {
        logger.info("[meetingSubscribe] 서비스 로직 userNo={}, meetingNo={}", userNo, meetingNo);

        Map<String, Object> resultData = new HashMap<>();
        String msg = "";
        boolean success = false;

        try {
            Exception e = new Exception("고의 발생");

            int cnt = meetingDAO.meetingUserCount(userNo, meetingNo);
            logger.info("[meetingSubscribe] 대기중 여부 확인 cnt : {}", cnt);

            if(cnt == 0) {
                Map<String, Object> res = meetingDAO.meetingMemberCount(meetingNo);
                logger.info("[meetingSubscribe] 인원 수 확인 res : {}", res);

                int personNumber = Integer.parseInt ((String.valueOf(res.get("PERSON_NUMBER"))));
                int personCount = Integer.parseInt((String.valueOf(res.get("COUNT"))));

                if(!(personNumber <= personCount)) {
                    cnt = meetingDAO.insertMeetingSub(userNo, meetingNo);
                    logger.info("[meetingSubscribe] 신청 최종 cnt : {}", cnt);
                    if(cnt > 0) {
                        success = true;
                        msg = "가입 신청 되었습니다.";
                    }else {
                        throw new RuntimeException();
                    }
                }else {
                    logger.info("[meetingSubscribe] 인원 수 제한으로 취소");
                    msg = "인원 수가 꽉 찼습니다.";
                    throw e;
                }
            }else {
                logger.info("[meetingSubscribe] 신청 대기중인 모임으로 취소");
                msg = "신청 대기중인 모임입니다.";
                throw e;
            }
        }catch (Exception e) {
            e.printStackTrace();
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
        }


        resultData.put("SUCCESS", success);
        resultData.put("SUCCESS_TEXT", msg);

        return resultData;
    }

    @Override
    public Map<String, Object> moimSubscribeList(String userNo) {
        logger.info("[moimSubscribeList] 서비스 로직");

        List<Map<String, Object>> dbData = meetingDAO.moimSubscribeList(userNo);
        logger.info("[moimSubscribeList] 조회 결과 dbData : {}", dbData);

        Map<String, Object> resultData = new HashMap<>();
        resultData.put("SUCCESS", true);
        resultData.put("DATA", dbData);

        return resultData;
    }

    @Override
    public Map<String, Object> moimSubscribeResult(Map<String, Object> rest) {
        logger.info("MEETING: 수락 로직 rest={}", rest);

        String meetingNo = String.valueOf(rest.get("meetingNo"));
        List<Integer> noList= (List<Integer>) rest.get("list");

        int[] noArr = noList.stream()
                .mapToInt(i -> i)
                .toArray();
        Map<String, int[]> dbMap = new HashMap<>();
        dbMap.put("Array", noArr);

        logger.info("MEETING: 수락 로직 - 분리 결과 meetingNo={}, noArr={}", meetingNo, noArr);

        Map<String, Object> map = meetingDAO.meetingMemberCount(meetingNo);
        Long cut = (Long) map.get("PERSON_NUMBER");
        Long currentCount = (Long) map.get("COUNT");

        logger.info("MEETING: 수락 로직 - 현재 멤버 수 확인 map={}", map);

        boolean success = false;
        if(currentCount < cut) {
            long minusCut = cut - currentCount;

            if(minusCut > noArr.length) {
                int cnt = meetingDAO.updateUserMeetingSubResult(dbMap);
                logger.info("MEETING: 수락 로직 - 완료 확인 cnt={}", cnt);

                if(cnt > 0) success = true;
            }
        }

        Map<String, Object> resultData = new HashMap<>();
        String successText = "Server DB Error";
        if(success) successText = "success!";

        resultData.put("SUCCESS", success);
        resultData.put("SUCCESS_TEXT", successText);

        return resultData;
    }

    @Override
    public Map<String, Object> moimSubscribeRefusal(Map<String, Object> rest) {
        logger.info("MEETING: 거절 로직 rest={}", rest);

        String meetingNo = String.valueOf(rest.get("meetingNo"));
        List<Integer> noList= (List<Integer>) rest.get("list");

        int[] noArr = noList.stream()
                .mapToInt(i -> i)
                .toArray();
        Map<String, int[]> dbMap = new HashMap<>();
        dbMap.put("Array", noArr);

        logger.info("MEETING: 거절 로직 - 분리 결과 meetingNo={}, noArr={}", meetingNo, noArr);

        int cnt = meetingDAO.updateUserMeetingSubRefusal(dbMap);
        logger.info("MEETING: 거절 로직 - 완료 확인 cnt={}", cnt);

        Map<String, Object> resultData = new HashMap<>();
        boolean success = false;
        String successText = "Server DB Error";
        if(cnt > 0) {
            successText = "success!";
            success = true;
        }

        resultData.put("SUCCESS", success);
        resultData.put("SUCCESS_TEXT", successText);

        return resultData;
    }

    @Override
    public List<Map<String, Object>> signingUpMoim(Map<String, Object> map) {
        return meetingDAO.signingUpMoim(map);
    }

    @Override
    public int signingUpMoimCount(Map<String, Object> map) {
        return meetingDAO.signingUpMoimCount(map);
    }
}
