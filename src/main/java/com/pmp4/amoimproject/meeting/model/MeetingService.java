package com.pmp4.amoimproject.meeting.model;

import org.apache.ibatis.annotations.Param;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

public interface MeetingService {
    int meetingRegister(MeetingVO meetingVO,
                        MeetingAddressVO meetingAddressVO,
                        List<String> tagArr,
                        HttpServletRequest request);

    //해당 유저가 생성한 모임 리스트를 카드 형식으로
    //해당 유저가 생성한 모임 리스트를 카드 형식으로
    //해당 유저가 생성한 모임 리스트를 카드 형식으로
    List<Map<String, Object>> selectByUserNoCard(Long userNo);


    Map<String, Object> selectByNo(String no);

    int selectByUserCount(String userNo);

    int likeCount(String meetingNo);

    int meetingLikeState(String userNo, String meetingNo);

    int insertMeetingLike(@Param("userNo") String userNo, @Param("meetingNo") String meetingNo);

    int deleteMeetingLike(@Param("userNo") String userNo, @Param("meetingNo") String meetingNo);


    Map<String, Object> meetingSubscribe(String userNo, String meetingNo);


    List<Map<String, Object>> moimSubscribeList(String userNo);
}
