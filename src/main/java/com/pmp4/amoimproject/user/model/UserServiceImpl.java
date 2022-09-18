package com.pmp4.amoimproject.user.model;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pmp4.amoimproject.address.model.AddressVO;
import com.pmp4.amoimproject.common.Encrypt;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import java.util.*;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{
    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    private final UserDAO userDAO;
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

    /**
     * @param restJson
     * @return 결과
     */
    @Override
    @Transactional
    public int insertUser(Map<String, Object> restJson) {
        UserVO userVO = objectMapper.convertValue(restJson.get("userInfo"), UserVO.class);
        List<Map<String, Object>> interests = new ArrayList<>();
        Map<String, Object> restInterest = (Map) restJson.get("interests");
        AddressVO addressVO = objectMapper.convertValue(restJson.get("address"), AddressVO.class);

        userVO.setSalt(encrypt.getSalt());
        userVO.setPassword(encrypt.getEncrypt(userVO.getPassword(), userVO.getSalt()));

        try {
//            int cnt = userDAO.insertUser(userVO);
            int cnt = 1;
            logger.info("UserService inserUser 결과 cnt={}, userVO.getUserNo={}", cnt, userVO.getUserNo());

            if(cnt > 0) {
                Set<String> set = restInterest.keySet();
                Iterator<String> iterator = set.iterator();

                while(iterator.hasNext()) {
                    
                }

            }else {
                return -1;
            }
        } catch (RuntimeException e) {
            e.printStackTrace();
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            return -1;
        }

        return 1;
    }



}
