var map;
var marker_s, marker_e;
var drawInfoArr = [];
var resultdrawArr = [];
var squareArray = [];
var redMarker = [
  // 영도구
  [35.0928989307413, 129.067873907027],
  [35.0746776511533, 129.05129624806],
  [35.0718228598876, 129.073690220233],
  [35.0643402373352, 129.069793847245],
  [35.0718496005506, 129.067988525136],
  [35.0912709426582, 129.065745671325],
  [35.0885169573786, 129.043481324555],
  [35.072314822136, 129.064327274954],
  // 임의
  [35.132646, 129.094119],
  //
  [35.0778630478833, 129.047014317144],
  [35.0831952013212, 129.043414762048],
  [35.0924136905043, 129.053507485701],
  [35.0733934483124, 129.069200278892],
  [35.0922562307782, 129.060714162062],
  [35.0845362173013, 129.060679528271],
  [35.0863025429993, 129.060683077453],
  [35.0892712823521, 129.067783611714],
  [35.0767189029093, 129.067137663297],
  [35.0734559776573, 129.073436353495],
  [35.0809093965337, 129.073587837175],
  [35.0751193041723, 129.073233996269],
  [35.088435946761, 129.060075100548],
  [35.0767270264161, 129.064445131277],
  [35.0949088501647, 129.053901307864],
  [35.0889121916873, 129.069788476166],
  [35.0759019420926, 129.048260923523],
  [35.0859818221438, 129.073413121858],
  [35.0929777806804, 129.061902105016],
  [35.0832912242092, 129.067724609421],
  [35.0786846433672, 129.044483449091],
  //// 강서구
  //[35.1277029732245, 128.899496681216],
  //[35.1115932243525, 128.864490579001],
  //[35.1109145940779, 128.858490222434],
  //[35.1413520435043, 128.846743570659],
  //[35.1126132885067, 128.873722912628],
  //[35.1277029732245, 128.899496681216],
  //[35.1102260388235, 128.857651943406],
  //[35.124290388908, 128.846475176126],
  //[35.1260286340007, 128.898324133301],
  //[35.0557174987037, 128.827412596164],
  //[35.0635294665571, 128.832617444226],
  //[35.0298713056423, 28.822633864982],
  //[35.0286470847491, 128.821295766694],
  //[35.0357029300955, 128.82598369584],
  //[35.1434477018106, 128.823423294707],
  //[35.1456789108768, 128.824009821801],
  //[35.147016724292, 128.825417557003],
  //[35.1480797300209, 128.82311749214],
  //[35.1103244915613, 128.86800294084],
  //[35.1482266516427, 128.827057505628],
  //[35.1640868030513, 128.889343076582],
  //[35.1032692001863, 128.844569320929],
  //[35.0855146087279, 128.833665405168],
  //[35.0680883241028, 128.842757896003],
  //[35.1282602071044, 128.898718949172],
  //[35.0685319060133, 128.85427877643],
  //[35.1463078115084, 128.833951095358],
  //[35.1199135775433, 128.847676350995],
  //[35.1967101449498, 128.894033275532],
  //[35.137469598306, 128.850674779027],
  //[35.1952716917547, 128.893968476835],
  //[35.191816685141, 128.90333677975],
  //[35.1948823057371, 128.916590566459],
  //[35.0140269281884, 128.834645367476],
  //[35.071195312755, 128.84037492571],
  //[35.0838122571511, 128.834055972607],
  //[35.1484034370571, 128.813951547944],
  //// 연제구
  //[35.176789241311, 129.092598714745],
  //[35.1624576027594, 129.080105374932],
  //[35.1834069596204, 129.092040123191],
  //[35.1757986195612, 129.094979228254],
  //[35.1596820593313, 129.082741339925],
  //[35.1687405546452, 129.093945394241],
  //[35.1731348219811, 129.0909069597],
  //[35.1625984935556, 129.087711922595],
  //[35.1855268552098, 129.091642345051],
  //// 사상구
  //[34.9113565775968, 128.697720213193],
  //[35.1435349059076, 128.992135617774],
  //[35.1449220672179, 129.001211982634],
  //[35.122343423691, 128.973301925848],
  //[35.1707560567163, 129.004766096462],
  //[35.123433351357, 128.965554436856],
  //[35.1532706354554, 129.008637497409],
  //[35.1393893458112, 128.992215702763],
  //[35.1311205847282, 128.974347094858],
  //[35.1895291907427, 128.991221069038],
  //[35.1781353611039, 128.989941182974],
  //[34.9104692746758, 128.698056531586],
  //[35.1349011676745, 128.997242523452],
  //[34.9107761046434, 128.698072916521],
  //[35.1240497040114, 128.967001762193],
  //[35.134350229947, 128.995599467573],
  //[35.1562924039256, 128.995502115869],
  //[35.154250024488, 128.997052263985],
  //[35.1574824663866, 128.993807638472],
  //[35.1638612808908, 128.990853223502],
  //[35.1587444858258, 128.99237208123],
  //[35.1614926121499, 128.991095721939],
  //[35.17246016047, 128.988046813198],
  //[35.1244074711072, 128.97612319573],
  //[35.1347387547463, 128.977484382324],
  //[35.1547740222342, 129.010779581402],
  //[35.1297265560624, 128.975756136112],
  //[35.173065502558, 128.99093037296],
  //// 금정구
  //[35.22271615069, 129.098948798949],
  //[35.2513013567691, 129.084314455461],
  //[35.2815685322855, 129.086977675987],
  //[35.2334387686951, 129.096148379468],
  //[35.2218971481778, 129.095248874845],
  //[35.2394077766347, 129.080496870585],
  //[35.2680752381266, 129.084372995312],
  //[35.2811853415872, 129.076851453197],
  //[35.2805984661222, 129.084469251457],
  //[35.2393792300497, 129.080354228315],
  //[35.2216589171206, 129.106624229184],
  //[35.2811853415872, 129.076851453197],
  //[35.2684679348519, 129.093415758692],
  //[35.2705558496967, 129.094526006059],
  //[35.2804512470795, 129.086181599879],
  //[35.2806402763927, 129.081676011542],
  //[35.2820327009767, 129.076441311094],
  //[35.2225570153563, 129.096463612903],
  //[35.2826113214113, 129.123904101073],
  //[35.2248162130953, 129.113303699147],
  //[35.2145850851331, 129.113803734686],
  //[35.2134919226411, 129.110539679523],
  //[35.2224501267342, 129.109510339097],
  //[35.2585311896216, 129.081978648992],
  //[35.2811853415872, 129.076851453197],
  //[35.2180796871277, 129.096446818592],
  //[35.2429865964065, 129.069373825349],
  //[35.2151750154217, 129.097305129887],
  //[35.297844966852, 129.100067813742],
  //[35.2702276430322, 129.094412178466],
  //[35.297844966852, 129.100067813742],
  //[35.2943965714748, 129.097307023208],
  //[35.2924042584557, 129.095482192652],
  //[35.2895657350701, 129.092950164257],
  //[35.2924042584557, 129.095482192652],
  //[35.2871044195238, 129.090764543232],
  //[35.2895657350701, 129.092950164257],
  //[35.2525070660287, 129.057195319963],
  //[35.2612340727687, 129.120600980758],
  //[35.2776110217948, 129.081507031015],
  //[35.2524870830246, 129.093332020984],
  //[35.2227241394411, 129.110111321034],
  //[35.2689827258022, 129.083534133282],
  //[35.2452487995291, 129.13757333488],
  //[35.2250542218414, 129.113302734397],
  //[35.2956366681372, 129.084847343685],
  //[35.2709899913432, 129.095287131291],
  //[35.2764092926821, 129.072244092291],
  //[35.2219781795774, 129.096855368351],
  //[35.2471437365273, 129.140379747397],
  //[35.2766225599279, 129.072188208121]
];


// URL 매개변수 추출
const urlParams = new URLSearchParams(window.location.search);

// 변수의 값을 가져오기
const startLatitude = urlParams.get("slat");
const startLongitude = urlParams.get("slng");
const arriveLatitude = urlParams.get("alat");
const arriveLongitude = urlParams.get("alng");
const centerLatitude = urlParams.get("cenlat");
const centerLongitude = urlParams.get("cenlng");

function initTmap() {
  var start_lat = startLatitude;
  var start_lng = startLongitude;
  var end_lat = arriveLatitude;
  var end_lng = arriveLongitude;

  // 1. 자도 띄우고 출발점과 도착점 마커찍기
  mapAndMarker(start_lat, start_lng, end_lat, end_lng);

  // 2. 지도에 20*20 격자판 띄우기
  addSquareMap();

  // 3. 보행자 경로를 격자판에서 좌표상에서 움직이는것으로 표시하고, 경로 그리기
  var routeIndexArray = findRoute(start_lat, start_lng, end_lat, end_lng);
  drawLine(drawInfoArr);

  // 4. 위험한 구역을 좌표로 받아오고, 그 구역 도로명 가져오기
  var [dangerIndexArray, roadName] = findDanger(redMarker);
  var roadNameIndex;

  console.log(routeIndexArray);

  // 5. 경로 상에서 위험구역을 만나면 우회할 경유지 계산하기
  for (var i = 0; i < dangerIndexArray.length; i++) {
    var detourArray = calculateDetour(routeIndexArray, dangerIndexArray[i]);

    if (detourArray === undefined)
      continue;
    else if (detourArray.length === 0)
      continue;
    else {
      roadNameIndex = i;
      break;
    }
  }

  document.getElementById('danger_area_road').textContent = roadName[roadNameIndex];

  // 6. 우회한 최종 경로 그리기
  finalFindRoute(start_lat, start_lng, end_lat, end_lng, detourArray);

  // 7. 격자판 제거하기
  squaremap.destroy();
}

function mapAndMarker(start_lat, start_lng, end_lat, end_lng) {
  // 지도 띄우기
  map = new Tmapv2.Map("map_div", {
    center: new Tmapv2.LatLng(centerLatitude, centerLongitude),
    width: "100%",
    height: "700px",
    zoom: 17,
    zoomControl: true,
    scrollwheel: true,
  });

  // 시작, 도착 심볼찍기
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
}

function calculateDetour(routeIndexArray, dangerIndexArray) {

  if (dangerIndexArray[0] === undefined) {
    return;
  }

  var detourArray = [];

  for (var i = 0; i < routeIndexArray.length; i++) {
    if (dangerIndexArray.includes(routeIndexArray[i])) {
      // 겹치는거 확인
      var detour = routeIndexArray[i]; // 겹치는 좌표
      if (i >= 2) {
        var preIndex = routeIndexArray[i - 1];
        var prePreIndex = routeIndexArray[i - 2];

        if (preIndex.i === detour.i && preIndex.j === detour.j + 1) {
          // 북쪽으로 들어올 때
          console.log("north");
          var northDanger = [
            { i: detour.i - 2, j: detour.j },
            { i: detour.i - 1, j: detour.j - 1 },
            { i: detour.i, j: detour.j - 2 },
            { i: detour.i + 1, j: detour.j - 1 },
            { i: detour.i + 2, j: detour.j },
            { i: detour.i - 1, j: detour.j },
            { i: detour.i, j: detour.j - 1 },
            { i: detour.i + 1, j: detour.j },
          ];
          if (
            prePreIndex.i === detour.i - 1 &&
            prePreIndex.j === detour.j + 1
          ) {
            console.log("west-north");

            if (
              dangerIndexArray.some(
                (obj) =>
                  obj.i === northDanger[0].i && obj.j === northDanger[0].j
              )
            ) {
              detourArray.push({ i: detour.i + 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i + 1, j: detour.j - 1 });
            } else if (
              dangerIndexArray.some(
                (obj) =>
                  obj.i === northDanger[1].i && obj.j === northDanger[1].j
              )
            ) {
              detourArray.push({ i: detour.i + 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i + 1, j: detour.j - 2 });
            } else if (
              dangerIndexArray.some(
                (obj) =>
                  obj.i === northDanger[2].i && obj.j === northDanger[2].j
              )
            ) {
              detourArray.push({ i: detour.i + 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i + 1, j: detour.j - 3 });
            } else if (
              dangerIndexArray.some(
                (obj) =>
                  obj.i === northDanger[3].i && obj.j === northDanger[3].j
              )
            ) {
              detourArray.push({ i: detour.i + 2, j: detour.j + 1 });
              detourArray.push({ i: detour.i + 2, j: detour.j - 2 });
            } else if (
              dangerIndexArray.some(
                (obj) =>
                  obj.i === northDanger[4].i && obj.j === northDanger[4].j
              )
            ) {
              detourArray.push({ i: detour.i + 3, j: detour.j + 1 });
              detourArray.push({ i: detour.i + 3, j: detour.j - 1 });
            } else if (
              dangerIndexArray.some(
                (obj) =>
                  obj.i === northDanger[5].i && obj.j === northDanger[5].j
              )
            ) {
              detourArray.push({ i: detour.i + 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i + 1, j: detour.j - 1 });
            } else if (
              dangerIndexArray.some(
                (obj) =>
                  obj.i === northDanger[6].i && obj.j === northDanger[6].j
              )
            ) {
              detourArray.push({ i: detour.i + 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i + 1, j: detour.j - 2 });
            } else if (
              dangerIndexArray.some(
                (obj) =>
                  obj.i === northDanger[7].i && obj.j === northDanger[7].j
              )
            ) {
              detourArray.push({ i: detour.i + 2, j: detour.j + 1 });
              detourArray.push({ i: detour.i + 2, j: detour.j - 1 });
            } else {
              detourArray.push({ i: detour.i + 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i + 1, j: detour.j - 1 });
            }
          } else if (
            prePreIndex.i === detour.i + 1 &&
            prePreIndex.j === detour.j + 1
          ) {
            console.log("east-north");

            if (
              dangerIndexArray.some(
                (obj) =>
                  obj.i === northDanger[0].i && obj.j === northDanger[0].j
              )
            ) {
              detourArray.push({ i: detour.i - 3, j: detour.j + 1 });
              detourArray.push({ i: detour.i - 3, j: detour.j - 1 });
            } else if (
              dangerIndexArray.some(
                (obj) =>
                  obj.i === northDanger[1].i && obj.j === northDanger[1].j
              )
            ) {
              detourArray.push({ i: detour.i - 2, j: detour.j + 1 });
              detourArray.push({ i: detour.i - 2, j: detour.j - 2 });
            } else if (
              dangerIndexArray.some(
                (obj) =>
                  obj.i === northDanger[2].i && obj.j === northDanger[2].j
              )
            ) {
              detourArray.push({ i: detour.i - 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i - 1, j: detour.j - 3 });
            } else if (
              dangerIndexArray.some(
                (obj) =>
                  obj.i === northDanger[3].i && obj.j === northDanger[3].j
              )
            ) {
              detourArray.push({ i: detour.i - 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i - 1, j: detour.j - 2 });
            } else if (
              dangerIndexArray.some(
                (obj) =>
                  obj.i === northDanger[4].i && obj.j === northDanger[4].j
              )
            ) {
              detourArray.push({ i: detour.i - 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i - 1, j: detour.j - 1 });
            } else if (
              dangerIndexArray.some(
                (obj) =>
                  obj.i === northDanger[5].i && obj.j === northDanger[5].j
              )
            ) {
              detourArray.push({ i: detour.i - 2, j: detour.j + 1 });
              detourArray.push({ i: detour.i - 2, j: detour.j - 1 });
            } else if (
              dangerIndexArray.some(
                (obj) =>
                  obj.i === northDanger[6].i && obj.j === northDanger[6].j
              )
            ) {
              detourArray.push({ i: detour.i - 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i - 1, j: detour.j - 2 });
            } else if (
              dangerIndexArray.some(
                (obj) =>
                  obj.i === northDanger[7].i && obj.j === northDanger[7].j
              )
            ) {
              detourArray.push({ i: detour.i - 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i - 1, j: detour.j - 1 });
            } else {
              detourArray.push({ i: detour.i - 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i - 1, j: detour.j - 1 });
            }
          } else {
            console.log("north");
            if (
              dangerIndexArray.some(
                (obj) =>
                  obj.i === northDanger[0].i && obj.j === northDanger[0].j
              )
            ) {
              detourArray.push({ i: detour.i + 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i + 1, j: detour.j - 1 });
            } else if (
              dangerIndexArray.some(
                (obj) =>
                  obj.i === northDanger[1].i && obj.j === northDanger[1].j
              )
            ) {
              detourArray.push({ i: detour.i + 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i + 1, j: detour.j - 2 });
            } else if (
              dangerIndexArray.some(
                (obj) =>
                  obj.i === northDanger[2].i && obj.j === northDanger[2].j
              )
            ) {
              detourArray.push({ i: detour.i - 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i - 1, j: detour.j - 3 });
            } else if (
              dangerIndexArray.some(
                (obj) =>
                  obj.i === northDanger[3].i && obj.j === northDanger[3].j
              )
            ) {
              detourArray.push({ i: detour.i - 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i - 1, j: detour.j - 2 });
            } else if (
              dangerIndexArray.some(
                (obj) =>
                  obj.i === northDanger[4].i && obj.j === northDanger[4].j
              )
            ) {
              detourArray.push({ i: detour.i - 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i - 1, j: detour.j - 1 });
            } else if (
              dangerIndexArray.some(
                (obj) =>
                  obj.i === northDanger[5].i && obj.j === northDanger[5].j
              )
            ) {
              detourArray.push({ i: detour.i + 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i + 1, j: detour.j - 1 });
            } else if (
              dangerIndexArray.some(
                (obj) =>
                  obj.i === northDanger[6].i && obj.j === northDanger[6].j
              )
            ) {
              detourArray.push({ i: detour.i - 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i - 1, j: detour.j - 2 });
            } else if (
              dangerIndexArray.some(
                (obj) =>
                  obj.i === northDanger[7].i && obj.j === northDanger[7].j
              )
            ) {
              detourArray.push({ i: detour.i - 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i - 1, j: detour.j - 1 });
            } else {
              detourArray.push({ i: detour.i - 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i - 1, j: detour.j - 1 });
            }
          }
        } else if (preIndex.i === detour.i + 1 && preIndex.j === detour.j) {
          // 동쪽으로 들어올 때
          console.log("east");
          var eastDanger = [
            { i: detour.i, j: detour.j + 2 },
            { i: detour.i - 1, j: detour.j + 1 },
            { i: detour.i - 2, j: detour.j },
            { i: detour.i - 1, j: detour.j - 1 },
            { i: detour.i, j: detour.j - 2 },
            { i: detour.i, j: detour.j + 1 },
            { i: detour.i - 1, j: detour.j },
            { i: detour.i, j: detour.j - 1 },
          ];
          if (
            prePreIndex.i === detour.i + 1 &&
            prePreIndex.j === detour.j + 1
          ) {
            console.log("north-east");

            if (
              dangerIndexArray.some(
                (obj) => obj.i === eastDanger[0].i && obj.j === eastDanger[0].j
              )
            ) {
              detourArray.push({ i: detour.i + 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i - 1, j: detour.j - 1 });
            } else if (
              dangerIndexArray.some(
                (obj) => obj.i === eastDanger[1].i && obj.j === eastDanger[1].j
              )
            ) {
              detourArray.push({ i: detour.i + 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i - 2, j: detour.j - 1 });
            } else if (
              dangerIndexArray.some(
                (obj) => obj.i === eastDanger[2].i && obj.j === eastDanger[2].j
              )
            ) {
              detourArray.push({ i: detour.i + 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i - 3, j: detour.j - 1 });
            } else if (
              dangerIndexArray.some(
                (obj) => obj.i === eastDanger[3].i && obj.j === eastDanger[3].j
              )
            ) {
              detourArray.push({ i: detour.i + 1, j: detour.j - 2 });
              detourArray.push({ i: detour.i - 2, j: detour.j - 2 });
            } else if (
              dangerIndexArray.some(
                (obj) => obj.i === eastDanger[4].i && obj.j === eastDanger[4].j
              )
            ) {
              detourArray.push({ i: detour.i + 1, j: detour.j - 3 });
              detourArray.push({ i: detour.i - 1, j: detour.j - 3 });
            } else if (
              dangerIndexArray.some(
                (obj) => obj.i === eastDanger[5].i && obj.j === eastDanger[5].j
              )
            ) {
              detourArray.push({ i: detour.i + 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i - 1, j: detour.j - 1 });
            } else if (
              dangerIndexArray.some(
                (obj) => obj.i === eastDanger[6].i && obj.j === eastDanger[6].j
              )
            ) {
              detourArray.push({ i: detour.i + 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i - 2, j: detour.j - 1 });
            } else if (
              dangerIndexArray.some(
                (obj) => obj.i === eastDanger[7].i && obj.j === eastDanger[7].j
              )
            ) {
              detourArray.push({ i: detour.i + 1, j: detour.j - 2 });
              detourArray.push({ i: detour.i - 1, j: detour.j - 2 });
            } else {
              detourArray.push({ i: detour.i + 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i - 1, j: detour.j - 1 });
            }
          } else if (
            prePreIndex.i === detour.i + 1 &&
            prePreIndex.j === detour.j - 1
          ) {
            console.log("south-east");

            if (
              dangerIndexArray.some(
                (obj) => obj.i === eastDanger[0].i && obj.j === eastDanger[0].j
              )
            ) {
              detourArray.push({ i: detour.i + 1, j: detour.j + 3 });
              detourArray.push({ i: detour.i - 1, j: detour.j + 3 });
            } else if (
              dangerIndexArray.some(
                (obj) => obj.i === eastDanger[1].i && obj.j === eastDanger[1].j
              )
            ) {
              detourArray.push({ i: detour.i + 1, j: detour.j + 2 });
              detourArray.push({ i: detour.i - 2, j: detour.j + 2 });
            } else if (
              dangerIndexArray.some(
                (obj) => obj.i === eastDanger[2].i && obj.j === eastDanger[2].j
              )
            ) {
              detourArray.push({ i: detour.i + 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i - 3, j: detour.j + 1 });
            } else if (
              dangerIndexArray.some(
                (obj) => obj.i === eastDanger[3].i && obj.j === eastDanger[3].j
              )
            ) {
              detourArray.push({ i: detour.i + 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i - 2, j: detour.j + 1 });
            } else if (
              dangerIndexArray.some(
                (obj) => obj.i === eastDanger[4].i && obj.j === eastDanger[4].j
              )
            ) {
              detourArray.push({ i: detour.i + 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i - 1, j: detour.j + 1 });
            } else if (
              dangerIndexArray.some(
                (obj) => obj.i === eastDanger[5].i && obj.j === eastDanger[5].j
              )
            ) {
              detourArray.push({ i: detour.i + 1, j: detour.j + 2 });
              detourArray.push({ i: detour.i - 1, j: detour.j + 2 });
            } else if (
              dangerIndexArray.some(
                (obj) => obj.i === eastDanger[6].i && obj.j === eastDanger[6].j
              )
            ) {
              detourArray.push({ i: detour.i + 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i - 2, j: detour.j + 1 });
            } else if (
              dangerIndexArray.some(
                (obj) => obj.i === eastDanger[7].i && obj.j === eastDanger[7].j
              )
            ) {
              detourArray.push({ i: detour.i + 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i - 1, j: detour.j + 1 });
            } else {
              detourArray.push({ i: detour.i + 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i - 1, j: detour.j + 1 });
            }
          } else {
            console.log("east");

            if (
              dangerIndexArray.some(
                (obj) => obj.i === eastDanger[0].i && obj.j === eastDanger[0].j
              )
            ) {
              detourArray.push({ i: detour.i + 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i - 1, j: detour.j - 1 });
            } else if (
              dangerIndexArray.some(
                (obj) => obj.i === eastDanger[1].i && obj.j === eastDanger[1].j
              )
            ) {
              detourArray.push({ i: detour.i + 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i - 2, j: detour.j - 1 });
            } else if (
              dangerIndexArray.some(
                (obj) => obj.i === eastDanger[2].i && obj.j === eastDanger[2].j
              )
            ) {
              detourArray.push({ i: detour.i + 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i - 3, j: detour.j + 1 });
            } else if (
              dangerIndexArray.some(
                (obj) => obj.i === eastDanger[3].i && obj.j === eastDanger[3].j
              )
            ) {
              detourArray.push({ i: detour.i + 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i - 2, j: detour.j + 1 });
            } else if (
              dangerIndexArray.some(
                (obj) => obj.i === eastDanger[4].i && obj.j === eastDanger[4].j
              )
            ) {
              detourArray.push({ i: detour.i + 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i - 1, j: detour.j + 1 });
            } else if (
              dangerIndexArray.some(
                (obj) => obj.i === eastDanger[5].i && obj.j === eastDanger[5].j
              )
            ) {
              detourArray.push({ i: detour.i + 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i - 1, j: detour.j - 1 });
            } else if (
              dangerIndexArray.some(
                (obj) => obj.i === eastDanger[6].i && obj.j === eastDanger[6].j
              )
            ) {
              detourArray.push({ i: detour.i + 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i - 2, j: detour.j + 1 });
            } else if (
              dangerIndexArray.some(
                (obj) => obj.i === eastDanger[7].i && obj.j === eastDanger[7].j
              )
            ) {
              detourArray.push({ i: detour.i + 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i - 1, j: detour.j + 1 });
            } else {
              detourArray.push({ i: detour.i + 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i - 1, j: detour.j + 1 });
            }
          }
        } else if (preIndex.i === detour.i && preIndex.j === detour.j - 1) {
          // 남쪽으로 들어올 때
          console.log("south");
          var southDanger = [
            { i: detour.i + 2, j: detour.j },
            { i: detour.i + 1, j: detour.j + 1 },
            { i: detour.i, j: detour.j + 2 },
            { i: detour.i - 1, j: detour.j + 1 },
            { i: detour.i - 2, j: detour.j },
            { i: detour.i + 1, j: detour.j },
            { i: detour.i, j: detour.j + 1 },
            { i: detour.i - 1, j: detour.j },
          ];
          if (
            prePreIndex.i === detour.i - 1 &&
            prePreIndex.j === detour.j - 1
          ) {
            console.log("west-south");

            if (
              dangerIndexArray.some(
                (obj) =>
                  obj.i === southDanger[0].i && obj.j === southDanger[0].j
              )
            ) {
              detourArray.push({ i: detour.i + 3, j: detour.j - 1 });
              detourArray.push({ i: detour.i + 3, j: detour.j + 1 });
            } else if (
              dangerIndexArray.some(
                (obj) =>
                  obj.i === southDanger[1].i && obj.j === southDanger[1].j
              )
            ) {
              detourArray.push({ i: detour.i + 2, j: detour.j - 1 });
              detourArray.push({ i: detour.i + 2, j: detour.j + 2 });
            } else if (
              dangerIndexArray.some(
                (obj) =>
                  obj.i === southDanger[2].i && obj.j === southDanger[2].j
              )
            ) {
              detourArray.push({ i: detour.i + 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i + 1, j: detour.j + 3 });
            } else if (
              dangerIndexArray.some(
                (obj) =>
                  obj.i === southDanger[3].i && obj.j === southDanger[3].j
              )
            ) {
              detourArray.push({ i: detour.i + 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i + 1, j: detour.j + 2 });
            } else if (
              dangerIndexArray.some(
                (obj) =>
                  obj.i === southDanger[4].i && obj.j === southDanger[4].j
              )
            ) {
              detourArray.push({ i: detour.i + 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i + 1, j: detour.j + 1 });
            } else if (
              dangerIndexArray.some(
                (obj) =>
                  obj.i === southDanger[5].i && obj.j === southDanger[5].j
              )
            ) {
              detourArray.push({ i: detour.i + 2, j: detour.j - 1 });
              detourArray.push({ i: detour.i + 2, j: detour.j + 1 });
            } else if (
              dangerIndexArray.some(
                (obj) =>
                  obj.i === southDanger[6].i && obj.j === southDanger[6].j
              )
            ) {
              detourArray.push({ i: detour.i + 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i + 1, j: detour.j + 2 });
            } else if (
              dangerIndexArray.some(
                (obj) =>
                  obj.i === southDanger[7].i && obj.j === southDanger[7].j
              )
            ) {
              detourArray.push({ i: detour.i + 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i + 1, j: detour.j + 1 });
            } else {
              detourArray.push({ i: detour.i + 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i + 1, j: detour.j + 1 });
            }
          } else if (
            prePreIndex.i === detour.i + 1 &&
            prePreIndex.j === detour.j - 1
          ) {
            console.log("east-south");

            if (
              dangerIndexArray.some(
                (obj) =>
                  obj.i === southDanger[0].i && obj.j === southDanger[0].j
              )
            ) {
              detourArray.push({ i: detour.i - 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i - 1, j: detour.j + 1 });
            } else if (
              dangerIndexArray.some(
                (obj) =>
                  obj.i === southDanger[1].i && obj.j === southDanger[1].j
              )
            ) {
              detourArray.push({ i: detour.i - 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i - 1, j: detour.j + 2 });
            } else if (
              dangerIndexArray.some(
                (obj) =>
                  obj.i === southDanger[2].i && obj.j === southDanger[2].j
              )
            ) {
              detourArray.push({ i: detour.i - 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i - 1, j: detour.j + 3 });
            } else if (
              dangerIndexArray.some(
                (obj) =>
                  obj.i === southDanger[3].i && obj.j === southDanger[3].j
              )
            ) {
              detourArray.push({ i: detour.i - 2, j: detour.j - 1 });
              detourArray.push({ i: detour.i - 2, j: detour.j + 2 });
            } else if (
              dangerIndexArray.some(
                (obj) =>
                  obj.i === southDanger[4].i && obj.j === southDanger[4].j
              )
            ) {
              detourArray.push({ i: detour.i - 3, j: detour.j - 1 });
              detourArray.push({ i: detour.i - 3, j: detour.j + 1 });
            } else if (
              dangerIndexArray.some(
                (obj) =>
                  obj.i === southDanger[5].i && obj.j === southDanger[5].j
              )
            ) {
              detourArray.push({ i: detour.i - 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i - 1, j: detour.j + 1 });
            } else if (
              dangerIndexArray.some(
                (obj) =>
                  obj.i === southDanger[6].i && obj.j === southDanger[6].j
              )
            ) {
              detourArray.push({ i: detour.i - 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i - 1, j: detour.j + 2 });
            } else if (
              dangerIndexArray.some(
                (obj) =>
                  obj.i === southDanger[7].i && obj.j === southDanger[7].j
              )
            ) {
              detourArray.push({ i: detour.i - 2, j: detour.j - 1 });
              detourArray.push({ i: detour.i - 2, j: detour.j + 1 });
            } else {
              detourArray.push({ i: detour.i - 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i - 1, j: detour.j + 1 });
            }
          } else {
            console.log("south");
            if (
              dangerIndexArray.some(
                (obj) =>
                  obj.i === southDanger[0].i && obj.j === southDanger[0].j
              )
            ) {
              detourArray.push({ i: detour.i - 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i - 1, j: detour.j + 1 });
            } else if (
              dangerIndexArray.some(
                (obj) =>
                  obj.i === southDanger[1].i && obj.j === southDanger[1].j
              )
            ) {
              detourArray.push({ i: detour.i - 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i - 1, j: detour.j + 2 });
            } else if (
              dangerIndexArray.some(
                (obj) =>
                  obj.i === southDanger[2].i && obj.j === southDanger[2].j
              )
            ) {
              detourArray.push({ i: detour.i + 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i + 1, j: detour.j + 3 });
            } else if (
              dangerIndexArray.some(
                (obj) =>
                  obj.i === southDanger[3].i && obj.j === southDanger[3].j
              )
            ) {
              detourArray.push({ i: detour.i + 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i + 1, j: detour.j + 2 });
            } else if (
              dangerIndexArray.some(
                (obj) =>
                  obj.i === southDanger[4].i && obj.j === southDanger[4].j
              )
            ) {
              detourArray.push({ i: detour.i + 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i + 1, j: detour.j + 1 });
            } else if (
              dangerIndexArray.some(
                (obj) =>
                  obj.i === southDanger[5].i && obj.j === southDanger[5].j
              )
            ) {
              detourArray.push({ i: detour.i - 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i - 1, j: detour.j + 1 });
            } else if (
              dangerIndexArray.some(
                (obj) =>
                  obj.i === southDanger[6].i && obj.j === southDanger[6].j
              )
            ) {
              detourArray.push({ i: detour.i + 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i + 1, j: detour.j + 2 });
            } else if (
              dangerIndexArray.some(
                (obj) =>
                  obj.i === southDanger[7].i && obj.j === southDanger[7].j
              )
            ) {
              detourArray.push({ i: detour.i + 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i + 1, j: detour.j + 1 });
            } else {
              detourArray.push({ i: detour.i + 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i + 1, j: detour.j + 1 });
            }
          }
        } else if (preIndex.i === detour.i - 1 && preIndex.j === detour.j) {
          // 서쪽으로 들어올 때
          console.log("west");
          var westDanger = [
            { i: detour.i, j: detour.j - 2 },
            { i: detour.i + 1, j: detour.j - 1 },
            { i: detour.i + 2, j: detour.j },
            { i: detour.i + 1, j: detour.j + 1 },
            { i: detour.i, j: detour.j + 2 },
            { i: detour.i, j: detour.j - 1 },
            { i: detour.i + 1, j: detour.j },
            { i: detour.i, j: detour.j + 1 },
          ];
          if (
            prePreIndex.i === detour.i - 1 &&
            prePreIndex.j === detour.j + 1
          ) {
            console.log("north-west");

            if (
              dangerIndexArray.some(
                (obj) => obj.i === westDanger[0].i && obj.j === westDanger[0].j
              )
            ) {
              detourArray.push({ i: detour.i - 1, j: detour.j - 3 });
              detourArray.push({ i: detour.i + 1, j: detour.j - 3 });
            } else if (
              dangerIndexArray.some(
                (obj) => obj.i === westDanger[1].i && obj.j === westDanger[1].j
              )
            ) {
              detourArray.push({ i: detour.i - 1, j: detour.j - 2 });
              detourArray.push({ i: detour.i + 2, j: detour.j - 2 });
            } else if (
              dangerIndexArray.some(
                (obj) => obj.i === westDanger[2].i && obj.j === westDanger[2].j
              )
            ) {
              detourArray.push({ i: detour.i - 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i + 3, j: detour.j - 1 });
            } else if (
              dangerIndexArray.some(
                (obj) => obj.i === westDanger[3].i && obj.j === westDanger[3].j
              )
            ) {
              detourArray.push({ i: detour.i - 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i + 2, j: detour.j - 1 });
            } else if (
              dangerIndexArray.some(
                (obj) => obj.i === westDanger[4].i && obj.j === westDanger[4].j
              )
            ) {
              detourArray.push({ i: detour.i - 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i + 1, j: detour.j - 1 });
            } else if (
              dangerIndexArray.some(
                (obj) => obj.i === westDanger[5].i && obj.j === westDanger[5].j
              )
            ) {
              detourArray.push({ i: detour.i - 1, j: detour.j - 2 });
              detourArray.push({ i: detour.i + 1, j: detour.j - 2 });
            } else if (
              dangerIndexArray.some(
                (obj) => obj.i === westDanger[6].i && obj.j === westDanger[6].j
              )
            ) {
              detourArray.push({ i: detour.i - 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i + 2, j: detour.j - 1 });
            } else if (
              dangerIndexArray.some(
                (obj) => obj.i === westDanger[7].i && obj.j === westDanger[7].j
              )
            ) {
              detourArray.push({ i: detour.i - 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i + 1, j: detour.j - 1 });
            } else {
              detourArray.push({ i: detour.i - 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i + 1, j: detour.j - 1 });
            }
          } else if (
            prePreIndex.i === detour.i - 1 &&
            prePreIndex.j === detour.j - 1
          ) {
            console.log("south-west");

            if (
              dangerIndexArray.some(
                (obj) => obj.i === westDanger[0].i && obj.j === westDanger[0].j
              )
            ) {
              detourArray.push({ i: detour.i - 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i + 1, j: detour.j + 1 });
            } else if (
              dangerIndexArray.some(
                (obj) => obj.i === westDanger[1].i && obj.j === westDanger[1].j
              )
            ) {
              detourArray.push({ i: detour.i - 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i + 2, j: detour.j + 1 });
            } else if (
              dangerIndexArray.some(
                (obj) => obj.i === westDanger[2].i && obj.j === westDanger[2].j
              )
            ) {
              detourArray.push({ i: detour.i - 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i + 3, j: detour.j + 1 });
            } else if (
              dangerIndexArray.some(
                (obj) => obj.i === westDanger[3].i && obj.j === westDanger[3].j
              )
            ) {
              detourArray.push({ i: detour.i - 1, j: detour.j + 2 });
              detourArray.push({ i: detour.i + 2, j: detour.j + 2 });
            } else if (
              dangerIndexArray.some(
                (obj) => obj.i === westDanger[4].i && obj.j === westDanger[4].j
              )
            ) {
              detourArray.push({ i: detour.i - 1, j: detour.j + 3 });
              detourArray.push({ i: detour.i + 1, j: detour.j + 3 });
            } else if (
              dangerIndexArray.some(
                (obj) => obj.i === westDanger[5].i && obj.j === westDanger[5].j
              )
            ) {
              detourArray.push({ i: detour.i - 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i + 1, j: detour.j + 1 });
            } else if (
              dangerIndexArray.some(
                (obj) => obj.i === westDanger[6].i && obj.j === westDanger[6].j
              )
            ) {
              detourArray.push({ i: detour.i - 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i + 2, j: detour.j + 1 });
            } else if (
              dangerIndexArray.some(
                (obj) => obj.i === westDanger[7].i && obj.j === westDanger[7].j
              )
            ) {
              detourArray.push({ i: detour.i - 1, j: detour.j + 2 });
              detourArray.push({ i: detour.i + 1, j: detour.j + 2 });
            } else {
              detourArray.push({ i: detour.i - 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i + 1, j: detour.j + 1 });
            }
          } else {
            console.log("west");

            if (
              dangerIndexArray.some(
                (obj) => obj.i === westDanger[0].i && obj.j === westDanger[0].j
              )
            ) {
              detourArray.push({ i: detour.i - 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i + 1, j: detour.j + 1 });
            } else if (
              dangerIndexArray.some(
                (obj) => obj.i === westDanger[1].i && obj.j === westDanger[1].j
              )
            ) {
              detourArray.push({ i: detour.i - 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i + 2, j: detour.j + 1 });
            } else if (
              dangerIndexArray.some(
                (obj) => obj.i === westDanger[2].i && obj.j === westDanger[2].j
              )
            ) {
              detourArray.push({ i: detour.i - 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i + 3, j: detour.j - 1 });
            } else if (
              dangerIndexArray.some(
                (obj) => obj.i === westDanger[3].i && obj.j === westDanger[3].j
              )
            ) {
              detourArray.push({ i: detour.i - 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i + 2, j: detour.j - 1 });
            } else if (
              dangerIndexArray.some(
                (obj) => obj.i === westDanger[4].i && obj.j === westDanger[4].j
              )
            ) {
              detourArray.push({ i: detour.i - 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i + 1, j: detour.j - 1 });
            } else if (
              dangerIndexArray.some(
                (obj) => obj.i === westDanger[5].i && obj.j === westDanger[5].j
              )
            ) {
              detourArray.push({ i: detour.i - 1, j: detour.j + 1 });
              detourArray.push({ i: detour.i + 1, j: detour.j + 1 });
            } else if (
              dangerIndexArray.some(
                (obj) => obj.i === westDanger[6].i && obj.j === westDanger[6].j
              )
            ) {
              detourArray.push({ i: detour.i - 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i + 2, j: detour.j - 1 });
            } else if (
              dangerIndexArray.some(
                (obj) => obj.i === westDanger[7].i && obj.j === westDanger[7].j
              )
            ) {
              detourArray.push({ i: detour.i - 1, j: detour.j - 1 });
              detourArray.push({ i: detour.i + 1, j: detour.j - 1 });
            } else {
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
  var roadName = [];

  for (i = 0; i < redMarker.length; i++) {
    // 3. API 사용요청
    var headers = {};
    headers["appKey"] = "kzrC8emrIM6HcgQTxeCyT4ifJysfZXgx9XChHVMR";

    $.ajax({
      method: "GET",
      headers: headers,
      url: "https://apis.openapi.sk.com/tmap/road/nearToRoad?version=1", //가까운 도로 찾기 api 요청 url입니다.
      async: false,
      data: {
        lon: redMarker[i][1],
        lat: redMarker[i][0],
      },
      success: function (response) {
        var resultHeader, resultlinkPoints;

        if (response.resultData.header) {
          resultHeader = response.resultData.header;
          resultlinkPoints = response.resultData.linkPoints;

          roadName.push(resultHeader.roadName);

          var drawArr = [];

          // Tmapv2.LatLng객체로 이루어진 배열을 만듭니다.
          for (var i in resultlinkPoints) {
            var lineLatLng = new Tmapv2.LatLng(
              resultlinkPoints[i].location.latitude,
              resultlinkPoints[i].location.longitude
            );

            drawArr.push(lineLatLng);
          }

          //그리기
          var polyline_ = new Tmapv2.Polyline({
            path: drawArr, //만든 배열을 넣습니다.
            strokeColor: "#FF0000",
            strokeWeight: 6,
            map: map,
          });

          //라인 정보를 배열에 담습니다.
          lineArr.push(polyline_);
        } else {
          $("#result").text("가까운 도로 검색 결과가 없습니다.");
        }
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
  var resultArray = [];
  for (i = 0; i < lineArr.length; i++) {
    resultArray.push(routeArrayFindIndex(lineArr[i]._shape_data.path));
  }
  return [resultArray, roadName];
}

function findRoute(start_lat, start_lng, end_lat, end_lng) {
  var headers = {};
  headers["appKey"] = "kzrC8emrIM6HcgQTxeCyT4ifJysfZXgx9XChHVMR";

  $.ajax({
    method: "POST",
    headers: headers,
    url: "https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json&callback=result",
    async: false,
    contentType: "application/json",
    data: JSON.stringify({
      startX: start_lng,
      startY: start_lat,
      endX: end_lng,
      endY: end_lat,
      reqCoordType: "WGS84GEO",
      resCoordType: "EPSG3857",
      startName: "출발지",
      endName: "도착지",
    }),
    success: function (response) {
      var resultData = response.features;

      //결과 출력
      var tDistance = "총 거리 : " +
        (resultData[0].properties.totalDistance / 1000).toFixed(1) + "km,";
      var tTime = " 총 시간 : " +
        (resultData[0].properties.totalTime / 60).toFixed(0) + "분";
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

          //각 포인트 마커
          markerImg = "http://topopen.tmap.co.kr/imgs/point.png";
          pType = "P";
          size = new Tmapv2.Size(8, 8);

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

  return routeArrayFindIndex(drawInfoArr);
}

function generateViaPointsArray(detourArray) {
  var viaPoints = [];
  for (var s = 0; s < detourArray.length; s++) {
    for (var k = 0; k < squareArray.length; k++) {
      if (
        detourArray[s].i === squareArray[k].index.i &&
        detourArray[s].j === squareArray[k].index.j
      ) {
        viaPoints.push(squareArray[k].lng + "," + squareArray[k].lat);
      }
    }
  }
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
      startX: start_lng,
      startY: start_lat,
      endX: end_lng,
      endY: end_lat,
      reqCoordType: "WGS84GEO",
      resCoordType: "EPSG3857",
      startName: "출발지",
      endName: "도착지",
      passList: generateViaPointsArray(detourArray),
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

          //각 포인트 마커
          markerImg = "http://topopen.tmap.co.kr/imgs/point.png";
          pType = "P";
          size = new Tmapv2.Size(8, 8);

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

function routeArrayFindIndex(arr) {
  var resultArr = [];
  for (var i = 0; i < arr.length; i++) {
    if (i === 0) {
      resultArr.push(markerArrayFindIndex(arr[i]._lat, arr[i]._lng));
    } else if (
      markerArrayFindIndex(arr[i]._lat, arr[i]._lng) !==
      markerArrayFindIndex(arr[i - 1]._lat, arr[i - 1]._lng)
    ) {
      resultArr.push(markerArrayFindIndex(arr[i]._lat, arr[i]._lng));
    }
  }
  return resultArr;
}

function markerArrayFindIndex(lat, lng) {
  for (var i = 0; i < 20; i++) {
    for (var j = 0; j < 20; j++) {
      if (
        squareArray[i * 20 + j].lat < lat ||
        squareArray[i * 20 + j].lng < lng
      )
        continue;
      return squareArray[i * 20 + j].index;
    }
  }
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

function addSquareMap() {

  var startX = (Number(startLatitude) + Number(arriveLatitude)) / 2 - (0.000904 * 10);
  var startY = (Number(startLongitude) + Number(arriveLongitude)) / 2 - (0.001078 * 10);

  squareArray = [];
  for (var i = 0; i < 20; i++) {
    for (var j = 0; j < 20; j++) {
      var object = {};
      object.index = { i, j };
      object.lng = startY + 0.001078 * i; // 0.00110941
      object.lat = startX + 0.000904 * j; // 0.0009129
      object.value = 3;
      squareArray.push(object);
    }
  }

  squaremap = new Tmapv2.extension.SquareMap({
    map: map,
    origin: new Tmapv2.LatLng(startX, startY),
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
