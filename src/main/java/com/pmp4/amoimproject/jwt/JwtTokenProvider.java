package com.pmp4.amoimproject.jwt;

import com.pmp4.amoimproject.sign.model.PrincipalDetails;
import com.pmp4.amoimproject.user.model.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;

//JWT Token 관련 객체
//JWT Token 관련 객체
//JWT Token 관련 객체
//JWT Token 관련 객체
@Component
@RequiredArgsConstructor
public class JwtTokenProvider {
    private static final Logger LOGGER = LoggerFactory.getLogger(JwtTokenProvider.class);
    private final UserService userService;

    //application.properties
    @Value("${springboot.jwt.secret}")
    private String secretKey = "secretKey";
    private final long tokenValidMillisecond = 1000L * 10;     //1시간


    //PostConstruct : 해당 객체(클래스)가 빈 객체로 주입된 이후 수행된다는 걸 명시
    @PostConstruct
    protected void init() {
        LOGGER.info("[init] JwtTokenProvider 내 secretKey 초기화 시작");
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes(StandardCharsets.UTF_8));
        LOGGER.info("[init] JwtTokenProvider 내 secretKey 초기화 완료");
    }


    public String createToken(String userUid, String userNo, String name) {
        LOGGER.info("[createToken] 토큰 생성 시작 name : {}", name);
        Claims claims = Jwts.claims().setSubject(userUid);  //JWT의 제목
        claims.put("no", userNo);       //공개 클레임
        claims.put("username", name);

        Date now = new Date();

        String token = Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + tokenValidMillisecond))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();

        LOGGER.info("[createToken] 토큰 생성 완료");
        return token;
    }



    // SecurityContextHolder 에 저장할 Authentication 을 생성
    // SecurityContextHolder 에 저장할 Authentication 을 생성
    // SecurityContextHolder 에 저장할 Authentication 을 생성
    public Authentication getAuthentication(String token) {
        LOGGER.info("[getAuthentication] 토큰 인증 정보 조회 시작") ;
        PrincipalDetails principalDetails = new PrincipalDetails(userService.getByUid(this.getUsername(token)));

        LOGGER.info("[getAuthentication] 토큰 인증 정보 조회 완료, UserDetails UserName : {}", principalDetails.getUsername());
        return new UsernamePasswordAuthenticationToken(principalDetails, "", principalDetails.getAuthorities());
    }




    //토큰에 저장한 데이터 추출(payload 에서 sub 을 꺼냄)
    //토큰에 저장한 데이터 추출(payload 에서 sub 을 꺼냄)
    //토큰에 저장한 데이터 추출(payload 에서 sub 을 꺼냄)
    public String getUsername(String token) {
        LOGGER.info("[getUsername] 토큰 기반 회원 구별 정보 추출");
        String info = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();

        LOGGER.info("[getUsername] 토큰 기반 회원 구별 정보 추출 완료, info : {}", info);
        return info;
    }



    //클라이언트의 요청 헤더에 있는 'X-AUTH-TOKEN' 을 가져옴
    //클라이언트의 요청 헤더에 있는 'X-AUTH-TOKEN' 을 가져옴
    //클라이언트의 요청 헤더에 있는 'X-AUTH-TOKEN' 을 가져옴
    public String resolveToken(HttpServletRequest httpServletRequest) {
        LOGGER.info("[resolveToken] HTTP 헤더에서 Token 값 추출 getServletPath : {}", httpServletRequest.getServletPath());
        return httpServletRequest.getHeader("X-AUTH-TOKEN");
    }



    // 토큰의 클레임에 저장된 유효기간을 체크하고 boolean 타입의 값으로 리턴한다.
    // 토큰의 클레임에 저장된 유효기간을 체크하고 boolean 타입의 값으로 리턴한다.
    // 토큰의 클레임에 저장된 유효기간을 체크하고 boolean 타입의 값으로 리턴한다.
    public boolean validateToken(String token) {
        LOGGER.info("[validateToken] 토큰 유효 체크 시작 : {}", token);
        try {
            Jws<Claims> claimsJws = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);

            return !claimsJws.getBody().getExpiration().before(new Date());
        } catch (Exception e) {     //유효기간이 끝난 토큰일 경우, 예외 발생
            LOGGER.info("[validateToken] 토큰 유효 체크 예외 발생");
            return false;
        }
    }
}
