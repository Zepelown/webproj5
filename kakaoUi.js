const $searchButton = document.querySelector('.search_button');
const $menuWrap = document.querySelector('#menu_wrap');
const $searchInput = document.querySelector('.search_input');
const $searchform = document.querySelector('.search_form');
const $findWay = document.querySelector('.find_way');
const $findWayButtonBox = document.querySelector('.find_way_button_box');
const $startFindWay = document.querySelector('.start_find_way');
const $markerDelete = document.querySelector('.marker_delete');
const $removeMakerBtn = document.querySelector('#removeMarkerBtn');
const $pagination = document.querySelector('#pagination');


$findWay.addEventListener('click', () => {
    $findWay.style.display = 'none';
    $startFindWay.style.display = 'block';
    $findWayButtonBox.style.backgroundColor = 'red'
    $markerDelete.style.opacity = '1'
})

$markerDelete.addEventListener('click', () => {
    $findWay.style.display = 'block';
    $startFindWay.style.display = 'none';
    $findWayButtonBox.style.backgroundColor = '#258fff';
    $markerDelete.style.opacity = '0'

})




// $searchButton.addEventListener('click', () => {
//     $menuWrap.style.transform = 'translateY(0)'
// })

$searchInput.addEventListener('focus', () => {
    $menuWrap.style.height = '100%';
    $removeMakerBtn.style.display = 'flex';

})

$searchform.addEventListener('submit', () => {
    $menuWrap.style.overflowY = 'auto';
})

$removeMakerBtn.addEventListener('click', () => {
    $menuWrap.style.height = '10%';
    $pagination.style.display = 'none';
    $removeMakerBtn.style.display = 'none';

})