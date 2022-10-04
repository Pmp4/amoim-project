const { kakao } = window;

let map;
let marker;
// 마커를 담을 배열입니다
let markers = [];



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
                        console.log(addressSub.code);
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
                    setAddress({});
                    setInputMsg("정확한 위치를 클릭해주세요.");
                }
            }
        });
    });
};




const KakaoMapSet2 = (setAddress, setInputMsg) => {
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
                const addressDetail = result[0];
                console.log(addressDetail);
                if(addressDetail.road_address !== null) {
                    searchAddrFromCoords(latLng, (result, status) => {
                        const addressSub = result[0];
                        console.log(addressSub.code);
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
                    setAddress({});
                    setInputMsg("정확한 위치를 클릭해주세요.");
                }
            }
        });
    });
};











// 장소 검색 객체를 생성합니다
const ps = new kakao.maps.services.Places();  

let searchList;
// 키워드 검색을 요청하는 함수입니다
function searchPlaces(keyword, setSearchList) {
    if (!keyword.replace(/^\s+|\s+$/g, '')) {
        alert('키워드를 입력해주세요!');
        return false;
    }

    searchList = setSearchList;
    // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
    ps.keywordSearch( keyword, placesSearchCB); 
}




// 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
        console.log(data);
        console.log(pagination);
        searchList(data);
        // 정상적으로 검색이 완료됐으면
        // 검색 목록과 마커를 표출합니다
        // displayPlaces(data);

        // 페이지 번호를 표출합니다
        // displayPagination(pagination);

    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다.');
        return;
    } else if (status === kakao.maps.services.Status.ERROR) {

        alert('검색 결과 중 오류가 발생했습니다.');
        return;

    }
}

// 검색 결과 목록과 마커를 표출하는 함수입니다
// function displayPlaces(places) {

//     var listEl = document.getElementById('placesList'), 
//     menuEl = document.getElementById('menu_wrap'),
//     fragment = document.createDocumentFragment(), 
//     bounds = new kakao.maps.LatLngBounds(), 
//     listStr = '';
    
//     // 검색 결과 목록에 추가된 항목들을 제거합니다
//     removeAllChildNods(listEl);

//     // 지도에 표시되고 있는 마커를 제거합니다
//     removeMarker();
    
//     for ( var i=0; i<places.length; i++ ) {

//         // 마커를 생성하고 지도에 표시합니다
//         var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
//             marker = addMarker(placePosition, i), 
//             itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

//         // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
//         // LatLngBounds 객체에 좌표를 추가합니다
//         bounds.extend(placePosition);

//         // 마커와 검색결과 항목에 mouseover 했을때
//         // 해당 장소에 인포윈도우에 장소명을 표시합니다
//         // mouseout 했을 때는 인포윈도우를 닫습니다
//         (function(marker, title) {
//             kakao.maps.event.addListener(marker, 'mouseover', function() {
//                 displayInfowindow(marker, title);
//             });

//             kakao.maps.event.addListener(marker, 'mouseout', function() {
//                 infowindow.close();
//             });

//             itemEl.onmouseover =  function () {
//                 displayInfowindow(marker, title);
//             };

//             itemEl.onmouseout =  function () {
//                 infowindow.close();
//             };
//         })(marker, places[i].place_name);

//         fragment.appendChild(itemEl);
//     }

//     // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
//     listEl.appendChild(fragment);
//     menuEl.scrollTop = 0;

//     // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
//     map.setBounds(bounds);
// }



// 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
function addMarker(position, idx, title) {
    var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
        imgOptions =  {
            spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
            spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
            offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
            marker = new kakao.maps.Marker({
            position: position, // 마커의 위치
            image: markerImage 
        });

    marker.setMap(map); // 지도 위에 마커를 표출합니다
    markers.push(marker);  // 배열에 생성된 마커를 추가합니다

    return marker;
}

// 지도 위에 표시되고 있는 마커를 모두 제거합니다
function removeMarker() {
    for ( var i = 0; i < markers.length; i++ ) {
        markers[i].setMap(null);
    }   
    markers = [];
}

// 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
function displayPagination(pagination) {
    var paginationEl = document.getElementById('pagination'),
        fragment = document.createDocumentFragment(),
        i; 

    // 기존에 추가된 페이지번호를 삭제합니다
    while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild (paginationEl.lastChild);
    }

    for (i=1; i<=pagination.last; i++) {
        var el = document.createElement('a');
        el.href = "#";
        el.innerHTML = i;

        if (i===pagination.current) {
            el.className = 'on';
        } else {
            el.onclick = (function(i) {
                return function() {
                    pagination.gotoPage(i);
                }
            })(i);
        }

        fragment.appendChild(el);
    }
    paginationEl.appendChild(fragment);
}

// 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
// 인포윈도우에 장소명을 표시합니다
// function displayInfowindow(marker, title) {
//     var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

//     infowindow.setContent(content);
//     infowindow.open(map, marker);
// }
























export {
    KakaoMapSet,
    KakaoMapSet2,
    panTo,
    searchAddress,
    searchDetailAddrFromCoords,
    searchAddrFromCoords,
    searchPlaces,
    kakao,
    map,
    marker,
};
