import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import useGeolocation from "react-hook-geolocation";
import { kakao, KakaoMapSet, searchAddress, panTo, searchDetailAddrFromCoords } from "../../../api/KakaoMapScript";


const LocationInfo = () => {
    const [address, setAddress] = useState({});
    const [tempAddress, setTempAddress] = useState("");

    const geolocation = useGeolocation();

    useEffect(() => {
        KakaoMapSet();
        zipcodeApi();
    }, []);

    useEffect(() => {
        if(tempAddress !== "") {
            const {daum} = window;
            new daum.Postcode({
                oncomplete: (data) => {
                    console.log(data);
                }
            }).open({
                q: tempAddress
            });
        }
    }, [tempAddress]);

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
        searchDetailAddrFromCoords({
            lat: geolocation.latitude, 
            lng: geolocation.longitude
        }, (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
                setTempAddress(result[0].address.address_name);
            }
        })

        // const {daum} = window;
        // new daum.Postcode({
        //     oncomplete: (data) => {
        //         console.log(data);
        //     }
        // }).open({
        //     q: resData[0].address.address_name
        // });
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
