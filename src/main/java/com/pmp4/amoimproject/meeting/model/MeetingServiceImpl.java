package com.pmp4.amoimproject.meeting.model;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pmp4.amoimproject.common.ConstUtil;
import com.pmp4.amoimproject.common.FileUploadUtil;
import com.pmp4.amoimproject.tag.model.TagDAO;
import com.pmp4.amoimproject.tag.model.TagVO;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class MeetingServiceImpl implements MeetingService {
    private static final Logger logger = LoggerFactory.getLogger(MeetingServiceImpl.class);
    private final MeetingDAO meetingDAO;
    private final TagDAO tagDAO;
    private final FileUploadUtil fileUploadUtil;
    private final ObjectMapper objectMapper;


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
    public List<Map<String, Object>> selectByUserNoCard(String userNo) {
        return meetingDAO.selectByUserNoCard(userNo);
    }
}
