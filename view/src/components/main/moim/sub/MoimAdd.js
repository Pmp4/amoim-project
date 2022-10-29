import {
    faLocationCrosshairs,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InterestService from "api/interest/InterestService";
import MeetingService from "api/meeting/MeetingService";
import TagService from "api/tag/TagService";
import {
    KakaoMapSet2,
    searchPlaces,
    geocoder,
    kakao,
    searchAddrFromCoords,
} from "components/api/KakaoMapScript";
import { is_gap, is_number, is_specialChar } from "method/regularExpression";
import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const initialInput = {
    title: "",
    content: "",
    tag: "",
    categoryCode: "",
    dues: "",
    personNumber: 1,
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
    const [searchPagination, setSearchPagination] = useState({});

    const [category, setCategory] = useState(initialCategory);

    const [tagList, setTagList] = useState([]); //검색된 태그
    const [tagAdd, setTagAdd] = useState([]); //등록된 태그

    const inputRef = useRef({});
    const searchRef = useRef([]);

    const user = useSelector((state) => state.user);
    const location = useLocation();
    const navigate = useNavigate();

    const { title, content, tag, categoryCode, dues, personNumber } = inputData;

    useEffect(() => {
        KakaoMapSet2(
            setAddress,
            setInputMsg,
            { setSearchText, setSearchList },
            mapMarkerClickScroll,
            setSearchPagination
        );
        // console.log(user.userInfo.no);
        categoryApi("");

        MeetingService.countMeeting("").then((response) => {
            const { status, data } = response;
            if (status === 200) {
                if (data >= 4) {
                    alert("모임 개설 횟수가 없습니다.");
                    navigate("/moim");
                }
            }
        });
    }, []);

    //태그 등록/검색 api
    //태그 등록/검색 api
    //태그 등록/검색 api
    //검색
    //검색
    const tagSelect = (keyword) => {
        TagService.selectByKeyword(keyword).then((response) => {
            const { status, data } = response;
            if (status === 200) {
                setTagList(data);
            }
        });
    };

    //등록
    //등록
    const tagAddAction = (tagText) => {
        if (tagAdd.indexOf(tagText) !== -1) {
            alert("이미 등록된 태그입니다.");
            return;
        } else if (tagAdd.length === 4) {
            alert("태그는 4개까지 등록하실 수 있습니다.");
            return;
        }

        const tempTag = [...tagAdd];
        tempTag.push(tagText);

        setTagAdd(tempTag);
        setInputData({
            ...inputData,
            tag: "",
        });
        setTagList([]);
    };

    const tagDeleteAction = (paramIdx) => {
        const tempTagAdd = tagAdd.filter((item, idx) => idx !== paramIdx);

        setTagAdd(tempTagAdd);
    };

    //엔터 감지
    //엔터 감지
    const tagInputEnter = (event) => {
        if (event.keyCode === 13) {
            if (
                is_gap(tag) ||
                is_number(tag) ||
                is_specialChar(tag) ||
                tag === ""
            ) {
                alert("태그에는 공백, 숫자, 특수문자가 들어갈 수 없습니다.");
                return;
            }
            tagAddAction(tag);
        }

        if (event.keyCode === 8) {
            if (tag.length === 0) {
                if (tagAdd.length !== 0) {
                    const tempTagAdd = tagAdd.filter(
                        (item, idx) => idx !== tagAdd.length - 1
                    );

                    setTagAdd(tempTagAdd);
                }
            }
        }
    };

    //리스트 컴포넌트
    const tagListComponent = tagList.map((item, idx) => {
        if (tagList.length === 0) return "";

        return (
            <p key={idx + 2000} onClick={() => tagAddAction(item.tagName)}>
                {item.tagName}
            </p>
        );
    });

    //태그 컴포넌트
    const tagItemComponent = tagAdd.map((item, idx) => {
        if (tagAdd.length === 0) return "";

        return (
            <span
                onClick={() => tagDeleteAction(idx)}
                key={idx + 700}
                className="tag"
            >
                {item}
            </span>
        );
    });

    //input onChange 관련 함수
    //input onChange 관련 함수
    //input onChange 관련 함수
    //input onChange 관련 함수
    const inputEventAction = (event) => {
        let { name, value } = event.target;

        if (name === "tag") {
            if (value.length > 10) {
                alert("태그는 10자리까지 입력 가능합니다.");
                value = value.substring(0, 10);
            } else if (value.length > 0) {
                tagSelect(value);
            }
        } else if (name === "title") {
            const cutLength = 20;
            if (value.length > cutLength) {
                alert(`제목은 ${cutLength}자 이내로 입력해주세요`);
                value = value.substring(0, cutLength);
            }
        } else if (name === "content") {
            const cutLength = 500;
            if (value.length > cutLength) {
                alert(`내용은 ${cutLength}자 이내로 입력해주세요`);
                value = value.substring(0, cutLength);
            }
        } else if (name === "dues") {
            const cutLength = 6;
            const numberDues = value.replace(",", "");
            if (numberDues.length > cutLength) {
                value = value.substring(0, cutLength);
            }

            value = value
                .replace(/[^0-9]/g, "")
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        } else if ((name = "personNumber")) {
            const cutMax = 6;
            if (value > 50) {
                value = 50;
            } else if (1 > value) {
                value = 1;
            }
        }

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
        console.log(fileArr);
        console.log(inputRef.current.file.files);

        if (fileArr.length > 1) {
            alert("하나의 이미지를 선택해주세요.");
            return;
        }else if(fileArr.length === 0) {
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

        if (parseInt(code.substring(3)) === 0) {
            //parent인 경우
            type = "parent";
        } else {
            //code인 경우
            type = "code";
        }

        if (tempCategoryCode[type][eventIdx].check) {
            //이미 체크한 경우
            tempCategoryCode[type][eventIdx].check = false;
            if (type === "parent") tempCategoryCode.code = [];

            setInputData({
                ...inputData,
                categoryCode: "",
            });
        } else {
            //체크가 안된 경우
            for (let i = 0; i < tempCategoryCode[type].length; i++)
                tempCategoryCode[type][i].check = false;
            tempCategoryCode[type][eventIdx].check = true;

            let resCode = "";
            if (type === "code") {
                resCode = parseInt(code);
            }

            setInputData({
                ...inputData,
                categoryCode: resCode,
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

        // console.log(searchRef);
        searchRef.current = [];
        // console.log(searchRef);

        //지도 리스트 클릭 시
        //지도 리스트 클릭 시
        //지도 리스트 클릭 시
        const searchListClickAction = (data, idx) => {
            console.log(data);
            geocoder.addressSearch(
                data.address_name,
                function (result, status) {
                    let restAddress = {};

                    searchRef.current.forEach((item) => {
                        // console.log(item);
                        item.classList.remove("click");
                    });

                    // 정상적으로 검색이 완료됐으면
                    if (status === kakao.maps.services.Status.OK) {
                        const item = result[0];
                        console.log(item);

                        restAddress = {
                            zonecode: "",
                            address: item.address.address_name,
                            roadAddress: "",
                            jibunAddress: item.address.address_name,
                            sido: item.address.region_1depth_name,
                            sigungu: item.address.region_2depth_name,
                            bname: item.address.region_3depth_name,
                            bcode: item.address.b_code,
                            placeName: data.place_name,
                            latY: parseFloat(item.y),
                            lonX: parseFloat(item.x),
                        };

                        setAddress(restAddress);
                    } else {
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
                                placeName: data.place_name,
                                latY: parseFloat(latLng.lat),
                                lonX: parseFloat(latLng.lng),
                            };

                            setAddress(restAddress);
                        });
                    }

                    setInputMsg(data.place_name);
                    searchRef.current[idx].classList += " click";
                }
            );
        };

        return (
            <div
                className="item"
                key={item.id}
                ref={(element) => (searchRef.current[idx] = element)}
                onClick={(element) => searchListClickAction(item, idx)}
            >
                <div className="left">
                    <span>{(searchPagination.current - 1) * 15 + idx + 1}</span>
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

    //지도 검색 페이징
    //지도 검색 페이징
    //지도 검색 페이징
    const searchPaginationElement = () => {
        if (searchPagination === null || searchPagination === undefined)
            return "";
        // console.log(searchPagination);

        let resComp = [];
        for (let i = 1; i <= searchPagination.last; i++) {
            // console.log(i);
            resComp.push(
                <span
                    className={i === searchPagination.current ? "on" : ""}
                    key={i + 6000}
                    onClick={() => paginationClickAction(i)}
                >
                    {i}
                </span>
            );
        }

        return resComp;
    };

    //페이징 클릭 시 이벤트
    const paginationClickAction = (i) => {
        const mapSearchList = document.querySelector(".map-search-list");
        mapSearchList.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });

        searchPagination.gotoPage(i);
    };

    const inputCheck = () => {
        let resBool = true;

        if (
            title === "" ||
            content === "" ||
            personNumber === "" ||
            categoryCode === ""
        ) {
            resBool = false;
        } else if (!fileStatus) {
            resBool = false;
        } else if (Object.keys(address).length === 0) {
            resBool = false;
        } else if (tagAdd.length === 0) {
            resBool = false;
        }

        return resBool;
    };

    //최종
    //최종
    //최종
    const resultFunc = () => {
        const formData = new FormData();
        const contentsData = {
            userNo: user.userInfo.no,
            title,
            content,
            categoryCode,
            dues,
            personNumber,
        };
        const fileData = inputRef.current.file.files;

        for (let i = 0; i < fileData.length; i++) {
            formData.append("file", fileData[i]);
            console.log(fileData[i]);
        }
        formData.append(
            "contentsData",
            new Blob([JSON.stringify(contentsData)], {
                type: "application/json",
            })
        );
        formData.append(
            "addressData",
            new Blob([JSON.stringify(address)], { type: "application/json" })
        );
        formData.append(
            "tagData",
            new Blob([JSON.stringify(tagAdd)], { type: "application/json" })
        );

        // console.log(inputRef.current.file.files);
        console.log(formData);

        MeetingService.insertMeeting(formData).then((response) => {
            const { status, data } = response;
            if (status) {
                if (data.SUCCESS) {
                    alert(data.SUCCESS_TEXT);
                    navigate("/moim");
                } else {
                    alert(data.SUCCESS_TEXT);
                    location.reload();
                }
            } else {
                alert("서버 error");
            }
        });
    };

    return (
        <div id="moim-add-page" className="page-wrap">
            <div className="title-wrap">
                <h3>모임 개설하기</h3>
            </div>
            <form
                name="moim-form"
                onSubmit={() => {
                    return false;
                }}
            >
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
                                        onKeyDown={(event) => {
                                            if (event.keyCode === 13) {
                                                searchPlaces(
                                                    searchText,
                                                    setSearchList
                                                );
                                            }
                                        }}
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
                                        <div className="pagination-part draggable">
                                            {/* <span className='on'>1</span>
                                            <span>2</span>
                                            <span>1</span> */}
                                            {searchPaginationElement()}
                                        </div>
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
                            value={title}
                            onChange={(event) => inputEventAction(event)}
                        />
                    </label>
                    <div className="line one">
                        <label htmlFor="content">
                            <p>내용</p>
                            <textarea
                                name="content"
                                rows="15"
                                value={content}
                                onChange={(event) => inputEventAction(event)}
                            ></textarea>
                        </label>
                    </div>

                    <div className="line two">
                        <label htmlFor="tag">
                            <p>태그</p>
                            <div>
                                <div className="left">
                                    {tagItemComponent}
                                    {/* <span className='tag'>태그1</span>
                                    <span className='tag'>태그2</span>
                                    <span className='tag'>태그3</span>
                                    <span className='tag'>태그4</span> */}
                                </div>
                                <div className="right">
                                    <input
                                        name="tag"
                                        value={tag}
                                        onChange={(event) =>
                                            inputEventAction(event)
                                        }
                                        onKeyDown={(event) =>
                                            tagInputEnter(event)
                                        }
                                    />

                                    {tag !== "" && (
                                        <div className="tag-list-part">
                                            {tagListComponent}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </label>
                        <label htmlFor="dues">
                            <p>회비</p>
                            <div>
                                <input
                                    name="dues"
                                    placeholder="없음"
                                    value={dues}
                                    onChange={(event) =>
                                        inputEventAction(event)
                                    }
                                />
                                <span>원</span>
                            </div>
                        </label>
                        <label htmlFor="personNumber">
                            <p>인원</p>
                            <div>
                                <input
                                    name="personNumber"
                                    type="number"
                                    value={personNumber}
                                    onChange={(event) =>
                                        inputEventAction(event)
                                    }
                                />
                                <span>명</span>
                            </div>
                        </label>
                    </div>

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
                    <button
                        type="button"
                        className={
                            inputCheck() ? "result-btn on" : "result-btn"
                        }
                        onClick={() => {
                            if (inputCheck()) resultFunc();
                        }}
                    >
                        등록하기
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MoimAdd;
