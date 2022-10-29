package com.pmp4.amoimproject.sign.controller;

import com.pmp4.amoimproject.sign.model.SignInResultVO;
import com.pmp4.amoimproject.sign.model.SignService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
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
        throw new RuntimeException("접근이 금지되었습니다.");
    }

    @ExceptionHandler(value = RuntimeException.class)
    public ResponseEntity<Map<String, Object>> ExceptionHandler(RuntimeException e) {
        HttpHeaders responseHeaders = new HttpHeaders();
        HttpStatus httpStatus = HttpStatus.BAD_REQUEST;

        LOGGER.error("ExceptionHandler 호출, {}, {}", e.getCause(), e.getMessage());
        Map<String, Object> map = new HashMap<>();

        map.put("error type", httpStatus.getReasonPhrase());
        map.put("code", "400");
        map.put("message", "에러 발생");

        return new ResponseEntity<>(map, responseHeaders, httpStatus);
    }


    @GetMapping("/test")
    public void test (HttpServletResponse httpServletResponse) throws IOException {
        LOGGER.info("[test] test");

        httpServletResponse.sendRedirect("http://google.com");
    }
}
