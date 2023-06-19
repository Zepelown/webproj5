let confirm = false;
let marker;
let lat;
let lng;

var mapContainer = document.getElementById("map"),
  mapOption = {
    center: new kakao.maps.LatLng(35.136121, 129.101008),
    level: 4,
  };

var map = new kakao.maps.Map(mapContainer, mapOption);

$userMarker.addEventListener("click", () => {
  confirm = true;
  console.log(confirm);

  marker = new kakao.maps.Marker({
    position: map.getCenter(),
  });
  marker.setMap(map);
});

// const $registerReview = document.querySelector(
//   ".user_marker_button_marker_button_registration"
// );

// $registerReview.addEventListener("click", () => {});

kakao.maps.event.addListener(map, "click", function (mouseEvent) {
  if (confirm) {
    var latlng = mouseEvent.latLng;
    lat = latlng.getLat();
    lng = latlng.getLng();
    marker.setPosition(latlng);
  }
});
