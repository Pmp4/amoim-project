import {
    faLocationCrosshairs,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InterestService from "api/interest/InterestService";
import { KakaoMapSet2, searchPlaces, geocoder, kakao, searchAddrFromCoords } from "components/api/KakaoMapScript";
import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useCallback } from "react";

const initialInput = {
    title: "",
    content: "",
    tag: "",
    categoryCode: "",
};

const initialCategory = {
    parent: [],
    code: [],
};

const MoimAdd = () => {
    const [inputData, setInputData] = useState(initialInput);
    const [fileStatus, setFileStatus] = useState(false);

    const [inputMsg, setInputMsg] = useState("지역을 설정해 주세요.");
    const [address, setAddress] = useState({}); //주소 데이터
    const [searchText, setSearchText] = useState("");
    const [searchList, setSearchList] = useState([]);

    const [category, setCategory] = useState(initialCategory);

    const inputRef = useRef({});
    const searchRef = useRef([]);

    const { title, content, tag, categoryCode } = inputData;

    useEffect(() => {
        KakaoMapSet2(
            setAddress,
            setInputMsg,
            { setSearchText, setSearchList },
            mapMarkerClickScroll
        );
        categoryApi("");
    }, []);

    //input onChange 관련 함수
    //input onChange 관련 함수
    //input onChange 관련 함수
    //input onChange 관련 함수
    const inputEventAction = (event) => {
        const { name, value } = event.target;
        console.log(name, value);

        const tempInputData = {
            ...inputData,
            [name]: value,
        };

        setInputData(tempInputData);
    };

    //이미지 업로드 미리보기 로직
    //이미지 업로드 미리보기 로직
    //이미지 업로드 미리보기 로직
    //이미지 업로드 미리보기 로직
    const uploadImageAction = (event) => {
        const fileArr = Array.from(event.target.files);

        if (fileArr.length > 1) {
            alert("하나의 이미지를 선택해주세요.");
            return;
        }

        fileArr.forEach((item, idx) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                if (idx === 0) {
                    inputRef.current.fileBox.style.backgroundImage = `url(${e.target.result})`;
                    setFileStatus(true);
                }
            };

            reader.readAsDataURL(item);
        });
    };

    //이미지 업로드 초기화 함수
    //이미지 업로드 초기화 함수
    //이미지 업로드 초기화 함수
    //이미지 업로드 초기화 함수
    const initialFileInput = (event) => {
        inputRef.current.file.value = "";
        inputRef.current.fileBox.style.backgroundImage = "url()";
        inputRef.current.fileRemove.className += " fade-out";

        setTimeout(() => {
            setFileStatus(false);
        }, 300);

        return false;
    };

    //카테고리 클릭 시,
    //카테고리 클릭 시,
    //카테고리 클릭 시,
    const categoryClickAction = (eventIdx, code) => {
        const tempCategoryCode = {
            ...category,
            parent: [...category.parent],
            code: [...category.code],
        };

        let type = "";

        console.log(parseInt(code.substring(3)));
        if (parseInt(code.substring(3)) === 0) {
            //parent인 경우
            type = "parent";
        } else {
            //code인 경우
            type = "code";
        }

        if (tempCategoryCode[type][eventIdx].check) {
            tempCategoryCode[type][eventIdx].check = false;
            if (type === "parent") tempCategoryCode.code = [];

            setInputData({
                ...inputData,
                categoryCode: "",
            });
        } else {
            for (let i = 0; i < tempCategoryCode[type].length; i++)
                tempCategoryCode[type][i].check = false;
            tempCategoryCode[type][eventIdx].check = true;

            setInputData({
                ...inputData,
                categoryCode: parseInt(code),
            });
            if (type === "parent") categoryApi(code);
        }

        setCategory(tempCategoryCode);
    };

    //카테고리 parent 설정
    //카테고리 parent 설정
    //카테고리 parent 설정
    //카테고리 parent 설정
    //api
    //api
    const categoryApi = (type) => {
        InterestService.selectCategory(type).then((response) => {
            const { SUCCESS, list } = response.data;
            if (SUCCESS) {
                let setType = "";
                if (type.length > 0) {
                    setType = "code";
                } else {
                    setType = "parent";
                }

                for (let i = 0; i < list.length; i++) list[i].check = false;

                const tempCategory = {
                    ...category,
                    [setType]: list,
                };

                setCategory(tempCategory);
            } else {
                alert("서버 에러");
            }
        });
    };

    //요소 설정
    //요소 설정
    const categoryParentComponent = category.parent.map((item, idx) => {
        if (category.parent.length === 0) return "";

        return (
            <div
                className={item.check ? "item on" : "item"}
                key={idx}
                onClick={() => categoryClickAction(idx, item.categoryCode)}
            >
                {item.name}
            </div>
        );
    });

    //요소 설정
    //요소 설정
    const categoryCodeComponent = category.code.map((item, idx) => {
        if (category.code.length === 0) return "";

        return (
            <div
                className={item.check ? "item on" : "item"}
                key={idx}
                onClick={() => categoryClickAction(idx, item.categoryCode)}
            >
                {item.name}
            </div>
        );
    });

    //지도 마커 클릭 시, 스크롤
    //지도 마커 클릭 시, 스크롤
    //지도 마커 클릭 시, 스크롤
    //지도 마커 클릭 시, 스크롤
    const mapMarkerClickScroll = useCallback((idx) => {
        searchRef.current.forEach((item) => {
            item.classList.remove("on");
        });

        const mapSearchList = document.querySelector(".map-search-list");
        const target = searchRef.current[idx];
        // console.log(target.offsetTop);
        mapSearchList.scrollTo({
            top: target.offsetTop,
            left: 0,
            behavior: "smooth",
        });
        target.className += " on";
    });

    //지도 검색 리스트 요소설정
    //지도 검색 리스트 요소설정
    //지도 검색 리스트 요소설정
    //지도 검색 리스트 요소설정
    const searchListComponent = searchList.map((item, idx) => {
        if (searchList.length === 0) return "";
        // console.log(item);

        /**
         * 
                        const restAddress = {
                            zonecode: "",
                            address: item.address_name,
                            roadAddress: item.road_address_name,
                            jibunAddress: item.address_name,
                            sido: ?,
                            sigungu: ?,
                            bname: ?,
                            bcode: ?,
                            placeName: item.place_name
                        }
         */

        //지도 리스트 클릭 시
        //지도 리스트 클릭 시
        //지도 리스트 클릭 시
        const searchListClickAction = (data, idx) => {
            console.log(data);
            geocoder.addressSearch(
                data.address_name,
                function (result, status) {
                    let restAddress = {};

                    searchRef.current.forEach(item => {
                        item.classList.remove('click');
                    });

                    // 정상적으로 검색이 완료됐으면
                    if (status === kakao.maps.services.Status.OK) {
                        const item = result[0];

                        restAddress = {
                            zonecode: "",
                            address: item.address.address_name,
                            roadAddress: "",
                            jibunAddress: item.address.address_name,
                            sido: item.address.region_1depth_name,
                            sigungu: item.address.region_2depth_name,
                            bname: item.address.region_3depth_name,
                            bcode: item.address.b_code,
                            placeName: data.place_name
                        }

                        setAddress(restAddress);
                    }else {
                        const latLng = {
                            lng: data.x,
                            lat: data.y,
                        };

                        searchAddrFromCoords(latLng, (result, status) => {
                            const addressSub = result[0];
                            
                            restAddress = {
                                zonecode: "",
                                address: data.address_name,
                                roadAddress: "",
                                jibunAddress: data.address_name,
                                sido: addressSub.region_1depth_name,
                                sigungu: addressSub.region_2depth_name,
                                bname: addressSub.region_3depth_name,
                                bcode: addressSub.code,
                                placeName: data.place_name
                            }

                            setAddress(restAddress);
                        });
                    }
                    
                    setInputMsg(data.place_name);
                    searchRef.current[idx].classList += ' click';
                }
            );
        }

        return (
            <div
                className="item"
                key={item.id}
                ref={(element) => (searchRef.current[idx] = element)}
                onClick={(element) => searchListClickAction(item, idx)}
            >
                <div className="left">
                    <span>{idx + 1}</span>
                </div>
                <div className="right">
                    <h4 className="search-title">{item.place_name}</h4>
                    <h5 className="search-road-address">
                        {item.road_address_name === ""
                            ? item.address_name
                            : item.road_address_name}
                    </h5>
                    {item.road_address_name === "" ? (
                        ""
                    ) : (
                        <span className="search-jibun-address">
                            <span>지번</span> {item.road_address_name}
                        </span>
                    )}
                </div>
            </div>
        );
    });








    return (
        <div id="moim-add-page" className="page-wrap">
            <div className="title-wrap">
                <h3>모임 개설하기</h3>
            </div>
            <form name="moim-form">
                <div className="left">
                    <div className="image-upload">
                        <div className="main-image">
                            <span
                                className={fileStatus ? "on" : ""}
                                ref={(element) =>
                                    (inputRef.current.fileBox = element)
                                }
                            >
                                +
                            </span>
                            <input
                                ref={(element) =>
                                    (inputRef.current.file = element)
                                }
                                type="file"
                                onChange={(event) => uploadImageAction(event)}
                                multiple
                                accept=".gif, .jpg, .png"
                            />
                        </div>
                        {fileStatus && (
                            <button
                                ref={(element) =>
                                    (inputRef.current.fileRemove = element)
                                }
                                type="button"
                                className="del-btn"
                                onClick={(event) => initialFileInput(event)}
                            >
                                이미지 삭제
                            </button>
                        )}
                        <div className="loc-part">
                            <p>위치</p>
                            <label htmlFor="loc">
                                <input value={inputMsg} disabled />
                                <button type="button">
                                    <FontAwesomeIcon
                                        icon={faLocationCrosshairs}
                                    />
                                </button>
                            </label>
                            <div id="myMap"></div>
                            <div className="map-search-part">
                                <label>
                                    <input
                                        placeholder="검색할 지역을 입력해주세요."
                                        onChange={(event) =>
                                            setSearchText(event.target.value)
                                        }
                                        value={searchText}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            searchPlaces(
                                                searchText,
                                                setSearchList
                                            );
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            icon={faMagnifyingGlass}
                                        />
                                    </button>
                                </label>
                                {searchList.length > 0 && (
                                    <div className="map-search-list">
                                        {/* <div className='item'>
                                            <div className='left'>asdf</div>
                                            <div className='right'>
                                                <h4 className='search-title'>지역입니다.</h4>
                                                <h5 className='search-road-address'>도로명 주소입니다.</h5>
                                                <span className='search-jibun-address'>지번 주소입니다.</span>
                                            </div>
                                        </div> */}
                                        {searchListComponent}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right">
                    <label htmlFor="title">
                        <input
                            name="title"
                            placeholder="제목을 입력하세요."
                            defaultValue={title}
                            onChange={(event) => inputEventAction(event)}
                        />
                    </label>
                    <div className="line one">
                        <label htmlFor="content">
                            <p>내용</p>
                            <textarea
                                rows="15"
                                defaultValue={content}
                                onChange={(event) => inputEventAction(event)}
                            ></textarea>
                        </label>
                    </div>

                    <div className="line two">
                        <label htmlFor="tag">
                            <p>태그</p>
                            <input
                                name="tag"
                                placeholder=""
                                defaultValue={title}
                                onChange={(event) => inputEventAction(event)}
                            />
                        </label>
                        <label htmlFor="dues">
                            <p>회비</p>
                            <input
                                name="dues"
                                placeholder="없음"
                                defaultValue={title}
                                onChange={(event) => inputEventAction(event)}
                            />
                        </label>
                    </div>

                    {/* <div className='line three'>
                        <label htmlFor='dues'>
                            <p>회비</p>
                            <input name='dues' 
                                placeholder='없음'
                                defaultValue={title}
                                onChange={(event) => inputEventAction(event)}/>
                        </label>
                    </div> */}

                    <div className="line three">
                        <label htmlFor="interests" className="draggable">
                            <p>카테고리</p>
                            <div className="category-parent-items">
                                {categoryParentComponent}
                            </div>
                            {category["code"].length === 0 ? (
                                ""
                            ) : (
                                <div className="category-code-items">
                                    {categoryCodeComponent}
                                </div>
                            )}
                        </label>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default MoimAdd;
