var mapContainer = document.getElementById("map"), // 지도를 표시할 div
  mapOption = {
    center: new kakao.maps.LatLng(35.136121, 129.101008),
    level: 4, // 지도의 확대 레벨
  };

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

// 지도가 이동, 확대, 축소로 인해 중심좌표가 변경되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
var centerLatitude;
var centerLongitude;
kakao.maps.event.addListener(map, "center_changed", function () {
  // 지도의  레벨을 얻어옵니다
  var center_level = map.getLevel();
  // 지도의 중심좌표를 얻어옵니다
  var centerLatlng = map.getCenter();

  centerLatitude = centerLatlng.Ma;
  centerLongitude = centerLatlng.La;
});

// 지도가 이동, 확대, 축소로 인해 지도영역이 변경되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
var markerFirstLat;
var markerFirstLng;
kakao.maps.event.addListener(map, "bounds_changed", function () {
  // 지도 영역정보를 얻어옵니다
  var bounds = map.getBounds();
  // 영역정보의 남서쪽 정보를 얻어옵니다
  var swLatlng = bounds.getSouthWest();
  // 영역정보의 북동쪽 정보를 얻어옵니다
  var neLatlng = bounds.getNorthEast();

  markerFirstLat = neLatlng.Ma;
  markerFirstLng = neLatlng.La;
});

var startSrc =
    "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/red_b.png", // 출발 마커이미지의 주소입니다
  startSize = new kakao.maps.Size(50, 45), // 출발 마커이미지의 크기입니다
  startOption = {
    offset: new kakao.maps.Point(15, 43), // 출발 마커이미지에서 마커의 좌표에 일치시킬 좌표를 설정합니다 (기본값은 이미지의 가운데 아래입니다)
  };

// 출발 마커 이미지를 생성합니다
var startImage = new kakao.maps.MarkerImage(startSrc, startSize, startOption);

var startDragSrc =
    "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/red_drag.png", // 출발 마커의 드래그 이미지 주소입니다
  startDragSize = new kakao.maps.Size(50, 64), // 출발 마커의 드래그 이미지 크기입니다
  startDragOption = {
    offset: new kakao.maps.Point(15, 54), // 출발 마커의 드래그 이미지에서 마커의 좌표에 일치시킬 좌표를 설정합니다 (기본값은 이미지의 가운데 아래입니다)
  };

// 출발 마커의 드래그 이미지를 생성합니다
var startDragImage = new kakao.maps.MarkerImage(
  startDragSrc,
  startDragSize,
  startDragOption
);

// 출발 마커가 표시될 위치입니다
var startMarkerPosition = new kakao.maps.LatLng(35.137932, 129.104381);

// 출발 마커를 생성합니다
var startMarker = new kakao.maps.Marker({
  map: map, // 출발 마커가 지도 위에 표시되도록 설정합니다
  position: startMarkerPosition,
  draggable: true, // 출발 마커가 드래그 가능하도록 설정합니다
  image: startImage, // 출발 마커이미지를 설정합니다
});

// 출발 마커에 dragstart 이벤트를 등록합니다
kakao.maps.event.addListener(startMarker, "dragstart", function () {
  // 출발 마커의 드래그가 시작될 때 마커 이미지를 변경합니다
  startMarker.setImage(startDragImage);
});

// 출발 마커에 dragend 이벤트를 등록합니다
var startLatitude;
var startLongitude;
kakao.maps.event.addListener(startMarker, "dragend", function () {
  // 출발 마커의 드래그가 종료될 때 마커 이미지를 원래 이미지로 변경합니다
  startMarker.setImage(startImage);
  var startPosition = startMarker.getPosition();
  startLatitude = startPosition.getLat();
  startLongitude = startPosition.getLng();
  console.log(
    "출발 마커 위치 - 위도: " + startLatitude + ", 경도: " + startLongitude
  );
});

var arriveSrc =
    "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/blue_b.png", // 도착 마커이미지 주소입니다
  arriveSize = new kakao.maps.Size(50, 45), // 도착 마커이미지의 크기입니다
  arriveOption = {
    offset: new kakao.maps.Point(15, 43), // 도착 마커이미지에서 마커의 좌표에 일치시킬 좌표를 설정합니다 (기본값은 이미지의 가운데 아래입니다)
  };

// 도착 마커 이미지를 생성합니다
var arriveImage = new kakao.maps.MarkerImage(
  arriveSrc,
  arriveSize,
  arriveOption
);

var arriveDragSrc =
    "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/blue_drag.png", // 도착 마커의 드래그 이미지 주소입니다
  arriveDragSize = new kakao.maps.Size(50, 64), // 도착 마커의 드래그 이미지 크기입니다
  arriveDragOption = {
    offset: new kakao.maps.Point(15, 54), // 도착 마커의 드래그 이미지에서 마커의 좌표에 일치시킬 좌표를 설정합니다 (기본값은 이미지의 가운데 아래입니다)
  };

// 도착 마커의 드래그 이미지를 생성합니다
var arriveDragImage = new kakao.maps.MarkerImage(
  arriveDragSrc,
  arriveDragSize,
  arriveDragOption
);

// 도착 마커가 표시될 위치입니다
var arriveMarkerPosition = new kakao.maps.LatLng(35.133404, 129.099168);

// 도착 마커를 생성합니다
var arriveMarker = new kakao.maps.Marker({
  map: map, // 도착 마커가 지도 위에 표시되도록 설정합니다
  position: arriveMarkerPosition,
  draggable: true, // 도착 마커가 드래그 가능하도록 설정합니다
  image: arriveImage, // 도착 마커이미지를 설정합니다
});

// 도착 마커에 dragstart 이벤트를 등록합니다
kakao.maps.event.addListener(arriveMarker, "dragstart", function () {
  // 도착 마커의 드래그가 시작될 때 마커 이미지를 변경합니다
  arriveMarker.setImage(arriveDragImage);
});

// 도착 마커에 dragend 이벤트를 등록합니다
var arriveLatitude;
var arriveLongitude;
kakao.maps.event.addListener(arriveMarker, "dragend", function () {
  // 도착 마커의 드래그가 종료될 때 마커 이미지를 원래 이미지로 변경합니다
  arriveMarker.setImage(arriveImage);
  var arrivePosition = arriveMarker.getPosition();
  arriveLatitude = arrivePosition.getLat(); // 도착 마커의 위도
  arriveLongitude = arrivePosition.getLng(); // 도착 마커의 경도
  console.log(
    "도착 마커 위치 - 위도: " + arriveLatitude + ", 경도: " + arriveLongitude
  );
});

var route_markers = [];
route_markers.push(startMarker);
route_markers.push(arriveMarker);

// 배열에 추가된 마커들을 지도에 표시하거나 삭제하는 함수입니다
function setMarkers(map) {
  for (var i = 0; i < route_markers.length; i++) {
    route_markers[i].setMap(map);
  }
}
// "마커 보이기" 버튼을 클릭하면 호출되어 배열에 추가된 마커를 지도에 표시하는 함수입니다
function showMarkers() {
  setMarkers(map);
  document.getElementById("message").style.display = "block"; // 메시지 표시
}
// "마커 감추기" 버튼을 클릭하면 호출되어 배열에 추가된 마커를 지도에서 삭제하는 함수입니다
function hideMarkers() {
  setMarkers(null);
  document.getElementById("message").style.display = "none"; // 메시지 숨기기
}
setMarkers(null);

function redirectToTMap() {
  // 변수 X와 Y의 값을 동적으로 설정
  var slat;
  var slng;
  var alat;
  var alng;
  var cenlat;
  var cenlng;

  if (typeof centerLatitude == "undefined") cenlat = 35.133636;
  else cenlat = centerLatitude;

  if (typeof centerLongitude == "undefined") cenlng = 129.104244;
  else cenlng = centerLongitude;

  slat = startLatitude;
  slng = startLongitude;
  alat = arriveLatitude;
  alng = arriveLongitude;
  //var cenlat = centerLatitude;
  //var cenlng = centerLongitude;

  // 동적으로 URL 생성
  var url =
    "t_map.html?slat=" +
    encodeURIComponent(slat) +
    "&slng=" +
    encodeURIComponent(slng) +
    "&alat=" +
    encodeURIComponent(alat) +
    "&alng=" +
    encodeURIComponent(alng) +
    "&cenlat=" +
    encodeURIComponent(cenlat) +
    "&cenlng=" +
    encodeURIComponent(cenlng);

  // 새 창 또는 탭에서 URL 열기
  window.open(url, "_blank");
}
