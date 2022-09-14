import React from 'react';

const ImageSet = ({imgSrc, imgAlt}) => {


    const timeOut = () => {
        setTimeout(() => {
            <img src={imgSrc} />
        }, 1000);
    }
    return (
        <div>
            <img src={imgSrc} alt={imgAlt}/>
        </div>
    );
};

export default ImageSet;