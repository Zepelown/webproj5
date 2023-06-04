const $topServiceLeftDestnationBox = document.querySelector(
  ".top_service_left_destnation_box"
);
const $topServiceLeftDestnationOptionBox = document.querySelector(
  ".top_service_left_destnation_option_box"
);
const $topServiceLeftAroundBox = document.querySelector(
  ".top_service_left_around_box"
);
const $topServiceLeftAroundOptionBox = document.querySelector(
  ".top_service_left_around_option_box"
);
const $topServiceLefAround = document.querySelector(".top_service_left_around");
const $topServiceLeftDestnation = document.querySelector(
  ".top_service_left_destnation"
);
const $topServiceLeftDestnationOption = document.querySelector(
  ".top_service_left_destnation_option"
);
const $topServiceLeftDestnationOption2 = document.querySelector(
  ".top_service_left_destnation_option2"
);
const $topServiceLeftButtonMenu = document.querySelector(
  ".top_service_left_button_menu"
);
const $kakaomapMenu = document.querySelector(".kakaomap_menu");
const $kakaomapMenuHeaderExitButton = document.querySelector(
  ".kakaomap_menu_header-exitbutton"
);
const $backgroundBox = document.querySelector(".background_box");
const $topServiceLeftInputOption = document.querySelector(
  ".top_service_left_input_option"
);
const $topServiceLeftInput = document.querySelector(".top_service_left_input");
const $findWay = document.querySelector(".find_way");
const $findWayButtonBox = document.querySelector(".find_way_button_box");
const $startFindWay = document.querySelector(".start_find_way");
const $markerDelete = document.querySelector(".marker_delete");

$findWay.addEventListener("click", () => {
  $findWay.style.display = "none";
  $startFindWay.style.display = "block";
  $findWayButtonBox.style.backgroundColor = "red";
  $markerDelete.style.opacity = "1";
});

$markerDelete.addEventListener("click", () => {
  $findWay.style.display = "block";
  $startFindWay.style.display = "none";
  $findWayButtonBox.style.backgroundColor = "#258fff";
  $markerDelete.style.opacity = "0";
});

$topServiceLeftDestnationBox.addEventListener("mouseover", () => {
  $topServiceLeftDestnationOptionBox.style.transform = "translateY(0)";
});

$topServiceLeftDestnationBox.addEventListener("mouseout", () => {
  $topServiceLeftDestnationOptionBox.style.transform = "translateY(-800px)";
});

$topServiceLeftAroundBox.addEventListener("mouseover", () => {
  $topServiceLeftAroundOptionBox.style.transform = "translateY(0)";
  $topServiceLefAround.style.backgroundColor = "#258fff";
  $topServiceLefAround.style.color = "white";
});
$topServiceLeftAroundBox.addEventListener("mouseout", () => {
  $topServiceLeftAroundOptionBox.style.transform = "translateY(-800px)";
  $topServiceLefAround.style.backgroundColor = "white";
  $topServiceLefAround.style.color = "black";
});

$topServiceLeftDestnation.addEventListener("mouseover", () => {
  $topServiceLeftDestnation.style.backgroundColor = "#258fff";
});

$topServiceLeftDestnation.addEventListener("mouseout", () => {
  $topServiceLeftDestnation.style.backgroundColor = "white";
});

$topServiceLeftDestnationOption.addEventListener("mouseover", () => {
  $topServiceLeftDestnationOption.style.backgroundColor = "#258fff";
});

$topServiceLeftDestnationOption.addEventListener("mouseout", () => {
  $topServiceLeftDestnationOption.style.backgroundColor = "white";
});

$topServiceLeftDestnationOption2.addEventListener("mouseover", () => {
  $topServiceLeftDestnationOption2.style.backgroundColor = "#258fff";
});

$topServiceLeftDestnationOption2.addEventListener("mouseout", () => {
  $topServiceLeftDestnationOption2.style.backgroundColor = "white";
});

$backgroundBox.addEventListener("click", (e) => {
  if (e.target.className === "background_box") {
    $backgroundBox.style.transform = "translateX(-2000px)";
    // $kakaomapMenu.style.transform = 'translateX(-400px)'
  }
});
$topServiceLeftButtonMenu.addEventListener("click", () => {
  $backgroundBox.style.transform = "translateX(0)";
  // $kakaomapMenu.style.transform = 'translateX(0)'
  console.log("click");
});

$kakaomapMenuHeaderExitButton.addEventListener("click", () => {
  $backgroundBox.style.transform = "translateX(-2000px)";
  // $kakaomapMenu.style.transform = 'translateX(-400px)'
});

$topServiceLeftInput.addEventListener("focus", () => {
  $topServiceLeftInputOption.style.display = "block";
});

$topServiceLeftInput.addEventListener("focusout", () => {
  $topServiceLeftInputOption.style.display = "none";
});
