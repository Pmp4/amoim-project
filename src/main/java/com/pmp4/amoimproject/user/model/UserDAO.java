package com.pmp4.amoimproject.user.model;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserDAO {
    List<UserVO> selectAll();
}
