package com.pmp4.amoimproject.interest.model;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class InterestServiceImpl implements InterestService{
    private final InterestDAO interestDAO;

    @Override
    public List<InterestVO> categorySelect(String type) {
        return interestDAO.categorySelect(type);
    }

    @Override
    public int insertUserInterest(Map<String, Object> map) {
        return interestDAO.insertUserInterest(map);
    }

    ;
}
