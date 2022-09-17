import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import useGeolocation from "react-hook-geolocation";
import { 
    kakao, 
    KakaoMapSet, 
    searchAddress, 
    panTo, 
    searchDetailAddrFromCoords, 
    searchAddrFromCoords } from "../../../api/KakaoMapScript";



/**
 * 현재 위치를 클릭 할 땐,
 * => 도로명 주소가 있을 경우
 *    => 행정동까지 검색
 * => 
 */

/**
    const initialAddress = {
        addressNo: "",
        userNo: "",
        zonecode: "",
        address: "",
        roadAddress: "",
        jibunAddress: "",
        sido: "",
        sigungu: "",
        bcode: "",
        bname: "",
    }
 */


const LocationInfo = ({addressSet}) => {
    const [inputMsg, setInputMsg] = useState("지역을 설정해 주세요.");
    const geolocation = useGeolocation();

    const {address, setAddress} = addressSet;

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
        // console.log(geolocation.loaded);
        console.log(geolocation);
        if(geolocation.timestamp === null) {
            alert("위치정보 권한을 허용해 주세요.");
            return
        }

        panTo(geolocation.latitude, geolocation.longitude);
        
        const latLng = {
            lat: geolocation.latitude, 
            lng: geolocation.longitude
        }

        searchDetailAddrFromCoords(latLng, (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
                console.log(result[0]);
                const addressDetail = result[0];

                if(addressDetail.road_address !== null) {
                    searchAddrFromCoords(latLng, (result, status) => {
                        console.log(result[0]);
                        const addressSub = result[0];
                        const restAddress = {
                            zonecode: addressDetail.road_address.zone_no,
                            address: addressDetail.address.address_name,
                            roadAddress: addressDetail.road_address.address_name,
                            jibunAddress: addressDetail.address.address_name,
                            sido: addressSub.region_1depth_name,
                            sigungu: addressSub.region_2depth_name,
                            bname: addressSub.region_3depth_name,
                            bcode: addressSub.code,
                        }

                        setInputMsg(addressDetail.address.address_name);
                        setAddress(restAddress);
                    });
                }else {
                    setInputMsg("정확한 위치를 클릭해주세요.");
                }
                // setTempAddress(result[0].address.address_name);
            }else {
                setInputMsg("정확한 위치를 클릭해주세요.");
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
                console.log(data);

                const restAddress = {
                    zonecode: data.zonecode,
                    address: data.address,
                    roadAddress: data.roadAddress,
                    jibunAddress: data.jibunAddress,
                    sido: data.sido,
                    sigungu: data.sigungu,
                    bname: data.bname,
                    bcode: data.bcode,
                }

                setAddress(restAddress);
                setInputMsg(data.address);
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
