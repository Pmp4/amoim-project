package com.pmp4.amoimproject.user.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.sql.Timestamp;
import java.util.Collection;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PrincipalDetails implements UserDetails {
    private UserVO userVO;

    public PrincipalDetails(UserVO userVO) {
        this.userVO = userVO;
    }

    public UserVO getUserVO() {
        return userVO;
    }

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Collection<? extends GrantedAuthority> authorities;


    // 계정이 가지고 있는 권한 목록을 리턴
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    // 계정의 이름을 리턴, 일반적으로 아이디
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override
    public String getUsername() {
        return userVO.getUserId();
    }

    // 계정의 비밀번호를 리턴
    @Override
    public String getPassword() {
        return userVO.getPassword();
    }

    // 계정이 만료됐는지 리턴, true는 만료되지않았다.
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    // 계정이 잠겼있는지 리턴. true는 잠기지 않았다.
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    // 비밀번호가 만료됐는지 리턴. true는 만료되지 않았다.
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    // 계정이 활성화돼 있는지 리턴. true는 활성화
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override
    public boolean isEnabled() {
        return true;
    }
}
