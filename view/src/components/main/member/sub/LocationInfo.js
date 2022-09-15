import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import useGeolocation from "react-hook-geolocation";
import { KakaoMapSet, searchAddress } from "../../../api/KakaoMapScript";


const LocationInfo = () => {
    const [address, setAddress] = useState({});

    const geolocation = useGeolocation();

    useEffect(() => {
        KakaoMapSet();
        zipcodeApi();
    }, []);

    const zipcodeApi = () => {
        const script = document.createElement("script");
        script.async = true;
        script.src =
            "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        document.head.appendChild(script);
    };



    const geolocBtnClickAction = () => {
        console.log(geolocation.loaded);
        console.log(JSON.stringify(geolocation));
    };

    const locInfoBtnClickAction = () => {
        const {daum} = window;
        new daum.Postcode({
            oncomplete: (data) => {
                console.log(data);
                searchAddress(data.address);
            }
        }).open();
    }

    return (
        <div className="location-part">
            <div id="myMap"></div>
            <div className="info-button" onClick={geolocBtnClickAction}>
                <button className="geoloc-btn">
                    <FontAwesomeIcon icon={faLocationCrosshairs} />
                </button>
                <input
                    onClick={locInfoBtnClickAction}
                    type="button"
                    className="location-info"
                    defaultValue="지역을 설정해 주세요."
                />
            </div>
        </div>
    );
};

export default LocationInfo;
