import React from 'react';
import Slider from 'react-slick';
import { Suspense, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import ImageSet from '../../../ImageSet';
import { useRef } from 'react';

const InterestSlider = ({interests, clickCategory, currentCode}) => {
    const [moved, setMoved] = useState(false);
    const divRef = useRef([]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4
    };


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
                        <Suspense fallback={<img src="/default_image.png" alt={item.name}/>}>
                            <ImageSet imgSrc={item.imageName} imgAlt={item.name}/>
                        </Suspense>
                        {/* <img 
                            src={item.imageName != null ? `/upload/images/${item.imageName}` : "/default_image.png"} 
                            alt={item.name}/> */}
                    </div>
                    <span className="cat-title">{item.name}</span>
                </div>
            </div>
        )
    });

    return (
        <Slider {...settings}>
            {setCategoryObj}
        </Slider>
    );
};

export default InterestSlider;