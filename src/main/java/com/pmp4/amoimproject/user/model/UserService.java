package com.pmp4.amoimproject.user.model;

import com.pmp4.amoimproject.sign.model.UserVO;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

public interface UserService {
    List<UserVO> selectAll();
    int selectValueCount(Map<String, Object> obj);
    int insertUser(Map<String, Object> restJson);

    Map<String, Object> loginCheck(Map<String, Object> loginData);


    int userProfileImageEdit(HttpServletRequest httpServletRequest, Long userNo);

    UserVO getByUid(String userId);
}
