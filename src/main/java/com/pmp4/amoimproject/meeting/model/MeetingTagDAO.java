package com.pmp4.amoimproject.meeting.model;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface MeetingTagDAO {
    int meetingTagAdd(@Param("meetingNo") Long meetingNo, @Param("tagNo") Long tagNo);
}
