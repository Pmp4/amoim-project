import React, { useEffect, useRef, useState } from "react";
import InterestService from "../../../../api/interest/InterestService";
import Slider from "react-slick";

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

    const clickCategory = (idx) => {
        if(checkItem.indexOf(idx) !== -1) {
            // console.log("hello");
            const tempCheckItem = checkItem.filter(item => item !== idx);
            setCheckItem(tempCheckItem);
        }else {
            setCheckItem(checkItem.concat(idx));
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

    const upListener = (idx) => {
        // console.log(idx);
        if (moved) {
            console.log('moved')
        } else {
            console.log('not moved');
            clickCategory(idx);
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


    const setCategoryObj = interests.map((item, idx) => (
        <div
            ref={element => divRef.current[idx] = element}
            key={item.interestNo}
            >
            <div 
                className={checkItem.indexOf(idx) !== -1 ? 'item on' : 'item'} 
                onMouseUp={() => upListener(parseInt(item.categoryCode))}
                onMouseMove={moveListener}
                onMouseDown={downListener}>
                <div className="title-img"></div>
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
