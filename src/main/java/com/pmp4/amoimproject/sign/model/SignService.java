package com.pmp4.amoimproject.sign.model;

import com.pmp4.amoimproject.sign.model.SignInResultVO;

public interface SignService {
    SignInResultVO signIn(String id, String password);
}
