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

window.onload = () => {
  const form = document.getElementById("register_review_form");
  form.addEventListener("submit", (e) => {
    const formData = new FormData(form);
    const jsonData = {};
    for (const [key, value] of formData.entries()) {
      jsonData[key] = value;
    }
    const url = "/api/addUserMarker";
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(jsonData),
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        console.log("Response:", data);
      })
      .catch((err) => {
        console.error(err);
      });
  });
};

kakao.maps.event.addListener(map, "click", function (mouseEvent) {
  if (confirm) {
    var latlng = mouseEvent.latLng;
    lat = latlng.getLat();
    lng = latlng.getLng();
    marker.setPosition(latlng);
  }
});
