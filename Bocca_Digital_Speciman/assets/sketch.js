// ============== Global Variables ============== //

// values
let minLength;
let numRadials = 7;

// images / assets
let wdwwImage;

// shape variables
let shape = [];
let shapeCenter;
let radials = [];
let radialSpacing = 50;

var canvas;

// ============== Preload Function ============== //

function preload() {
  // wdwwImage = loadImage('assets/WDWW.jpeg');
}

// ============== Setup Functions ============== //

function setup() {
  canvas = createCanvas(windowWidth-1, windowHeight-1);
  canvas.position(0,0);
  canvas.parent('sketch-holder');
  imageMode(CENTER);
  angleMode(DEGREES);
  curveTightness(0);

  // make the minimum leangth the window height, unless the width is smaller
  minLength = height
  if (width < height) {
    minLength = width;
  }

  populateShape();
  centerAlignShape();

  spawnRadials(shape, shapeCenter, radials);

}

function populateShape() {
  // use this funciton to give initial points to shape, and assign a center

  // assign points
  shape.push({x: 0.54, y: 0.54})
  shape.push({x: 0.5, y: 0.4});

  shape.push({x: 0.56, y: 0.44});
  shape.push({x: 0.6, y: 0.5});

  shape.push({x: 0.56, y: 0.56});
  shape.push({x: 0.5, y: 0.6});

  shape.push({x: 0.44, y: 0.56});
  shape.push({x: 0.4, y: 0.5});

  // assign center
  shapeCenter = {x:0.5, y: 0.5};

  // scale points relative to minLength
  for (let i=0; i<shape.length; i++) {
    shape[i].x = shape[i].x * minLength;
    shape[i].y = shape[i].y * minLength;

    // print scaled points for testing
    //console.log(shape[i].x, shape[i].y);
  }

  // scale center point
  shapeCenter.x = shapeCenter.x * minLength;
  shapeCenter.y = shapeCenter.y * minLength;

  // print center for testing
  //console.log(shapeCenter);

}

function centerAlignShape() {
  // after the shape has been populated with points, 
  // it can optionally be alinged with the center (unless minLength is
  // equal to heigt, where it will already be centered)

  for (let i=0; i<shape.length; i++) {
    shape[i].x += (width - minLength)/2;
  }

  shapeCenter.x += (width - minLength)/2;

}

// ============== Main Function ============== //

function draw() {
  background(17, 16, 17);

  updateRadials(shape, shapeCenter, radials);

  //drawReferance();

  stroke(255,0,0);
  fill(255,0,0, 30);

  for (let i=0; i<numRadials; i++) {
    drawShape(radials[i]);
  }

  fill(255);
  drawShape(shape);


  circle(shapeCenter.x, shapeCenter.y, 5);
  
}

// ============== Draw Functions ============== //

function drawReferance() {
  // draws the book cover for WDWW onto the middle of the page

  wdwwImage.resize(0, height+400);
  image(wdwwImage, width/2, height/2);
}

function drawShape(shape) {
  // draws a custom shape, using curves, from a given array indicating points (shape).
  // make sure the array (shape) is expected to have at least 4 points 

  let lastPoint = shape.length - 1;

  beginShape();

  curveVertex(shape[lastPoint].x, shape[lastPoint].y);

  for (let i=0; i<shape.length; i++) {
    curveVertex(shape[i].x, shape[i].y);
    //circle(shape[i].x, shape[i].y, 5);
  }

  curveVertex(shape[0].x, shape[0].y);
  curveVertex(shape[1].x, shape[1].y);



  endShape();

}

// ============== Helper Functions ============== //

function spawnRadials(shape, shapeCenter, radials) {
  // updates the position of each point in the radials
  // radials does not need to be pupolated with points before this function is called

  // spawn the correct number of radials
  for (let i=0; i<numRadials; i++) {
    radials.push([]);
  }


  // for every point in the shape
  for (let i=0; i<shape.length; i++) {

    // find the angle between the center and that point.
    let distX = shape[i].x - shapeCenter.x;
    let distY = shape[i].y - shapeCenter.y;
    let theta = calcAngle(distY, distX);

    let direcX = 1;
    let direcY = 1;
    if (distX < 0) {
      direcX = -1;
      direcY = -1;
    }

    // output the angle for testing
    //console.log(theta);

    let unitX = radialSpacing * Math.cos(theta);
    let unitY = radialSpacing * Math.sin(theta);

    let posX = shape[i].x;
    let posY = shape[i].y;

    // update each radial
    for (let j=0; j<numRadials; j++) {

      // update the relevant point within the radial

      posX += unitX * direcX;
      posY += unitY * direcY;

      radials[j].push({x:posX, y:posY});

    }
  }
};

function updateRadials(shape, shapeCenter, radials) {
  // updates the position of each point in the radials
  // radials does not need to be pupolated with points before this function is called

  // for every point in the shape
  for (let i=0; i<shape.length; i++) {

    // find the angle between the center and that point.
    let distX = shape[i].x - shapeCenter.x;
    let distY = shape[i].y - shapeCenter.y;
    let theta = calcAngle(distY, distX);

    let direcX = 1;
    let direcY = 1;
    if (distX < 0) {
      direcX = -1;
      direcY = -1;
    }

    // output the angle for testing
    //console.log(theta);

    let posX = shape[i].x;
    let posY = shape[i].y;

    // update each radial
    for (let j=0; j<numRadials; j++) {

      let tempAngle = wiggleAngle(theta, posX, posY);
      let tempRadialSpacing = wiggleRadialSpacing(posX, posY);

      // let unitX = radialSpacing * Math.cos(tempAngle);
      // let unitY = radialSpacing * Math.sin(tempAngle);
      let unitX = tempRadialSpacing * Math.cos(tempAngle);
      let unitY = tempRadialSpacing * Math.sin(tempAngle);

      // update the relevant point within the radial

      posX += unitX * direcX;
      posY += unitY * direcY;

      radials[j][i].x = posX;
      radials[j][i].y = posY;

    }
  }
};

function calcAngle(opposite, adjacent) {
  return Math.atan(opposite / adjacent);
}

function wiggleAngle(angle, x, y) {

  let angleRange = Math.PI * 1.2;

  let wiggle = noise(frameCount/700, x/70, y/70) * angleRange;
  wiggle = wiggle - (angleRange/2);

  return angle + wiggle;
}

function wiggleRadialSpacing(x, y) {

  let distRange = 70;
  let minDist = 10;

  let wiggle = noise(frameCount/400, x/20, y/20) * distRange;
  wiggle = wiggle + minDist; 
  return wiggle;
}

// ============== control Functions ============== //

function keyPressed() {

  // move center of shape
  if (keyCode === RIGHT_ARROW) {
    shapeCenter.x += 10;
  } else if (keyCode === LEFT_ARROW) {
    shapeCenter.x -= 10;
  }

  // move center of shape
  if (keyCode === DOWN_ARROW) {
    shapeCenter.y += 10;
  } else if (keyCode === UP_ARROW) {
    shapeCenter.y -= 10;
  }
}