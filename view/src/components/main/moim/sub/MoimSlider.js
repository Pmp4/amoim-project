import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navigate } from "react-router";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import MoimItem from './MoimItem';

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    draggable: false,
    arrows: false
};



const MoimSlider = ({meeting}) => {
    const [items, setItems] = useState([]);


    useEffect(() => {
        initial();
    }, [meeting]);

    const initial = () => {
        const tempItems = [...meeting];

        if(meeting.length < 4) {
            let maxIdx = 4 - meeting.length;
            for(let i = 0; i < maxIdx; i++) {
                let temp = {NO: -1}
                tempItems.push(temp);
            }

            console.log(tempItems);
        }
        setItems(tempItems);
    }


    return (
        <div id="moim-item" className="draggable">
            <div className='gradient left'></div>
            <Slider {...settings}>
                {items.map((item, idx) => {
                    if(items.length === 0) return ""; 

                    if(item.NO === -1) {
                        return <div key={idx + 1123} className='none-item'></div>
                    } else {
                        return (
                            <MoimItem item={item} key={idx}/>
                        )
                    }
                })}
            </Slider>
            <div className='gradient right'></div>
        </div>
    );
};

export default MoimSlider;
