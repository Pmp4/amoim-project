package com.pmp4.amoimproject.interceptor;

import com.pmp4.amoimproject.sign.model.PrincipalDetails;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class MoimInterceptor implements HandlerInterceptor {
    private static final Logger LOGGER = LoggerFactory.getLogger(MoimInterceptor.class);

    private String path;


    @Override
    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response,
                             Object handler)
            throws Exception {
        LOGGER.info("[preHandle] interceptor");

        // Filter 에서 토큰 유효 시, 저장한 인증객체를 찾아옴
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Long userNo;
        if(principal instanceof PrincipalDetails) {
            userNo = ((PrincipalDetails)principal).getUserVO().getUserNo();
        }else {
            LOGGER.info("[preHandle] 접근 금지");
//            response.setHeader(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, "http://localhost:8080");
            response.sendRedirect("http://localhost:8080/rest/v1/sign-api/exception");
            return false;
//            userNo = null;
        }

        LOGGER.info("[preHandle] SecurityContextHolder 인증 userNo : {}", userNo);

        return true;
    }
}
