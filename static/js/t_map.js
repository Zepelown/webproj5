var map;
var marker_s, marker_e;
var drawInfoArr = [];
var resultdrawArr = [];
var squareArray = [];


// URL 매개변수 추출
const urlParams = new URLSearchParams(window.location.search);

// 변수의 값을 가져오기
const startLatitude = urlParams.get('slat');
const startLongitude = urlParams.get('slng');
const arriveLatitude = urlParams.get('alat');
const arriveLongitude = urlParams.get('alng');
const centerLatitude = urlParams.get('cenlat');
const centerLongitude = urlParams.get('cenlng');




function initTmap() {
  // 1. 지도 띄우기
  map = new Tmapv2.Map("map_div", {
    center: new Tmapv2.LatLng(centerLatitude, centerLongitude),
    width: "100%",
    height: "700px",
    zoom: 17,
    zoomControl: true,
    scrollwheel: true
  });


  var start_lat = startLatitude;
  var start_lng = startLongitude;
  var end_lat = arriveLatitude;
  var end_lng = arriveLongitude;
  // 2. 시작, 도착 심볼찍기
  // 시작
  marker_s = new Tmapv2.Marker(
    {
      position: new Tmapv2.LatLng(start_lat, start_lng),
      icon: "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_s.png",
      iconSize: new Tmapv2.Size(24, 38),
      map: map
    });

  // 도착
  marker_e = new Tmapv2.Marker(
    {
      position: new Tmapv2.LatLng(end_lat, end_lng),
      icon: "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png",
      iconSize: new Tmapv2.Size(24, 38),
      map: map
    });

  addSquareMap();

  var routeIndexArray = findRoute(start_lat, start_lng, end_lat, end_lng);
  drawLine(drawInfoArr);

  var redMarker = [
    [35.132541, 129.094577],
  ]
  var dangerIndexArray = findDanger(redMarker);

  var detourArray = calculateDetour(routeIndexArray, dangerIndexArray);
  console.log(detourArray);

  finalFindRoute(start_lat, start_lng, end_lat, end_lng, detourArray);

  squaremap.destroy();
}



function calculateDetour(routeIndexArray, dangerIndexArray) {
  var detourArray = [];

  console.log(routeIndexArray);
  console.log(dangerIndexArray);


  for (var i = 0; i < routeIndexArray.length; i++) {

    if (dangerIndexArray.includes(routeIndexArray[i])) { // 겹치는거 확인
      var detour = routeIndexArray[i]; // 겹치는 좌표
      if (i >= 2) {
        var preIndex = routeIndexArray[i - 1];
        var prePreIndex = routeIndexArray[i - 2];

        if (preIndex.i === detour.i && preIndex.j === detour.j + 1) { // 북쪽으로 들어올 때
          console.log("north");
          var northDanger = [
            { i: detour.i - 2, j: detour.j },
            { i: detour.i - 1, j: detour.j - 1 },
            { i: detour.i, j: detour.j - 2 },
            { i: detour.i + 1, j: detour.j - 1 },
            { i: detour.i + 2, j: detour.j },
            { i: detour.i - 1, j: detour.j },
            { i: detour.i, j: detour.j - 1 },
            { i: detour.i + 1, j: detour.j }
          ];
          if (prePreIndex.i === detour.i - 1 && prePreIndex.j === detour.j + 1) {
            console.log("west-north");

            if (dangerIndexArray.some(obj => obj.i === northDanger[0].i && obj.j === northDanger[0].j)) {
              detourArray.push({ i: detour.i + 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i + 1, j: detour.j - 1 });
            }
            else if (dangerIndexArray.some(obj => obj.i === northDanger[1].i && obj.j === northDanger[1].j)) {
              detourArray.push({ i: detour.i + 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i + 1, j: detour.j - 2 });
            }
            else if (dangerIndexArray.some(obj => obj.i === northDanger[2].i && obj.j === northDanger[2].j)) {
              detourArray.push({ i: detour.i + 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i + 1, j: detour.j - 3 });
            }
            else if (dangerIndexArray.some(obj => obj.i === northDanger[3].i && obj.j === northDanger[3].j)) {
              detourArray.push({ i: detour.i + 2, j: detour.j + 1 });
              detourArray.push({ i: detour.i + 2, j: detour.j - 2 });
            }
            else if (dangerIndexArray.some(obj => obj.i === northDanger[4].i && obj.j === northDanger[4].j)) {
              detourArray.push({ i: detour.i + 3, j: detour.j + 1 });
              detourArray.push({ i: detour.i + 3, j: detour.j - 1 });
            }
            else if (dangerIndexArray.some(obj => obj.i === northDanger[5].i && obj.j === northDanger[5].j)) {
              detourArray.push({ i: detour.i + 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i + 1, j: detour.j - 1 });
            }
            else if (dangerIndexArray.some(obj => obj.i === northDanger[6].i && obj.j === northDanger[6].j)) {
              detourArray.push({ i: detour.i + 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i + 1, j: detour.j - 2 });
            }
            else if (dangerIndexArray.some(obj => obj.i === northDanger[7].i && obj.j === northDanger[7].j)) {
              detourArray.push({ i: detour.i + 2, j: detour.j + 1 });
              detourArray.push({ i: detour.i + 2, j: detour.j - 1 });
            }
            else {
              detourArray.push({ i: detour.i + 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i + 1, j: detour.j - 1 });
            }
          }
          else if (prePreIndex.i === detour.i + 1 && prePreIndex.j === detour.j + 1) {
            console.log("east-north");

            if (dangerIndexArray.some(obj => obj.i === northDanger[0].i && obj.j === northDanger[0].j)) {
              detourArray.push({ i: detour.i - 3, j: detour.j + 1 });
              detourArray.push({ i: detour.i - 3, j: detour.j - 1 });
            }
            else if (dangerIndexArray.some(obj => obj.i === northDanger[1].i && obj.j === northDanger[1].j)) {
              detourArray.push({ i: detour.i - 2, j: detour.j + 1 });
              detourArray.push({ i: detour.i - 2, j: detour.j - 2 });
            }
            else if (dangerIndexArray.some(obj => obj.i === northDanger[2].i && obj.j === northDanger[2].j)) {
              detourArray.push({ i: detour.i - 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i - 1, j: detour.j - 3 });
            }
            else if (dangerIndexArray.some(obj => obj.i === northDanger[3].i && obj.j === northDanger[3].j)) {
              detourArray.push({ i: detour.i - 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i - 1, j: detour.j - 2 });
            }
            else if (dangerIndexArray.some(obj => obj.i === northDanger[4].i && obj.j === northDanger[4].j)) {
              detourArray.push({ i: detour.i - 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i - 1, j: detour.j - 1 });
            }
            else if (dangerIndexArray.some(obj => obj.i === northDanger[5].i && obj.j === northDanger[5].j)) {
              detourArray.push({ i: detour.i - 2, j: detour.j + 1 });
              detourArray.push({ i: detour.i - 2, j: detour.j - 1 });
            }
            else if (dangerIndexArray.some(obj => obj.i === northDanger[6].i && obj.j === northDanger[6].j)) {
              detourArray.push({ i: detour.i - 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i - 1, j: detour.j - 2 });
            }
            else if (dangerIndexArray.some(obj => obj.i === northDanger[7].i && obj.j === northDanger[7].j)) {
              detourArray.push({ i: detour.i - 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i - 1, j: detour.j - 1 });
            }
            else {
              detourArray.push({ i: detour.i - 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i - 1, j: detour.j - 1 });
            }
          }
          else {
            console.log("north");
            if (dangerIndexArray.some(obj => obj.i === northDanger[0].i && obj.j === northDanger[0].j)) {
              detourArray.push({ i: detour.i + 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i + 1, j: detour.j - 1 });
            }
            else if (dangerIndexArray.some(obj => obj.i === northDanger[1].i && obj.j === northDanger[1].j)) {
              detourArray.push({ i: detour.i + 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i + 1, j: detour.j - 2 });
            }
            else if (dangerIndexArray.some(obj => obj.i === northDanger[2].i && obj.j === northDanger[2].j)) {
              detourArray.push({ i: detour.i - 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i - 1, j: detour.j - 3 });
            }
            else if (dangerIndexArray.some(obj => obj.i === northDanger[3].i && obj.j === northDanger[3].j)) {
              detourArray.push({ i: detour.i - 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i - 1, j: detour.j - 2 });
            }
            else if (dangerIndexArray.some(obj => obj.i === northDanger[4].i && obj.j === northDanger[4].j)) {
              detourArray.push({ i: detour.i - 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i - 1, j: detour.j - 1 });
            }
            else if (dangerIndexArray.some(obj => obj.i === northDanger[5].i && obj.j === northDanger[5].j)) {
              detourArray.push({ i: detour.i + 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i + 1, j: detour.j - 1 });
            }
            else if (dangerIndexArray.some(obj => obj.i === northDanger[6].i && obj.j === northDanger[6].j)) {
              detourArray.push({ i: detour.i - 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i - 1, j: detour.j - 2 });
            }
            else if (dangerIndexArray.some(obj => obj.i === northDanger[7].i && obj.j === northDanger[7].j)) {
              detourArray.push({ i: detour.i - 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i - 1, j: detour.j - 1 });
            }
            else {
              detourArray.push({ i: detour.i - 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i - 1, j: detour.j - 1 });
            }
          }
        }

        else if (preIndex.i === detour.i + 1 && preIndex.j === detour.j) { // 동쪽으로 들어올 때
          console.log("east");
          var eastDanger = [
            { i: detour.i, j: detour.j + 2 },
            { i: detour.i - 1, j: detour.j + 1 },
            { i: detour.i - 2, j: detour.j },
            { i: detour.i - 1, j: detour.j - 1 },
            { i: detour.i, j: detour.j - 2 },
            { i: detour.i, j: detour.j + 1 },
            { i: detour.i - 1, j: detour.j },
            { i: detour.i, j: detour.j - 1 }
          ];
          if (prePreIndex.i === detour.i + 1 && prePreIndex.j === detour.j + 1) {
            console.log("north-east");

            if (dangerIndexArray.some(obj => obj.i === eastDanger[0].i && obj.j === eastDanger[0].j)) {
              detourArray.push({ i: detour.i + 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i - 1, j: detour.j - 1 });
            }
            else if (dangerIndexArray.some(obj => obj.i === eastDanger[1].i && obj.j === eastDanger[1].j)) {
              detourArray.push({ i: detour.i + 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i - 2, j: detour.j - 1 });
            }
            else if (dangerIndexArray.some(obj => obj.i === eastDanger[2].i && obj.j === eastDanger[2].j)) {
              detourArray.push({ i: detour.i + 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i - 3, j: detour.j - 1 });
            }
            else if (dangerIndexArray.some(obj => obj.i === eastDanger[3].i && obj.j === eastDanger[3].j)) {
              detourArray.push({ i: detour.i + 1, j: detour.j - 2 });
              detourArray.push({ i: detour.i - 2, j: detour.j - 2 });
            }
            else if (dangerIndexArray.some(obj => obj.i === eastDanger[4].i && obj.j === eastDanger[4].j)) {
              detourArray.push({ i: detour.i + 1, j: detour.j - 3 });
              detourArray.push({ i: detour.i - 1, j: detour.j - 3 });
            }
            else if (dangerIndexArray.some(obj => obj.i === eastDanger[5].i && obj.j === eastDanger[5].j)) {
              detourArray.push({ i: detour.i + 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i - 1, j: detour.j - 1 });
            }
            else if (dangerIndexArray.some(obj => obj.i === eastDanger[6].i && obj.j === eastDanger[6].j)) {
              detourArray.push({ i: detour.i + 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i - 2, j: detour.j - 1 });
            }
            else if (dangerIndexArray.some(obj => obj.i === eastDanger[7].i && obj.j === eastDanger[7].j)) {
              detourArray.push({ i: detour.i + 1, j: detour.j - 2 });
              detourArray.push({ i: detour.i - 1, j: detour.j - 2 });
            }
            else {
              detourArray.push({ i: detour.i + 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i - 1, j: detour.j - 1 });
            }
          }
          else if (prePreIndex.i === detour.i + 1 && prePreIndex.j === detour.j - 1) {
            console.log("south-east");

            if (dangerIndexArray.some(obj => obj.i === eastDanger[0].i && obj.j === eastDanger[0].j)) {
              detourArray.push({ i: detour.i + 1, j: detour.j + 3 });
              detourArray.push({ i: detour.i - 1, j: detour.j + 3 });
            }
            else if (dangerIndexArray.some(obj => obj.i === eastDanger[1].i && obj.j === eastDanger[1].j)) {
              detourArray.push({ i: detour.i + 1, j: detour.j + 2 });
              detourArray.push({ i: detour.i - 2, j: detour.j + 2 });
            }
            else if (dangerIndexArray.some(obj => obj.i === eastDanger[2].i && obj.j === eastDanger[2].j)) {
              detourArray.push({ i: detour.i + 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i - 3, j: detour.j + 1 });
            }
            else if (dangerIndexArray.some(obj => obj.i === eastDanger[3].i && obj.j === eastDanger[3].j)) {
              detourArray.push({ i: detour.i + 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i - 2, j: detour.j + 1 });
            }
            else if (dangerIndexArray.some(obj => obj.i === eastDanger[4].i && obj.j === eastDanger[4].j)) {
              detourArray.push({ i: detour.i + 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i - 1, j: detour.j + 1 });
            }
            else if (dangerIndexArray.some(obj => obj.i === eastDanger[5].i && obj.j === eastDanger[5].j)) {
              detourArray.push({ i: detour.i + 1, j: detour.j + 2 });
              detourArray.push({ i: detour.i - 1, j: detour.j + 2 });
            }
            else if (dangerIndexArray.some(obj => obj.i === eastDanger[6].i && obj.j === eastDanger[6].j)) {
              detourArray.push({ i: detour.i + 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i - 2, j: detour.j + 1 });
            }
            else if (dangerIndexArray.some(obj => obj.i === eastDanger[7].i && obj.j === eastDanger[7].j)) {
              detourArray.push({ i: detour.i + 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i - 1, j: detour.j + 1 });
            }
            else {
              detourArray.push({ i: detour.i + 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i - 1, j: detour.j + 1 });
            }

          }
          else {
            console.log("east");

            if (dangerIndexArray.some(obj => obj.i === eastDanger[0].i && obj.j === eastDanger[0].j)) {
              detourArray.push({ i: detour.i + 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i - 1, j: detour.j - 1 });
            }
            else if (dangerIndexArray.some(obj => obj.i === eastDanger[1].i && obj.j === eastDanger[1].j)) {
              detourArray.push({ i: detour.i + 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i - 2, j: detour.j - 1 });
            }
            else if (dangerIndexArray.some(obj => obj.i === eastDanger[2].i && obj.j === eastDanger[2].j)) {
              detourArray.push({ i: detour.i + 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i - 3, j: detour.j + 1 });
            }
            else if (dangerIndexArray.some(obj => obj.i === eastDanger[3].i && obj.j === eastDanger[3].j)) {
              detourArray.push({ i: detour.i + 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i - 2, j: detour.j + 1 });
            }
            else if (dangerIndexArray.some(obj => obj.i === eastDanger[4].i && obj.j === eastDanger[4].j)) {
              detourArray.push({ i: detour.i + 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i - 1, j: detour.j + 1 });
            }
            else if (dangerIndexArray.some(obj => obj.i === eastDanger[5].i && obj.j === eastDanger[5].j)) {
              detourArray.push({ i: detour.i + 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i - 1, j: detour.j - 1 });
            }
            else if (dangerIndexArray.some(obj => obj.i === eastDanger[6].i && obj.j === eastDanger[6].j)) {
              detourArray.push({ i: detour.i + 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i - 2, j: detour.j + 1 });
            }
            else if (dangerIndexArray.some(obj => obj.i === eastDanger[7].i && obj.j === eastDanger[7].j)) {
              detourArray.push({ i: detour.i + 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i - 1, j: detour.j + 1 });
            }
            else {
              detourArray.push({ i: detour.i + 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i - 1, j: detour.j + 1 });
            }
          }
        }

        else if (preIndex.i === detour.i && preIndex.j === detour.j - 1) { // 남쪽으로 들어올 때
          console.log("south");
          var southDanger = [
            { i: detour.i + 2, j: detour.j },
            { i: detour.i + 1, j: detour.j + 1 },
            { i: detour.i, j: detour.j + 2 },
            { i: detour.i - 1, j: detour.j + 1 },
            { i: detour.i - 2, j: detour.j },
            { i: detour.i + 1, j: detour.j },
            { i: detour.i, j: detour.j + 1 },
            { i: detour.i - 1, j: detour.j }
          ];
          if (prePreIndex.i === detour.i - 1 && prePreIndex.j === detour.j - 1) {
            console.log("west-south");

            if (dangerIndexArray.some(obj => obj.i === southDanger[0].i && obj.j === southDanger[0].j)) {
              detourArray.push({ i: detour.i + 3, j: detour.j - 1 });
              detourArray.push({ i: detour.i + 3, j: detour.j + 1 });
            }
            else if (dangerIndexArray.some(obj => obj.i === southDanger[1].i && obj.j === southDanger[1].j)) {
              detourArray.push({ i: detour.i + 2, j: detour.j - 1 });
              detourArray.push({ i: detour.i + 2, j: detour.j + 2 });
            }
            else if (dangerIndexArray.some(obj => obj.i === southDanger[2].i && obj.j === southDanger[2].j)) {
              detourArray.push({ i: detour.i + 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i + 1, j: detour.j + 3 });
            }
            else if (dangerIndexArray.some(obj => obj.i === southDanger[3].i && obj.j === southDanger[3].j)) {
              detourArray.push({ i: detour.i + 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i + 1, j: detour.j + 2 });
            }
            else if (dangerIndexArray.some(obj => obj.i === southDanger[4].i && obj.j === southDanger[4].j)) {
              detourArray.push({ i: detour.i + 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i + 1, j: detour.j + 1 });
            }
            else if (dangerIndexArray.some(obj => obj.i === southDanger[5].i && obj.j === southDanger[5].j)) {
              detourArray.push({ i: detour.i + 2, j: detour.j - 1 });
              detourArray.push({ i: detour.i + 2, j: detour.j + 1 });
            }
            else if (dangerIndexArray.some(obj => obj.i === southDanger[6].i && obj.j === southDanger[6].j)) {
              detourArray.push({ i: detour.i + 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i + 1, j: detour.j + 2 });
            }
            else if (dangerIndexArray.some(obj => obj.i === southDanger[7].i && obj.j === southDanger[7].j)) {
              detourArray.push({ i: detour.i + 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i + 1, j: detour.j + 1 });
            }
            else {
              detourArray.push({ i: detour.i + 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i + 1, j: detour.j + 1 });
            }
          }
          else if (prePreIndex.i === detour.i + 1 && prePreIndex.j === detour.j - 1) {
            console.log("east-south");

            if (dangerIndexArray.some(obj => obj.i === southDanger[0].i && obj.j === southDanger[0].j)) {
              detourArray.push({ i: detour.i - 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i - 1, j: detour.j + 1 });
            }
            else if (dangerIndexArray.some(obj => obj.i === southDanger[1].i && obj.j === southDanger[1].j)) {
              detourArray.push({ i: detour.i - 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i - 1, j: detour.j + 2 });
            }
            else if (dangerIndexArray.some(obj => obj.i === southDanger[2].i && obj.j === southDanger[2].j)) {
              detourArray.push({ i: detour.i - 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i - 1, j: detour.j + 3 });
            }
            else if (dangerIndexArray.some(obj => obj.i === southDanger[3].i && obj.j === southDanger[3].j)) {
              detourArray.push({ i: detour.i - 2, j: detour.j - 1 });
              detourArray.push({ i: detour.i - 2, j: detour.j + 2 });
            }
            else if (dangerIndexArray.some(obj => obj.i === southDanger[4].i && obj.j === southDanger[4].j)) {
              detourArray.push({ i: detour.i - 3, j: detour.j - 1 });
              detourArray.push({ i: detour.i - 3, j: detour.j + 1 });
            }
            else if (dangerIndexArray.some(obj => obj.i === southDanger[5].i && obj.j === southDanger[5].j)) {
              detourArray.push({ i: detour.i - 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i - 1, j: detour.j + 1 });
            }
            else if (dangerIndexArray.some(obj => obj.i === southDanger[6].i && obj.j === southDanger[6].j)) {
              detourArray.push({ i: detour.i - 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i - 1, j: detour.j + 2 });
            }
            else if (dangerIndexArray.some(obj => obj.i === southDanger[7].i && obj.j === southDanger[7].j)) {
              detourArray.push({ i: detour.i - 2, j: detour.j - 1 });
              detourArray.push({ i: detour.i - 2, j: detour.j + 1 });
            }
            else {
              detourArray.push({ i: detour.i - 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i - 1, j: detour.j + 1 });
            }
          }
          else {
            console.log("south");
            if (dangerIndexArray.some(obj => obj.i === southDanger[0].i && obj.j === southDanger[0].j)) {
              detourArray.push({ i: detour.i - 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i - 1, j: detour.j + 1 });
            }
            else if (dangerIndexArray.some(obj => obj.i === southDanger[1].i && obj.j === southDanger[1].j)) {
              detourArray.push({ i: detour.i - 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i - 1, j: detour.j + 2 });
            }
            else if (dangerIndexArray.some(obj => obj.i === southDanger[2].i && obj.j === southDanger[2].j)) {
              detourArray.push({ i: detour.i + 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i + 1, j: detour.j + 3 });
            }
            else if (dangerIndexArray.some(obj => obj.i === southDanger[3].i && obj.j === southDanger[3].j)) {
              detourArray.push({ i: detour.i + 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i + 1, j: detour.j + 2 });
            }
            else if (dangerIndexArray.some(obj => obj.i === southDanger[4].i && obj.j === southDanger[4].j)) {
              detourArray.push({ i: detour.i + 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i + 1, j: detour.j + 1 });
            }
            else if (dangerIndexArray.some(obj => obj.i === southDanger[5].i && obj.j === southDanger[5].j)) {
              detourArray.push({ i: detour.i - 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i - 1, j: detour.j + 1 });
            }
            else if (dangerIndexArray.some(obj => obj.i === southDanger[6].i && obj.j === southDanger[6].j)) {
              detourArray.push({ i: detour.i + 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i + 1, j: detour.j + 2 });
            }
            else if (dangerIndexArray.some(obj => obj.i === southDanger[7].i && obj.j === southDanger[7].j)) {
              detourArray.push({ i: detour.i + 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i + 1, j: detour.j + 1 });
            }
            else {
              detourArray.push({ i: detour.i + 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i + 1, j: detour.j + 1 });
            }
          }
        }

        else if (preIndex.i === detour.i - 1 && preIndex.j === detour.j) { // 서쪽으로 들어올 때
          console.log("west");
          var westDanger = [
            { i: detour.i, j: detour.j - 2 },
            { i: detour.i + 1, j: detour.j - 1 },
            { i: detour.i + 2, j: detour.j },
            { i: detour.i + 1, j: detour.j + 1 },
            { i: detour.i, j: detour.j + 2 },
            { i: detour.i, j: detour.j - 1 },
            { i: detour.i + 1, j: detour.j },
            { i: detour.i, j: detour.j + 1 }
          ];
          if (prePreIndex.i === detour.i - 1 && prePreIndex.j === detour.j + 1) {
            console.log("north-west");

            if (dangerIndexArray.some(obj => obj.i === westDanger[0].i && obj.j === westDanger[0].j)) {
              detourArray.push({ i: detour.i - 1, j: detour.j - 3 });
              detourArray.push({ i: detour.i + 1, j: detour.j - 3 });
            }
            else if (dangerIndexArray.some(obj => obj.i === westDanger[1].i && obj.j === westDanger[1].j)) {
              detourArray.push({ i: detour.i - 1, j: detour.j - 2 });
              detourArray.push({ i: detour.i + 2, j: detour.j - 2 });
            }
            else if (dangerIndexArray.some(obj => obj.i === westDanger[2].i && obj.j === westDanger[2].j)) {
              detourArray.push({ i: detour.i - 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i + 3, j: detour.j - 1 });
            }
            else if (dangerIndexArray.some(obj => obj.i === westDanger[3].i && obj.j === westDanger[3].j)) {
              detourArray.push({ i: detour.i - 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i + 2, j: detour.j - 1 });
            }
            else if (dangerIndexArray.some(obj => obj.i === westDanger[4].i && obj.j === westDanger[4].j)) {
              detourArray.push({ i: detour.i - 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i + 1, j: detour.j - 1 });
            }
            else if (dangerIndexArray.some(obj => obj.i === westDanger[5].i && obj.j === westDanger[5].j)) {
              detourArray.push({ i: detour.i - 1, j: detour.j - 2 });
              detourArray.push({ i: detour.i + 1, j: detour.j - 2 });
            }
            else if (dangerIndexArray.some(obj => obj.i === westDanger[6].i && obj.j === westDanger[6].j)) {
              detourArray.push({ i: detour.i - 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i + 2, j: detour.j - 1 });
            }
            else if (dangerIndexArray.some(obj => obj.i === westDanger[7].i && obj.j === westDanger[7].j)) {
              detourArray.push({ i: detour.i - 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i + 1, j: detour.j - 1 });
            }
            else {
              detourArray.push({ i: detour.i - 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i + 1, j: detour.j - 1 });
            }
          }
          else if (prePreIndex.i === detour.i - 1 && prePreIndex.j === detour.j - 1) {
            console.log("south-west");

            if (dangerIndexArray.some(obj => obj.i === westDanger[0].i && obj.j === westDanger[0].j)) {
              detourArray.push({ i: detour.i - 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i + 1, j: detour.j + 1 });
            }
            else if (dangerIndexArray.some(obj => obj.i === westDanger[1].i && obj.j === westDanger[1].j)) {
              detourArray.push({ i: detour.i - 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i + 2, j: detour.j + 1 });
            }
            else if (dangerIndexArray.some(obj => obj.i === westDanger[2].i && obj.j === westDanger[2].j)) {
              detourArray.push({ i: detour.i - 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i + 3, j: detour.j + 1 });
            }
            else if (dangerIndexArray.some(obj => obj.i === westDanger[3].i && obj.j === westDanger[3].j)) {
              detourArray.push({ i: detour.i - 1, j: detour.j + 2 });
              detourArray.push({ i: detour.i + 2, j: detour.j + 2 });
            }
            else if (dangerIndexArray.some(obj => obj.i === westDanger[4].i && obj.j === westDanger[4].j)) {
              detourArray.push({ i: detour.i - 1, j: detour.j + 3 });
              detourArray.push({ i: detour.i + 1, j: detour.j + 3 });
            }
            else if (dangerIndexArray.some(obj => obj.i === westDanger[5].i && obj.j === westDanger[5].j)) {
              detourArray.push({ i: detour.i - 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i + 1, j: detour.j + 1 });
            }
            else if (dangerIndexArray.some(obj => obj.i === westDanger[6].i && obj.j === westDanger[6].j)) {
              detourArray.push({ i: detour.i - 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i + 2, j: detour.j + 1 });
            }
            else if (dangerIndexArray.some(obj => obj.i === westDanger[7].i && obj.j === westDanger[7].j)) {
              detourArray.push({ i: detour.i - 1, j: detour.j + 2 });
              detourArray.push({ i: detour.i + 1, j: detour.j + 2 });
            }
            else {
              detourArray.push({ i: detour.i - 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i + 1, j: detour.j + 1 });
            }
          }
          else {
            console.log("west");

            if (dangerIndexArray.some(obj => obj.i === westDanger[0].i && obj.j === westDanger[0].j)) {
              detourArray.push({ i: detour.i - 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i + 1, j: detour.j + 1 });
            }
            else if (dangerIndexArray.some(obj => obj.i === westDanger[1].i && obj.j === westDanger[1].j)) {
              detourArray.push({ i: detour.i - 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i + 2, j: detour.j + 1 });
            }
            else if (dangerIndexArray.some(obj => obj.i === westDanger[2].i && obj.j === westDanger[2].j)) {
              detourArray.push({ i: detour.i - 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i + 3, j: detour.j - 1 });
            }
            else if (dangerIndexArray.some(obj => obj.i === westDanger[3].i && obj.j === westDanger[3].j)) {
              detourArray.push({ i: detour.i - 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i + 2, j: detour.j - 1 });
            }
            else if (dangerIndexArray.some(obj => obj.i === westDanger[4].i && obj.j === westDanger[4].j)) {
              detourArray.push({ i: detour.i - 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i + 1, j: detour.j - 1 });
            }
            else if (dangerIndexArray.some(obj => obj.i === westDanger[5].i && obj.j === westDanger[5].j)) {
              detourArray.push({ i: detour.i - 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i + 1, j: detour.j + 1 });
            }
            else if (dangerIndexArray.some(obj => obj.i === westDanger[6].i && obj.j === westDanger[6].j)) {
              detourArray.push({ i: detour.i - 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i + 2, j: detour.j - 1 });
            }
            else if (dangerIndexArray.some(obj => obj.i === westDanger[7].i && obj.j === westDanger[7].j)) {
              detourArray.push({ i: detour.i - 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i + 1, j: detour.j - 1 });
            }
            else {
              detourArray.push({ i: detour.i - 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i + 1, j: detour.j - 1 });
            }
          }
        }
      }
    }


  }
  return detourArray;
}

function findDanger(redMarker) {
  var lineArr = [];

  for (i = 0; i < redMarker.length; i++) {
    // 3. API 사용요청
    var headers = {};
    headers["appKey"] = "kzrC8emrIM6HcgQTxeCyT4ifJysfZXgx9XChHVMR";

    $.ajax({
      method: "GET",
      headers: headers,
      url: "https://apis.openapi.sk.com/tmap/road/nearToRoad?version=1",//가까운 도로 찾기 api 요청 url입니다.
      async: false,
      data: {
        "lon": redMarker[i][1],
        "lat": redMarker[i][0]
      },
      success: function (response) {

        var resultHeader, resultlinkPoints;

        if (response.resultData.header) {
          resultHeader = response.resultData.header;
          resultlinkPoints = response.resultData.linkPoints;

          var drawArr = [];

          // Tmapv2.LatLng객체로 이루어진 배열을 만듭니다.
          for (var i in resultlinkPoints) {
            var lineLatLng = new Tmapv2.LatLng(resultlinkPoints[i].location.latitude, resultlinkPoints[i].location.longitude);

            drawArr.push(lineLatLng);
          }

          //그리기
          var polyline_ = new Tmapv2.Polyline({
            path: drawArr,	//만든 배열을 넣습니다.
            strokeColor: "#FF0000",
            strokeWeight: 6,
            map: map
          });


          //라인 정보를 배열에 담습니다.
          lineArr.push(polyline_);

        } else {
          $("#result").text("가까운 도로 검색 결과가 없습니다.");
        }
      },
      error: function (request, status, error) {
        console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
      }
    });
  }
  return routeArrayFindIndex(lineArr[0]._shape_data.path);
}


function findRoute(start_lat, start_lng, end_lat, end_lng) {

  // 3. 경로탐색 API 사용요청
  var headers = {};
  headers["appKey"] = "kzrC8emrIM6HcgQTxeCyT4ifJysfZXgx9XChHVMR";

  $.ajax({
    method: "POST",
    headers: headers,
    url: "https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json&callback=result",
    async: false,
    contentType: "application/json",
    data: JSON.stringify({
      "startX": start_lng,
      "startY": start_lat,
      "endX": end_lng,
      "endY": end_lat,
      "reqCoordType": "WGS84GEO",
      "resCoordType": "EPSG3857",
      "startName": "출발지",
      "endName": "도착지"
    }),
    success: function (response) {
      var resultData = response.features;

      //결과 출력
      var tDistance = "총 거리 : "
        + ((resultData[0].properties.totalDistance) / 1000)
          .toFixed(1) + "km,";
      var tTime = " 총 시간 : "
        + ((resultData[0].properties.totalTime) / 60)
          .toFixed(0) + "분";

      $("#result").text(tDistance + tTime);

      //기존 그려진 라인 & 마커가 있다면 초기화
      if (resultdrawArr.length > 0) {
        for (var i in resultdrawArr) {
          resultdrawArr[i]
            .setMap(null);
        }
        resultdrawArr = [];
      }

      drawInfoArr = [];

      for (var i in resultData) { //for문 [S]
        var geometry = resultData[i].geometry;
        var properties = resultData[i].properties;
        var polyline_;


        if (geometry.type == "LineString") {
          for (var j in geometry.coordinates) {
            // 경로들의 결과값(구간)들을 포인트 객체로 변환
            var latlng = new Tmapv2.Point(
              geometry.coordinates[j][0],
              geometry.coordinates[j][1]);
            // 포인트 객체를 받아 좌표값으로 변환
            var convertPoint = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(
              latlng);
            // 포인트객체의 정보로 좌표값 변환 객체로 저장
            var convertChange = new Tmapv2.LatLng(
              convertPoint._lat,
              convertPoint._lng);
            // 배열에 담기
            drawInfoArr.push(convertChange);
          }
        } else {
          var markerImg = "";
          var pType = "";
          var size;

          if (properties.pointType == "S") { //출발지 마커
            markerImg = "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_s.png";
            pType = "S";
            size = new Tmapv2.Size(24, 38);
          } else if (properties.pointType == "E") { //도착지 마커
            markerImg = "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png";
            pType = "E";
            size = new Tmapv2.Size(24, 38);
          } else { //각 포인트 마커
            markerImg = "http://topopen.tmap.co.kr/imgs/point.png";
            pType = "P";
            size = new Tmapv2.Size(8, 8);
          }

          // 경로들의 결과값들을 포인트 객체로 변환
          var latlon = new Tmapv2.Point(
            geometry.coordinates[0],
            geometry.coordinates[1]);

          // 포인트 객체를 받아 좌표값으로 다시 변환
          var convertPoint = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(
            latlon);

          var routeInfoObj = {
            markerImage: markerImg,
            lng: convertPoint._lng,
            lat: convertPoint._lat,
            pointType: pType
          };

          // Marker 추가
          marker_p = new Tmapv2.Marker(
            {
              position: new Tmapv2.LatLng(
                routeInfoObj.lat,
                routeInfoObj.lng),
              icon: routeInfoObj.markerImage,
              iconSize: size,
              map: map
            });
        }
      }//for문 [E]
    },
    error: function (request, status, error) {
      console.log("code:" + request.status + "\n"
        + "message:" + request.responseText + "\n"
        + "error:" + error);
    }
  });

  return routeArrayFindIndex(drawInfoArr);
}


function generateViaPointsArray(detourArray) {
  var viaPoints = [];
  for (var s = 0; s < detourArray.length; s++) {
    for (var k = 0; k < squareArray.length; k++) {
      if (detourArray[s].i === squareArray[k].index.i && detourArray[s].j === squareArray[k].index.j) {
        viaPoints.push(squareArray[k].lng + "," + squareArray[k].lat)
      }
    }
  }
  console.log(viaPoints.join("_"));
  return viaPoints.join("_");
}


function finalFindRoute(start_lat, start_lng, end_lat, end_lng, detourArray) {
  // 3. 경로탐색 API 사용요청
  var headers = {};
  headers["appKey"] = "kzrC8emrIM6HcgQTxeCyT4ifJysfZXgx9XChHVMR";

  $.ajax({
    method: "POST",
    headers: headers,
    url: "https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json&callback=result",
    async: false,
    data: {
      "startX": start_lng,
      "startY": start_lat,
      "endX": end_lng,
      "endY": end_lat,
      "reqCoordType": "WGS84GEO",
      "resCoordType": "EPSG3857",
      "startName": "출발지",
      "endName": "도착지",
      "passList": generateViaPointsArray(detourArray)
    },
    success: function (response) {
      var resultData = response.features;

      //결과 출력
      var tDistance = "총 거리 : "
        + ((resultData[0].properties.totalDistance) / 1000)
          .toFixed(1) + "km,";
      var tTime = " 총 시간 : "
        + ((resultData[0].properties.totalTime) / 60)
          .toFixed(0) + "분";

      $("#result").text(tDistance + tTime);

      //기존 그려진 라인 & 마커가 있다면 초기화
      if (resultdrawArr.length > 0) {
        for (var i in resultdrawArr) {
          resultdrawArr[i]
            .setMap(null);
        }
        resultdrawArr = [];
      }

      drawInfoArr = [];

      for (var i in resultData) { //for문 [S]
        var geometry = resultData[i].geometry;
        var properties = resultData[i].properties;
        var polyline_;


        if (geometry.type == "LineString") {
          for (var j in geometry.coordinates) {
            // 경로들의 결과값(구간)들을 포인트 객체로 변환
            var latlng = new Tmapv2.Point(
              geometry.coordinates[j][0],
              geometry.coordinates[j][1]);
            // 포인트 객체를 받아 좌표값으로 변환
            var convertPoint = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(
              latlng);
            // 포인트객체의 정보로 좌표값 변환 객체로 저장
            var convertChange = new Tmapv2.LatLng(
              convertPoint._lat,
              convertPoint._lng);
            // 배열에 담기
            drawInfoArr.push(convertChange);
          }
        } else {
          var markerImg = "";
          var pType = "";
          var size;

          if (properties.pointType == "S") { //출발지 마커
            markerImg = "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_s.png";
            pType = "S";
            size = new Tmapv2.Size(24, 38);
          } else if (properties.pointType == "E") { //도착지 마커
            markerImg = "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png";
            pType = "E";
            size = new Tmapv2.Size(24, 38);
          } else { //각 포인트 마커
            markerImg = "http://topopen.tmap.co.kr/imgs/point.png";
            pType = "P";
            size = new Tmapv2.Size(8, 8);
          }

          // 경로들의 결과값들을 포인트 객체로 변환
          var latlon = new Tmapv2.Point(
            geometry.coordinates[0],
            geometry.coordinates[1]);

          // 포인트 객체를 받아 좌표값으로 다시 변환
          var convertPoint = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(
            latlon);

          var routeInfoObj = {
            markerImage: markerImg,
            lng: convertPoint._lng,
            lat: convertPoint._lat,
            pointType: pType
          };

          // Marker 추가
          marker_p = new Tmapv2.Marker(
            {
              position: new Tmapv2.LatLng(
                routeInfoObj.lat,
                routeInfoObj.lng),
              icon: routeInfoObj.markerImage,
              iconSize: size,
              map: map
            });
        }
      }//for문 [E]
      drawLine(drawInfoArr);
    },
    error: function (request, status, error) {
      console.log("code:" + request.status + "\n"
        + "message:" + request.responseText + "\n"
        + "error:" + error);
    }
  });
}

function routeArrayFindIndex(arr) {
  var resultArr = [];
  for (var i = 0; i < arr.length; i++) {
    if (i === 0) {
      resultArr.push(markerArrayFindIndex(arr[i]._lat, arr[i]._lng));
    }
    else if (markerArrayFindIndex(arr[i]._lat, arr[i]._lng) !== markerArrayFindIndex(arr[i - 1]._lat, arr[i - 1]._lng)) {
      resultArr.push(markerArrayFindIndex(arr[i]._lat, arr[i]._lng));
    }
  }
  return resultArr;
}

function markerArrayFindIndex(lat, lng) {

  for (var i = 0; i < 30; i++) {
    for (var j = 0; j < 30; j++) {
      if (squareArray[i * 30 + j].lat < lat || squareArray[i * 30 + j].lng < lng)
        continue;
      return squareArray[i * 30 + j].index
    }
  }
}

function drawLine(arrPoint) {
  var polyline_;

  polyline_ = new Tmapv2.Polyline({
    path: arrPoint,
    strokeColor: "#08D624",
    strokeWeight: 6,
    map: map
  });
  resultdrawArr.push(polyline_);
}
function addSquareMap() {

  squareArray = [];
  for (var i = 0; i < 20; i++) {
    for (var j = 0; j < 20; j++) {
      var object = {};
      object.index = { i, j };
      object.lng = 129.092139 + 0.001078 * i; // 0.00110941
      object.lat = 35.130186 + 0.000904 * j; // 0.0009129
      object.value = 3;
      squareArray.push(object);
    }
  }

  squaremap = new Tmapv2.extension.SquareMap({
    map: map,
    origin: new Tmapv2.LatLng(35.130186, 129.092139),
    strokeOpacity: 0,
    fillOpacity: 0,
    size: 100,
    values: [1, 2, 3, 4, 5, 6],
    colors: ['#f8fcca', '#ecf8b2', '#91d4b9', '#1e90bf', '#24489d', '#1e2f89'],
    data: {
      data: squareArray,
      max: 10
    }
  });
}
