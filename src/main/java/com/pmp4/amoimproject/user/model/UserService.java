package com.pmp4.amoimproject.user.model;

import com.pmp4.amoimproject.sign.model.UserVO;

import java.util.List;
import java.util.Map;

public interface UserService {
    List<UserVO> selectAll();
    int selectValueCount(Map<String, Object> obj);
    int insertUser(Map<String, Object> restJson);

    Map<String, Object> loginCheck(Map<String, Object> loginData);

    UserVO getByUid(String userId);
}
