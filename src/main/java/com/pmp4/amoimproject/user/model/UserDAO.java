package com.pmp4.amoimproject.user.model;

import com.pmp4.amoimproject.sign.model.UserVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface UserDAO {
    List<UserVO> selectAll();
    int selectValueCount(Map<String, Object> obj);
    int insertUser(UserVO userVO);

    UserVO checkUserId(String userId);

    int checkPassword(String password);

    int userProfileEdit(@Param("userNo") String userNo, @Param("profileImage") String profileImage);

    UserVO getUserInfo(String userId);
}
