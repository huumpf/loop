var canvas;
var looping = true;

var noise_time = 0;

var points = [];

const CFG = {

  point_count: 15,
  radius: 200,
  noise_inc: 0.005,
  noise_amp: 300,
  circles: 6

}


function setup() {

  canvas = createCanvas(window.innerWidth, window.innerHeight);
  canvas.parent("header");
  // noLoop();
  background( 70 );
  smooth();

}


function draw() {

  background(0, 15);
  
  points = [];
  for (let i = 0; i < CFG.circles; i++) {
    let pts = makePoints(i)
    points.push( pts );
    drawPoints();
  }
  
  if (noise_time == 0) {
    console.log(points);
  }
  
  noise_time += CFG.noise_inc;
}


function makePoints( mod ) {

  let _points = [];

  for (let i = 0; i < CFG.point_count; i++) {
    let pt = new p5.Vector.fromAngle( TWO_PI / CFG.point_count * i, CFG.radius);
    pt.add( new p5.Vector(width/2, height/2) );
    let noise_displace_x = ( noise(pt.y * CFG.noise_inc, noise_time + mod/10) -0.5 ) * CFG.noise_amp;
    let noise_displace_y = ( noise(pt.x * CFG.noise_inc, noise_time + mod/10) -0.5 ) * CFG.noise_amp;
    pt.add( new p5.Vector( noise_displace_x, noise_displace_y ));
    _points.push( pt );
  }

  return _points;

}

function drawPoints() {
  stroke(255, 8);
  strokeWeight(1);
  noFill();
  points.forEach(pts => {
    beginShape();
    curveVertex(pts[pts.length-1].x, pts[pts.length-1].y);
    for (let i = 0; i < pts.length; i++) {
      curveVertex(pts[i].x, pts[i].y);
    }
    // curveVertex(pts[pts.length-1].x, pts[pts.length-1].y);
    curveVertex(pts[0].x, pts[0].y);
    // curveVertex(pts[1].x, pts[1].y);
    endShape(CLOSE);
  });
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
