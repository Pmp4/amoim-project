package com.pmp4.amoimproject.tag.model;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TagServiceImpl implements TagService {
    private final TagDAO tagDAO;

    @Override
    public List<TagVO> selectByKeyword(String keyword) {
        return tagDAO.selectByKeyword(keyword);
    }

    @Override
    public TagVO selectByTag(String tagName) {
        return tagDAO.selectByTag(tagName);
    }

    @Override
    public int insertTag(TagVO tagVO) {
        return tagDAO.insertTag(tagVO);
    }
}
