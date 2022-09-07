package com.pmp4.amoimproject.user.model;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{
    private final UserDAO userDAO;

    @Override
    public List<UserVO> selectAll() {
        return userDAO.selectAll();
    }

    @Override
    public int selectValueCount(Map<String, Object> obj) {
        return userDAO.selectValueCount(obj);
    }

    @Override
    public int insertUser(UserVO userVO) {
        return userDAO.insertUser(userVO);
    }

}
