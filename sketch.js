var canvas;
var looping = true;

var noise_time = 0;

var points = [];

const CFG = {

  point_count: 40,
  radius: 400,
  noise_inc: 0.01,
  noise_amp: 500

}

function setup() {
  canvas = createCanvas(window.innerWidth, window.innerHeight);
  // noLoop();
}

function draw() {
  background(30, 15);
  makePoints();
  drawPoints();
  noise_time += CFG.noise_inc;
}

function makePoints() {

  points = [];

  for (let i = 0; i < CFG.point_count; i++) {
    // console.log("point created");
    let pt = new p5.Vector.fromAngle( TWO_PI / CFG.point_count * i, CFG.radius);
    pt.add( new p5.Vector(width/2, height/2) );
    let noise_displace_x = ( noise(pt.x * CFG.noise_inc, noise_time) -0.5 )* CFG.noise_amp;
    let noise_displace_y = ( noise(pt.y * CFG.noise_inc, noise_time) -0.5 )* CFG.noise_amp;
    // console.log( CFG.noise_amp );
    pt.add( new p5.Vector( noise_displace_x, noise_displace_y ));
    points.push( pt );
  }
}

function drawPoints() {
  stroke(255, 40);
  strokeWeight(1);
  noFill();
  beginShape();
  for (let i = 0; i < points.length; i++) {
    curveVertex(points[i].x, points[i].y);
  }
  endShape(CLOSE);
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
