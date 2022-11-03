package com.pmp4.amoimproject.chat.model;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService{
    private static final Logger LOGGER = LoggerFactory.getLogger(ChatServiceImpl.class);

    private final ChatDAO chatDAO;

    @Override
    public int insertChat(ChatVO chatVO) {
        LOGGER.info("[insertChat] 서비스 로직");

        int cnt = chatDAO.insertChat(chatVO);
        LOGGER.info("[insertChat] 결과 cnt : {}", cnt);

        return cnt;
    }

    @Override
    public List<ChatVO> chatList(Long meetingNo, String no) {
        LOGGER.info("[chatList] 서비스 로직");
        Map<String, Object> dbParam = new HashMap<>();
        dbParam.put("meetingNo", meetingNo);
        dbParam.put("no", no);

        List<ChatVO> list = chatDAO.chatList(dbParam);
        LOGGER.info("[chatList] 조회 결과 list.size : {}", list.size());
        LOGGER.info("[chatList] 조회 결과 list.size : {}", list.get(0));
        LOGGER.info("[chatList] 조회 결과 list.size : {}", new Date());

        return list;
    }
}
