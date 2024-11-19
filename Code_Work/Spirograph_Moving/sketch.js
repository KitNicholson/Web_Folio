// ======================== Global Variabls ======================== //

let ring = [];
let maxRadius = 360;

let angleBetweenPoints = 90;

let time = 0;
let speed = 1.5;

// ======================== Main Functions ======================== //

function setup() {
  canvas = createCanvas(windowWidth - 30, windowHeight - 1);
  canvas.position(0,0);
  angleMode(DEGREES);

  ring.push(new Coordinate(0,0, 0, maxRadius));
  ring.push(new Coordinate(0,0, 45, maxRadius));
  ring.push(new Coordinate(0,0, 90, maxRadius));
  ring.push(new Coordinate(0,0, 135, maxRadius));
  ring.push(new Coordinate(0,0, 180, maxRadius));
  ring.push(new Coordinate(0,0, 225, maxRadius));
  ring.push(new Coordinate(0,0, 270, maxRadius));
  ring.push(new Coordinate(0,0, 315, maxRadius));
  // ring.push(new Coordinate(0,0, 0, maxRadius));
  // ring.push(new Coordinate(0,0, 45, maxRadius));
  // ring.push(new Coordinate(0,0, 90, maxRadius));
  // ring.push(new Coordinate(0,0, 135, maxRadius));
  // ring.push(new Coordinate(0,0, 180, maxRadius));
  // ring.push(new Coordinate(0,0, 225, maxRadius));
  // ring.push(new Coordinate(0,0, 270, maxRadius));
  // ring.push(new Coordinate(0,0, 315, maxRadius));

  updateRing(ring);
  console.log(ring);
  drawLine
  background(0);
}

function draw() {

  background(200, 2);

  translate(width/2, height/2);

  for (let i=0; i<3; i++) {
    //drawLine(ring);
    drawRing(ring);
    rotate(120);
  }

  updateRing(ring);
}

// ======================== Helper Functions ======================== //

function drawLine(ring_) {

  stroke(255,0,0);
  fill(255);

  for (let i=0; i<ring_.length; i++) {
    
    let x1 = ring[i].x1;
    let y1 = ring[i].y1; 

    let x2 = ring[i].x2;
    let y2 = ring[i].y2;

    line(x1, y1, x2,y2);
    circle(x2, y2, 10);
  }
}

function drawRing(ring_) {

  stroke(0);
  noFill();

  beginShape();

  for (let i=0; i<ring_.length; i++) {
    curveVertex(ring_[i].x2, ring_[i].y2);
  }

  curveVertex(ring_[0].x2, ring_[0].y2);
  curveVertex(ring_[1].x2, ring_[1].y2);
  curveVertex(ring_[2].x2, ring_[2].y2);
  endShape();
}

function updateRing(ring_) {
  // distance from origin (Radius) = sin(theta + time);

  for (let i=0; i<ring_.length; i++) {

    // update radius distance

    //get angle
    angle = 360 * (i / ring_.length)
    console.log(angle);

    time += deltaTime/1000 * speed;
    ring[i].radius = (sin(angle + time) + cos(angle/2 + time)) * (maxRadius/2);

    //update x2 and y2 

    ring[i].x2 = ring[i].x1 + cos(ring[i].angle) * ring[i].radius;
    ring[i].y2 = ring[i].y1 + sin(ring[i].angle) * ring[i].radius;
  }
}

// ======================== constructors ======================== //

function Coordinate(x_, y_, angle_, radius_) {
  this.x1 = x_;
  this.y1 = y_;
  this.x2 = 0;
  this.y2 = 0;
  this.angle = angle_;
  this.radius = radius_;
}

// ======================== Helpers ======================== //

function windowResized() {
  resizeCanvas(windowWidth-30, windowHeight-1);
  background(0);
}