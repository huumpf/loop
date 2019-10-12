var canvas;
var looping = true;

function setup() {
  canvas = createCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
  background(220);
}

function keyTyped() {
  if (key === " ") {
    if (looping) {
      noLoop();
      looping = false;
    } else {
      loop();
      looping = true;
    }
  }
}