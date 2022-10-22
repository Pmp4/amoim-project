import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { faHeart, faLocationDot, faBackward, faForward } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const MoimList = ({ items, pageInfo, pageBtn }) => {
    const imgPath = useSelector((state) => state.path.imagePath);
    const navigate = useNavigate();



    const content = items.map((item, idx) => {
        const tagArr = item.TAGS.replace(/\[|\]|"| /g, "").split(",");

        return (
            <div
                className="item"
                key={item.NO}
                onClick={() => navigate(`/moim/view/${item.NO}`)}
            >
                <div className="left">
                    <div className="thumbnail">
                        <img
                            src={imgPath + item.IMAGE_NAME}
                            alt={item.TITLE + " 이미지"}
                        />
                    </div>
                    <div className="exp">
                        <p>{item.TITLE}</p>
                        <div className="sub-exp">
                            <span className="person">
                                인원 {item.PERSON_COUNT}/{item.PERSON_NUMBER}
                            </span>
                            <span className="loc">
                                <FontAwesomeIcon icon={faLocationDot} /> 위치
                            </span>
                            <span className="cat">
                                {item.CATEGORY_PARENT} &gt; {item.CATEGORY_NAME}
                            </span>
                            <span className="tag">
                                {tagArr.map((item, idx) => {
                                    if (idx === 0) return "#" + item;

                                    return " #" + item;
                                })}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="right">
                    <FontAwesomeIcon icon={faHeart} />
                </div>
            </div>
        );
    });


    const pageSet = () => {
        if (items.length === 0) return;


        let tempPageArr = [];
        for(let i = pageInfo.startPage; i < pageInfo.lastPage + 1; i++) tempPageArr.push(i);
    

        const page = tempPageArr.map((item, idx) => (
            <span key={idx} 
                className={item === pageInfo.currentPage ? "page-item on" : "page-item"}
                onClick={() => pageBtn(item)}
            >
                {item}
            </span>
        ))

        return page;
    }

    return (
        <div id="moim-search-list">
            {items.length > 0 ? content : <div className='none'>모임이 없습니다.</div>}
            {items.length > 0 ? <div className="pagination-info">
                <div>
                    {pageInfo.startPage !== 1 && 
                        <span onClick={
                                () => pageBtn(pageInfo.startPage - 1)
                            } className='prev'>
                            <FontAwesomeIcon icon={faBackward}/>
                        </span>
                    }
                    {pageSet()}
                    {pageInfo.lastPage !== pageInfo.totalPage && 
                        <span onClick={
                                () => pageBtn(pageInfo.lastPage + 1)
                            } className='next'>
                            <FontAwesomeIcon icon={faForward}/>
                        </span>}
                </div>
            </div> : ""}
        </div>
    );
};

export default MoimList;
