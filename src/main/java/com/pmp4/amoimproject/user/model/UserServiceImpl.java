package com.pmp4.amoimproject.user.model;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pmp4.amoimproject.interest.model.InterestVO;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{
    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    private final UserDAO userDAO;
    private final ObjectMapper objectMapper;

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
    public int insertUser(Map<String, Object> restJson) {
        UserVO userVO = objectMapper.convertValue(restJson.get("userInfo"), UserVO.class);
//        Map<String, Object> interestCode = restJson.get("interests");

        return 0;
    }



}
