package com.pmp4.amoimproject.chat.model;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface ChatDAO {
    int insertChat(ChatVO chatVO);

    List<ChatVO> chatList(Map<String, Object> dbParam);
}
