package com.pmp4.amoimproject.meeting.model;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface MeetingImageDAO {
    int insertMeetingImage(Map<String, Object> map);
    int deleteMoimImage(Long meetingNo);
    List<Map<String, Object>> selectMoimFileList(Long meetingNo);
}
