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

    Map<String, Object> selectByNo(String no);

    int selectByUserCount(String userNo);

    int likeCount(@Param("meetingNo") String meetingNo);

    int meetingLikeState(@Param("userNo") String userNo, @Param("meetingNo") String meetingNo);

    int insertMeetingLike(@Param("userNo") String userNo, @Param("meetingNo") String meetingNo);

    int deleteMeetingLike(@Param("userNo") String userNo, @Param("meetingNo") String meetingNo);


    int meetingUserCount(@Param("userNo") String userNo, @Param("meetingNo") String meetingNo);

    Map<String, Object> meetingMemberCount(String meetingNo);

    int insertMeetingSub(@Param("userNo") String userNo, @Param("meetingNo") String meetingNo);

    List<Map<String, Object>> moimSubscribeList(String userNo);

    int updateUserMeetingSubResult(int[] no);
    int updateUserMeetingSubRefusal(int[] no);
}
