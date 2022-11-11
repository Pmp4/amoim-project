package com.pmp4.amoimproject.user.model;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pmp4.amoimproject.address.model.UserAddressDAO;
import com.pmp4.amoimproject.address.model.UserAddressVO;
import com.pmp4.amoimproject.common.ConstUtil;
import com.pmp4.amoimproject.common.Encrypt;
import com.pmp4.amoimproject.common.FileUploadUtil;
import com.pmp4.amoimproject.error.data.code.DataBaseErrorCode;
import com.pmp4.amoimproject.error.data.exception.TransactionException;
import com.pmp4.amoimproject.interest.model.InterestDAO;
import com.pmp4.amoimproject.sign.model.UserVO;
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
public class UserServiceImpl implements UserService {
    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    private final UserDAO userDAO;
    private final InterestDAO interestDAO;
    private final UserAddressDAO addressDAO;

    private final ObjectMapper objectMapper;
    private final Encrypt encrypt;



    @Override
    public List<UserVO> selectAll() {
        return userDAO.selectAll();
    }

    @Override
    public int selectValueCount(Map<String, Object> obj) {
        return userDAO.selectValueCount(obj);
    }



    @Override
    @Transactional
    public int insertUser(Map<String, Object> restJson) {
        UserVO userVO = objectMapper.convertValue(restJson.get("userInfo"), UserVO.class);
        List<Map<String, Object>> interests = new ArrayList<>();
        Map<String, Object> restInterest = (Map) restJson.get("interests");
        UserAddressVO userAddressVO = objectMapper.convertValue(restJson.get("address"), UserAddressVO.class);

        userVO.setSalt(encrypt.getSalt());
        userVO.setPassword(encrypt.getEncrypt(userVO.getPassword(), userVO.getSalt()));

        int cnt = -1;
        try {
            cnt = userDAO.insertUser(userVO);
            logger.info("UserService inserUser 결과 cnt={}, userVO.getUserNo={}", cnt, userVO.getUserNo());

            if(cnt > 0) {
                Set<Map.Entry<String, Object>> set = restInterest.entrySet();

                for (Map.Entry<String, Object> entry : set) {
                    String key = entry.getKey();
                    List<Integer> values = (List<Integer>) entry.getValue();

                    logger.info("key={}", key);
                    logger.info("values={}", values);

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
                    logger.info("UserService insertUserInterest 결과 cnt={}", cnt);

                    if(!(cnt > 0)) return -1;
                }

                userAddressVO.setUserNo(userVO.getUserNo());
                cnt = addressDAO.insertAddress(userAddressVO);
                logger.info("UserService insertAddress 결과 cnt={}", cnt);

            }else {
                return -1;
            }
        } catch (RuntimeException e) {
            e.printStackTrace();
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            return -1;
        }

        return cnt;
    }

    @Override
    public Map<String, Object> loginCheck(Map<String, Object> loginData) {
        UserVO userVO = userDAO.checkUserId((String) loginData.get("userId"));

        Map<String, Object> resMap = new HashMap<>();
        String successText = "존재하지 않는 아이디입니다.";
        boolean success = false;
        if(userVO != null) {
            logger.info("userVo={}", userVO);
            String checkPwd = (String) loginData.get("password");

            checkPwd = encrypt.getEncrypt(checkPwd, userVO.getSalt());
            if(userVO.getPassword().equals(checkPwd)) {
                resMap.put("userVo", userVO);
                successText = userVO.getName() + "님, 로그인하셨습니다.";
                success = true;
            }else {
                successText = "비밀번호가 일치하지 않습니다.";
            }
        }

        resMap.put("SUCCESS", success);
        resMap.put("successText", successText);

        logger.info("로그인 결과 DATA={}", resMap);
        return resMap;
    }

    @Override
    @Transactional
    public int userProfileImageEdit(HttpServletRequest httpServletRequest, Long userNo) {
        logger.info("[userProfileImageEdit] 서비스 로직");

        FileUploadUtil fileUploadUtil = new FileUploadUtil();

        int result = -1;

        try {
            List<Map<String, Object>> file =
                    fileUploadUtil.mulitiFileUpload(httpServletRequest, ConstUtil.UPLOAD_PROFILE);
            logger.info("[userProfileImageEdit] 이미지 업로드 file.size : {}", file.size());

            if(file.size() > 0) {
                String profileImage = (String) file.get(0).get("fileName");
                logger.info("[userProfileImageEdit] 이미지 명 profileImage : {}", profileImage);

                int cnt = userDAO.userProfileEdit(String.valueOf(userNo), profileImage);
                if(cnt > 0) {
                    logger.info("[userProfileImageEdit] DB 수정 성공");
                    result = 1;
                }else {throw new Exception();}
            }
        }catch (Exception e) {
            e.printStackTrace();
            result = -1;
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
        }

        if(result == -1) throw new TransactionException(DataBaseErrorCode.INVALID_REQUEST);

        return result;
    }


    //JWT 테스트
    //JWT 테스트
    //JWT 테스트
    public UserVO getByUid(String userId) {
        return userDAO.getUserInfo(userId);
    }
}
