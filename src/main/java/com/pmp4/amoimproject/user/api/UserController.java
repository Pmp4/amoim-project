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


    //아이디, 이메일 중복체크
    //아이디, 이메일 중복체크
    //아이디, 이메일 중복체크
    @GetMapping("/check")
    public Map<String, Object> selectUserIdCount(@RequestParam String value, @RequestParam(defaultValue = "0") int type) {
        logger.info("API 중복체크 value={}, type={}", value, type);

        Map<String, Object> objMap = new HashMap<>();
        objMap.put("value", value);
        objMap.put("type", type == 1 ? "USER_ID" : type == 2 ? "EMAIL" : "");

        int cnt = userService.selectValueCount(objMap);
        logger.info("중복체크 결과, 개수 cnt={}", cnt);

        Map<String, Object> res = new HashMap<>();
        res.put("SUCCESS", true);
        if(cnt == 0) res.put("CHECK", true);

        return res;
    }
}
