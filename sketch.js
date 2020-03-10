var canvas;
var looping = true;

var noise_time = 0;

var points = [];

let CFG = {

  lines_count: 6,
  point_count: 12,
  noise_inc: 0.004,
  noise_amp: 1000, // set in setup
  time_divider: 10

}


function setup() {

  canvas = createCanvas(window.innerWidth, window.innerHeight*4);
  canvas.parent("background_anim");
  background( 70 );
  smooth();
  // noLoop();
}


function draw() {

  background(0, 15);
  
  points = [];
  for (let i = 0; i < CFG.lines_count; i++) {
    let pts = makePoints(i)
    points.push( pts );
    push();
    translate( width/2, -CFG.noise_amp/3 );
    drawPoints();
    pop();
  }
  
  noise_time += CFG.noise_inc;
}


function makePoints( mod ) {

  let _points = [];

  for (let i = 0; i < CFG.point_count; i++) {
    let pt = new p5.Vector(0, i * height/CFG.point_count);
    let noise_displace_x = ( noise(pt.y * CFG.noise_inc, noise_time + mod/CFG.time_divider) -0.5 ) * CFG.noise_amp;
    let noise_displace_y = ( noise(pt.x * CFG.noise_inc, noise_time + mod/CFG.time_divider) -0.5 ) * CFG.noise_amp;
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
    curveVertex(pts[0].x, pts[0].y);
    for (let i = 0; i < pts.length; i++) {
      curveVertex(pts[i].x, pts[i].y);
    }
    // curveVertex(pts[pts.length-1].x, pts[pts.length-1].y);
    // curveVertex(pts[0].x, pts[0].y);
    // curveVertex(pts[1].x, pts[1].y);
    endShape();
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
