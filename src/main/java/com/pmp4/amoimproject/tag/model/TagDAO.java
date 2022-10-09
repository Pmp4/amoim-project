package com.pmp4.amoimproject.tag.model;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface TagDAO {
    List<TagVO> selectByKeyword(String keyword);

    TagVO selectByTag(String tagName);

    int insertTag(TagVO tagVO);
}
