package com.pmp4.amoimproject.board.model;

import com.pmp4.amoimproject.common.ConstUtil;
import com.pmp4.amoimproject.common.FileUploadUtil;
import com.pmp4.amoimproject.common.PaginationInfo;
import com.pmp4.amoimproject.meeting.model.MeetingServiceImpl;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class MeetingBoardServiceImpl implements MeetingBoardService{
    private static final Logger logger = LoggerFactory.getLogger(MeetingServiceImpl.class);
    private final MeetingBoardDAO meetingBoardDAO;
    private final FileUploadUtil fileUploadUtil;

    @Override
    @Transactional
    public int boardRegister(HttpServletRequest request, MeetingBoardVO meetingBoardVO) {
        logger.info("[boardRegister] 게시판 등록 로직, meetingBoardVo={}", meetingBoardVO);
        int cnt = 0;
        List<Map<String, Object>> fileList = null;

        try {
            cnt = meetingBoardDAO.insertBoard(meetingBoardVO);

            if(cnt > 0) {
                fileList = fileUploadUtil.mulitiFileUpload(request, ConstUtil.UPLOAD_FILE_FLAG);

                for (Map<String, Object> file : fileList) {
                    file.put("boardNo", meetingBoardVO.getNo());
                    cnt = meetingBoardDAO.insertBoardUploadFile(file);
                    logger.info("[boardRegister] 파일 등록 결과 cnt={}", cnt);
                }
            }
        }catch(Exception e) {
            e.printStackTrace();
            cnt = -1;
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
        }


        if(!(cnt > 0)) {
            logger.info("[boardRegister] 파일 등록 삭제");
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            String filePath = fileUploadUtil.getUploadPath(request, ConstUtil.UPLOAD_FILE_FLAG);

            fileUploadUtil.deleteFileList(fileList, filePath);
        }


        return cnt;
    }


    @Override
    public Map<String, Object> selectBoard(Long meetingNo, int page, int length) {
        logger.info("[selectBoard] 서비스 로직");

        Map<String, Object> responseData = new HashMap<>();
        PaginationInfo paginationInfo = new PaginationInfo(length, page);

        Map<String, Object> dbParam = new HashMap<>();
        dbParam.put("meetingNo", meetingNo);
        dbParam.put("start", paginationInfo.getStartRecord());
        dbParam.put("length", length);

        List<Map<String, Object>> list = meetingBoardDAO.selectByMeetingNo(dbParam);
        int count = meetingBoardDAO.selectByMeetingNoCount(meetingNo);

        logger.info("[selectBoard] 게시판 조회 결과 list.size : {}", list.size());

        paginationInfo.setTotalRecord(count);
        logger.info("[selectBoard] 게시판 페이징 정보 pageInfo : {}", paginationInfo);

        responseData.put("list", list);
        responseData.put("pageInfo", paginationInfo);
        responseData.put("SUCCESS", true);


        return responseData;
    }

    @Override
    public MeetingBoardFileVO boardView(Long no) {
        logger.info("[boardView] 서비스 로직");

        MeetingBoardFileVO meetingBoardFileVO = meetingBoardDAO.selectByBoardNo(no);
        logger.info("[boardView] 결과 meetingBoardFileVO : {}", meetingBoardFileVO);

        return meetingBoardFileVO;
    }

//    @Override
//    public List<Map<String, Object>> selectByMeetingNo(Map<String, Object> map) {
//
//
//        return meetingBoardDAO.selectByMeetingNo(map);
//    }

}
