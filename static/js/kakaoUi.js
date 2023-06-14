const $searchButton = document.querySelector(".search_button");
const $menuWrap = document.querySelector("#menu_wrap");
const $searchInput = document.querySelector(".search_input");
const $searchform = document.querySelector(".search_form");
const $findWay = document.querySelector(".find_way");
const $findWayButtonBox = document.querySelector(".find_way_button_box");
const $startFindWay = document.querySelector(".start_find_way");
const $markerDelete = document.querySelector(".marker_delete");
const $removeMakerBtn = document.querySelector("#removeMarkerBtn");
const $pagination = document.querySelector("#pagination");
const $navButtonBox = document.querySelector(".nav_button_box");
const $navButtonDangerBox = document.querySelector(".nav_button_danger_area");
const $navButtonFacilities = document.querySelector(".nav_button_facilities");
const $navBUttonOldman = document.querySelector(".nav_button_oldman");
const $sideMenuBox = document.querySelector(".side_menu_box");
const $searchAnchamMenuButton = document.querySelector(
  ".search_ancham_menu_button"
);
const $sideMenuExitButton = document.querySelector(".side_menu_exit_button");
const $sideMenuLogin = document.querySelector(".side_menu_login");
const $loginBigBox = document.querySelector(".login_bigbox");
const $loginExit = document.querySelector(".login_exit");
const $goJoinButton = document.querySelector(".gojoin_button");
const $userJoinbox = document.querySelector(".user_join_box");
const $joinExitButton = document.querySelector(".join_exit");

$joinExitButton.addEventListener("click", () => {
  $userJoinbox.style.transform = "translate(-3000px)";
});

$goJoinButton.addEventListener("click", (e) => {
  e.preventDefault();
  $loginBigBox.style.display = "none";
  $userJoinbox.style.transform = "translateX(0)";
});

$loginExit.addEventListener("click", () => {
  $loginBigBox.style.display = "none";
});

$sideMenuLogin.addEventListener("click", () => {
  $sideMenuBox.style.transform = "translateX(-300px)";

  $loginBigBox.style.display = "flex";
});

$sideMenuLogin.addEventListener("mouseover", () => {
  $sideMenuLogin.style.backgroundColor = "rgba(0,0,0,0.8)";
});

$sideMenuLogin.addEventListener("mouseout", () => {
  $sideMenuLogin.style.backgroundColor = "rgba(0,0,0,0.3)";
});

$sideMenuExitButton.addEventListener("click", () => {
  $sideMenuBox.style.transform = "translateX(-300px)";
});

$searchAnchamMenuButton.addEventListener("click", () => {
  $sideMenuBox.style.transform = "translateX(0)";
});

$navButtonDangerBox.addEventListener("mouseover", () => {
  $navButtonDangerBox.style.backgroundColor = "rgba(0,0,0,0.4)";
  $navButtonDangerBox.style.color = "white";
});

$navButtonDangerBox.addEventListener("mouseout", () => {
  $navButtonDangerBox.style.backgroundColor = "white";
  $navButtonDangerBox.style.color = "black";
});

$navButtonFacilities.addEventListener("mouseover", () => {
  $navButtonFacilities.style.backgroundColor = "rgba(0,0,0,0.4)";
  $navButtonFacilities.style.color = "white";
});

$navButtonFacilities.addEventListener("mouseout", () => {
  $navButtonFacilities.style.backgroundColor = "white";
  $navButtonFacilities.style.color = "black";
});

$navBUttonOldman.addEventListener("mouseover", () => {
  $navBUttonOldman.style.backgroundColor = "rgba(0,0,0,0.4)";
  $navBUttonOldman.style.color = "white";
});

$navBUttonOldman.addEventListener("mouseout", () => {
  $navBUttonOldman.style.backgroundColor = "white";
  $navBUttonOldman.style.color = "black";
});
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

// $searchButton.addEventListener('click', () => {
//     $menuWrap.style.transform = 'translateY(0)'
// })

$searchInput.addEventListener("focus", () => {
  $menuWrap.style.height = "100%";
  $removeMakerBtn.style.display = "flex";
});

$searchform.addEventListener("submit", () => {
  $menuWrap.style.overflowY = "auto";
});

$removeMakerBtn.addEventListener("click", () => {
  $menuWrap.style.height = "10%";
  $pagination.style.display = "none";
  $removeMakerBtn.style.display = "none";
});
