import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import useGeolocation from "react-hook-geolocation";
import { KakaoMapSet, searchAddress, panTo, test } from "../../../api/KakaoMapScript";


const LocationInfo = () => {
    const [address, setAddress] = useState({});

    const geolocation = useGeolocation();

    useEffect(() => {
        KakaoMapSet();
        zipcodeApi();
        test();
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
        console.log(geolocation);
        if(geolocation.timestamp === null) {
            alert("위치정보 권한을 허용해 주세요.");
            return
        }
        const resData = panTo(geolocation.latitude, geolocation.longitude);
        console.log(resData);
    };

    const locInfoBtnClickAction = () => {
        const {daum} = window;
        new daum.Postcode({
            oncomplete: (data) => {
                const resData = searchAddress(data.address);
                console.log(resData);
            }
        }).open();
    }

    return (
        <div className="location-part">
            <div id="myMap"></div>
            <div className="info-button">
                <button className="geoloc-btn" onClick={geolocBtnClickAction}>
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
