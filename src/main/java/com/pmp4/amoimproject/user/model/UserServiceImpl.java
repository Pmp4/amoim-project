package com.pmp4.amoimproject.user.model;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pmp4.amoimproject.address.model.AddressDAO;
import com.pmp4.amoimproject.address.model.AddressVO;
import com.pmp4.amoimproject.common.Encrypt;
import com.pmp4.amoimproject.interest.model.InterestDAO;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import java.util.*;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    private final UserDAO userDAO;
    private final InterestDAO interestDAO;
    private final AddressDAO addressDAO;

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
        AddressVO addressVO = objectMapper.convertValue(restJson.get("address"), AddressVO.class);

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

                addressVO.setUserNo(userVO.getUserNo());
                cnt = addressDAO.insertAddress(addressVO);
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
            }
        }

        resMap.put("SUCCESS", success);
        resMap.put("successText", successText);

        return resMap;
    }


}
