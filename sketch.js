var canvas;
var looping = true;

var noise_time = 0;

var points = [];

const CFG = {

  point_count: 40,
  radius: 350,
  noise_inc: 0.005,
  noise_amp: 300

}

function setup() {

  canvas = createCanvas(window.innerWidth, window.innerHeight);
  // noLoop();
  background( 70 );

}

function draw() {

  background(10, 15);
  points = makePoints();
  drawPoints();
  noise_time += CFG.noise_inc;
}

function makePoints() {

  this.points = [];

  for (let i = 0; i < CFG.point_count; i++) {
    let pt = new p5.Vector.fromAngle( TWO_PI / CFG.point_count * i, CFG.radius);
    pt.add( new p5.Vector(width/2, height/2) );

    let noise_displace_x = ( noise(pt.y * CFG.noise_inc, noise_time) -0.5 )* CFG.noise_amp;
    let noise_displace_y = ( noise(pt.x * CFG.noise_inc, noise_time) -0.5 )* CFG.noise_amp;
    pt.add( new p5.Vector( noise_displace_x, noise_displace_y ));
    
    this.points.push( pt );
  }

  return this.points;

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
