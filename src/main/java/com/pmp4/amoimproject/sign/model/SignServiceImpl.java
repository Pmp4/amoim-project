package com.pmp4.amoimproject.sign.model;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pmp4.amoimproject.address.model.UserAddressDAO;
import com.pmp4.amoimproject.address.model.UserAddressVO;
import com.pmp4.amoimproject.common.CommonResponse;
import com.pmp4.amoimproject.common.ConstUtil;
import com.pmp4.amoimproject.common.Encrypt;
import com.pmp4.amoimproject.common.FileUploadUtil;
import com.pmp4.amoimproject.interest.model.InterestDAO;
import com.pmp4.amoimproject.jwt.JwtTokenProvider;
import com.pmp4.amoimproject.user.model.UserDAO;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

@Service
@RequiredArgsConstructor
public class SignServiceImpl implements SignService{
    private static final Logger logger = LoggerFactory.getLogger(SignServiceImpl.class);
    private final JwtTokenProvider jwtTokenProvider;
    private final UserDAO userDAO;
    private final Encrypt encrypt;
    private final InterestDAO interestDAO;
    private final UserAddressDAO userAddressDAO;

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

    @Override
    @Transactional
    public int signUp(HttpServletRequest httpServletRequest, Map<String, Object> restData) {
        logger.info("[signUp] 서비스 로직");
        ObjectMapper objectMapper = new ObjectMapper();
        FileUploadUtil fileUploadUtil = new FileUploadUtil();

        int result = -1;
        try {
            UserVO userVO = objectMapper.convertValue(restData.get("userInfo"), UserVO.class);
            List<Map<String, Object>> interests = new ArrayList<>();
            Map<String, Object> restInterest = (Map) restData.get("interests");
            UserAddressVO userAddressVO = objectMapper.convertValue(restData.get("address"), UserAddressVO.class);

            userVO.setSalt(encrypt.getSalt());
            userVO.setPassword(encrypt.getEncrypt(userVO.getPassword(), userVO.getSalt()));




            int cnt = userDAO.insertUser(userVO);
            logger.info("[signUp] inserUser 결과 cnt : {}, userVO.getUserNo : {}", cnt, userVO.getUserNo());

            if(cnt > 0) {
                Set<Map.Entry<String, Object>> set = restInterest.entrySet();

                for (Map.Entry<String, Object> entry : set) {
                    String key = entry.getKey();
                    List<Integer> values = (List<Integer>) entry.getValue();

                    logger.info("key : {}", key);
                    logger.info("values : {}", values);

                    for(Integer value : values) {
                        Map<String, Object> tempMap = new HashMap<>();
                        tempMap.put("categoryCode", value);
                        tempMap.put("categoryParent", key);
                        tempMap.put("userNo", userVO.getUserNo());

                        interests.add(tempMap);
                    }
                }

                for(Map<String, Object> map: interests) {
                    cnt = interestDAO.insertUserInterest(map);
                    logger.info("[signUp] insertUserInterest 결과 cnt : {}", cnt);
                }

                if(cnt > 0) {
                    userAddressVO.setUserNo(userVO.getUserNo());
                    cnt = userAddressDAO.insertAddress(userAddressVO);

                    logger.info("[signUp] insertAddress 결과 cnt : {}", cnt);

                    if(cnt > 0) {
                        boolean profileState = (boolean) restData.get("profileState");
                        if(profileState) {
                            List<Map<String, Object>> files
                                    = fileUploadUtil.mulitiFileUpload(httpServletRequest, ConstUtil.UPLOAD_PROFILE);

                            logger.info("[signUp] 이미지 업로드 결과 files.size : {}", files.size());
                            cnt = userDAO.userProfileEdit(String.valueOf(userVO.getUserNo()),
                                    (String) files.get(0).get("fileName"));

                            logger.info("[signUp] 이미지 DB 업데이트 cnt : {}", cnt);

                            if(cnt > 0) result = 1;
                        }else {
                            result = 1;
                        }
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
        }

        if(result == -1) throw new RuntimeException();

        return result;
    }

    private void setSuccessResult(SignInResultVO result) {
        result.setSuccess(true);
        result.setCode(CommonResponse.SUCCESS.getCode());
        result.setMsg(CommonResponse.SUCCESS.getMsg());
    }
}
