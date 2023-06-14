let confirm = false;
let marker;

$userMarker.addEventListener("click", () => {
  confirm = true;
  console.log(confirm);

  marker = new kakao.maps.Marker({
    position: map.getCenter(),
  });
  marker.setMap(map);
});

var mapContainer = document.getElementById("map"),
  mapOption = {
    center: new kakao.maps.LatLng(35.136121, 129.101008),
    level: 4,
  };

var map = new kakao.maps.Map(mapContainer, mapOption);
kakao.maps.event.addListener(map, "click", function (mouseEvent) {
  if (confirm) {
    var latlng = mouseEvent.latLng;

    marker.setPosition(latlng);

    // var message = "Ŭ���� ��ġ�� ������ " + latlng.getLat() + " �̰�, ";
    // message += "�浵�� " + latlng.getLng() + " �Դϴ�";
  }
});
