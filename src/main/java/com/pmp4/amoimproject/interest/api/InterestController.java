package com.pmp4.amoimproject.interest.api;

import com.pmp4.amoimproject.interest.model.InterestService;
import com.pmp4.amoimproject.interest.model.InterestVO;
import com.pmp4.amoimproject.sign.model.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/interest")
@RequiredArgsConstructor
public class InterestController {
    private static final Logger logger = LoggerFactory.getLogger(InterestController.class);
    private final InterestService interestService;


    @GetMapping("/category")
    public Map<String, Object> selectCategory(@RequestParam String type) {
        logger.info("API 카테고리 조회, 파라미터 type={}", type);

        List<InterestVO> list = interestService.categorySelect(type);
        logger.info("API 카테고리 조회 결과 list.size={}", list.size());

        Map<String, Object> res = new HashMap<>();
        res.put("SUCCESS", false);

        if(list.size() > 0) {
            res.put("SUCCESS", true);
            res.put("list", list);
            if(type.equals("")) {
                res.put("type", true);
            }
        }

        return res;
    }


    @GetMapping("/user")
    public List<Map<String, Object>> interestUser() {
        logger.info("[interestUser] 핸들러");

        PrincipalDetails principal =
                (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Long userNo = principal.getUserVO().getUserNo();
        logger.info("[interestUser] SecurityContextHolder 추출 userNo : {}", userNo);

        return interestService.selectUserCategory(String.valueOf(userNo));
    }
}
