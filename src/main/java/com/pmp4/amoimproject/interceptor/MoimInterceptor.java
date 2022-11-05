package com.pmp4.amoimproject.interceptor;

import com.pmp4.amoimproject.common.AuthErrorResponse;
import com.pmp4.amoimproject.meeting.model.MeetingService;
import com.pmp4.amoimproject.sign.model.PrincipalDetails;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.HandlerMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;


public class MoimInterceptor implements HandlerInterceptor {
    private static final Logger LOGGER = LoggerFactory.getLogger(MoimInterceptor.class);

    @Autowired
    private MeetingService meetingService;


    @Override
    public boolean preHandle(HttpServletRequest httpServletRequest,
                             HttpServletResponse httpServletResponse,
                             Object handler)
            throws Exception {
        Map<?, ?> pathVariables =
                (Map<?, ?>) httpServletRequest.getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE);

        LOGGER.info("[preHandle - interceptor] Path : {}", httpServletRequest.getServletPath());
        LOGGER.info("[preHandle - interceptor] Path Variable : {}", pathVariables);

        PrincipalDetails principal = (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long tokenUserNo = principal.getUserVO().getUserNo();
        LOGGER.info("[preHandle - interceptor] tokenUserNo : {}", tokenUserNo);

        String no = (String) pathVariables.get("meetingNo");
        Long dbUserNo = meetingService.selectMoimUserNo(Long.valueOf(no));

        LOGGER.info("[preHandle - interceptor] dbUserNo : {}", dbUserNo);


        if(!dbUserNo.equals(tokenUserNo)) {
            AuthErrorResponse authErrorResponse = new AuthErrorResponse("수정할 수 있는 권한이 없습니다.");
            authErrorResponse.errorResponse(httpServletResponse);

            return false;
        }


        return true;
    }
}
