import React from "react";
import LoginCheck from "../common/PrivateRoute";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faStar } from "@fortawesome/free-solid-svg-icons";
import { Slider } from "react-slick";
import MoimSlider from "./moim/sub/MoimSlider";
import { useEffect } from "react";
import MeetingService from "api/meeting/MeetingService";
import MoimList from "./moim/sub/MoimList";
import InterestService from "api/interest/InterestService";

const Home = () => {
    const [locMoim, setLocMoim] = useState([]);
    const [category, setCategory] = useState([]);
    const [categoryState, setCategoryState] = useState(0);
    const [sidoState, setSidoState] = useState("");

    const [categoryMoim, setCategoryMoim] = useState([]);
    const [pageInfo, setPageInfo] = useState({
        blockSize: 8,
        currentPage: 1,
        lastPage: 0,
        pageSize: 0,
        startPage: 0,
        startRecord: 0,
        totalPage: 0,
        totalRecord: 0,
    });

    const { blockSize, currentPage, pageSize } = pageInfo;

    useEffect(() => {
        locAPI();
        categoryAPI();
    }, []);

    //로그인 된 유저의 지역 리스트 API
    //로그인 된 유저의 지역 리스트 API
    //로그인 된 유저의 지역 리스트 API
    //로그인 된 유저의 지역 리스트 API
    const locAPI = async() => {
        // MeetingService.selectByCard("BCODE", code).then((response) => {
        //     const { status, data } = response;

        //     if (status === 200) {
        //         setLocMoim(data.list);
        //     } else {
        //         alert("서버 ERROR");
        //     }
        // });

        const response = await MeetingService.mainSelectLoc();
        setLocMoim(response.data.list);
        setSidoState(response.data.sido);
    };

    //카테고리 목록 출력 API
    //카테고리 목록 출력 API
    //카테고리 목록 출력 API
    //카테고리 목록 출력 API
    const categoryAPI = () => {
        InterestService.selectCategory("").then((response) => {
            if (response.data.SUCCESS) {
                if (response.data.type) {
                    setCategory(response.data.list);
                    firstCategorySet(response.data.list);
                }
            }
        });
    };

    //카테고리 code에 맞는 리스트를 뽑아주는 API
    //카테고리 code에 맞는 리스트를 뽑아주는 API
    //카테고리 code에 맞는 리스트를 뽑아주는 API
    //카테고리 code에 맞는 리스트를 뽑아주는 API
    const categorySelectActionAPI = (code, page, length) => {
        // MeetingService.selectByCard("CATEGORY_CODE", code, page, length).then(
        //     (response) => {
        //         const { status, data } = response;
        //         console.log(response);

        //         if (status === 200) {
        //             setCategoryMoim(data.list);
        //             setPageInfo(data.pageInfo);
        //         } else {
        //             alert("Server Error");
        //         }
        //     }
        // );

        MeetingService.mainSelectCategoryList(code, page, length).then(
            (response) => {
                const { status, data } = response;

                if (status === 200) {
                    setCategoryMoim(data.list);
                    setPageInfo(data.pageInfo);
                } else {
                    alert("Server Error");
                }
            }
        );
    };

    //최초 실행 함수
    //최초 실행 함수
    //최초 실행 함수
    /**
     * 카테고리 상태 설정과 현재 카테고리의 리스트를 설정
     */
    const firstCategorySet = (list) => {
        if (list.length === 0) return;

        setCategoryState(parseInt(list[0].categoryCode));
        categoryBtnAction(parseInt(list[0].categoryCode));
    };

    
    const setCategoryComp = category.map((item, idx) => {
        if (category.length === 0) return "";

        return (
            <div
                className={
                    categoryState === parseInt(item.categoryCode)
                        ? "item on"
                        : "item"
                }
                onClick={() => categoryBtnAction(parseInt(item.categoryCode))}
                key={item.categoryCode}
            >
                {item.name}
            </div>
        );
    });

    /**
     * 카테고리 버튼 클릭 시, 리스트 출력
     */
    const categoryBtnAction = (code) => {
        setCategoryState(code);
        categorySelectActionAPI(code, 1, blockSize);
    };

    const categoryMoimPageBtnAction = (page) => {
        categorySelectActionAPI(categoryState, page, blockSize);
    };

    return (
        <div id="home-page">
            <div className="title-wrap">
                <h2>
                    안녕하세요.
                    <br />
                    <p className="mt_md">
                        사람들의 모임서비스 <br />
                        <span>A-MOIM</span> 입니다.
                    </p>
                </h2>
            </div>
            <div className="moim-contents-part page-wrap">
                <div className="loc-part">
                    <div className="title">
                        <h3>
                            <span className="loc">
                                <FontAwesomeIcon icon={faLocationDot} /> {sidoState}
                            </span>{" "}
                            근처 인기항목
                        </h3>
                    </div>
                    <MoimSlider meeting={locMoim} />
                </div>
            </div>
            <div className="moim-contents-part page-wrap">
                <div className="category-part">
                    <div className="title">
                        <h3>
                            <span className="cat">
                                <FontAwesomeIcon icon={faStar} />
                            </span>{" "}
                            카테고리 별
                        </h3>
                    </div>
                </div>
                <div className="category-list draggable">
                    <div className="select">{setCategoryComp}</div>
                    <MoimList
                        items={categoryMoim}
                        pageInfo={pageInfo}
                        pageBtn={categoryMoimPageBtnAction}
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
