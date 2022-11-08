import React from 'react';
import { useSelector } from 'react-redux';

const ImageSet = ({imgSrc, imgAlt}) => {
    const path = useSelector(state => state.path)

    return (
        <img 
            src={!isNaN(imgSrc) ? '/default_image.png' : `${path.image}${imgSrc}`} 
            alt={imgAlt}/>
    );
};

export default ImageSet;