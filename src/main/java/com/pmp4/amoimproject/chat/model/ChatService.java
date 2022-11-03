package com.pmp4.amoimproject.chat.model;

import java.util.List;
import java.util.Map;

public interface ChatService {
    int insertChat(ChatVO chatVO);


    List<ChatVO> chatList(Long meetingNo, String no);
}
