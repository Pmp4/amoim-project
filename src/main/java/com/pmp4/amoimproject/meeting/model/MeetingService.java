package com.pmp4.amoimproject.meeting.model;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

public interface MeetingService {
    int meetingRegister(MeetingVO meetingVO,
                        MeetingAddressVO meetingAddressVO,
                        List<String> tagArr,
                        HttpServletRequest request);

    List<Map<String, Object>> selectByUserNoCard(Long userNo);
}
