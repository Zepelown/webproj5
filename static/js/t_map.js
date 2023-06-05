var map;
var marker_s, marker_e, marker_p1, marker_p2;
var totalMarkerArr = [];
var drawInfoArr = [];
var resultdrawArr = [];

// URL 매개변수 추출
const urlParams = new URLSearchParams(window.location.search);

// 변수의 값을 가져오기
const startLatitude = urlParams.get("slat");
const startLongitude = urlParams.get("slng");
const arriveLatitude = urlParams.get("alat");
const arriveLongitude = urlParams.get("alng");
const centerLatitude = urlParams.get("cenlat");
const centerLongitude = urlParams.get("cenlng");

// 변수를 사용하여 작업 수행
console.log(startLatitude);
console.log(startLongitude);
console.log(arriveLatitude);
console.log(arriveLongitude);
console.log(centerLatitude);
console.log(centerLongitude);

function initTmap() {
  // 1. 지도 띄우기
  map = new Tmapv2.Map("map_div", {
    center: new Tmapv2.LatLng(centerLatitude, centerLongitude),
    width: "100%",
    height: "700px",
    zoom: 17,
    zoomControl: true,
    scrollwheel: true,
  });

  var start_lat = startLatitude;
  var start_lng = startLongitude;
  var end_lat = arriveLatitude;
  var end_lng = arriveLongitude;
  // 2. 시작, 도착 심볼찍기
  // 시작
  marker_s = new Tmapv2.Marker({
    position: new Tmapv2.LatLng(start_lat, start_lng),
    icon: "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_s.png",
    iconSize: new Tmapv2.Size(24, 38),
    map: map,
  });

  // 도착
  marker_e = new Tmapv2.Marker({
    position: new Tmapv2.LatLng(end_lat, end_lng),
    icon: "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png",
    iconSize: new Tmapv2.Size(24, 38),
    map: map,
  });

  // 3. 경로탐색 API 사용요청
  var headers = {};
  headers["appKey"] = "kzrC8emrIM6HcgQTxeCyT4ifJysfZXgx9XChHVMR";

  $.ajax({
    method: "POST",
    headers: headers,
    url: "https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json&callback=result",
    async: false,
    data: {
      startX: start_lng,
      startY: start_lat,
      endX: end_lng,
      endY: end_lat,
      reqCoordType: "WGS84GEO",
      resCoordType: "EPSG3857",
      startName: "출발지",
      endName: "도착지",
    },
    success: function (response) {
      var resultData = response.features;

      //결과 출력
      var tDistance =
        "총 거리 : " +
        (resultData[0].properties.totalDistance / 1000).toFixed(1) +
        "km,";
      var tTime =
        " 총 시간 : " +
        (resultData[0].properties.totalTime / 60).toFixed(0) +
        "분";

      $("#result").text(tDistance + tTime);

      //기존 그려진 라인 & 마커가 있다면 초기화
      if (resultdrawArr.length > 0) {
        for (var i in resultdrawArr) {
          resultdrawArr[i].setMap(null);
        }
        resultdrawArr = [];
      }

      drawInfoArr = [];

      for (var i in resultData) {
        //for문 [S]
        var geometry = resultData[i].geometry;
        var properties = resultData[i].properties;
        var polyline_;

        if (geometry.type == "LineString") {
          for (var j in geometry.coordinates) {
            // 경로들의 결과값(구간)들을 포인트 객체로 변환
            var latlng = new Tmapv2.Point(
              geometry.coordinates[j][0],
              geometry.coordinates[j][1]
            );
            // 포인트 객체를 받아 좌표값으로 변환
            var convertPoint = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(
              latlng
            );
            // 포인트객체의 정보로 좌표값 변환 객체로 저장
            var convertChange = new Tmapv2.LatLng(
              convertPoint._lat,
              convertPoint._lng
            );
            // 배열에 담기
            drawInfoArr.push(convertChange);
          }
        } else {
          var markerImg = "";
          var pType = "";
          var size;

          if (properties.pointType == "S") {
            //출발지 마커
            markerImg =
              "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_s.png";
            pType = "S";
            size = new Tmapv2.Size(24, 38);
          } else if (properties.pointType == "E") {
            //도착지 마커
            markerImg =
              "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png";
            pType = "E";
            size = new Tmapv2.Size(24, 38);
          } else {
            //각 포인트 마커
            markerImg = "http://topopen.tmap.co.kr/imgs/point.png";
            pType = "P";
            size = new Tmapv2.Size(8, 8);
          }

          // 경로들의 결과값들을 포인트 객체로 변환
          var latlon = new Tmapv2.Point(
            geometry.coordinates[0],
            geometry.coordinates[1]
          );

          // 포인트 객체를 받아 좌표값으로 다시 변환
          var convertPoint = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(
            latlon
          );

          var routeInfoObj = {
            markerImage: markerImg,
            lng: convertPoint._lng,
            lat: convertPoint._lat,
            pointType: pType,
          };

          // Marker 추가
          marker_p = new Tmapv2.Marker({
            position: new Tmapv2.LatLng(routeInfoObj.lat, routeInfoObj.lng),
            icon: routeInfoObj.markerImage,
            iconSize: size,
            map: map,
          });
        }
      } //for문 [E]
      drawLine(drawInfoArr);
    },
    error: function (request, status, error) {
      console.log(
        "code:" +
          request.status +
          "\n" +
          "message:" +
          request.responseText +
          "\n" +
          "error:" +
          error
      );
    },
  });
}

function addComma(num) {
  var regexp = /\B(?=(\d{3})+(?!\d))/g;
  return num.toString().replace(regexp, ",");
}

function drawLine(arrPoint) {
  var polyline_;

  polyline_ = new Tmapv2.Polyline({
    path: arrPoint,
    strokeColor: "#08D624",
    strokeWeight: 6,
    map: map,
  });
  resultdrawArr.push(polyline_);
}
