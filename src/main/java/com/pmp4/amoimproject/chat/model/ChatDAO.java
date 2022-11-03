package com.pmp4.amoimproject.chat.model;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ChatDAO {
    int insertChat(ChatVO chatVO);
}
