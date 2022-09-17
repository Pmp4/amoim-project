import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import useGeolocation from "react-hook-geolocation";
import { kakao, KakaoMapSet, searchAddress, panTo, searchDetailAddrFromCoords } from "../../../api/KakaoMapScript";


const initialAddress = {
    address: "",
    zipcode: "",
}


/**
 * 현재 위치를 클릭 할 땐,
 * => 도로명 주소가 있을 경우
 *    => 행정동까지 검색
 * => 
 */




const LocationInfo = () => {
    const [address, setAddress] = useState({});
    const [inputMsg, setInputMsg] = useState("지역을 설정해 주세요.");

    const geolocation = useGeolocation();

    useEffect(() => {
        KakaoMapSet(setAddress, setInputMsg);
        zipcodeApi();
    }, []);




    // 도로명주소 검색 api
    // 도로명주소 검색 api
    // 도로명주소 검색 api
    const zipcodeApi = () => {
        const script = document.createElement("script");
        script.async = true;
        script.src =
            "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        document.head.appendChild(script);
    };



    // 현재 위치 검색
    // 현재 위치 검색
    // 현재 위치 검색
    const geolocBtnClickAction = () => {
        console.log(geolocation.loaded);
        console.log(geolocation);
        if(geolocation.timestamp === null) {
            alert("위치정보 권한을 허용해 주세요.");
            return
        }

        panTo(geolocation.latitude, geolocation.longitude);
        searchDetailAddrFromCoords({
            lat: geolocation.latitude, 
            lng: geolocation.longitude
        }, (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
                console.log(result[0]);
                if(result[0].road_address === null) {
                    setInputMsg("정확한 위치를 클릭해주세요.");
                }else {
                    setInputMsg(result[0].road_address.address_name);
                }
                // setTempAddress(result[0].address.address_name);
            }
        });
    };




    // 도로명주소 검색
    // 도로명주소 검색
    // 도로명주소 검색
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
                    defaultValue={inputMsg}
                />
            </div>
        </div>
    );
};

export default LocationInfo;
