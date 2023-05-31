function mouseOverListener(map, marker, infoWindow) {
    return function () {
        infoWindow.open(map, marker);
    };
}
function mouseOutListener(infoWindow) {
    return function () {
        infoWindow.close();
    };
}
const url1 = 'https://api.odcloud.kr/api/3070044/v1/uddi:1da04db6-8d95-480b-902c-f9316c705379_201906211646?page=1&perPage=300&returnType=JSON&serviceKey=muAzQmFBf9gOEiqBbNkzMbOmlHV9zPkNCrLf6FsdrOzZsUnb%2BPm84EInw0N1bZmrpTEGEdkXbmRRBi0cRq%2BhRA%3D%3D';

var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = {
        center: new kakao.maps.LatLng(35.13417, 129.11397), // 지도의 중심좌표
        level: 9 // 지도의 확대 레벨
    };

// 지도를 생성합니다    
var map = new kakao.maps.Map(mapContainer, mapOption);
var markerImage_red = new kakao.maps.MarkerImage(
    'https://cdn.pixabay.com/photo/2014/04/02/10/45/location-304467_960_720.png',
    new kakao.maps.Size(24, 34),
    {
        offset: new kakao.maps.Point(13, 34),
    }
);
fetch(url1)
    .then(res => res.json())
    .then(resJson => {
        var markers = [];
        for (var i = 0; i < resJson.data.length; i++) {
            const contents = resJson.data;
            var address = contents[i].위치;

            console.log(address);
            var geocoder = new kakao.maps.services.Geocoder();
            // 주소로 좌표를 검색합니다
            (function (i) {
                var name = contents[i].급경사지명;
                geocoder.addressSearch(address, function (result, status) {
                    // 정상적으로 검색이 완료됐으면 
                    if (status === kakao.maps.services.Status.OK) {
                        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                        // 결과값으로 받은 위치를 마커로 표시합니다
                        var marker = new kakao.maps.Marker({
                            map: map,
                            position: coords,
                            image: markerImage_red // 빨간색 마커로 표시
                        });
                        markers.push(marker);

                        var infoWindow = new kakao.maps.InfoWindow({
                            content: '<div style="width:150px;text-align:center;padding:6px 0;">' + name + '</div>'
                        });

                        kakao.maps.event.addListener(marker, "mouseover", mouseOverListener(map, marker, infoWindow));
                        kakao.maps.event.addListener(marker, "mouseout", mouseOutListener(infoWindow));
                    }

                    var clusterer = new kakao.maps.MarkerClusterer({
                        map: map,
                        markers: markers,
                        gridSize: 50,
                        averageCenter: true,
                        minLevel: 4
                    });

                });
            })(i);
        }
    });

