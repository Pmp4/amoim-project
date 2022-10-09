package com.pmp4.amoimproject.tag.model;

import java.util.List;

public interface TagService {
    List<TagVO> selectByKeyword(String keyword);

    TagVO selectByTag(String tagName);

    int insertTag(TagVO tagVO);
}
