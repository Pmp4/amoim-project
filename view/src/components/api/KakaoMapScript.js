const { kakao } = window;

let map;
let marker;

const KakaoMapSet = () => {
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
};

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

    const coords = {
        lng,
        lat
    }
    console.log(coords);

    searchDetailAddrFromCoords(coords, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
            console.log(result);
            return result;
        }
    });
};

const geocoder = new kakao.maps.services.Geocoder();

const searchDetailAddrFromCoords = (coords, callback) => {
    // 좌표로 법정동 상세 주소 정보를 요청합니다
    geocoder.coord2Address(coords.lng, coords.lat, callback);
}

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


export { KakaoMapSet, panTo, searchAddress};
