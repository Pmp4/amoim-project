import React from "react";
import Slider from "react-slick";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navigate } from "react-router";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import MoimItem from './MoimItem';

const MoimSlider = ({meeting}) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        draggable: false
    };

    return (
        <div id="moim-item" className="draggable">
            <div className='gradient left'></div>
            <Slider {...settings}>
                {meeting.map((item, idx) => {
                    if(meeting.length === 0) return ""; 

                    return (
                        <MoimItem item={item} key={idx}/>
                    )
                })}
            </Slider>
            <div className='gradient right'></div>
        </div>
    );
};

export default MoimSlider;
