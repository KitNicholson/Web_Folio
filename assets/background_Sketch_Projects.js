// ======================== Global Variabls ======================== //

let boxes = [];
let boxCornerSize = 10;

let weight = 6;

// let colour;
// let baseColour;

let fillColour;
let edgeColour;
let baseColour;

let overflow;

var canvas

// ======================== Main Functions ======================== //

function setup() {

  // Source - https://stackoverflow.com/a/1147768
  // Posted by Borgar, modified by community. See post 'Timeline' for change history
  // Retrieved 2026-08-03, License - CC BY-SA 3.0
  var body = document.body,
      html = document.documentElement;
  var pageHeight = Math.max( body.scrollHeight, body.offsetHeight, 
                        html.clientHeight, html.scrollHeight, html.offsetHeight );

  // console.log(pageHeight);
  
  canvas = createCanvas(windowWidth-20, windowHeight);
  canvas.position(0,0);
  canvas.parent('sketch-holder');
  frameRate(30);
  angleMode(DEGREES);

  overflow = width*0.2;

  fillColour = color(240);
  edgeColour = color(220);
  baseColour = color(158, 144, 116);

  let boxTypes = ['IMAGE', 'BLANK']

  // spawn random number of boxes
  for (let i=0; i<random(7, 14); i++) {
    boxes.push(new Box(random(0-overflow, width), random(0-overflow, height), 
                       random(width*0.3, width*0.6), random(height*0.2, height*0.6),
                       random(boxTypes)));
  }

  drawingContext.shadowOffsetX = 0;
  drawingContext.shadowOffsetY = 0;
  drawingContext.shadowColor = color(220);
} 

function draw() {

  blendMode(BLEND);

  background(255);

  // // remove previous frame
  // erase();
  // fill(fillColour);
  // rect(-10,-10, width + 20, height + 20);
  // noErase();
  // background(baseColour);

  drawBoxes(boxes);

  animateBoxesSimple(boxes);

  blendMode(MULTIPLY);
  // Style shapes using shadows.
  drawingContext.shadowBlur = 0;
  background(baseColour);


}

// ======================== Helper Functions ======================== //

function windowResized() {
  resizeCanvas(windowWidth, windowHeight-1);
}

function drawBoxes(boxes) {
  // draws all boxes in a given array

  for (let i=0; i<boxes.length; i++) {

    // set styles for box
    fill(fillColour);
    noStroke();
    drawingContext.shadowBlur = 60;
    drawingContext.shadowOffsetX = -25;
    drawingContext.shadowOffsetY = 25;
    // draw box
    rect(boxes[i].x, boxes[i].y, boxes[i].w, boxes[i].h);

    //set styles for outline
    stroke(edgeColour);
    strokeWeight(weight);
    drawingContext.shadowOffsetX = 0;
    drawingContext.shadowOffsetY = 0;
    drawingContext.shadowBlur = 0;
    //draw main outline
    rect(boxes[i].x, boxes[i].y, boxes[i].w, boxes[i].h);


    // set styles for corners
    fill(edgeColour);
    noStroke();

    // draw corners, with conditions for negitive width and height
    if ((boxes[i].w < 0) & (boxes[i].h < 0)) {
      rect(boxes[i].x + boxCornerSize, boxes[i].y + boxCornerSize, -boxCornerSize, -boxCornerSize);
      rect(boxes[i].x + boxes[i].w, boxes[i].y + boxCornerSize, -boxCornerSize, -boxCornerSize);
      rect(boxes[i].x + boxes[i].w, boxes[i].y + boxes[i].h, -boxCornerSize, -boxCornerSize);
      rect(boxes[i].x + boxCornerSize, boxes[i].y + boxes[i].h, -boxCornerSize, -boxCornerSize);

    } else if (boxes[i].w < 0) {
      rect(boxes[i].x + boxCornerSize, boxes[i].y - boxCornerSize, -boxCornerSize, boxCornerSize);
      rect(boxes[i].x + boxes[i].w, boxes[i].y - boxCornerSize, -boxCornerSize, boxCornerSize);
      rect(boxes[i].x + boxes[i].w, boxes[i].y + boxes[i].h, -boxCornerSize, boxCornerSize);
      rect(boxes[i].x + boxCornerSize, boxes[i].y + boxes[i].h, -boxCornerSize, boxCornerSize);
    } else if (boxes[i].h < 0) {
      rect(boxes[i].x - boxCornerSize, boxes[i].y + boxCornerSize, boxCornerSize, -boxCornerSize);
      rect(boxes[i].x + boxes[i].w, boxes[i].y + boxCornerSize, boxCornerSize, -boxCornerSize);
      rect(boxes[i].x + boxes[i].w, boxes[i].y + boxes[i].h, boxCornerSize, -boxCornerSize);
      rect(boxes[i].x - boxCornerSize, boxes[i].y + boxes[i].h, boxCornerSize, -boxCornerSize);
    } else {
      rect(boxes[i].x - boxCornerSize, boxes[i].y - boxCornerSize, boxCornerSize, boxCornerSize);
      rect(boxes[i].x + boxes[i].w, boxes[i].y - boxCornerSize, boxCornerSize, boxCornerSize);
      rect(boxes[i].x + boxes[i].w, boxes[i].y + boxes[i].h, boxCornerSize, boxCornerSize);
      rect(boxes[i].x - boxCornerSize, boxes[i].y + boxes[i].h, boxCornerSize, boxCornerSize);
    }

    // draw mid-points, with conditions for negitive width and height
    let size = boxCornerSize*0.7;
    let Xmid = boxes[i].x + (boxes[i].w / 2);
    if (boxes[i].h < 0) {
      rect(Xmid - size/2, boxes[i].y + size, size, -size);
      rect(Xmid - size/2, boxes[i].y + boxes[i].h, size, -size);
    } else {
      rect(Xmid - size/2, boxes[i].y - size, size, size);
      rect(Xmid - size/2, boxes[i].y + boxes[i].h, size, size);
    }
    let Ymid = boxes[i].y + (boxes[i].h / 2);
    if (boxes[i].w < 0) {
      rect(boxes[i].x + size, Ymid - size/2, -size, size);
      rect(boxes[i].x + boxes[i].w, Ymid - size/2, -size, size); 
    } else {
      rect(boxes[i].x - size, Ymid - size/2, size, size);
      rect(boxes[i].x + boxes[i].w, Ymid - size/2, size, size); 
    }

    //add extra details dependant on box type

    if (boxes[i].type === 'IMAGE') {
      // set styles for outline
      noFill()
      stroke(edgeColour);
      strokeWeight(weight*0.6);

      line(boxes[i].x, boxes[i].y, boxes[i].x + boxes[i].w, boxes[i].y + boxes[i].h);
      line(boxes[i].x, boxes[i].y + boxes[i].h, boxes[i].x + boxes[i].w, boxes[i].y);
    }

  }
}

function animateBoxesSimple(boxes) {
  // moves boxes around

  for (let i=0; i<boxes.length; i++) {

    if (boxes[i].animateX) {
      boxes[i].x += sin(0.7*(frameCount + (i*180))) *2.5;
    }

    if (boxes[i].animateY) {
      boxes[i].y += cos(0.4*(frameCount + (i*180))) *2.5;
    }

    if (boxes[i].animateW) {
      boxes[i].w += sin(0.7*(frameCount + (i*280))) *2.5;
    }

    if (boxes[i].animateH) {
      boxes[i].h += cos(0.4*(frameCount + (i*280))) *2.5;
    }

  }


}

// ======================== constructors ======================== //

function Box(x_, y_, w_, h_, type_) {
  this.x = x_;
  this.y = y_;
  this.w = w_;
  this.h = h_;

  this.type = type_;

  this.animateX = random([true, false]);
  this.animateY = random([true, false]);
  this.animateW = random([true, false]);
  this.animateH = random([true, false]);
}
