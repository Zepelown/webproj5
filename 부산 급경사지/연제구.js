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

const url = 'https://api.odcloud.kr/api/15037401/v1/uddi:7c5ddb34-4df1-4bc1-a124-c9fc7b547a2e?page=1&perPage=300&returnType=JSON&serviceKey=muAzQmFBf9gOEiqBbNkzMbOmlHV9zPkNCrLf6FsdrOzZsUnb%2BPm84EInw0N1bZmrpTEGEdkXbmRRBi0cRq%2BhRA%3D%3D';

var mapContainer = document.getElementById('map');
var mapOption = {
    center: new kakao.maps.LatLng(35.13417, 129.11397),
    level: 9
};

var map = new kakao.maps.Map(mapContainer, mapOption);
var markerImage_red = new kakao.maps.MarkerImage(
    'https://cdn.pixabay.com/photo/2014/04/02/10/45/location-304467_960_720.png',
    new kakao.maps.Size(24, 34),
    {
        offset: new kakao.maps.Point(13, 34)
    }
);

fetch(url)
    .then(res => res.json())
    .then(resJson => {
        var markers = [];
        for (var i = 0; i < resJson.data.length; i++) {
            const contents = resJson.data;
            var address = '연산동 ' + contents[i].지번;

            console.log(address);
            var geocoder = new kakao.maps.services.Geocoder();
            (function (i) {
                var name = contents[i].지구명;
                geocoder.addressSearch(address, function (result, status) {
                    if (status === kakao.maps.services.Status.OK) {
                        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                        var marker = new kakao.maps.Marker({
                            map: map,
                            position: coords,
                            image: markerImage_red
                        });
                        markers.push(marker);

                        var infoWindow = new kakao.maps.InfoWindow({
                            content: '<div style="width:150px;text-align:center;padding:6px 0;">' + name + '</div>'
                        });

                        kakao.maps.event.addListener(marker, 'mouseover', mouseOverListener(map, marker, infoWindow));
                        kakao.maps.event.addListener(marker, 'mouseout', mouseOutListener(infoWindow));
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
