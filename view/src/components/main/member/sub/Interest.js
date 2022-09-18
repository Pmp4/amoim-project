import React, { useEffect, useRef, useState, lazy, Suspense } from "react";
import InterestService from "../../../../api/interest/InterestService";
import Slider from "react-slick";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCheck} from '@fortawesome/free-solid-svg-icons';


// const ImageSet = lazy(() => import ('../../../ImageSet'));



const ImageSet = lazy(() => import ('../../../ImageSet'));

const initialInterests = [
    {
        interestNo: "",
        categoryCode: "",
        categoryParent: "",
        name: "",
        imageSize: "",
        originalImageName: "",
        imageName: "",
        colorCode: "",
    },
];

const Interest = ({checkStatus, checkStatusAction, deleteCheckStatusAction, current}) => {
    const [interests, setInterests] = useState(initialInterests);
    const [keywords, setKeywords] = useState(initialInterests);
    const [moved, setMoved] = useState(false);
    const divRef = useRef([]);

    const {currentCode, setCurrentCode} = current;

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        draggable: false,
    };

    useEffect(() => {
        categoryApi("");
    }, []);

    useEffect(() => {
        console.log(isNaN(currentCode));
        if(isNaN(currentCode)) {
            setKeywords(initialInterests);
        }else {
            categoryApi(currentCode);
        }
    }, [current]);


    //요소 클릭 시, 체크 여부를 확인함
    //요소 클릭 시, 체크 여부를 확인함
    //요소 클릭 시, 체크 여부를 확인함
    //이미 클릭 했던 요소면? 현재 current 비교 후, 삭제
    const clickCategory = (code, idx) => {
        // if(checkItem.indexOf(code) !== -1) {    //이미 클릭한 요소일 때
        if(Object.keys(checkStatus).indexOf(String(code)) !== -1) {    //이미 클릭한 요소일 때
            console.log("이게 실행되야하는데");
            if(currentCode === code) {  //현재 보고있는 카테고리일 경우만 삭제
                const tempArray = [...interests];
                tempArray[idx].check = false;
                // const tempCheckItem = checkItem.filter(item => item !== code);
                const tempCheckItem = {...checkStatus}
                delete tempCheckItem[code];

                setInterests(tempArray);
                // setCheckItem(tempCheckItem);
                // checkStatusAction(tempCheckItem);
                console.log(tempCheckItem);

                if(Object.keys(tempCheckItem).length !== 0) {    //선택한 요소가 있을 경우
                    let tempCode = Object.keys(tempCheckItem);
                    tempCode = tempCode[tempCode.length - 1];

                    categoryApi(tempCode);
                    setCurrentCode(parseInt(tempCode));
                }else {
                    setCurrentCode(NaN);
                }

                deleteCheckStatusAction(tempCheckItem);
                return;
            }
            // categoryApi(code);
            setCurrentCode(parseInt(code));

        }else { //클릭한 요소가 아닐 때, 추가
            // if(checkItem.length === 4) {
            if(Object.keys(checkStatus).length === 4) {
                alert("관심사는 최대 4개까지 선택 가능합니다.");
                return;
            }



            const tempArray = [...interests];
            tempArray[idx].check = true;
            // console.log(tempArray);

            setInterests(tempArray);
            // setCheckItem(checkItem.concat(code));

            // checkStatusAction('checkItem', checkItem.concat(code));
            checkStatusAction(parseInt(code), []);
            setCurrentCode(parseInt(code));
            // categoryApi(code);
        }
    }


    //키워드 클릭 시
    const clickKeywordAction = (code, parentCode) => {
        console.log(code, parentCode);
        console.log(checkStatus.parentCode === undefined);
        // if(checkKeywords.indexOf(code) === -1) {
        if(checkStatus[parentCode].indexOf(code) === -1) {
            // if(checkKeywords.length === 5) {
            if(checkStatus[parentCode].length === 5) {
                alert("키워드는 최대 5개까지 선택 가능합니다.");
                return;
            }

            // checkStatusAction('checkKeywords', checkKeywords.concat(code));
            const tempArray = checkStatus[parentCode].concat(code);
            checkStatusAction(parentCode, tempArray);
            /**
             * 객체에서 'parentCode'의 키값을 찾고, 그 배열에 concat() 한다.
             */
        }else {
            checkStatusAction(parentCode, checkStatus[parentCode].filter((e) => e !== code));
        }
    }


    //메인 카테고리 리스트 api
    //메인 카테고리 리스트 api
    //메인 카테고리 리스트 api
    //메인 카테고리 리스트 api
    const categoryApi = (type) => {
        InterestService.selectCategory(type).then((response) => {
            console.log(response);
            if (response.data.SUCCESS) {
                if(response.data.type) {
                    for(let i = 0; i < response.data.list.length; i++) {
                        console.log(Object.keys(checkStatus));
                        console.log(response.data.list[i].categoryCode);
                        if(!(Object.keys(checkStatus).includes(response.data.list[i].categoryCode))) {
                            response.data.list[i].check = false;
                        }else {
                            response.data.list[i].check = true;
                        }
                    }
                    
                    setInterests(response.data.list);
                }else {
                    setKeywords(response.data.list);
                }
            }
        });
    };


    //키워드 카테고리 리스트
    const setKeywordObj = keywords.map((item, idx) => {
        const code = parseInt(item.categoryCode);
        const parentCode = parseInt(item.categoryParent);
        if(keywords.length === 1) {
            return ("");
        }

        return (
            <span 
                onClick={() => clickKeywordAction(code, parentCode)}
                // className={checkKeywords.indexOf(code) !== -1 ? 'item on' : "item"} 
                className={
                    Object.keys(checkStatus).indexOf(String(parentCode)) !== -1 ?
                        checkStatus[parentCode].indexOf(code) !== -1 ? 'item on' : "item " 
                    : "item"
                } 
                key={idx}>
                {item.name}
            </span>
        )
    });




    //마우스 클릭 or 드래그 감지
    //마우스 클릭 or 드래그 감지
    //마우스 클릭 or 드래그 감지
    const downListener = () => {
        clearTimeout(moveSet());
        moveCount--;
        setMoved(false);
    }

    let moveCount = 0;
    const moveListener = () => {
        if(moveCount === 0) {
            clearTimeout(moveSet());
            moveCount++;
        }
    }

    const moveSet = () => {
        setTimeout(() => {
            console.log("시ㄹ행!")
            setMoved(true);
        }, 400);
    }

    const upListener = (code, idx) => {
        // console.log(idx);
        if (moved) {
            console.log('moved')
        } else {
            console.log('not moved');
            clickCategory(code, idx);
        }
    }

    const catClickAction = (code, idx) => {
        clickCategory(code, idx);
    }


    // 메인요소 설정
    // 메인요소 설정
    // 메인요소 설정
    // 메인요소 설정
    const setCategoryObj = interests.map((item, idx) => {
        if(interests.length === 1) return "";
        
        return(
            <div
                ref={element => divRef.current[idx] = element}
                key={idx}
                >
                <div 
                    className={!item.check ? 'item' : 
                        (parseInt(item.categoryCode) === currentCode) ? "item current" : "item on"} 
                    // onMouseUp={() => upListener(parseInt(item.categoryCode), idx)}
                    // onMouseMove={moveListener}
                    // onMouseDown={downListener}
                    onClick={() => catClickAction(parseInt(item.categoryCode), idx)}
                    >
                    <div className="title-img">
                        <div className='click-part'>
                            <FontAwesomeIcon icon={faCheck} />
                        </div>
                        <Suspense fallback={<img src="/default_image.png" alt={item.name}/>}>
                            <ImageSet imgSrc={item.imageName} imgAlt={item.name}/>
                        </Suspense>
                        {/* <img 
                            src={item.imageName != null ? `/upload/images/${item.imageName}` : "/default_image.png"} 
                            alt={item.name}/> */}
                    </div>
                    <span className="cat-title">{item.name}</span>
                </div>
            </div>
        )
    });


    return (
        <div className="interest-part">
            <Slider {...settings}>
                {setCategoryObj}
            </Slider>

            {/* <div className="main-slide-wrap">
                <div className="main-cat clearfix">
                    <div className="item">
                        <div className="title-img"></div>
                        <span className="cat-title">테스트주제</span>
                    </div>
                </div>
            </div> */}

            <div className="sub-cat">
                <div className="title">키워드
                    <span className='sub-title'>
                        선택된 항목&nbsp;
                        {Object.keys(checkStatus).indexOf(String(currentCode)) !== -1 ?
                            <strong>{checkStatus[currentCode].length}개</strong> : ""
                        }
                    </span>
                </div>
                <div className="keyword-part">
                    {setKeywordObj}
                    {/* <span className="item">test1</span> */}
                </div>
            </div>
        </div>
    );
};

export default Interest;
