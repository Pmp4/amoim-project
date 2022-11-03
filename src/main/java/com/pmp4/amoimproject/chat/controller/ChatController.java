package com.pmp4.amoimproject.chat.controller;

import com.pmp4.amoimproject.chat.model.ChatService;
import com.pmp4.amoimproject.chat.model.ChatVO;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/chat")
public class ChatController {
    private static final Logger LOGGER = LoggerFactory.getLogger(ChatController.class);

    private final ChatService chatService;

    @PostMapping("/add")
    public int regitractionChat(@RequestBody ChatVO chatVO) {
        LOGGER.info("[regitractionChat] 핸들러 chatVO : {}", chatVO);

        return chatService.insertChat(chatVO);
    }
}
