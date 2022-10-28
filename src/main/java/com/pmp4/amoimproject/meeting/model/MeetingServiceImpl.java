package com.pmp4.amoimproject.meeting.model;

import com.pmp4.amoimproject.common.ConstUtil;
import com.pmp4.amoimproject.common.FileUploadUtil;
import com.pmp4.amoimproject.common.PaginationInfo;
import com.pmp4.amoimproject.jwt.JwtTokenProvider;
import com.pmp4.amoimproject.tag.model.TagDAO;
import com.pmp4.amoimproject.tag.model.TagVO;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class MeetingServiceImpl implements MeetingService {
    private static final Logger logger = LoggerFactory.getLogger(MeetingServiceImpl.class);
    private final MeetingDAO meetingDAO;
    private final TagDAO tagDAO;
    private final FileUploadUtil fileUploadUtil;

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

        try {
            result = meetingDAO.insertMeeting(meetingVO);
            logger.info("MEETING: MEETING DB INSERT 결과 result={}", result);

            if(result > 0) {
                int cnt = 0;
                for(String tagName : tagArr) {
                    TagVO tagVO = tagDAO.selectByTag(tagName);
                    logger.info("MEETING: 기존 태그 검색 tagVO={}", tagVO);

                    if(tagVO != null) {    //기존 태그가 있는 경우
                        result = meetingDAO.meetingTagAdd(meetingVO.getNo(), tagVO.getTagNo());
                        logger.info("MEETING: 기존 태그 등록 결과 result={}", result);

                    }else {     //기존 태그가 없는 경우
                        TagVO tempTagVO = new TagVO();
                        tempTagVO.setTagName(tagName);

                        cnt = tagDAO.insertTag(tempTagVO);
                        logger.info("MEETING: 태그 DB 등록 결과 cnt={}", cnt);
                        if(cnt > 0) {
                            result = meetingDAO.meetingTagAdd(meetingVO.getNo(), tempTagVO.getTagNo());
                            logger.info("MEETING: 태그 연결 결과 cnt={}", result);
                        }
                    }
                }

                if(result > 0) {
                    fileList = fileUploadUtil.mulitiFileUpload(request, ConstUtil.UPLOAD_IMAGE_FLAG);

                    for(Map<String, Object> file : fileList) {
                        file.put("meetingNo", meetingVO.getNo());
                        result = meetingDAO.insertMeetingImage(file);
                        logger.info("MEETING: 이미지 등록 결과 cnt={}", result);
                    }

                    if(result > 0) {
                        meetingAddressVO.setMeetingNo(meetingVO.getNo());
                        result = meetingDAO.insertMeetingAddress(meetingAddressVO);
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



    @Override
    public Map<String, Object> mainLocList(HttpServletRequest request) {
        logger.info("[mainLocList] 서비스 로직");

        String token = jwtTokenProvider.resolveToken(request);
        logger.info("[mainLocList] 토큰 추출 token : {}", token);


//        if(!token.isEmpty() && jwtTokenProvider.validateToken(token)) {
//            String username = jwtTokenProvider.getUsername(token);
//            logger.info("[mainLocList] 토큰에서 값 추출 username : {}", username);
//        }

        List<Map<String, Object>> list = meetingDAO.locSelectCard("11");
        logger.info("[mainLocList] 리스트 조회 결과 list.size : {}", list.size());

        Map<String, Object> responseData = new HashMap<>();


        if (!list.isEmpty()) {
            responseData.put("SUCCESS", true);
            responseData.put("list", list);
        }else {
            responseData.put("SUCCESS", false);
            responseData.put("SUCCESS_TEXT", "Server DB Error");
        }


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
    public List<Map<String, Object>> selectByUserNoCard(Map<String, Object> map) {
        return meetingDAO.selectByUserNoCard(map);
    }

    @Override
    public int selectByUserNoCardPageCount(Map<String, Object> map) {
        return meetingDAO.selectByUserNoCardPageCount(map);
    }

    @Override
    public Map<String, Object> selectByNo(String no) {
        return meetingDAO.selectByNo(no);
    }

    @Override
    public int selectByUserCount(String userNo) {
        return meetingDAO.selectByUserCount(userNo);
    }

    @Override
    public int likeCount(String meetingNo) {
        return meetingDAO.likeCount(meetingNo);
    }

    @Override
    public int meetingLikeState(String userNo, String meetingNo) {
        return meetingDAO.meetingLikeState(userNo, meetingNo);
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
        logger.info("MEETING: 신청 로직 userNo={}, meetingNo={}", userNo, meetingNo);

        Map<String, Object> resultData = new HashMap<>();
        String msg = "";
        boolean success = false;

        try {
            int cnt = meetingDAO.meetingUserCount(userNo, meetingNo);
            logger.info("MEETING: 신청 로직 대기 여부 확인 cnt={}", cnt);

            if(cnt == 0) {
                Map<String, Object> res = meetingDAO.meetingMemberCount(meetingNo);
                logger.info("MEETING: 신청 로직 인원 수 확인 res={}", res);

                int personNumber = Integer.parseInt ((String.valueOf(res.get("PERSON_NUMBER"))));
                int personCount = Integer.parseInt((String.valueOf(res.get("COUNT"))));

                if(!(personNumber <= personCount)) {
                    cnt = meetingDAO.insertMeetingSub(userNo, meetingNo);
                    logger.info("MEETING: 신청 최종 cnt={}", cnt);
                    if(cnt > 0) {
                        success = true;
                        msg = "가입 신청 되었습니다.";
                    }else {
                        msg = "Server DB Error";
                    }
                }else {
                    msg = "인원 수가 꽉 찼습니다.";
                }
            }else {
                msg = "신청 대기중인 모임입니다.";
            }
        }catch (Exception e) {
            e.printStackTrace();
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            msg = "Server DB Error";
        }


        resultData.put("SUCCESS", success);
        resultData.put("SUCCESS_TEXT", msg);

        return resultData;
    }

    @Override
    public List<Map<String, Object>> moimSubscribeList(String userNo) {
        return meetingDAO.moimSubscribeList(userNo);
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
        if(cnt < 0) {
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
