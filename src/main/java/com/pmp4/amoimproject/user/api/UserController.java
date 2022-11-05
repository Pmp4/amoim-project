package com.pmp4.amoimproject.user.api;

import com.pmp4.amoimproject.common.Encrypt;
import com.pmp4.amoimproject.sign.model.PrincipalDetails;
import com.pmp4.amoimproject.user.model.UserService;
import com.pmp4.amoimproject.sign.model.UserVO;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    private static final Encrypt encrypt = new Encrypt();

    private final UserService userService;

    @GetMapping("/select")
    public List<UserVO> selectAll() {
        return userService.selectAll();
    }


    //아이디, 이메일 중복체크
    //아이디, 이메일 중복체크
    //아이디, 이메일 중복체크
    @GetMapping("/check")
    public Map<String, Object> selectUserIdCount(
            @RequestParam String value,
            @RequestParam(defaultValue = "0") int type
    ) {
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

        int cnt = userService.insertUser(restJson);
        logger.info("API 회원가입 결과 cnt={}", cnt);

        Map<String, Object> resJson = new HashMap<>();

        if(cnt > 0) {
            resJson.put("SUCCESS", true);
            resJson.put("MESSAGE", "회원가입이 정상적으로 처리되었습니다.");
        }else {
            resJson.put("SUCCESS", false);
            resJson.put("MESSAGE", "회원가입이 정상적으로 처리되지 않았습니다.");
        }


        return resJson;
    }



    @PostMapping("/profile/edit")
    public int profileImageEdit(HttpServletRequest httpServletRequest) {
        logger.info("[profileImageEdit] 핸들러");

        PrincipalDetails principalDetails =
                (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Long userNo = principalDetails.getUserVO().getUserNo();

        return userService.userProfileImageEdit(httpServletRequest, userNo);
    }





    @GetMapping("/info")
    public UserVO memberInfo () {
        logger.info("[memberInfo] 핸들러");

        PrincipalDetails principal =
                (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        return principal.getUserVO();
    }
}
