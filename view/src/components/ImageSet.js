import React from 'react';

const ImageSet = ({imgSrc, imgAlt}) => {
    return (
        <img src={`/upload/images/${imgSrc}`} alt={imgAlt}/>
    );
};

export default ImageSet;