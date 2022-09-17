const { kakao } = window;

let map;
let marker;



const panTo = (lat, lng) => {
    // 이동할 위도 경도 위치를 생성합니다
    const moveLatLon = new kakao.maps.LatLng(lat, lng);

    marker.setMap(null);

    marker = new kakao.maps.Marker({
        map: map,
        position: moveLatLon,
    });

    // 지도 중심을 부드럽게 이동시킵니다
    // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
    map.panTo(moveLatLon);
};

const geocoder = new kakao.maps.services.Geocoder();

const searchDetailAddrFromCoords = (coords, callback) => {
    // 좌표로 법정동 상세 주소 정보를 요청합니다
    geocoder.coord2Address(coords.lng, coords.lat, callback);
};


const searchAddrFromCoords = (coords, callback) => {
    // 좌표로 행정동 주소 정보를 요청합니다
    geocoder.coord2RegionCode(coords.lng, coords.lat, callback);         
}







// 주소를 좌표로 변환
// 주소를 좌표로 변환
// 주소를 좌표로 변환
const searchAddress = (address) => {
    geocoder.addressSearch(address, (result, status) => {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
            const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

            // 결과값으로 받은 위치를 마커로 표시합니다
            marker.setMap(null);

            marker = new kakao.maps.Marker({
                map: map,
                position: coords,
            });

            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다.
            map.panTo(coords);

            return result;
        }
    });
};

const KakaoMapSet = (setAddress, setInputMsg) => {
    const container = document.getElementById("myMap");
    const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
    };
    map = new kakao.maps.Map(container, options);
    marker = new kakao.maps.Marker({
        map: map,
        position: null,
    });


    kakao.maps.event.addListener(map, "click", (mouseEvent) => {
        // 클릭한 위도, 경도 정보를 가져옵니다
        const latlng = mouseEvent.latLng;
        // 마커 위치를 클릭한 위치로 옮깁니다
        marker.setPosition(latlng);

        const latLng = {
            lng: latlng.getLng(),
            lat: latlng.getLat()
        }
    
        searchDetailAddrFromCoords(latLng, (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
                // if(result[0].road_address === null) {
                //     setInputMsg("정확한 위치를 클릭해주세요.");
                // }else {
                //     console.log(result[0]);
                //     searchAddrFromCoords(latLng, (result, status) => {
                //         if (status === kakao.maps.services.Status.OK) {
                //             console.log(result[0]);
                //         }
                //     })
                //     setInputMsg(result[0].road_address.address_name);
                // }


                const addressDetail = result[0];
                console.log(addressDetail);
                if(addressDetail.road_address !== null) {
                    searchAddrFromCoords(latLng, (result, status) => {
                        const addressSub = result[0];

                        const restAddress = {
                            zonecode: addressDetail.road_address.zip_code,
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
                    setAddress({});
                    setInputMsg("정확한 위치를 클릭해주세요.");
                }
            }
        });
    });
};





export {
    KakaoMapSet,
    panTo,
    searchAddress,
    searchDetailAddrFromCoords,
    searchAddrFromCoords,
    kakao,
    map,
    marker,
};
