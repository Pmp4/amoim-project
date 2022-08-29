package com.pmp4.amoimproject.user.api;

import com.pmp4.amoimproject.user.model.UserService;
import com.pmp4.amoimproject.user.model.UserVO;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    private final UserService userService;

    @GetMapping("/select")
    public List<UserVO> selectAll() {
        return userService.selectAll();
    }

    @GetMapping("/check")
    public Map<String, Object> selectUserIdCount(@RequestParam String userId) {
        logger.info("API 아이디 중복체크 userId={}", userId);

        int cnt = userService.selectUserIdCount(userId);
        logger.info("중복체크 결과 cnt={}", cnt);

        Map<String, Object> res = new HashMap<>();
        res.put("SUCCESS", true);
        if(cnt == 0) res.put("CHECK", true);

        return res;
    }
}
