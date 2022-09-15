const { kakao } = window;



let map;

const KakaoMapSet = () => {
    const container = document.getElementById('myMap');
    const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3
    };
    map = new kakao.maps.Map(container, options);
}

const panTo = (lat, lng) => {
    // 이동할 위도 경도 위치를 생성합니다 
    var moveLatLon = new kakao.maps.LatLng(lat, lng);
    
    // 지도 중심을 부드럽게 이동시킵니다
    // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
    map.panTo(moveLatLon);
}

const geocoder = new kakao.maps.services.Geocoder();

const searchAddress = (address) => {
    geocoder.addressSearch(address, (result, status) => {
        // 정상적으로 검색이 완료됐으면 
            if (status === kakao.maps.services.Status.OK) {
    
            const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
    
            // 결과값으로 받은 위치를 마커로 표시합니다
            const marker = new kakao.maps.Marker({
                map: map,
                position: coords
            });
    
            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다.
            map.setCenter(coords);
        } 
    }); 
}



export {KakaoMapSet, panTo, searchAddress}