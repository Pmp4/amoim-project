package com.pmp4.amoimproject.meeting.model;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MeetingAddressDAO {
    int insertMeetingAddress(MeetingAddressVO meetingAddressVO);

    int updateMoimAddress(MeetingAddressVO meetingAddressVO);
}
