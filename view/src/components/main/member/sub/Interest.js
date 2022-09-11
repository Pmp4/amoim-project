import React, { useEffect, useState } from "react";
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

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        centerPadding: "60px",
    };

    const setCategoryObj = interests.map((item) => (
        <div key={item.interestNo}>
            <div className="item">
                <div className="title-img"></div>
                <span className="cat-title">{item.name}</span>
            </div>
        </div>
    ));

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
        // slideWidthSet();
    });

    const categoryApi = (type) => {
        InterestService.selectCategory(type).then((response) => {
            console.log(response);
            if (response.data.SUCCESS) {
                setInterests(response.data.list);
            }
        });
    };

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
