// ======================== Global Variabls ======================== //

let ring = [];
let maxRadius = 250;

let angleBetweenPoints = 90;

let time = 0;
let speed = 1.2;

let ringColour;

var canvas

// ======================== Main Functions ======================== //

function setup() {
  canvas = createCanvas(windowWidth-17, windowHeight-1);
  canvas.position(0,0);
  canvas.parent('sketch-holder');
  frameRate(60);
  angleMode(DEGREES);

  ring.push(new Coordinate(0,0, 0, maxRadius));
  ring.push(new Coordinate(0,0, 45, maxRadius));
  // ring.push(new Coordinate(0,0, 90, maxRadius));
  ring.push(new Coordinate(0,0, 135, maxRadius));
  ring.push(new Coordinate(0,0, 180, maxRadius));
  // ring.push(new Coordinate(0,0, 225, maxRadius));
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
  drawLine

  ringColour = color(40,0,0);
  //ringColour = color(200,0,0);

  background(ringColour);

}

function draw() {

  fadeBackground();
  //background(191,0,0, 0.6);
  //background(0, 1);

  translate((sin(frameCount/8)+1)/3 * width, height*15/16);
  //translate(width*5/6, height*10/12);
  //translate(width/2, height/2);

  scale(1.8, 1.8);

  for (let i=0; i<3; i++) {
    drawRing(ring);
    rotate(120);
  }
  for (let i=0; i<3; i++) {
    //drawLine(ring);
    rotate(120);
  }

  updateRing(ring);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight-1);
  background(ringColour);
}

function fadeBackground() {
  if (frameCount % 2 === 0) {
    background(191,0,0, 0.6);
  }
}

// ======================== Helper Functions ======================== //

function drawLine(ring_) {

  for (let i=0; i<ring_.length; i++) {
    
    let x1 = ring[i].x1;
    let y1 = ring[i].y1; 

    let x2 = ring[i].x2;
    let y2 = ring[i].y2;

    
    stroke(170,0,0);
    strokeWeight(1);
    fill(0,0,0);
    circle(x2, y2, 5);

    stroke(0,50);
    strokeWeight(0.3);
    line(x1, y1, x2,y2);
  }
}

function drawRing(ring_) {

  stroke(ringColour);
  strokeWeight(3);
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

    time += deltaTime/1000 * speed;
    ring[i].radius = (sin(angle + time) + cos(angle/2 + time)) * (maxRadius/0.5);

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
