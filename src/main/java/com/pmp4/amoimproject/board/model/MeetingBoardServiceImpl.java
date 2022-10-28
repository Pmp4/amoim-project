package com.pmp4.amoimproject.board.model;

import com.pmp4.amoimproject.common.ConstUtil;
import com.pmp4.amoimproject.common.FileUploadUtil;
import com.pmp4.amoimproject.meeting.model.MeetingDAO;
import com.pmp4.amoimproject.meeting.model.MeetingServiceImpl;
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
public class MeetingBoardServiceImpl implements MeetingBoardService{
    private static Logger logger = LoggerFactory.getLogger(MeetingServiceImpl.class);
    private final MeetingBoardDAO meetingBoardDAO;
    private final FileUploadUtil fileUploadUtil;

    @Override
    @Transactional
    public int boardRegister(HttpServletRequest request, MeetingBoardVO meetingBoardVO) {
        logger.info("BOARD: 게시판 등록 로직, meetingBoardVo={}", meetingBoardVO);
        int cnt = 0;
        List<Map<String, Object>> fileList = null;

        try {
            cnt = meetingBoardDAO.insertBoard(meetingBoardVO);

            if(cnt > 0) {
                fileList = fileUploadUtil.mulitiFileUpload(request, ConstUtil.UPLOAD_FILE_FLAG);

                for (Map<String, Object> file : fileList) {
                    file.put("boardNo", meetingBoardVO.getNo());
                    cnt = meetingBoardDAO.insertBoardUploadFile(file);
                    logger.info("MEETING: 이미지 등록 결과 cnt={}", cnt);
                }
            }
        }catch(Exception e) {
            e.printStackTrace();
            cnt = -1;
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
        }


        if(!(cnt > 0)) {
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            String filePath = fileUploadUtil.getUploadPath(request, ConstUtil.UPLOAD_FILE_FLAG);

            fileUploadUtil.deleteFileList(fileList, filePath);
        }


        return cnt;
    }

    @Override
    public List<Map<String, Object>> selectByMeetingNo(Map<String, Object> map) {
        return meetingBoardDAO.selectByMeetingNo(map);
    }

    @Override
    public int selectByMeetingNoCount(Map<String, Object> map) {
        return meetingBoardDAO.selectByMeetingNoCount(map);
    }
}
