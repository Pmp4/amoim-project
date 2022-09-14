import React, { useEffect, useRef, useState, lazy, Suspense } from "react";
import InterestService from "../../../../api/interest/InterestService";
import Slider from "react-slick";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCheck} from '@fortawesome/free-solid-svg-icons';


// const ImageSet = lazy(() => import ('../../../ImageSet'));

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

const Interest = ({checkStatus, checkStatusAction, interestsValue}) => {
    // const [interests, setInterests] = useState(initialInterests);
    const [keywords, setKeywords] = useState(initialInterests);
    const [moved, setMoved] = useState(false);
    // const [checkItem, setCheckItem] = useState([]);
    const [currentCode, setCurrentCode] = useState(0);
    // const [checkKeywords, setCheckKeywords] = useState([]);
    const divRef = useRef([]);
    const imgRef = useRef([]);
    const [imgState, setImgState] = useState(false);

    const {interests, setInterests} = interestsValue;

    const {
        checkItem,
        checkKeywords
    } = checkStatus;

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4
    };

    // const slideWidthSet = () => {
    //     const items = document.querySelectorAll(".item");
    //     let slideWidth = 0;
    //     items.forEach((element) => {
    //         slideWidth += element.offsetWidth;
    //     });

    //     document.getElementsByClassName(
    //         "main-cat"
    //     )[0].style.width = `${slideWidth}px`;
    // };

    useEffect(() => {
        categoryApi("");
    }, []);

    useEffect(() => {
        // for(let i = 0; i < interests.length; i++) {
        //     imgRef.current[i].attributes[0].nodeValue.src = `/upload/images/${interests[i].imageName}`
        // }
        imgRef.current.forEach((item, idx) => {
            item.src = `/upload/images/${interests[idx].imageName}`;
        })
    }, [interests]);


    //요소 클릭 시, 체크 여부를 확인함
    //요소 클릭 시, 체크 여부를 확인함
    //요소 클릭 시, 체크 여부를 확인함
    //이미 클릭 했던 요소면? 현재 current 비교 후, 삭제
    const clickCategory = (code, idx) => {
        if(checkItem.indexOf(code) !== -1) {    //이미 클릭한 요소일 때
            // console.log("hello");
            if(currentCode === code) {  //현재 보고있는 카테고리일 경우만 삭제
                const tempArray = [...interests];
                tempArray[idx].check = false;
                const tempCheckItem = checkItem.filter(item => item !== code);

                setInterests(tempArray);
                // setCheckItem(tempCheckItem);
                checkStatusAction('checkItem', tempCheckItem);

                if(tempCheckItem.length !== 0) {    //선택한 요소가 있을 경우
                    const tempCode = tempCheckItem[tempCheckItem.length - 1];

                    categoryApi(tempCode);
                    setCurrentCode(tempCode);
                }else {
                    setKeywords(initialInterests);
                }
                return;
            }

            categoryApi(code);
            setCurrentCode(code);
        }else { //클릭한 요소가 아닐 때, 추가
            if(checkItem.length === 4) {
                alert("관심사는 최대 4개까지 선택 가능합니다.");
                return;
            }



            const tempArray = [...interests];
            tempArray[idx].check = true;
            // console.log(tempArray);

            setInterests(tempArray);
            // setCheckItem(checkItem.concat(code));

            checkStatusAction('checkItem', checkItem.concat(code));
            setCurrentCode(code);
            categoryApi(code);
        }
    }


    //키워드 클릭 시
    const clickKeywordAction = (code) => {
        console.log(code);
        if(checkKeywords.indexOf(code) === -1) {
            if(checkKeywords.length === 5) {
                alert("키워드는 최대 5개까지 선택 가능합니다.");
                return;
            }

            checkStatusAction('checkKeywords', checkKeywords.concat(code));
        }else {
            checkStatusAction('checkKeywords', checkKeywords.filter((e) => e !== code));
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
                    for(let i = 0; i < response.data.list.length; i++)
                        response.data.list[i].check = false;
                    
                    setInterests(response.data.list);
                }else {
                    for(let i = 0; i < response.data.list.length; i++)
                        response.data.list[i].check = false;
                    setKeywords(response.data.list);
                }
            }
        });
    };


    //키워드 카테고리 리스트
    const setKeywordObj = keywords.map((item, idx) => {
        const code = parseInt(item.categoryCode);
        if(keywords.length === 1) {
            return ("");
        }

        return (
            <span 
                onClick={() => clickKeywordAction(code)}
                className={checkKeywords.indexOf(code) !== -1 ? 'item on' : "item"} 
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
            moveSet();
            moveCount++;
        }
    }

    const moveSet = () => {
        setTimeout(() => {
            setMoved(true);
        }, 100);
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

    // const clickOrDragDetection = () => {
    //     const items = document.querySelectorAll('.slick-slider .item');

    //     let moved
    //     let downListener = () => {
    //         moved = false
    //     }

    //     let moveListener = () => {
    //         moved = true
    //     }
    //     let upListener = () => {
    //         if (moved) {
    //             console.log('moved')
    //         } else {
    //             console.log('not moved')
    //         }
    //     }
    //     for(const item of items) {
    //         item.addEventListener('mousedown', downListener);
    //         item.addEventListener('mousemove', moveListener)
    //         item.addEventListener('mouseup', upListener);
    //     }


    //     return () => {
    //         for(const item of items) 
    //             item.removeEventListener('mousedown', downListener)
    //                 .removeEventListener('mousemove', moveListener)
    //                 .removeEventListener('mouseup', upListener);
    //     }
    // }


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
                    onMouseUp={() => upListener(parseInt(item.categoryCode), idx)}
                    onMouseMove={moveListener}
                    onMouseDown={downListener}>
                    <div className="title-img">
                        <div className='click-part'>
                            <FontAwesomeIcon icon={faCheck} />
                        </div>
                        {/* <Suspense fallback={<img src="/default_image.png" alt={item.name} />}>
                            {item.imageName != null ? 
                                <ImageSet imgSrc={`/upload/images/${item.imageName}`} imgAlt={item.name}/> : 
                                <img src="/default_image.png" alt={item.name} />}
                        </Suspense> */}
                        {/* <img 
                            ref={element => imgRef.current[idx] = element}
                            src={item.imageName != null ? `/upload/images/${item.imageName}` : "/default_image.png"} 
                            alt={item.name}/> */}
                        <img 
                            loading="lazy"
                            ref={element => imgRef.current[idx] = element}
                            src=""
                            alt={item.name}/>
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
                        <strong>{checkKeywords.length}개</strong>
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
