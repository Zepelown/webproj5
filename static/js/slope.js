var mapContainer = document.getElementById("map"), // 지도를 표시할 div
  mapOption = {
    center: new kakao.maps.LatLng(35.136121, 129.101008),
    level: 4, // 지도의 확대 레벨
  };

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
var markerImage_red = new kakao.maps.MarkerImage(
  "https://cdn.pixabay.com/photo/2014/04/02/10/45/location-304467_960_720.png",
  new kakao.maps.Size(14, 20),
  {
    offset: new kakao.maps.Point(13, 34),
  }
);

var markerImage_green = new kakao.maps.MarkerImage(
  "https://cdn.pixabay.com/photo/2013/07/13/11/57/landmark-159035_1280.png",
  new kakao.maps.Size(14, 20),
  {
    offset: new kakao.maps.Point(13, 34),
  }
);

var redMarkers = []; // 경사로 구역 저장 배열

var redClusterer = new kakao.maps.MarkerClusterer({
  map: map,
  markers: redMarkers,
  gridSize: 100,
  averageCenter: true,
  calculator: [10, 50],
  styles: [
    {
      // calculator 각 사이 값 마다 적용될 스타일을 지정한다
      width: "30px",
      height: "30px",
      background: "rgba(245, 139, 0, .8)",
      borderRadius: "15px",
      color: "#000",
      textAlign: "center",
      fontWeight: "bold",
      lineHeight: "31px",
    },
    {
      width: "35px",
      height: "35px",
      background: "rgba(245, 80, 13, .8)",
      borderRadius: "20px",
      color: "#000",
      textAlign: "center",
      fontWeight: "bold",
      lineHeight: "41px",
    },
    {
      width: "40px",
      height: "40px",
      background: "rgba(255, 0, 0, .8)",
      borderRadius: "25px",
      color: "#000",
      textAlign: "center",
      fontWeight: "bold",
      lineHeight: "51px",
    },
  ],
});

var elderyMarkers = []; // 경사로 구역 저장 배열

var elderyClusterer = new kakao.maps.MarkerClusterer({
  map: map,
  markers: elderyMarkers,
  gridSize: 100,
  averageCenter: true,
  calculator: [10, 50],
  styles: [
    {
      // calculator 각 사이 값 마다 적용될 스타일을 지정한다
      width: "30px",
      height: "30px",
      background: "rgba(135, 245, 0, .8)",
      borderRadius: "15px",
      color: "#000",
      textAlign: "center",
      fontWeight: "bold",
      lineHeight: "31px",
    },
    {
      width: "35px",
      height: "35px",
      background: "rgba(0, 200, 0, .8)",
      borderRadius: "20px",
      color: "#000",
      textAlign: "center",
      fontWeight: "bold",
      lineHeight: "41px",
    },
    {
      width: "40px",
      height: "40px",
      background: "rgba(0, 110, 0, .8)",
      borderRadius: "25px",
      color: "#000",
      textAlign: "center",
      fontWeight: "bold",
      lineHeight: "51px",
    },
  ],
});

var disableMarkers = [];

var disableClusterer = new kakao.maps.MarkerClusterer({
  map: map,
  markers: disableMarkers,
  gridSize: 100,
  averageCenter: true,
  calculator: [10, 50],
  styles: [
    {
      // calculator 각 사이 값 마다 적용될 스타일을 지정한다
      width: "30px",
      height: "30px",
      background: "rgba(135, 245, 0, .8)",
      borderRadius: "15px",
      color: "#000",
      textAlign: "center",
      fontWeight: "bold",
      lineHeight: "31px",
    },
    {
      width: "35px",
      height: "35px",
      background: "rgba(0, 200, 0, .8)",
      borderRadius: "20px",
      color: "#000",
      textAlign: "center",
      fontWeight: "bold",
      lineHeight: "41px",
    },
    {
      width: "40px",
      height: "40px",
      background: "rgba(0, 110, 0, .8)",
      borderRadius: "25px",
      color: "#000",
      textAlign: "center",
      fontWeight: "bold",
      lineHeight: "51px",
    },
  ],
});

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

function GangseoSlope() {
  const url =
    "https://api.odcloud.kr/api/15026033/v1/uddi:967e859a-5cf2-4e3c-b586-e2b046faff58_201909041538?page=1&perPage=300&returnType=JSON&serviceKey=muAzQmFBf9gOEiqBbNkzMbOmlHV9zPkNCrLf6FsdrOzZsUnb%2BPm84EInw0N1bZmrpTEGEdkXbmRRBi0cRq%2BhRA%3D%3D";

  fetch(url)
    .then((res) => res.json())
    .then((resJson) => {
      //var redMarkers = [];
      for (var i = 0; i < resJson.data.length; i++) {
        const contents = resJson.data;
        var address = contents[i]["위 치"];

        //console.log(address);
        var geocoder = new kakao.maps.services.Geocoder();
        // 주소로 좌표를 검색합니다
        (function (i) {
          var name = contents[i]["유 형"];
          geocoder.addressSearch(address, function (result, status) {
            // 정상적으로 검색이 완료됐으면
            if (status === kakao.maps.services.Status.OK) {
              var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
              // 결과값으로 받은 위치를 마커로 표시합니다
              var marker = new kakao.maps.Marker({
                map: map,
                position: coords,
                image: markerImage_red, // 빨간색 마커로 표시
              });
              redMarkers.push(marker);

              var infoWindow = new kakao.maps.InfoWindow({
                content:
                  '<div style="width:150px;text-align:center;padding:6px 0;">' +
                  name +
                  "</div>",
              });

              kakao.maps.event.addListener(
                marker,
                "mouseover",
                mouseOverListener(map, marker, infoWindow)
              );
              kakao.maps.event.addListener(
                marker,
                "mouseout",
                mouseOutListener(infoWindow)
              );
            }
          });
        })(i);
      }
    });
}

function GeumjeongSlope() {
  const url =
    "https://api.odcloud.kr/api/15025815/v1/uddi:834dc014-3823-46e6-858b-d5d67bd21c94?page=1&perPage=300&returnType=JSON&serviceKey=muAzQmFBf9gOEiqBbNkzMbOmlHV9zPkNCrLf6FsdrOzZsUnb%2BPm84EInw0N1bZmrpTEGEdkXbmRRBi0cRq%2BhRA%3D%3D";

  fetch(url)
    .then((res) => res.json())
    .then((resJson) => {
      //var redMarkers = [];
      for (var i = 0; i < resJson.data.length; i++) {
        const contents = resJson.data;
        var address = "부산시 " + contents[i].주소;

        //console.log(address);
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
                image: markerImage_red, // 빨간색 마커로 표시
              });
              redMarkers.push(marker);

              var infoWindow = new kakao.maps.InfoWindow({
                content:
                  '<div style="width:150px;text-align:center;padding:6px 0;">' +
                  name +
                  "</div>",
              });

              kakao.maps.event.addListener(
                marker,
                "mouseover",
                mouseOverListener(map, marker, infoWindow)
              );
              kakao.maps.event.addListener(
                marker,
                "mouseout",
                mouseOutListener(infoWindow)
              );
            }
          });
        })(i);
      }
    });
}

function SasangSlope() {
  const url =
    "https://api.odcloud.kr/api/15025594/v1/uddi:be2166c3-2bc0-49bc-b743-ef3a474f7f1f_201909031203?page=1&perPage=300&returnType=JSON&serviceKey=muAzQmFBf9gOEiqBbNkzMbOmlHV9zPkNCrLf6FsdrOzZsUnb%2BPm84EInw0N1bZmrpTEGEdkXbmRRBi0cRq%2BhRA%3D%3D";

  fetch(url)
    .then((res) => res.json())
    .then((resJson) => {
      //var redMarkers = [];
      for (var i = 0; i < resJson.data.length; i++) {
        const contents = resJson.data;
        var address = contents[i].소재지;

        //console.log(address);
        var geocoder = new kakao.maps.services.Geocoder();
        // 주소로 좌표를 검색합니다
        (function (i) {
          var name = contents[i].경사;
          var name1 = contents[i]["길이(m)"];
          geocoder.addressSearch(address, function (result, status) {
            // 정상적으로 검색이 완료됐으면
            if (status === kakao.maps.services.Status.OK) {
              var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
              // 결과값으로 받은 위치를 마커로 표시합니다
              var marker = new kakao.maps.Marker({
                map: map,
                position: coords,
                image: markerImage_red, // 빨간색 마커로 표시
              });
              redMarkers.push(marker);

              var infoWindow = new kakao.maps.InfoWindow({
                content:
                  '<div style="width:150px;text-align:center;padding:6px 0;">' +
                  "경사 : " +
                  name +
                  ", 길이 : " +
                  name1 +
                  "</div>",
              });

              kakao.maps.event.addListener(
                marker,
                "mouseover",
                mouseOverListener(map, marker, infoWindow)
              );
              kakao.maps.event.addListener(
                marker,
                "mouseout",
                mouseOutListener(infoWindow)
              );
            }
          });
        })(i);
      }
    });
}

function YeonjeSlope() {
  const url =
    "https://api.odcloud.kr/api/15037401/v1/uddi:7c5ddb34-4df1-4bc1-a124-c9fc7b547a2e?page=1&perPage=300&returnType=JSON&serviceKey=muAzQmFBf9gOEiqBbNkzMbOmlHV9zPkNCrLf6FsdrOzZsUnb%2BPm84EInw0N1bZmrpTEGEdkXbmRRBi0cRq%2BhRA%3D%3D";

  fetch(url)
    .then((res) => res.json())
    .then((resJson) => {
      //var redMarkers = [];
      for (var i = 0; i < resJson.data.length; i++) {
        const contents = resJson.data;
        var address = "연산동 " + contents[i].지번;

        //console.log(address);
        var geocoder = new kakao.maps.services.Geocoder();
        // 주소로 좌표를 검색합니다
        (function (i) {
          var name = contents[i].지구명;
          geocoder.addressSearch(address, function (result, status) {
            // 정상적으로 검색이 완료됐으면
            if (status === kakao.maps.services.Status.OK) {
              var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
              // 결과값으로 받은 위치를 마커로 표시합니다
              var marker = new kakao.maps.Marker({
                map: map,
                position: coords,
                image: markerImage_red, // 빨간색 마커로 표시
              });
              redMarkers.push(marker);

              var infoWindow = new kakao.maps.InfoWindow({
                content:
                  '<div style="width:150px;text-align:center;padding:6px 0;">' +
                  name +
                  "</div>",
              });

              kakao.maps.event.addListener(
                marker,
                "mouseover",
                mouseOverListener(map, marker, infoWindow)
              );
              kakao.maps.event.addListener(
                marker,
                "mouseout",
                mouseOutListener(infoWindow)
              );
            }
          });
        })(i);
      }
    });
}

function YeongdoSlope() {
  const url =
    "https://api.odcloud.kr/api/3070044/v1/uddi:1da04db6-8d95-480b-902c-f9316c705379_201906211646?page=1&perPage=300&returnType=JSON&serviceKey=muAzQmFBf9gOEiqBbNkzMbOmlHV9zPkNCrLf6FsdrOzZsUnb%2BPm84EInw0N1bZmrpTEGEdkXbmRRBi0cRq%2BhRA%3D%3D";

  fetch(url)
    .then((res) => res.json())
    .then((resJson) => {
      //var redMarkers = [];
      for (var i = 0; i < resJson.data.length; i++) {
        const contents = resJson.data;
        var address = contents[i].위치;

        //console.log(address);
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
                image: markerImage_red, // 빨간색 마커로 표시
              });
              redMarkers.push(marker);

              var infoWindow = new kakao.maps.InfoWindow({
                content:
                  '<div style="width:150px;text-align:center;padding:6px 0;">' +
                  name +
                  "</div>",
              });

              kakao.maps.event.addListener(
                marker,
                "mouseover",
                mouseOverListener(map, marker, infoWindow)
              );
              kakao.maps.event.addListener(
                marker,
                "mouseout",
                mouseOutListener(infoWindow)
              );
            }
          });
        })(i);
      }
    });
}

function construction() {
  var url =
    "http://apis.data.go.kr/6260000/BusanCnstrWorkInfoService/getCnstrWorkInfo";
  var params = {
    serviceKey:
      "muAzQmFBf9gOEiqBbNkzMbOmlHV9zPkNCrLf6FsdrOzZsUnb+Pm84EInw0N1bZmrpTEGEdkXbmRRBi0cRq+hRA==",
    pageNo: "1",
    numOfRows: "10",
    resultType: "json",
  };

  var cnstrcNms = [
    "학교 분류식하수관로 연결공사(서부지원청 일원)",
    "학교 분류식하수관로 연결사업(북부, 동래지원청 일원)",
    "학교 분류식하수관로 연결사업(남부, 해운대지원청 일원)",
    "하수관로 신설공사[남부처리구역(광안, 남천동 일원)]",
    "하수관로 신설(확충)공사 (대저처리분구 일원)",
    "만덕~센텀 도시고속화도로 건설",
    "하수관로 신설(확장)공사[수영처리구역(양정동 제척지 일원)]",
    "하수관로 신설(확충)공사 (북구제척지 일원)",
    "하수관로 신설(확충)공사 (사상구제척지 일원)",
    "정관산업단지 연결도로 [예림교차로~농공단지] 확장",
    "하수관로 신설(확충)공사 (신평동 일원)",
    "분뇨처리시설 현대화사업",
    "노후하수관로정비사업3-1단계(신시가처리분구 일원)",
    "사상역 광역환승센터 건설공사",
    "동김해IC~식만JCT간 광역도로 건설",
    "부산복합혁신센터 건립공사",
    "수영처리구역(수영강) 오수관로 정비사업",
    "수영처리구역(온천천) 오수관로 정비사업 4차",
    "동부산하수처리구역 오수관로 설치공사",
    "양정동 일원 하수관로 신설(확충)",
  ];

  var tooltips = []; // 툴팁을 담을 배열

  for (var i = 0; i < cnstrcNms.length; i++) {
    params.cnstrcNm = cnstrcNms[i];

    fetch(url + "?" + new URLSearchParams(params))
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var items = data.getCnstrWorkInfo.body.items.item;

        for (var j = 0; j < items.length; j++) {
          var item = items[j];
          var markerX = parseFloat(item.markerX);
          var markerY = parseFloat(item.markerY);
          var cnstrcNm = item.cnstrcNm;
          var enddate = item.endde;

          if (!isNaN(markerX) && !isNaN(markerY)) {
            var marker = new kakao.maps.Marker({
              position: new kakao.maps.LatLng(markerX, markerY),
              map: map,
              image: markerImage_red, // 빨간색 마커로 표시
            });
            redMarkers.push(marker);

            var tooltipContent =
              "<div class='tooltip-content'>" +
              "<strong>공사명: </strong>" +
              cnstrcNm +
              "<br><strong>끝나는 날: </strong>" +
              enddate +
              "</div>"; // 툴팁에 표시될 내용
            var tooltip = new kakao.maps.InfoWindow({
              content: tooltipContent,
              removable: true,
            });

            tooltips.push(tooltip); // 툴팁을 배열에 추가

            kakao.maps.event.addListener(marker, "mouseover", function () {
              tooltip.open(map, this);
            });
            kakao.maps.event.addListener(marker, "mouseout", function () {
              tooltip.close();
            });
          }
        }
      });
  }
}

function elderlyCare() {
  const url =
    "https://api.odcloud.kr/api/15065819/v1/uddi:0d24a5ef-65e3-4fdd-8c7b-c2d008a217e6?page=1&perPage=300&returnType=JSON&serviceKey=muAzQmFBf9gOEiqBbNkzMbOmlHV9zPkNCrLf6FsdrOzZsUnb%2BPm84EInw0N1bZmrpTEGEdkXbmRRBi0cRq%2BhRA%3D%3D";

  fetch(url)
    .then((res) => res.json())
    .then((resJson) => {
      //var greenMarkers = [];
      // 노인돌봄 센터 좌표 리스트
      var centers = resJson.data;
      // 초록색 마커로 표시
      var markerImage_green = new kakao.maps.MarkerImage(
        "https://cdn.pixabay.com/photo/2013/07/13/11/57/landmark-159035_1280.png",
        new kakao.maps.Size(14, 20),
        {
          offset: new kakao.maps.Point(13, 34),
        }
      );
      for (var i = 0; i < centers.length; i++) {
        var lat = centers[i]["위도"];
        var lng = centers[i]["경도"];
        var marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(lat, lng),
          map: map,
          image: markerImage_green, // 초록색 마커로 표시
        });

        var infoWindow = new kakao.maps.InfoWindow({
          content: centers[i]["기관명"],
        });

        // 마커 추가
        elderyMarkers.push(marker);
        // 마커 이벤트리스너 등록
        kakao.maps.event.addListener(
          marker,
          "mouseover",
          mouseOverListener(map, marker, infoWindow)
        );
        kakao.maps.event.addListener(
          marker,
          "mouseout",
          mouseOutListener(infoWindow)
        );
      }
    });
}

function disabledComfort() {
  const url =
    "https://apis.data.go.kr/6260000/BusanFcltsDsgstInfoService/getFcltsDsgstInfo?serviceKey=UE%2BeS7fd%2BJ6hfdwYzoLAyI01f%2BSlk8KcJxBe1jW5ozgmWIkaURAsJ3uu0N4esvtfjuCmYeZAMwv5vgT0NWyNqA%3D%3D&numOfRows=150&pageNo=1&resultType=json";

  fetch(url)
    .then((res) => res.json())
    .then((resJson) => {
      //var elderyMarkers = [];

      for (var i = 0; i < 150; i++) {
        const contents = resJson.getFcltsDsgstInfo.body.items.item[i].contents;
        const startIndex = contents.indexOf("2.");
        const endIndex = contents.indexOf("<", startIndex);
        let address = contents.substring(startIndex, endIndex).trim();
        address = address.replace(/2\.\s*주\s*소 : ?/i, "").trim();

        const store_name = resJson.getFcltsDsgstInfo.body.items.item[i].subject;

        var geocoder = new kakao.maps.services.Geocoder();

        geocoder.addressSearch(address, function (result, status) {
          if (status === kakao.maps.services.Status.OK) {
            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

            var marker = new kakao.maps.Marker({
              map: map,
              position: coords,
              image: markerImage_green, // 초록색 마커로 표시
            });
            //console.log(marker);

            disableMarkers.push(marker);

            var infowindow = new kakao.maps.InfoWindow({
              content:
                '<div style="width:150px;text-align:center;padding:6px 0;">' +
                store_name +
                "</div>",
            });

            // Add 'mouseover' event listener to the marker
            kakao.maps.event.addListener(marker, "mouseover", function () {
              infowindow.open(map, marker);
            });

            // Add 'mouseout' event listener to the marker
            kakao.maps.event.addListener(marker, "mouseout", function () {
              infowindow.close();
            });
          }
        });
      }
    });
}

function getAllUserMarker() {
  fetch("/api/getAllUserMarker")
    .then((res) => res.json())
    .then((resJson) => {
      const data = resJson;
      console.log(data);
      for (var i = 0; i < data.length; i++) {
        (function (index) {
          var coords = new kakao.maps.LatLng(data[index].lat, data[index].lng);
          var marker;
          if (data[index].danger == "true") {
            marker = new kakao.maps.Marker({
              map: map,
              position: coords,
              image: markerImage_red, // 빨간색 마커로 표시
            });
            redMarkers.push(marker);
          } else {
            marker = new kakao.maps.Marker({
              map: map,
              position: coords,
              image: markerImage_green, // 초록색 마커로 표시
            });
            elderyMarkers.push(marker);
          }
          var infowindow = new kakao.maps.InfoWindow({
            content:
              '<div style="width:150px;text-align:center;padding:6px 0;">' +
              data[index].placename +
              "</div>",
          });

          // Add 'mouseover' event listener to the marker
          kakao.maps.event.addListener(marker, "mouseover", function () {
            infowindow.open(map, marker);
          });

          // Add 'mouseout' event listener to the marker
          kakao.maps.event.addListener(marker, "mouseout", function () {
            infowindow.close();
          });
        })(i);
      }
    });
}

GangseoSlope();
GeumjeongSlope();
SasangSlope();
YeonjeSlope();
YeongdoSlope();
construction();
elderlyCare();
disabledComfort();
getAllUserMarker();

// 배열에 추가된 마커들을 지도에 표시하거나 삭제하는 함수입니다
function setRedMarkers(map) {
  for (var i = 0; i < redMarkers.length; i++) {
    redMarkers[i].setMap(map);
  }
  redClusterer.setMap(map);
  redClusterer.redraw();
}

// "마커 보이기" 버튼을 클릭하면 호출되어 배열에 추가된 마커를 지도에 표시하는 함수입니다
function showRedMarkers() {
  setRedMarkers(map);
}

// "마커 감추기" 버튼을 클릭하면 호출되어 배열에 추가된 마커를 지도에서 삭제하는 함수입니다
function hideRedMarkers() {
  setRedMarkers(null);
}

var redMarkerShowHide = 0;
function redMarkerClick() {
  if (redMarkerShowHide == 0) {
    hideRedMarkers();
    redMarkerShowHide = 1;
  } else if (redMarkerShowHide == 1) {
    showRedMarkers();
    redMarkerShowHide = 0;
  }
}

// 배열에 추가된 마커들을 지도에 표시하거나 삭제하는 함수입니다
function setElderyMarkers(map) {
  for (var i = 0; i < elderyMarkers.length; i++) {
    elderyMarkers[i].setMap(map);
  }
  elderyClusterer.setMap(map);
  elderyClusterer.redraw();
}

// "마커 보이기" 버튼을 클릭하면 호출되어 배열에 추가된 마커를 지도에 표시하는 함수입니다
function showElderyMarkers() {
  setElderyMarkers(map);
}

// "마커 감추기" 버튼을 클릭하면 호출되어 배열에 추가된 마커를 지도에서 삭제하는 함수입니다
function hideElderyMarkers() {
  setElderyMarkers(null);
}

var elderyShowHide = 0;
function elderyMarkerClick() {
  if (elderyShowHide == 0) {
    hideElderyMarkers();
    elderyShowHide = 1;
  } else if (elderyShowHide == 1) {
    showElderyMarkers();
    elderyShowHide = 0;
  }
}

// 배열에 추가된 마커들을 지도에 표시하거나 삭제하는 함수입니다
function setDisableMarkers(map) {
  for (var i = 0; i < disableMarkers.length; i++) {
    disableMarkers[i].setMap(map);
  }
  disableClusterer.setMap(map);
  disableClusterer.redraw();
}

// "마커 보이기" 버튼을 클릭하면 호출되어 배열에 추가된 마커를 지도에 표시하는 함수입니다
function showDisableMarkers() {
  setDisableMarkers(map);
}

// "마커 감추기" 버튼을 클릭하면 호출되어 배열에 추가된 마커를 지도에서 삭제하는 함수입니다
function hideDisableMarkers() {
  setDisableMarkers(null);
}

var disableShowHide = 0;
function disableMarkerClick() {
  if (disableShowHide == 0) {
    hideDisableMarkers();
    disableShowHide = 1;
  } else if (disableShowHide == 1) {
    showDisableMarkers();
    disableShowHide = 0;
  }
}
