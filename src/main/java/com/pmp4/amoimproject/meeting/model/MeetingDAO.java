package com.pmp4.amoimproject.meeting.model;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface MeetingDAO {
    int insertMeeting(MeetingVO meetingVO);

    int meetingTagAdd(@Param("meetingNo") Long meetingNo, @Param("tagNo") Long tagNo);

    int insertMeetingImage(Map<String, Object> map);

    int insertMeetingAddress(MeetingAddressVO meetingAddressVO);

    List<Map<String, Object>> selectByUserNoCard(Long userNo);
}
