package com.pmp4.amoimproject.configuration.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pmp4.amoimproject.jwt.JwtTokenProvider;
import com.pmp4.amoimproject.sign.model.EntryPointErrorResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


//JWT 토큰의 유효성 확인 후, SecurityContextHolder 에 추가하는 필터 (보안필터 체인에 추가됨, SecurityConfiguration 에서)
//JWT 토큰의 유효성 확인 후, SecurityContextHolder 에 추가하는 필터 (보안필터 체인에 추가됨, SecurityConfiguration 에서)
//JWT 토큰의 유효성 확인 후, SecurityContextHolder 에 추가하는 필터 (보안필터 체인에 추가됨, SecurityConfiguration 에서)
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private static final Logger LOGGER = LoggerFactory.getLogger(JwtAuthenticationFilter.class);
    private final JwtTokenProvider jwtTokenProvider;

    public JwtAuthenticationFilter(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest,
                                    HttpServletResponse httpServletResponse,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String token = jwtTokenProvider.resolveToken(httpServletRequest);
        LOGGER.info("[doFilterInternal] token 값 추출 완료. token : {}", token);


        LOGGER.info("[doFilterInternal] token 값 유효성 체크 시작");
        boolean tokenCheck = false;
        if(token != null && !token.equals("null")) {
            if(jwtTokenProvider.validateToken(token)) {
                tokenCheck = true;
                Authentication authentication = jwtTokenProvider.getAuthentication(token);
                SecurityContextHolder.getContext().setAuthentication(authentication);

                LOGGER.info("[doFilterInternal] token 값 유효성 체크 완료");

                filterChain.doFilter(httpServletRequest, httpServletResponse);
            } else {
//                LOGGER.info("[doFilterInternal] 토큰 유효 체크 실패");
//
//                ObjectMapper objectMapper = new ObjectMapper();
//                EntryPointErrorResponse entryPointErrorResponse = new EntryPointErrorResponse();
//                entryPointErrorResponse.setMsg("인증이 실패하였습니다.");
//
//                httpServletResponse.setStatus(401);
//                httpServletResponse.setContentType("application/json");
//                httpServletResponse.setCharacterEncoding("UTF-8");
//                httpServletResponse.setHeader(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, "*");
//                httpServletResponse.getWriter().write(objectMapper.writeValueAsString(entryPointErrorResponse));
//                httpServletResponse.getWriter().flush();
            }
        } else {
//            LOGGER.info("[doFilterInternal] 토큰 없음");
//            filterChain.doFilter(httpServletRequest, httpServletResponse);
        }

        if(!tokenCheck) {
            LOGGER.info("[doFilterInternal] 토큰 유효 체크 실패");

            ObjectMapper objectMapper = new ObjectMapper();
            EntryPointErrorResponse entryPointErrorResponse = new EntryPointErrorResponse();
            entryPointErrorResponse.setMsg("인증이 실패하였습니다.");

            httpServletResponse.setStatus(401);
            httpServletResponse.setContentType("application/json");
            httpServletResponse.setCharacterEncoding("UTF-8");
            httpServletResponse.setHeader(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, "*");
            httpServletResponse.getWriter().write(objectMapper.writeValueAsString(entryPointErrorResponse));
            httpServletResponse.getWriter().flush();
        }
    }
}
