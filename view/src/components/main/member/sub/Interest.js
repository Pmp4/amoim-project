import React from "react";

const Interest = () => {
    const slideWidth = () => {
        const items = document.get('item');
        items.array.forEach(element => {
            console.log(element);
        });
    }
    return (
        <div className="interest-part">
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
            <div className="sub-cat"></div>
        </div>
    );
};

export default Interest;
