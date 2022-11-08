import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../images/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Menu from "./Menu";
import Search from "./Search";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT_LOGGED } from "../../reducer/module/user";
import UserInfoService from "api/member/UserInfoService";
import { MODAL_OPEN } from "reducer/module/modal";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import TagService from "api/tag/TagService";
import InterestService from 'api/interest/InterestService';
import MeetingService from 'api/meeting/MeetingService';
import MoimList from '../main/moim/sub/MoimList';

const Header = ({ loginPopup }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [searchState, setSearchState] = useState(false);
    const [tagList, setTagList] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [searchTag, setSearchTag] = useState([]);
    const [category, setCategory] = useState([]);
    const [currentCategory, setCurrentCategory] = useState("");

    const [searchResultState, setSearchResultState] = useState(false);


    const [searchMoim, setSearchMoim] = useState([]);
    const [pageInfo, setPageInfo] = useState({
        blockSize: 16,
        currentPage: 1,
        lastPage: 0,
        pageSize: 0,
        startPage: 0,
        startRecord: 0,
        totalPage: 0,
        totalRecord: 0,
    });

    

    const logged = Boolean(localStorage.getItem("logged"));

    useEffect(() => {
        toggleScrolling();
    });

    useEffect(() => {
        console.log(location);
        initialSearch();
    }, [location]);
    

    useEffect(() => {
        if (inputValue !== "") {
            tagSelect(inputValue);
        } else {
            setTagList([]);
        }
    }, [inputValue]);



    const initialSearch = () => {
        setSearchState(false);
        setInputValue("");
        setSearchTag([]);
        setCurrentCategory("");
        setSearchResultState(false);
        setTagList([]);
    }



    const toggleScrolling = () => {
        const body = document.querySelector("body");
        if (searchState) {
            body.style.overflow = "hidden";
        } else {
            body.style.overflow = "";
        }
    };

    const loginBtnAction = () => {
        if (logged) {
            if (window.confirm("로그아웃 하시겠습니까?")) {
                // UserInfoService.logout()
                //     .then((response) => {
                //         if(response.data.SUCCESS) {
                //             dispatch({
                //                 type: LOGOUT_LOGGED
                //             });
                //             localStorage.clear();
                //             alert(`${user.userInfo.name}님 로그아웃되었습니다.`);
                //             navigate("/");
                //         }
                //     });'
                localStorage.clear();
                window.location.replace("/");
            }
        } else {
            // loginPopup("ON");
            dispatch({ type: MODAL_OPEN, data: "login" });
        }
    };

    const searchButtonAction = () => {
        setSearchState(!searchState);
        categoryAPI("");
    };

    




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

    //리스트 컴포넌트
    const tagListComponent = tagList.map((item, idx) => {
        if (tagList.length === 0) return "";

        return (
            <p
                key={idx + 2000}
                onClick={() => tagAddAction(item.tagNo, item.tagName)}
            >
                {item.tagName}
            </p>
        );
    });


    const tagAddAction = (no, name) => {
        if (searchTag.length > 0) {
            let check = false;
            for (let i = 0; i < searchTag.length; i++) {
                console.log(searchTag[i].no);
                if (searchTag[i].no === no) {
                    alert("이미 등록된 태그입니다.");
                    check = true;
                    break;
                }
            }

            if(!check) {
                const tempTags = [...searchTag];
                tempTags.push({ no, name });

                setSearchTag(tempTags);
                setInputValue("");
                setTagList([]);
            }
        } else {
            const tempTags = [...searchTag];
            tempTags.push({ no, name });

            setSearchTag(tempTags);
            setInputValue("");
            setTagList([]);
        }
    };


    const setCategoryComp = category.map((item, idx) => {
        if (category.length === 0) return "";

        return (
            <div
                className={
                    currentCategory === item.categoryCode
                        ? "item on"
                        : "item"
                }
                onClick={() => categoryClickAction(item.categoryCode)}
                key={item.categoryCode}
            >
                {item.name}
            </div>
        );
    });



    const categoryClickAction = (code) => {
        if(currentCategory !== "" && currentCategory === code) {
            setCurrentCategory("");
        }else {
            setCurrentCategory(code);
        }
    }




    const tagSetComp = searchTag.map((item, idx) => (
        <p key={idx}
            onClick={() => removeTagAction(item.no)}>
            {item.name}
        </p>
    ));


    const removeTagAction = (no) => {
        for (let i = 0; i < searchTag.length; i++) {
            if (searchTag[i].no === no) {
                const tempTag = [...searchTag];
                tempTag.splice(i, 1);
                console.log(tempTag);

                setSearchTag(tempTag);
                break;
            }
        }
    }







    //카테고리 목록 출력 API
    //카테고리 목록 출력 API
    //카테고리 목록 출력 API
    //카테고리 목록 출력 API
    const categoryAPI = async() => {
        const response = await InterestService.selectCategory("")
        setCategory(response.data.list);
    };





    const searchResultButtonAction = () => {
        if(currentCategory === ""
            && inputValue === ""
            && searchTag.length === 0
        ) {
            alert("검색할 조건을 입력해주세요.");
            return;
        }

        let dbTags = "";
        if(searchTag.length > 0) {
            let tempTags = [];
            for(let i = 0; i < searchTag.length; i++) {
                tempTags.push(searchTag[i].name);
            }

            dbTags = tempTags.join(",");
        }

        searchApi(inputValue, currentCategory, dbTags);
    }


    const searchApi = async(text, code, tags, page = 1, length = 16) => {
        const response = await MeetingService.moimSearch(text, code, tags, page, length);
        setSearchMoim(response.data.list);
        setPageInfo(response.data.pageInfo);
        setSearchResultState(true);
    }



    
    const searchMoimPageSet = (page) => {
        let dbTags = "";
        if(searchTag.length > 0) {
            let tempTags = [];
            for(let i = 0; i < searchTag.length; i++) {
                tempTags.push(searchTag[i].name);
            }

            dbTags = tempTags.join(",");
        }

        searchApi(inputValue, currentCategory, dbTags, page);
    };




    return (
        <header>
            <div className={!searchState ? "fixed-wrap" : searchResultState ? "fixed-wrap on result" : "fixed-wrap on"}>
                <div className="search-wrap page-wrap">
                    <div className="search-part">
                        {searchTag.length > 0 && (
                            <div className="tag-list">{tagSetComp}</div>
                        )}
                        <div
                            className={
                                !searchState
                                    ? "search-input off"
                                    : tagList.length > 0
                                    ? "search-input on list-on"
                                    : "search-input on"
                            }
                        >
                            <input
                                value={inputValue}
                                onChange={(event) =>
                                    setInputValue(event.target.value)
                                }
                            />
                            <button onClick={searchResultButtonAction}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </div>
                        <div className="search-tag">{tagListComponent}</div>
                    </div>
                    <div className='category-list draggable'>
                        <div className='select'>{setCategoryComp}</div>
                    </div>
                    {
                        searchResultState &&
                        
                        <MoimList
                            items={searchMoim}
                            pageInfo={pageInfo}
                            pageBtn={searchMoimPageSet}
                    />
                    }
                </div>
            </div>
            <div id="header-wrap">
                <h1 className="logo">
                    <Link to="/">
                        <img src={Logo} alt="logo" />
                    </Link>
                </h1>

                <Menu />

                <div className="right">
                    <div className="search-button" onClick={searchButtonAction}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </div>

                    <div className="account" onClick={loginBtnAction}>
                        {logged ? <span>LOGOUT</span> : <span>LOGIN</span>}
                    </div>
                </div>

                {/* <div className='menu'>
                    <div className='menu-btn'>
                        <div className='menu-btn-icon'>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        <span>MENU</span>
                    </div>
                </div>
                <h1 className='logo'>
                    <Link to='/'>
                        <img src={Logo} alt='logo'/>
                    </Link>
                </h1>
                <div className='account' onClick={() => loginPopup("ON")}>
                    <span>LOGIN</span>
                    <FontAwesomeIcon icon={faUser}/>
                </div> */}
            </div>
            {/* <Search/> */}
            {/* <button>TEST</button> */}
            <div
                className={searchState ? "search-part on" : "search-part"}
            ></div>
        </header>
    );
};

export default Header;
