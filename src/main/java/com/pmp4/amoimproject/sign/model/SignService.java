package com.pmp4.amoimproject.sign.model;

import com.pmp4.amoimproject.sign.model.SignInResultVO;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

public interface SignService {
    SignInResultVO signIn(String id, String password);

    int signUp(HttpServletRequest httpServletRequest, Map<String, Object> restData);
}
