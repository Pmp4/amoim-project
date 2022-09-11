package com.pmp4.amoimproject.interest.model;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InterestServiceImpl implements InterestService{
    private final InterestDAO interestDAO;

    @Override
    public List<InterestVO> categorySelect(String type) {
        return interestDAO.categorySelect(type);
    };
}
