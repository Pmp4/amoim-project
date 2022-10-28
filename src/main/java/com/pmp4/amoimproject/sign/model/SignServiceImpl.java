package com.pmp4.amoimproject.sign.model;

import com.pmp4.amoimproject.common.CommonResponse;
import com.pmp4.amoimproject.common.Encrypt;
import com.pmp4.amoimproject.jwt.JwtTokenProvider;
import com.pmp4.amoimproject.user.model.UserDAO;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SignServiceImpl implements SignService{
    private static final Logger logger = LoggerFactory.getLogger(SignServiceImpl.class);
    private final JwtTokenProvider jwtTokenProvider;
    private final UserDAO userDAO;
    private final Encrypt encrypt;

    @Override
    public SignInResultVO signIn(String id, String password) {
        logger.info("[getSignInResult] signDataHandler 로 회원 정보 요청");

        PrincipalDetails principalDetails = new PrincipalDetails(userDAO.getUserInfo(id));
        logger.info("[getSignInResult] ID : {}", id);

        logger.info("[getSignInResult] 패스워드 비교 수행");
        String checkPwd = encrypt.getEncrypt(password, principalDetails.getUserVO().getSalt());
        if(!(principalDetails.getPassword().equals(checkPwd))) {
            throw new RuntimeException();
        }
        logger.info("[getSignInResult] 패스워드 일치");

        logger.info("[getSignInResult] SignInResultDto 객체 생성");
        SignInResultVO signInResultVO = SignInResultVO.builder()
                .token(jwtTokenProvider.createToken(
                            String.valueOf(principalDetails.getUserVO().getUserId()),
                            String.valueOf(principalDetails.getUserVO().getUserNo()),
                            principalDetails.getUserVO().getName()
                        )
                )
                .build();

        logger.info("[getSignInResult] SignInResultVO 객체에 값 주입");
        setSuccessResult(signInResultVO);

        return signInResultVO;
    }

    private void setSuccessResult(SignInResultVO result) {
        result.setSuccess(true);
        result.setCode(CommonResponse.SUCCESS.getCode());
        result.setMsg(CommonResponse.SUCCESS.getMsg());
    }
}
