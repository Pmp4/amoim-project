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


    Long selectMoimUserNo(Long meetingNo);



    // 메인화면에서의 지역 좋아요 리스트 8개
    Map<String, Object> mainLocList(HttpServletRequest request);


    /**
     *
     * @param type - adf
     * @param page - 페이지 번호
     * @param blockSize - 페이지당 item 개수
     * @return itemList, pageInfo
     *
     * 모임의 리스트 출력
     */
    Map<String, Object> pageItemList(String type, String key, int page, int blockSize);


    /**
     *
     * @param type - user 라고 지정
     * @param key - userNo
     * @return count
     *
     * 내가 생성한 모임의 개수
     */
    int moimOwnCount(String type, String key);


    /**
     *
     * @param key userNo
     * @param page 페이지번호
     * @param blockSize - 페이지당 item 개수
     * @return itemList, pageInfo
     */
    Map<String, Object> moimSubscript(String key, int page, int blockSize);



    Map<String, Object> selectByNoView(Long no);

    List<Map<String, Object>> selectUserMeetingList(Long meetingNo);












    //해당 유저가 생성한 모임 리스트를 카드 형식으로
    //해당 유저가 생성한 모임 리스트를 카드 형식으로
    //해당 유저가 생성한 모임 리스트를 카드 형식으로
    List<Map<String, Object>> selectByUserNoCard(Map<String, Object> userNo);
    int selectByUserNoCardPageCount(Map<String, Object> map);


//    Map<String, Object> selectByNo(String no);

    int selectByUserCount(String userNo);

    int likeCount(String meetingNo);

    int meetingLikeState(Map<String, Object> dbParam);

    int insertMeetingLike(@Param("userNo") String userNo, @Param("meetingNo") String meetingNo);

    int deleteMeetingLike(@Param("userNo") String userNo, @Param("meetingNo") String meetingNo);


    Map<String, Object> meetingSubscribe(String userNo, String meetingNo);


    Map<String, Object> moimSubscribeList(String userNo);


    Map<String, Object> moimSubscribeResult(Map<String, Object> rest);

    Map<String, Object> moimSubscribeRefusal(Map<String, Object> rest);


    List<Map<String, Object>> signingUpMoim(Map<String, Object> map);

    int signingUpMoimCount(Map<String, Object> map);
}
