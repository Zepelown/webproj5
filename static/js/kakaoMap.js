// 마커를 담을 배열입니다
var markers = [];

class scarp {
  name;
  lat;
  log;
  constructor(name, lat, log) {
    this.name = name;
    this.lat = lat;
    this.log = log;
  }
}

const scarps = [];

const temp = [];
// const temp = new scarp("test", 1, 2);
// scarps.push(temp);
var mapContainer = document.getElementById("map"), // 지도를 표시할 div
  mapOption = {
    center: new kakao.maps.LatLng(35.136121, 129.101008),
    level: 4, // 지도의 확대 레벨
  };

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

// 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

var markerImage_red = new kakao.maps.MarkerImage(
  "https://cdn.pixabay.com/photo/2014/04/02/10/45/location-304467_960_720.png",
  new kakao.maps.Size(24, 34),
  {
    offset: new kakao.maps.Point(13, 34),
  }
);

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

var clusterer = new kakao.maps.MarkerClusterer({
  map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
  averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
  minLevel: 10, // 클러스터 할 최소 지도 레벨
});

// getApiScarpGanseoData();
// getApiScarpGeumjeongData();
// getApiScarpSaSangData();
// getApiScarpYunjaeData();
// getApiScarpYungDoeData();

// 배열에 추가된 마커들을 지도에 표시하거나 삭제하는 함수입니다
function setMarkers(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// "마커 보이기" 버튼을 클릭하면 호출되어 배열에 추가된 마커를 지도에 표시하는 함수입니다
function showMarkers() {
  setMarkers(map);
}

// "마커 감추기" 버튼을 클릭하면 호출되어 배열에 추가된 마커를 지도에서 삭제하는 함수입니다
function hideMarkers() {
  setMarkers(null);
}

function getApiScarpGanseoData() {
  const url =
    "https://api.odcloud.kr/api/15026033/v1/uddi:967e859a-5cf2-4e3c-b586-e2b046faff58_201909041538?page=1&perPage=300&returnType=JSON&serviceKey=muAzQmFBf9gOEiqBbNkzMbOmlHV9zPkNCrLf6FsdrOzZsUnb%2BPm84EInw0N1bZmrpTEGEdkXbmRRBi0cRq%2BhRA%3D%3D";
  fetch(url)
    .then((res) => res.json())
    .then((resJson) => {
      // var markers = [];
      for (var i = 0; i < resJson.data.length; i++) {
        const contents = resJson.data;
        var address = contents[i]["위 치"];
        var geocoder = new kakao.maps.services.Geocoder();
        // 주소로 좌표를 검색합니다
        (function (i) {
          //   var name = contents[i]["유 형"];
          geocoder.addressSearch(address, function (result, status) {
            // 정상적으로 검색이 완료됐으면
            if (status === kakao.maps.services.Status.OK) {
              var temp = new scarp(name, result[0].y, result[0].x);
              scarps.push(temp);
            }
          });
        })(i);
      }
    });
}
function getApiScarpGeumjeongData() {
  const url =
    "https://api.odcloud.kr/api/15025815/v1/uddi:834dc014-3823-46e6-858b-d5d67bd21c94?page=1&perPage=300&returnType=JSON&serviceKey=muAzQmFBf9gOEiqBbNkzMbOmlHV9zPkNCrLf6FsdrOzZsUnb%2BPm84EInw0N1bZmrpTEGEdkXbmRRBi0cRq%2BhRA%3D%3D";

  fetch(url)
    .then((res) => res.json())
    .then((resJson) => {
      //   var markers = [];
      for (var i = 0; i < resJson.data.length; i++) {
        const contents = resJson.data;
        var address = "부산시 " + contents[i].주소;
        var geocoder = new kakao.maps.services.Geocoder();
        // 주소로 좌표를 검색합니다
        (function (i) {
          var name = contents[i].급경사지명;
          geocoder.addressSearch(address, function (result, status) {
            // 정상적으로 검색이 완료됐으면
            if (status === kakao.maps.services.Status.OK) {
              var temp = new scarp(name, result[0].y, result[0].x);
              scarps.push(temp);
            }
          });
        })(i);
      }
    });
}

function getApiScarpSaSangData() {
  const url =
    "https://api.odcloud.kr/api/15025594/v1/uddi:be2166c3-2bc0-49bc-b743-ef3a474f7f1f_201909031203?page=1&perPage=300&returnType=JSON&serviceKey=muAzQmFBf9gOEiqBbNkzMbOmlHV9zPkNCrLf6FsdrOzZsUnb%2BPm84EInw0N1bZmrpTEGEdkXbmRRBi0cRq%2BhRA%3D%3D";
  fetch(url)
    .then((res) => res.json())
    .then((resJson) => {
      //   var markers = [];
      for (var i = 0; i < resJson.data.length; i++) {
        const contents = resJson.data;
        var address = contents[i].소재지;
        var geocoder = new kakao.maps.services.Geocoder();
        // 주소로 좌표를 검색합니다
        (function (i) {
          var name = contents[i].경사;
          var name1 = contents[i]["길이(m)"];
          geocoder.addressSearch(address, function (result, status) {
            // 정상적으로 검색이 완료됐으면
            if (status === kakao.maps.services.Status.OK) {
              var temp = new scarp(name, result[0].y, result[0].x);
              scarps.push(temp);
            }
          });
        })(i);
      }
    });
}

function getApiScarpYunjaeData() {
  const url =
    "https://api.odcloud.kr/api/15037401/v1/uddi:7c5ddb34-4df1-4bc1-a124-c9fc7b547a2e?page=1&perPage=300&returnType=JSON&serviceKey=muAzQmFBf9gOEiqBbNkzMbOmlHV9zPkNCrLf6FsdrOzZsUnb%2BPm84EInw0N1bZmrpTEGEdkXbmRRBi0cRq%2BhRA%3D%3D";

  fetch(url)
    .then((res) => res.json())
    .then((resJson) => {
      //   var markers = [];
      for (var i = 0; i < resJson.data.length; i++) {
        const contents = resJson.data;
        var address = "연산동 " + contents[i].지번;
        var geocoder = new kakao.maps.services.Geocoder();
        (function (i) {
          var name = contents[i].지구명;
          geocoder.addressSearch(address, function (result, status) {
            if (status === kakao.maps.services.Status.OK) {
              var temp = new scarp(name, result[0].y, result[0].x);
              scarps.push(temp);
            }
          });
        })(i);
      }
    });
}

function getApiScarpYungDoeData() {
  const url =
    "https://api.odcloud.kr/api/3070044/v1/uddi:1da04db6-8d95-480b-902c-f9316c705379_201906211646?page=1&perPage=300&returnType=JSON&serviceKey=muAzQmFBf9gOEiqBbNkzMbOmlHV9zPkNCrLf6FsdrOzZsUnb%2BPm84EInw0N1bZmrpTEGEdkXbmRRBi0cRq%2BhRA%3D%3D";

  fetch(url)
    .then((res) => res.json())
    .then((resJson) => {
      //   var markers = [];
      for (var i = 0; i < resJson.data.length; i++) {
        const contents = resJson.data;
        var address = contents[i].위치;

        // console.log(address);
        var geocoder = new kakao.maps.services.Geocoder();
        // 주소로 좌표를 검색합니다
        (function (i) {
          var name = contents[i].급경사지명;
          geocoder.addressSearch(address, function (result, status) {
            // 정상적으로 검색이 완료됐으면
            if (status === kakao.maps.services.Status.OK) {
              //   var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
              var temp = new scarp(name, result[0].y, result[0].x);
              scarps.push(temp);
            }
          });
        })(i);
      }
    });
  return true;
}

function makeMarker(name, lat, log) {
  var coords = new kakao.maps.LatLng(lat, log);
  var marker = new kakao.maps.Marker({
    map: map,
    position: coords,
    image: markerImage_red, // 빨간색 마커로 표시
  });
  markers.push(marker);

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

const loadData = function () {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      //   getApiScarpGanseoData();
      //   getApiScarpGeumjeongData();
      getApiScarpYungDoeData();
      getApiScarpYunjaeData();
      getApiScarpGanseoData();
      getApiScarpSaSangData();
      getApiScarpGeumjeongData();
      resolve();
    }, 3000);
  });
};

const delay = () => {
  const randomDelay = Math.floor(Math.random() * 4) * 100;
  return new Promise((resolve) => setTimeout(resolve, randomDelay));
};

const loadMarkers = function () {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      for (let i = 0; i < scarps.length; i++) {
        makeMarker(scarps[i].name, scarps[i].lat, scarps[i].log);
      }
      resolve();
      //reject('func2 fail');
    }, 3000);
  });
};

async function startMap() {
  loadData().then(loadMarkers);
}
startMap();
