import React from "react";
import { useSelector } from "react-redux";

const Chat = ({ meetingNo }) => {
    const profileImgPath = useSelector((state) => state.path.profileImagePath);

    // const memberList = () =>
    //     members.map((item, idx) => {
    //         if (members.length === 0) return "";

    //         return (
    //             <div className="item" key={8000 + idx}>
    //                 <div className="profile-img">
    //                     <img
    //                         src={profileImgPath + item.PROFILE_IMAGE}
    //                         alt={item.NAME + "의 프로필 이미지"}
    //                     />
    //                 </div>
    //                 <div className="profile-exp">
    //                     <p>
    //                         {item.NAME}{" "}
    //                         {item.USER_NO === contents.USER_NO && (
    //                             <span>관리자</span>
    //                         )}
    //                     </p>
    //                     <span>{item.INTRO}</span>
    //                 </div>
    //             </div>
    //         );
    //     });

    return (
        <div id="chatt-page" className="page-wrap">
            <div className="title">채팅</div>
            <div className="main-part">
                <div className="member-list">
                    <div className="item">
                        <div
                            className="profile-img"
                            // style={{
                            //     backgroundImage: `url(${profileImgPath}default_profile.png)`
                            // }}
                        >
                            <img
                                src={profileImgPath + "default_profile.png"}
                                alt={"ddd"}
                            />
                        </div>
                        <div className="profile-exp">
                            <p>홍길동</p>
                            <span>한줄소개</span>
                        </div>
                        <div className="state"></div>
                    </div>
                </div>
                <div className="chatt-list"></div>
            </div>
        </div>
    );
};

export default Chat;
