package com.pmp4.amoimproject.interest.model;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface InterestDAO {
    List<InterestVO> categorySelect(String type);
}
