package com.pmp4.amoimproject.board.model;

import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class MeetingBoardFileVO {
    private MeetingBoardVO meetingBoardVO;
    private List<Map<String, Object>> fileList;
}
