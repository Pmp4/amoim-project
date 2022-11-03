package com.pmp4.amoimproject.chat.controller;

import com.pmp4.amoimproject.chat.model.ChatService;
import com.pmp4.amoimproject.chat.model.ChatVO;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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



    @GetMapping("/list")
    public List<ChatVO> chatHistory(@RequestParam Long meetingNo, @RequestParam String no) {
        LOGGER.info("[chatHistory] 핸들러 meetingNo : {}, no : {}", meetingNo, no);

        return chatService.chatList(meetingNo, no);
    }
}
