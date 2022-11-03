package com.pmp4.amoimproject.chat.model;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

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
}
