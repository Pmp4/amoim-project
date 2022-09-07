package com.pmp4.amoimproject.user.model;

import java.util.List;
import java.util.Map;

public interface UserService {
    List<UserVO> selectAll();
    int selectValueCount(Map<String, Object> obj);
    int insertUser(UserVO userVO);
}
