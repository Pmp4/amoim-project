package com.pmp4.amoimproject.interest.model;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface InterestDAO {
    List<InterestVO> categorySelect(String type);

    int insertUserInterest(Map<String, Object> map);
}
