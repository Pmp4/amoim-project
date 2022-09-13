import React, { useEffect, useRef, useState } from "react";
import InterestService from "../../../../api/interest/InterestService";
import Slider from "react-slick";


const Interest = ({checkStatus, checkStatusAction, interestsValue, setKeywordObj, setCategoryObj}) => {

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
        // categoryApi("");
    }, []);

    useEffect(() => {
        console.log(interests.length);
    })




    


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
    // const categoryApi = (type) => {
    //     InterestService.selectCategory(type).then((response) => {
    //         console.log(response);
    //         if (response.data.SUCCESS) {
    //             if(response.data.type) {
    //                 for(let i = 0; i < response.data.list.length; i++)
    //                     response.data.list[i].check = false;
                    
    //                 setInterests(response.data.list);
    //             }else {
    //                 for(let i = 0; i < response.data.list.length; i++)
    //                     response.data.list[i].check = false;
    //                 setKeywords(response.data.list);
    //             }
    //         }
    //     });
    // };








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
