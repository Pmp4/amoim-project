import React, { useEffect } from "react";



const Interest = () => {

    const slideWidthSet = () => {
        const items = document.querySelectorAll('.item');
        let slideWidth = 0;
        items.forEach(element => {
            slideWidth += element.offsetWidth;
        })

        document.getElementsByClassName('main-cat')[0].style.width = `${slideWidth}px`;
    }

    useEffect(() => {
        slideWidthSet();
    })

    return (
        <div className="interest-part">
            <div className='main-slide-wrap'>
                <div className="main-cat clearfix">
                    <div className="item">
                        <div className="title-img"></div>
                        <span className="cat-title">테스트주제</span>
                    </div>
                    <div className="item">
                        <div className="title-img"></div>
                        <span className="cat-title">테스트주제</span>
                    </div>
                    <div className="item">
                        <div className="title-img"></div>
                        <span className="cat-title">테스트주제</span>
                    </div>
                    <div className="item">
                        <div className="title-img"></div>
                        <span className="cat-title">테스트주제</span>
                    </div>
                    <div className="item">
                        <div className="title-img"></div>
                        <span className="cat-title">테스트주제</span>
                    </div>
                </div>
            </div>
            
            <div className="sub-cat">
                <div className='title'>키워드</div>
                <div className='keyword-part'>
                    <span className='item'>test1</span>
                    <span className='item'>test2</span>
                    <span className='item'>test3test3test3</span>
                </div>
            </div>
        </div>
    );
};

export default Interest;
