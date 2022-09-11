import React, { useEffect, useRef, useState } from "react";
import InterestService from "../../../../api/interest/InterestService";
import Slider from "react-slick";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCheck} from '@fortawesome/free-solid-svg-icons';

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

const Interest = () => {
    const [interests, setInterests] = useState(initialInterests);
    const [moved, setMoved] = useState(false);
    const [checkItem, setCheckItem] = useState([]);
    const [currentCode, setCurrentCode] = useState(0);
    const divRef = useRef([]);

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


    //요소 클릭 시, 체크 여부를 확인함
    //요소 클릭 시, 체크 여부를 확인함
    //요소 클릭 시, 체크 여부를 확인함
    const clickCategory = (code, idx) => {
        // console.log(idx);
        if(checkItem.indexOf(code) !== -1) {    //클릭한 요소일 때, 삭제
            // console.log("hello");
            if(currentCode === code) {  //현재 보고있는 카테고리일 경우만 삭제
                const tempArray = [...interests];
                tempArray[idx].check = false;
                const tempCheckItem = checkItem.filter(item => item !== code);

                setInterests(tempArray);
                setCheckItem(tempCheckItem);
                return;
            }

            setCurrentCode(code);
        }else { //클릭한 요소가 아닐 때, 추가
            const tempArray = [...interests];
            tempArray[idx].check = true;
            // console.log(tempArray);

            setInterests(tempArray);
            setCheckItem(checkItem.concat(code));
            setCurrentCode(code);
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
                for(let i = 0; i < response.data.list.length; i++)
                    response.data.list[i].check = false;
                
                setInterests(response.data.list);
            }
        });
    };


    //마우스 클릭 or 드래그 감지
    //마우스 클릭 or 드래그 감지
    //마우스 클릭 or 드래그 감지
    const downListener = () => {
        setMoved(false);
    }

    const moveListener = () => {
        setMoved(true);
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
    const setCategoryObj = interests.map((item, idx) => (
        <div
            ref={element => divRef.current[idx] = element}
            key={idx}
            >
            <div 
                className={item.check ? 'item on' : 'item'} 
                onMouseUp={() => upListener(parseInt(item.categoryCode), idx)}
                onMouseMove={moveListener}
                onMouseDown={downListener}>
                <div className="title-img">
                    <div className='click-part'>
                        <FontAwesomeIcon icon={faCheck} />
                    </div>
                    <img src={`../../../../upload/images/${item.imageName}`} alt={item.name}/>
                </div>
                <span className="cat-title">{item.name}</span>
            </div>
        </div>
    ));

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
                <div className="title">키워드</div>
                <div className="keyword-part">
                    <span className="item">test1</span>
                    <span className="item">test2</span>
                    <span className="item">test3test3test3</span>
                </div>
            </div>
        </div>
    );
};

export default Interest;
