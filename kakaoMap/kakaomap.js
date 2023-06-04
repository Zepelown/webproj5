  // 키워드로 장소를 검색합니다//   searchPlaces();

  // 키워드 검색을 요청하는 함수입니다
//   function searchPlaces() {

//       var keyword = document.getElementById('keyword').value;

//       if (!keyword.replace(/^\s+|\s+$/g, '')) {
//           alert('키워드를 입력해주세요!');
//           return false;
//       }

//       // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
//       ps.keywordSearch(keyword, placesSearchCB);
//   }

  // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
//   function placesSearchCB(data, status, pagination) {
//       if (status === kakao.maps.services.Status.OK) {

//           // 정상적으로 검색이 완료됐으면
//           // 검색 목록과 마커를 표출합니다
//           displayPlaces(data);

//           // 페이지 번호를 표출합니다
//           displayPagination(pagination);

//       } else if (status === kakao.maps.services.Status.ZERO_RESULT) {

//           alert('검색 결과가 존재하지 않습니다.');
//           return;

//       } else if (status === kakao.maps.services.Status.ERROR) {

//           alert('검색 결과 중 오류가 발생했습니다.');
//           return;

//       }
//   }

  // 검색 결과 목록과 마커를 표출하는 함수입니다
//   function displayPlaces(places) {

//       var listEl = document.getElementById('placesList'),
//           menuEl = document.getElementById('menu_wrap'),
//           fragment = document.createDocumentFragment(),
//           bounds = new kakao.maps.LatLngBounds(),
//           listStr = '';

//       // 검색 결과 목록에 추가된 항목들을 제거합니다
//       removeAllChildNods(listEl);

//       // 지도에 표시되고 있는 마커를 제거합니다
//       removeMarker();

//       for (var i = 0; i < places.length; i++) {

//           // 마커를 생성하고 지도에 표시합니다
//           var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
//               marker = addMarker(placePosition, i),
//               itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

//           // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
//           // LatLngBounds 객체에 좌표를 추가합니다
//           bounds.extend(placePosition);

//           // 마커와 검색결과 항목에 mouseover 했을때
//           // 해당 장소에 인포윈도우에 장소명을 표시합니다
//           // mouseout 했을 때는 인포윈도우를 닫습니다
//           (function (marker, title) {
//               kakao.maps.event.addListener(marker, 'mouseover', function () {
//                   displayInfowindow(marker, title);
//               });

//               kakao.maps.event.addListener(marker, 'mouseout', function () {
//                   infowindow.close();
//               });

//               itemEl.onmouseover = function () {
//                   displayInfowindow(marker, title);
//               };

//               itemEl.onmouseout = function () {
//                   infowindow.close();
//               };
//           })(marker, places[i].place_name);

//           fragment.appendChild(itemEl);
//       }

//       // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
//       listEl.appendChild(fragment);
//       menuEl.scrollTop = 0;

//       // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
//       map.setBounds(bounds);
//   }

  // 검색결과 항목을 Element로 반환하는 함수입니다
//   function getListItem(index, places) {

//       var el = document.createElement('li'),
//           itemStr = '<span class="markerbg marker_' + (index + 1) + '"></span>' +
//               '<div class="info">' +
//               '   <h5>' + places.place_name + '</h5>';

//       if (places.road_address_name) {
//           itemStr += '    <span>' + places.road_address_name + '</span>' +
//               '   <span class="jibun gray">' + places.address_name + '</span>';
//       } else {
//           itemStr += '    <span>' + places.address_name + '</span>';
//       }

//       itemStr += '  <span class="tel">' + places.phone + '</span>' +
//           '</div>';

//       el.innerHTML = itemStr;
//       el.className = 'item';

//       return el;
//   }

//   // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
//   function addMarker(position, idx, title) {
//       var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
//           imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
//           imgOptions = {
//               spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
//               spriteOrigin: new kakao.maps.Point(0, (idx * 46) + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
//               offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
//           },
//           markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
//           marker = new kakao.maps.Marker({
//               position: position, // 마커의 위치
//               image: markerImage
//           });

//       marker.setMap(map); // 지도 위에 마커를 표출합니다
//       markers.push(marker);  // 배열에 생성된 마커를 추가합니다

//       return marker;
//   }

//   // 지도 위에 표시되고 있는 마커를 모두 제거합니다
//   function removeMarker() {
//       for (var i = 0; i < markers.length; i++) {
//           markers[i].setMap(null);
//       }
//       markers = [];
//   }

//   // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
//   function displayPagination(pagination) {
//       var paginationEl = document.getElementById('pagination'),
//           fragment = document.createDocumentFragment(),
//           i;

//       // 기존에 추가된 페이지번호를 삭제합니다
//       while (paginationEl.hasChildNodes()) {
//           paginationEl.removeChild(paginationEl.lastChild);
//       }

//       for (i = 1; i <= pagination.last; i++) {
//           var el = document.createElement('a');
//           el.href = "#";
//           el.innerHTML = i;

//           if (i === pagination.current) {
//               el.className = 'on';
//           } else {
//               el.onclick = (function (i) {
//                   return function () {
//                       pagination.gotoPage(i);
//                   }
//               })(i);
//           }

//           fragment.appendChild(el);
//       }
//       paginationEl.appendChild(fragment);
//   }

//   // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
//   // 인포윈도우에 장소명을 표시합니다
//   function displayInfowindow(marker, title) {
//       var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

//       infowindow.setContent(content);
//       infowindow.open(map, marker);
//   }

//   // 검색결과 목록의 자식 Element를 제거하는 함수입니다
//   function removeAllChildNods(el) {
//       while (el.hasChildNodes()) {
//           el.removeChild(el.lastChild);
//       }
//   }

// 마커를 담을 배열입니다
var markers = [];

class scarp {
  constructor(name, lat, log) {
    this.name = name;
    this.lat = lat;
    this.log = log;
  }
}

let scarps = [];
// const temp = new scarp("test", 1, 2);
// scarps.push(temp);

var mapContainer = document.getElementById("map"), // 지도를 표시할 div
  mapOption = {
    center: new kakao.maps.LatLng(35.13417, 129.11397), // 지도의 중심좌표
    level: 9, // 지도의 확대 레벨
  };

// 지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption);

// 장소 검색 객체를 생성합니다
var ps = new kakao.maps.services.Places();

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

        console.log(address);
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

            var clusterer = new kakao.maps.MarkerClusterer({
              map: map,
              markers: markers,
              gridSize: 50,
              averageCenter: true,
              minLevel: 4,
            });
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

            var clusterer = new kakao.maps.MarkerClusterer({
              map: map,
              markers: markers,
              gridSize: 50,
              averageCenter: true,
              minLevel: 4,
            });
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

        console.log(address);
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
              markers.push(marker);

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

            var clusterer = new kakao.maps.MarkerClusterer({
              map: map,
              markers: markers,
              gridSize: 50,
              averageCenter: true,
              minLevel: 4,
            });
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
                image: markerImage_red,
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

            var clusterer = new kakao.maps.MarkerClusterer({
              map: map,
              markers: markers,
              gridSize: 50,
              averageCenter: true,
              minLevel: 4,
            });
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

              //   // 결과값으로 받은 위치를 마커로 표시합니다
              //   var marker = new kakao.maps.Marker({
              //     map: map,
              //     position: coords,
              //     image: markerImage_red, // 빨간색 마커로 표시
              //   });
              //   markers.push(marker);

              //   var infoWindow = new kakao.maps.InfoWindow({
              //     content:
              //       '<div style="width:150px;text-align:center;padding:6px 0;">' +
              //       name +
              //       "</div>",
              //   });

              //   kakao.maps.event.addListener(
              //     marker,
              //     "mouseover",
              //     mouseOverListener(map, marker, infoWindow)
              //   );
              //   kakao.maps.event.addListener(
              //     marker,
              //     "mouseout",
              //     mouseOutListener(infoWindow)
              //   );
            }

            // var clusterer = new kakao.maps.MarkerClusterer({
            //   map: map,
            //   markers: markers,
            //   gridSize: 50,
            //   averageCenter: true,
            //   minLevel: 4,
            // });
          });
        })(i);
      }
    });
  return true;
}

async function test() {
  const url =
    "https://api.odcloud.kr/api/3070044/v1/uddi:1da04db6-8d95-480b-902c-f9316c705379_201906211646?page=1&perPage=300&returnType=JSON&serviceKey=muAzQmFBf9gOEiqBbNkzMbOmlHV9zPkNCrLf6FsdrOzZsUnb%2BPm84EInw0N1bZmrpTEGEdkXbmRRBi0cRq%2BhRA%3D%3D";

  const promiseFunc = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
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

                    //   // 결과값으로 받은 위치를 마커로 표시합니다
                    //   var marker = new kakao.maps.Marker({
                    //     map: map,
                    //     position: coords,
                    //     image: markerImage_red, // 빨간색 마커로 표시
                    //   });
                    //   markers.push(marker);

                    //   var infoWindow = new kakao.maps.InfoWindow({
                    //     content:
                    //       '<div style="width:150px;text-align:center;padding:6px 0;">' +
                    //       name +
                    //       "</div>",
                    //   });

                    //   kakao.maps.event.addListener(
                    //     marker,
                    //     "mouseover",
                    //     mouseOverListener(map, marker, infoWindow)
                    //   );
                    //   kakao.maps.event.addListener(
                    //     marker,
                    //     "mouseout",
                    //     mouseOutListener(infoWindow)
                    //   );
                  }

                  // var clusterer = new kakao.maps.MarkerClusterer({
                  //   map: map,
                  //   markers: markers,
                  //   gridSize: 50,
                  //   averageCenter: true,
                  //   minLevel: 4,
                  // });
                });
              })(i);
            }
          });
        resolve("hi");
      }, 1000);
    });
  };
  const result = await promiseFunc();
}

function makeMarker(name, lat, log) {
  var coords = new kakao.maps.LatLng(lat, log);
  var marker = new kakao.maps.Marker({
    map: map,
    position: coords,
    image: markerImage_red, // 빨간색 마커로 표시
  });
  markers.push(marker);

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
  var infoWindow = new kakao.maps.InfoWindow({
    content:
      '<div style="width:150px;text-align:center;padding:6px 0;">' +
      name +
      "</div>",
  });
  var clusterer = new kakao.maps.MarkerClusterer({
    map: map,
    markers: markers,
    gridSize: 50,
    averageCenter: true,
    minLevel: 4,
  });
}

function startMap(test) {
  const result = getApiScarpYungDoeData();
  for (let j = 0; j < scarps.length; j++) {
    console.log(scarps[j]);
  }
  return result;
}
const temp = startMap("test");
// console.log(scarps);

// 키워드로 장소를 검색합니다
// searchPlaces();

// // 키워드 검색을 요청하는 함수입니다
// function searchPlaces() {
//   var keyword = document.getElementById("keyword").value;

//   if (!keyword.replace(/^\s+|\s+$/g, "")) {
//     alert("키워드를 입력해주세요!");
//     return false;
//   }

//   // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
//   ps.keywordSearch(keyword, placesSearchCB);
// }

// // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
// function placesSearchCB(data, status, pagination) {
//   if (status === kakao.maps.services.Status.OK) {
//     // 정상적으로 검색이 완료됐으면
//     // 검색 목록과 마커를 표출합니다
//     displayPlaces(data);

//     // 페이지 번호를 표출합니다
//     displayPagination(pagination);
//   } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
//     alert("검색 결과가 존재하지 않습니다.");
//     return;
//   } else if (status === kakao.maps.services.Status.ERROR) {
//     alert("검색 결과 중 오류가 발생했습니다.");
//     return;
//   }
// }

// // 검색 결과 목록과 마커를 표출하는 함수입니다
// function displayPlaces(places) {
//   var listEl = document.getElementById("placesList"),
//     menuEl = document.getElementById("menu_wrap"),
//     fragment = document.createDocumentFragment(),
//     bounds = new kakao.maps.LatLngBounds(),
//     listStr = "";

//   // 검색 결과 목록에 추가된 항목들을 제거합니다
//   removeAllChildNods(listEl);

//   // 지도에 표시되고 있는 마커를 제거합니다
//   removeMarker();

//   for (var i = 0; i < places.length; i++) {
//     // 마커를 생성하고 지도에 표시합니다
//     var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
//       marker = addMarker(placePosition, i),
//       itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

//     // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
//     // LatLngBounds 객체에 좌표를 추가합니다
//     bounds.extend(placePosition);

//     // 마커와 검색결과 항목에 mouseover 했을때
//     // 해당 장소에 인포윈도우에 장소명을 표시합니다
//     // mouseout 했을 때는 인포윈도우를 닫습니다
//     (function (marker, title) {
//       kakao.maps.event.addListener(marker, "mouseover", function () {
//         displayInfowindow(marker, title);
//       });

//       kakao.maps.event.addListener(marker, "mouseout", function () {
//         infowindow.close();
//       });

//       itemEl.onmouseover = function () {
//         displayInfowindow(marker, title);
//       };

//       itemEl.onmouseout = function () {
//         infowindow.close();
//       };
//     })(marker, places[i].place_name);

//     fragment.appendChild(itemEl);
//   }

//   // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
//   listEl.appendChild(fragment);
//   menuEl.scrollTop = 0;

//   // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
//   map.setBounds(bounds);
// }

// // 검색결과 항목을 Element로 반환하는 함수입니다
// function getListItem(index, places) {
//   var el = document.createElement("li"),
//     itemStr =
//       '<span class="markerbg marker_' +
//       (index + 1) +
//       '"></span>' +
//       '<div class="info">' +
//       "   <h5>" +
//       places.place_name +
//       "</h5>";

//   if (places.road_address_name) {
//     itemStr +=
//       "    <span>" +
//       places.road_address_name +
//       "</span>" +
//       '   <span class="jibun gray">' +
//       places.address_name +
//       "</span>";
//   } else {
//     itemStr += "    <span>" + places.address_name + "</span>";
//   }

//   itemStr += '  <span class="tel">' + places.phone + "</span>" + "</div>";

//   el.innerHTML = itemStr;
//   el.className = "item";

//   return el;
// }

// // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
// function addMarker(position, idx, title) {
//   var imageSrc =
//       "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
//     imageSize = new kakao.maps.Size(36, 37), // 마커 이미지의 크기
//     imgOptions = {
//       spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
//       spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
//       offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
//     },
//     markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
//     marker = new kakao.maps.Marker({
//       position: position, // 마커의 위치
//       image: markerImage,
//     });

//   marker.setMap(map); // 지도 위에 마커를 표출합니다
//   markers.push(marker); // 배열에 생성된 마커를 추가합니다

//   return marker;
// }

// // 지도 위에 표시되고 있는 마커를 모두 제거합니다
// function removeMarker() {
//   for (var i = 0; i < markers.length; i++) {
//     markers[i].setMap(null);
//   }
//   markers = [];
// }

// // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
// function displayPagination(pagination) {
//   var paginationEl = document.getElementById("pagination"),
//     fragment = document.createDocumentFragment(),
//     i;

//   // 기존에 추가된 페이지번호를 삭제합니다
//   while (paginationEl.hasChildNodes()) {
//     paginationEl.removeChild(paginationEl.lastChild);
//   }

//   for (i = 1; i <= pagination.last; i++) {
//     var el = document.createElement("a");
//     el.href = "#";
//     el.innerHTML = i;

//     if (i === pagination.current) {
//       el.className = "on";
//     } else {
//       el.onclick = (function (i) {
//         return function () {
//           pagination.gotoPage(i);
//         };
//       })(i);
//     }

//     fragment.appendChild(el);
//   }
//   paginationEl.appendChild(fragment);
// }

// // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
// // 인포윈도우에 장소명을 표시합니다
// function displayInfowindow(marker, title) {
//   var content = '<div style="padding:5px;z-index:1;">' + title + "</div>";

//   infowindow.setContent(content);
//   infowindow.open(map, marker);
// }

// // 검색결과 목록의 자식 Element를 제거하는 함수입니다
// function removeAllChildNods(el) {
//   while (el.hasChildNodes()) {
//     el.removeChild(el.lastChild);
//   }
// }
