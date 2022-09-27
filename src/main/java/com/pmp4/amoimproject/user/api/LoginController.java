package com.pmp4.amoimproject.user.api;

import com.pmp4.amoimproject.user.model.UserService;
import com.pmp4.amoimproject.user.model.UserVO;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/login")
@RequiredArgsConstructor
public class LoginController {
    private static final Logger logger = LoggerFactory.getLogger(LoginController.class);

    private final UserService userService;

    @PostMapping("/check")
    public Map<String, Object> loginCheck(@RequestBody Map<String, Object> loginData, HttpSession session) {
        logger.info("API 로그인 검사, loginData={}", loginData);
        logger.info("session ID={}", session.getId());

        Map<String, Object> resData = userService.loginCheck(loginData);
        UserVO userVO = (UserVO)resData.get("userVo");

        if((boolean)resData.get("SUCCESS")) {
            session.setAttribute("loginStatus", true);
            session.setAttribute("userNo", userVO.getUserNo());
            session.setAttribute("userId", userVO.getUserId());
        }

        return resData;
    }
}
