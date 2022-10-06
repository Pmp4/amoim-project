package com.pmp4.amoimproject.tag.api;

import com.pmp4.amoimproject.tag.model.TagService;
import com.pmp4.amoimproject.tag.model.TagVO;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tag")
@RequiredArgsConstructor
public class TagController {
    private static final Logger logger = LoggerFactory.getLogger(TagController.class);

    private final TagService tagService;


    @GetMapping("/select/{keyword}")
    public List<TagVO> selectByKeyword(@PathVariable(required = false) String keyword) {
        logger.info("태그 API, keyword={}", keyword);

        List<TagVO> res = tagService.selectByKeyword(keyword);
        logger.info("DB 결과, cnt={}", res.size());

        return res;
    }
}
