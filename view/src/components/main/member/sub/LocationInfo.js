import React, { useEffect } from "react";
import ReactDOM from 'react-dom/client';
import useGeolocation from "react-hook-geolocation";
import KakaoMapScript from '../../../api/KakaoMapScript';



const LocationInfo = () => {
    const location = useGeolocation();

    useEffect(() => {
        KakaoMapScript();
    }, []);

    return (
        <div className="location-info">
            <div id="myMap" style={{height: "400px" }}></div>
        </div>
    );
};

export default LocationInfo;
