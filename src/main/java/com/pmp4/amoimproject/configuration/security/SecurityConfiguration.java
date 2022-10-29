package com.pmp4.amoimproject.configuration.security;

import com.pmp4.amoimproject.jwt.JwtTokenProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsUtils;


/*
 * configure(HttpSecurity httpSecurity)
 * 리소스 접근 권한 설정
 * 인증 실패 시 발생하는 예외 처리
 * 인증 로직 커스텀마이징
 * csrf, cors 등의 스프링 시큐리티 설정
 */
@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
    private static final Logger LOGGER = LoggerFactory.getLogger(SecurityConfiguration.class);

    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    public SecurityConfiguration(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }



    /*
     * configure(HttpSecurity httpSecurity)
     * 리소스 접근 권한 설정
     * 인증 실패 시 발생하는 예외 처리
     * 인증 로직 커스텀마이징
     * csrf, cors 등의 스프링 시큐리티 설정
     */
    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.httpBasic().disable()  //UI를 사용하는 것을 기본값으로 가진 시큐리티 설정을 비활성화
                .csrf().disable()           //CSRF 비활성화, REST API 에서는 CSRF 보안이 필요 없음
                .cors().and()

                .sessionManagement()
                .sessionCreationPolicy(
                        SessionCreationPolicy.STATELESS
                ).and()                     //REST API 기반 애플리케이션의 동작 방식 설정
                                            //세션을 사용 여부


                .authorizeRequests()    //애플리케이션에 들어오는 요청에 대한 사용 권한
                .antMatchers("/sign-api/sign-in", "/sign-api/sign-up",
                        "/sign-api/exception").permitAll()  //해당 URI는 모두 허용
                .antMatchers("/user/**").permitAll()
                .antMatchers("**exception**").permitAll()   //'exception' 단어는 모두 허용
                .requestMatchers(CorsUtils::isPreFlightRequest).permitAll()     //CORS 관련

                .and()
                .exceptionHandling().accessDeniedHandler(new CustomAccessDeniedHandler())   //권한이 안맞을 때 exception

                .and()
                .exceptionHandling().authenticationEntryPoint(new CustomAuthenticationEntryPoint()) //인증 실패 exception

                .and()  //보안 필터체인에 필터 등록
                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider),
                        UsernamePasswordAuthenticationFilter.class);
    }



    /*
     * configure(WebSecurity webSecurity)
     * 인증, 인가가 적용되기 전 동작하는 설정 (인증, 인가가 필요없는 URI를 등록함)
     */
    @Override
    public void configure(WebSecurity webSecurity) throws Exception {
        webSecurity.ignoring().antMatchers("/images/**")
                .antMatchers("/default/**")
                .antMatchers("/profile/**")
                .antMatchers("/meeting/select/main/**")
                .antMatchers("/interest/category/**");
    }




}
