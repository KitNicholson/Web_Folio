// ============== Global Variables ============== //

// values
let minLength;
let numRadials = 5;
let radialSpacing; // defined relative to minLength in setup()

// shape variables

let shape1 = [];
let shape1Center; // dictionary with x and y as keys for position
let wobblyCenter1; // optional shape center that can animate relative to shapeCenter
let radials1 = [];

let shape2 = [];
let shape2Center;
let wobblyCenter2;
let radials2 = [];

var canvas;

// ============== Setup Functions ============== //

function setup() {
  canvas = createCanvas(windowWidth-15, windowHeight*1.3);
  canvas.position(0,0);
  canvas.parent('cover-graphic');
  canvas.style('z-index', '-1');

  angleMode(DEGREES);
  curveTightness(0);

  // make the minimum leangth the window height, unless the width is smaller
  minLength = windowHeight
  if (windowWidth < windowHeight) {
    minLength = windowWidth;
  }

  // set radial spacing
  radialSpacing = 0.18*minLength;

  // set up shapes

  shape1Center = {x:0.5, y: 0.54};
  populateShape1(shape1, shape1Center);
  centerAlignShape(shape1, shape1Center);
  spawnRadials(shape1, shape1Center, radials1);
  wobblyCenter1 = {x:0, y: 0};

  shape2Center = {x:0.5, y: 0.53};
  populateShape2(shape2, shape2Center);
  centerAlignShape(shape2, shape2Center);
  spawnRadials(shape2, shape2Center, radials2);
  wobblyCenter2 = {x:0, y: 0};


}

function populateShape1(shape, shapeCenter) {
  // use this funciton to give initial points to shape, and assign a center

  // assign points
  shape.push({x: 0.3, y: 0.5})

  shape.push({x: 0.43, y: 0.42})
  shape.push({x: 0.5, y: 0.53})
  shape.push({x: 0.57, y: 0.42})

  shape.push({x: 0.7, y: 0.5})

  shape.push({x: 0.6, y: 0.56})
  shape.push({x: 0.4, y: 0.56})

  scalePoints(shape, shapeCenter);

}

function populateShape2(shape, shapeCenter) {
  // use this funciton to give initial points to shape, and assign a center

  // assign points
  shape.push({x: 0.3, y: 0.51})

  shape.push({x: 0.7, y: 0.51})

  shape.push({x: 0.58, y: 0.58})
  shape.push({x: 0.42, y: 0.58})

  scalePoints(shape, shapeCenter);
}

function centerAlignShape(shape, shapeCenter) {
  // after the shape has been populated with points, 
  // it can optionally be alinged with the center (unless minLength is
  // equal to heigt, where it will already be centered)

  for (let i=0; i<shape.length; i++) {
    shape[i].x += (width - minLength)/2;
  }

  shapeCenter.x += (width - minLength)/2;
}

function scalePoints(shape, shapeCenter) {
  // scales the points relative to the canvas

  for (let i=0; i<shape.length; i++) {
    shape[i].x = shape[i].x * minLength;
    shape[i].y = shape[i].y * minLength;
  }

  // scale center point
  shapeCenter.x = shapeCenter.x * minLength;
  shapeCenter.y = shapeCenter.y * minLength;
}

// ============== Main Function ============== //

function draw() {

  // clear previous frame
  erasePrevFrame();

  animateShapeCenter(shape1Center, wobblyCenter1, 0, 5, 1);
  animateShapeCenter(shape2Center, wobblyCenter2, 50, 5, 1);

  // update raidals
  updateRadials(shape1, wobblyCenter1, radials1);
  updateRadials(shape2, wobblyCenter2, radials2);
  

  // set stroke styles
  stroke(255,230,0, 200);
  strokeWeight(0.8);
  // noStroke();

  // set colour for shape 1, and then draw the radials for shape 1
  fill(255,0,0, 45);
  for (let i=0; i<numRadials; i++) {
    drawRadialsWoble(radials1[i], shape1Center);
  }

  // set colour for shape 2, and then draw the radials for shape 2
  fill(255, 0, 255, 20);
  for (let i=0; i<numRadials; i++) {
    drawRadialsWoble(radials2[i], shape2Center);
  }

  // // draw base shapes
  // fill(255);
  // drawShape(shape1);
  // fill(200);
  // drawShape(shape2);

  // draw shape center for debuging
  fill(0,255,0);
  // circle(shape1Center.x, shape1Center.y, 5);
  // circle(wobblyCenter1.x, wobblyCenter1.y, 5);
  // circle(shape2Center.x, shape2Center.y, 5);
  
}

// ============== Draw Functions ============== //

function drawShape(shape) {
  // draws a custom shape, using curves, from a given array indicating points (shape).
  // make sure the array (shape) is expected to have at least 4 points 

  let lastPoint = shape.length - 1;

  beginShape();

  curveVertex(shape[lastPoint].x, shape[lastPoint].y);

  for (let i=0; i<shape.length; i++) {
    curveVertex(shape[i].x, shape[i].y);
  }

  curveVertex(shape[0].x, shape[0].y);
  curveVertex(shape[1].x, shape[1].y);

  endShape();
}

function drawRadialsWoble(shape, shapeCenter) {
  // draws a custom shape from a given array indicating key points (shape).
  // the points will be drawn near where they actualy are in a 'wiggle' effect
  // make sure the array (shape) is expected to have at least 4 points 

  let lastPoint = shape.length - 1;

  beginShape();

  curveVertex(shape[lastPoint].x, shape[lastPoint].y);

  for (let i=0; i<shape.length; i++) {
    let dist = euclideanDist(shapeCenter, shape[i].x, shape[i].y);
    curveVertex(shape[i].x + getDeviNonLin(shape[i].x, dist), shape[i].y + getDeviNonLin(shape[i].y, dist));
  }

  let dist0 = euclideanDist(shapeCenter, shape[0].x, shape[0].y);
  curveVertex(shape[0].x + getDeviNonLin(shape[0].x, dist0), shape[0].y + getDeviNonLin(shape[0].y, dist0));
  let dist1 = euclideanDist(shapeCenter, shape[1].x, shape[1].y);
  curveVertex(shape[1].x + getDeviNonLin(shape[1].x, dist1), shape[1].y + getDeviNonLin(shape[1].y, dist1));

  endShape();
}

function erasePrevFrame() {
  // instead of drawing a solid background each frame, the previous frame is removed
  
  erase();
  rect(-10, -10, width+20, height+20); // 10px overlap around the edge of the canvas
  noErase();
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
  // spawnRadials should be called first

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

function animateShapeCenter(shapeCenter, wobblyCenter, xRange, yRange, speed) {
  // moves wobblyCenter around shapeCenter, according to xRange, yRange, and speed

  let xOffset = noise(1, frameCount* 0.006 * speed) * 2*xRange;
  xOffset -= xRange;
  wobblyCenter.x = shapeCenter.x + xOffset;

  let yOffset = noise(3, frameCount * 0.006 * speed) * 2*yRange;
  yOffset -= yRange;
  wobblyCenter.y = shapeCenter.y + yOffset;

}

function calcAngle(opposite, adjacent) {
  return Math.atan(opposite / adjacent);
}

function getDeviNonLin(pos, dist) {
  // gives a deviation that scales non-linearly based on distance (dist)
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
    shape1Center.x += 10;
  } else if (keyCode === LEFT_ARROW) {
    shape1Center.x -= 10;
  }

  // move center of shape
  if (keyCode === DOWN_ARROW) {
    shape1Center.y += 10;
  } else if (keyCode === UP_ARROW) {
    shape1Center.y -= 10;
  }
}


//  =========== TO DO LIST == //

// make shape center move

// better colour controls

// make code work for multiple shapes with different variables (namee space)

// make spaz movement a variable, not magic number




// =========== DONE LIST == //

// add capacity for multiple shapes in the one sketch

// add euclidean distance from center
// - wobblyness of radial

// get rid of bag wiggle code

// make radial spacing non-linear

// add euclidean dist