import { faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from "react";
import useGeolocation from "react-hook-geolocation";
import KakaoMapScript from '../../../api/KakaoMapScript';



const LocationInfo = () => {
    const location = useGeolocation();

    useEffect(() => {
        KakaoMapScript();
    }, []);

    return (
        <div className="location-part">
            <div id="myMap"></div>
            <div className='info-button'>
                <button className='geoloc-btn'><FontAwesomeIcon icon={faLocationCrosshairs}></FontAwesomeIcon></button>
                <input type='button' className='location-info' defaultValue='지역을 설정해 주세요.'/>
            </div>
        </div>
    );
};

export default LocationInfo;
