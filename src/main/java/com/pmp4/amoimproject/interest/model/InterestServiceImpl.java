package com.pmp4.amoimproject.interest.model;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class InterestServiceImpl implements InterestService{
    private static final Logger LOGGER = LoggerFactory.getLogger(InterestServiceImpl.class);

    private final InterestDAO interestDAO;

    @Override
    public List<InterestVO> categorySelect(String type) {
        return interestDAO.categorySelect(type);
    }

    @Override
    public int insertUserInterest(Map<String, Object> map) {
        return interestDAO.insertUserInterest(map);
    }

    @Override
    public List<Map<String, Object>> selectUserCategory(String userNo) {
        LOGGER.info("[selectUserCategory] 서비스 로직");

        List<Map<String, Object>> list = interestDAO.selectUserCategory(userNo);
        LOGGER.info("[selectUserCategory] 결과 list.size : {}", list.size());

        return list;
    }
}
