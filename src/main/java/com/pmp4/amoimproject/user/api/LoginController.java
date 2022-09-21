package com.pmp4.amoimproject.user.api;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.Map;

@RestController
@RequestMapping("/login")
public class LoginController {
    private static final Logger logger = LoggerFactory.getLogger(LoginController.class);

    @PostMapping("/check")
    public String loginCheck(@RequestBody Map<String, Object> loginData, HttpSession session) {
        logger.info("API 로그인 검사, loginData={}", loginData);
        logger.info("session ID={}", session.getId());



        return "test";
    }
}
