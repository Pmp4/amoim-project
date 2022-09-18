package com.pmp4.amoimproject.interest.model;

import java.util.List;
import java.util.Map;

public interface InterestService {
    List<InterestVO> categorySelect(String type);
    int insertUserInterest(Map<String, Object> map);
}
