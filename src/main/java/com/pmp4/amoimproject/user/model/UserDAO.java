package com.pmp4.amoimproject.user.model;

import com.pmp4.amoimproject.sign.model.RefreshTokenVO;
import com.pmp4.amoimproject.sign.model.UserVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.security.core.parameters.P;

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


    RefreshTokenVO tokenByUserid(String userId);
    String refreshTokenSelect(String token);

    int removeRefreshToken(@Param("accessToken") String accessToken, @Param("refreshToken") String refreshToken);

    int refreshTokenInsert(@Param("accessToken") String accessToken,
                           @Param("refreshToken") String refreshToken,
                           @Param("userId") String userId);

    int refreshTokenUpdate(@Param("accessToken") String accessToken, @Param("refreshToken") String refreshToken);
}
