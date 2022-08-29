package com.pmp4.amoimproject.user.model;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{
    private final UserDAO userDAO;

    @Override
    public List<UserVO> selectAll() {
        return userDAO.selectAll();
    }

    @Override
    public int selectUserIdCount(String userId) {
        return userDAO.selectUserIdCount(userId);
    }
}
