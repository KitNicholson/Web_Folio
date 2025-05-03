// ============== Global Variables ============== //

// values
let minLength;
let numRadials = 8;

// images / assets
let wdwwImage;

// shape variables
let shape = [];
let shapeCenter; // dictionary with x and y as keys for position
let radials = [];
let radialSpacing = 40;

var canvas;

// ============== Preload Function ============== //

// ============== Setup Functions ============== //

function setup() {
  canvas = createCanvas(windowWidth-15, windowHeight);
  canvas.position(0,0);
  canvas.style('z-index', '-1');

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
  shapeCenter = {x:0.55, y: 0.55};

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
  fill(255,0,0, 45);

  for (let i=0; i<numRadials; i++) {
    //drawShape(radials[i]);
    drawRadialsWoble(radials[i]);
  }

  // fill(255);
  // drawShape(shape);


  //circle(shapeCenter.x, shapeCenter.y, 5);
  
}

// ============== Draw Functions ============== //

function drawShape() {
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

function drawRadialsWoble(shape) {
  // draws a custom shape, using curves, from a given array indicating points (shape).
  // the points will be drawn near where they actualy are and 'wiggle' in time
  // make sure the array (shape) is expected to have at least 4 points 

  let lastPoint = shape.length - 1;

  beginShape();

  curveVertex(shape[lastPoint].x, shape[lastPoint].y);

  for (let i=0; i<shape.length; i++) {

    let dist = euclideanDist(shapeCenter, shape[i].x, shape[i].y);

    curveVertex(shape[i].x + getDeviNonLin(shape[i].x, dist), shape[i].y + getDeviNonLin(shape[i].y, dist));
    //circle(shape[i].x, shape[i].y, 5);
  }

  let dist0 = euclideanDist(shapeCenter, shape[0].x, shape[0].y);
  curveVertex(shape[0].x + getDeviNonLin(shape[0].x, dist0), shape[0].y + getDeviNonLin(shape[0].y, dist0));
  let dist1 = euclideanDist(shapeCenter, shape[1].x, shape[1].y);
  curveVertex(shape[1].x + getDeviNonLin(shape[1].x, dist1), shape[1].y + getDeviNonLin(shape[1].y, dist1));



  endShape();

}

// ============== Helper Functions ============== //

function spawnRadials(shape, shapeCenter, radials) {
  // updates the position of each point in the radials
  // radials does not need to be pupolated with points before this function is called

  // spawn the correct number of radials
  for (let i=0; i<numRadials; i++) {
    radials.push([]);

    // for the current radial, spawn the correct number of points
    for (let j=0; j<shape.length; j++) {

      radials[i].push({x:shapeCenter.x, y:shapeCenter.y});

    }
  }
};

function updateRadials(shape, shapeCenter, radials) {
  // updates the position of each point in the radials as related to the center
  // radials does not need to be populated with points before this function is called

  // for every point in the shape
  for (let i=0; i<shape.length; i++) {

    // find the angle between the center and that point.
    let distX = shape[i].x - shapeCenter.x;
    let distY = shape[i].y - shapeCenter.y;
    // let distX = shape[i].x - mouseX;
    // let distY = shape[i].y - mouseY;
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

    let unitX = radialSpacing * Math.cos(theta);
    let unitY = radialSpacing * Math.sin(theta);

    // update all points in each radial that are based on the current point in the shape
    for (let j=0; j<numRadials; j++) {

      // update the relevant point within the radial
      posX += unitX * (2**((j-4)/2.5)) * direcX;
      posY += unitY * (2**((j-4)/2.5)) * direcY;

      radials[j][i].x = posX;
      radials[j][i].y = posY;

    }
  }
};

function calcAngle(opposite, adjacent) {
  return Math.atan(opposite / adjacent);
}

function getDeviation(pos) {
  deviation = noise(pos/120, frameCount/120);
  deviation -=0.5; // change range of deviation from (0,1), to (-0.5, 0.5);
  deviation *= 120;

  return deviation;
}

function getDeviNonLin(pos, dist) {
  // gives a deviation that scales non-linearly based on distance(dist)
  deviation = noise(pos/120, frameCount/120);
  deviation -=0.5; // change range of deviation from (0,1), to (-0.5, 0.5);
  deviation *= (dist**1.1)/3;

  return deviation;
}

function euclideanDist(shapeCenter, radX, radY) {
  // finds the distance between two points, shapeCenter, and the point described by radX, radY
  
  let distX = shapeCenter.x - radX;
  let distY = shapeCenter.y - radY;

  let hypSquared = (distX**2) + (distY**2);
  let hypot = Math.sqrt(hypSquared);

  return hypot;
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



//  =========== TO DO LIST == //

// make code work for multiple shapes with different variables

// animate colour

// import letter forms - make letter forms shape

// animate changes to number of radials

// make spaz movement a variable, not magic number




// =========== DONE LIST == //

// add euclidean distance from center
// - wobblyness of radial

// get rid of bag wiggle code

// make radial spacing non-linear

// add euclidean dist