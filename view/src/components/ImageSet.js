import React from 'react';

const ImageSet = ({imgSrc, imgAlt}) => {
    return (
        <img 
            src={!isNaN(imgSrc) ? '/default_image.png' : `/upload/images/${imgSrc}`} 
            alt={imgAlt}/>
    );
};

export default ImageSet;