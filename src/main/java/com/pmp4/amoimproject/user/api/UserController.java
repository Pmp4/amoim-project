package com.pmp4.amoimproject.user.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pmp4.amoimproject.address.model.AddressVO;
import com.pmp4.amoimproject.common.Encrypt;
import com.pmp4.amoimproject.user.model.UserService;
import com.pmp4.amoimproject.user.model.UserVO;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    private static final Encrypt encrypt = new Encrypt();

    private final UserService userService;
    private final ObjectMapper objectMapper;

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



    @PostMapping("/signup")
    public Map<String, Object> memberSignup(@RequestBody Map<String, Object> restJson) {
        logger.info("API 회원가입 restJson={}", restJson);

//        UserVO userVO = objectMapper.convertValue(jsonData.get("userInfo"), UserVO.class);
//        AddressVO addressVO = objectMapper.convertValue(jsonData.get("address"), AddressVO.class);
//        logger.info("json 추출 결과 userVO={}", userVO);
//        logger.info("json 추출 결과 addressVO={}", addressVO);
//
//        userVO.setSalt(encrypt.getSalt());
//        userVO.setPassword(encrypt.getEncrypt(userVO.getPassword(), userVO.getSalt()));

        int cnt = userService.insertUser(restJson);


        Map<String, Object> resJson = new HashMap<>();
        resJson.put("SUCCESS", true);

        return resJson;
    }
}
