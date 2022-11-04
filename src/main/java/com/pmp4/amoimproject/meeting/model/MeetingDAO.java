package com.pmp4.amoimproject.meeting.model;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface MeetingDAO {
    Long selectMoimUserNo(Long meetingNo);

    int editMoim(MeetingVO meetingVO);

    int deleteMoimTag(Long meetingNo);

    int deleteMoim(Long meetingNo);


    int insertMeeting(MeetingVO meetingVO);




    List<Map<String, Object>> locSelectCard(String bcode);

    List<Map<String, Object>> moimItemList(Map<String, Object> dbParam);
    int moimItemCount(Map<String, Object> dbParam);


    List<Map<String, Object>> moimSubscriptList(Map<String, Object> dbParam);
    int moimSubscriptCount(Map<String, Object> dbParam);


    Map<String, Object> selectByNoView(Long no);

    List<Map<String, Object>> meetingUserList(Long meetingNo);








    List<Map<String, Object>> selectByUserNoCard(Map<String, Object> map);

    int selectByUserNoCardPageCount(Map<String, Object> map);


    int selectByUserCount(String userNo);

    int likeCount(@Param("meetingNo") String meetingNo);

    int meetingLikeState(Map<String, Object> dbParam);

    int insertMeetingLike(@Param("userNo") String userNo, @Param("meetingNo") String meetingNo);

    int deleteMeetingLike(@Param("userNo") String userNo, @Param("meetingNo") String meetingNo);


    int meetingUserCount(@Param("userNo") String userNo, @Param("meetingNo") String meetingNo);

    Map<String, Object> meetingMemberCount(String meetingNo);

    int insertMeetingSub(@Param("userNo") String userNo, @Param("meetingNo") String meetingNo);

    List<Map<String, Object>> moimSubscribeList(String userNo);

    int updateUserMeetingSubResult(Map<String, int[]> map);

    int updateUserMeetingSubRefusal(Map<String, int[]> map);

    List<Map<String, Object>> signingUpMoim(Map<String, Object> map);
    int signingUpMoimCount(Map<String, Object> map);
}
