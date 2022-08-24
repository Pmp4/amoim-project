package com.pmp4.amoimproject.user.api;

import com.pmp4.amoimproject.user.model.UserService;
import com.pmp4.amoimproject.user.model.UserVO;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    private final UserService userService;

    @GetMapping("/select")
    public List<UserVO> selectAll() {
        return userService.selectAll();
    }
}
