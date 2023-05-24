var circleElement = document.getElementById("circle");
var positionX = 0;
var positionY = 0;
var speedX = 8;
var speedY = 8;

function animateCircle() {
  positionX += speedX;
  positionY += speedY;

  circleElement.style.left = positionX + "px";
  circleElement.style.top = positionY + "px";

  if (positionX + circleElement.offsetWidth >= window.innerWidth || positionX <= 0) {
    speedX = -speedX;
  }
  if (positionY + circleElement.offsetHeight >= window.innerHeight || positionY <= 0) {
    speedY = -speedY;
  }

  requestAnimationFrame(animateCircle);
}

animateCircle();
