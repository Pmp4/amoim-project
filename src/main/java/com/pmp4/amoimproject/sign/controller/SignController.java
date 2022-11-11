package com.pmp4.amoimproject.sign.controller;

import com.pmp4.amoimproject.error.data.code.ErrorCode;
import com.pmp4.amoimproject.error.data.exception.CustomException;
import com.pmp4.amoimproject.jwt.JwtTokenProvider;
import com.pmp4.amoimproject.sign.model.SignInResultVO;
import com.pmp4.amoimproject.sign.model.SignService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;


// token 활용 Controller
// token 활용 Controller
// token 활용 Controller
// token 활용 Controller
@RestController
@RequestMapping("/sign-api")
@RequiredArgsConstructor
public class SignController {
    private static final Logger LOGGER = LoggerFactory.getLogger(SignController.class);

    private final SignService signService;

    private final JwtTokenProvider jwtTokenProvider;


    //로그인
    //로그인
    //로그인
    @PostMapping("/sign-in")
    public SignInResultVO signIn (@RequestParam String id,
                                  @RequestParam String password) {
        LOGGER.info("[signIn] 로그인 시도중. id : {}, pw : ****", id);

        SignInResultVO signInResultVO = signService.signIn(id, password);

        if(signInResultVO.getCode() == 0) {
            LOGGER.info("[signIn] 정상적으로 로그인되었습니다. id : {}, token : {}", id, signInResultVO.getToken());
        }

        return signInResultVO;
    }


    @PostMapping("/refresh")
    public SignInResultVO refreshVerification(HttpServletRequest httpServletRequest) {
        LOGGER.info("[refreshVerification] RefreshToken 확인");

        String token = jwtTokenProvider.resolveToken(httpServletRequest);
        LOGGER.info("[refreshVerification] token 확인 : {}", token);

        return signService.refreshTokenVerification(token);
    }


    @PostMapping("/sign-up")
    public int signUp (HttpServletRequest httpServletRequest,
                                       @RequestPart Map<String, Object> restJson) {
        LOGGER.info("[signUp] 핸들러 restJson : {}", restJson);


        return signService.signUp(httpServletRequest, restJson);
    }



    //로그아웃
    //로그아웃
    //로그아웃
//    @PostMapping("/logout")
//    public SignInResultVO logout() {
//        LOGGER.info("[signIn] 로그인 시도중. id : {}, pw : ****", id);
//    }







    @GetMapping("/exception")
    public void exceptionTest() throws RuntimeException {
        LOGGER.info("[exceptionTest] 접근");
        throw new CustomException(ErrorCode.NO_ACCESS_AUTHORITY);
    }


//    @ExceptionHandler(value = RuntimeException.class)
//    public ResponseEntity<Map<String, Object>> ExceptionHandler(RuntimeException e) {
//        HttpHeaders responseHeaders = new HttpHeaders();
//        HttpStatus httpStatus = HttpStatus.BAD_REQUEST;
//
//        LOGGER.error("ExceptionHandler 호출, {}, {}", e.getCause(), e.getMessage());
//        Map<String, Object> map = new HashMap<>();
//
//        map.put("error type", httpStatus.getReasonPhrase());
//        map.put("code", "400");
//        map.put("message", "나중에 다시 시도해주세요.");
//
//        return new ResponseEntity<>(map, responseHeaders, httpStatus);
//    }
}
