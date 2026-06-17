// ================= variables ================= //

let currPoint; // current point
let prevPoint; // previous point

let colourA;
let hueA;
let colourB;
let hueB;

let hueChange;

let shots = 1500;
let spread;
let shotSize = 1.2;

let running = true;
let step = 0;
let stepRate = 1.2;

// ================= Setup ================= //

function setup() {
  createCanvas(windowWidth-1, windowHeight);
  frameRate(60);
  angleMode(DEGREES);
  colorMode(HSB);
  // colorMode(RGB);
  noStroke();

  setValues();

  background(10);

  advancePointCircle();
}

function setValues() {

  hueA = 0//340;
  colourA = color(hueA, 100, 100);
  // colourA = color(255,0,0);
  hueB = 30//250;
  colourB = color(hueB, 100, 100);
  // colourB = color(0,0,255)

  hueChange = 0.2 //0.2;

  prevPoint = {x: 0, y: height/2};
  currPoint = {x: 10, y: height/2};

  spread = height/6.5;
}

// ================= Main ================= //

function draw() {

  if (frameCount % 10 === 0) {
    background(0, 0, 0, 0.04);
  }

  // testing();

  // console.log('running');

  if (width/height > 1.4) {
    advancePointInfinity();
  } else if (width/height < 0.7) {
    advancePointHourglass();
  } else {
    advancePointCircle();
  }


  
  advanceHue();
  // advanceHueFromPosition();

  // drawSplitBlast();
  // drawSmoothBlast();

  // drawSplitBlastSmooth();

  drawEndPoint();

  step += stepRate;

  if (!running) {
    for (let i=0; i < 30; i++) {
      // drawEndPoint();
    }
    noLoop();
  }

}

// ================= controls ================= //

function keyPressed() {
  if (key === 's') {
    running = false
  } else if (key === 'p') {
    running = true
    loop();
  }
}

// ================= Helpers ================= //

function endSketch() {
  // stops looping once the current point goes out of bounds

  if (currPoint.x > width || currPoint.y > height) {
    noLoop();
  }
}

function showAngle(angle) {

  let dist = 50;

  // find the point using the angle and distance
  let posX = currPoint.x + (dist * cos(angle));
  let posY = currPoint.y - (dist * sin(angle));
  
  stroke(0);
  strokeWeight(5);
  line(currPoint.x, currPoint.y, posX, posY);
  noStroke();
}

function testing() {
  fill(colourA);
  rect(0,0,40,40);

  fill(colourB)
  rect(width-40,0,40,40);

  for (let i=0; i<width-80; i+=2) {
    
    // lerpColor(colourA, colourB, i/width-80)
    fill(lerpColor(colourA, colourB, i/(width-80)));
    rect(i+40,0, 2, 40);
  }
}

///////////////////////

function getAngle() {
  distX = currPoint.x - prevPoint.x;
  distY = prevPoint.y - currPoint.y;

  // get angle in radians
  let angle = Math.atan(distY/distX)

  // convert angle to degrees
  angle = angle * (180 / Math.PI);

  if (currPoint.x > prevPoint.x) {
    angle += 180;
  }

  angle = (angle + 360) % 360;

  //showangle(angle);
  // console.log(angle);

  return angle; // angle has a range of 0 to 360
}

function drawSplitBlast() {

  // get MIN and MAX angle
  let drivingAngle = getAngle();

  let minAngle = drivingAngle;
  // showAngle(minAngle);

  let maxAngle = drivingAngle + 180;
  // showAngle(maxAngle);

  col1 = colourA;
  col2 = colourB;

  // draw first colour
  for(let i = 0; i< (shots/2); i++) {
    drawHalfShot(minAngle, maxAngle, col1);
  } 

  // // repeat with other colour
  for(let i = 0; i< (shots/2); i++) {
    drawHalfShot(minAngle + 180, maxAngle + 180, col2);
  } 

}

function drawHalfShot(minAngle, maxAngle, colour) {
  // draws a scattered set of points between minAngle and maxAngle,
  // in the specifed colour

  // pick random angle between MIN and MAX
  let angle = random(minAngle, maxAngle);

  // pick random distance with a standard deviation
  let dist = randomGaussian(0, spread);
  // all distances less than 0 are flipped
  if (dist < 0) {
    dist *= -1;
  }

  // find the point using the angle and distance
  let posX = currPoint.x + (dist * cos(angle));
  let posY = currPoint.y - (dist * sin(angle));
  
  fill(colour);
  circle(posX, posY, shotSize);
}

function drawSmoothBlast() {

  // get MIN and MAX angle
  let drivingAngle = getAngle();

  let angle1 = (drivingAngle + 90) % 360;
  //showangle(angle1);
  let angle2 = (drivingAngle + 270) % 360; // angle must be above 0 and less than 360
  //showangle(angle2);

  // console.log(angle1 + ' ' + angle2);

  for(let i=0; i<shots; i++) {
    drawSmoothShot(drivingAngle, angle1, angle2);
  }

}

function drawSmoothShot(drivingAngle, angle1, angle2) {

  // pick random angle
  let angle = random(0, 360);

  // pick random distance with a standard deviation
  let dist = randomGaussian(0, spread);
  // all distances less than 0 are flipped
  if (dist < 0) {
    dist *= -1;
  }

  // find the point using the angle and distance
  let posX = currPoint.x + (dist * cos(angle));
  let posY = currPoint.y - (dist * sin(angle));

  // pick the colour based on how close angle it is to angle1 or angle2
  let circumfrence = null;
  if (angle < angle1) {
    circumfrence = angle1 - angle
  } else {
    circumfrence = angle - angle1;
  }
  if (circumfrence > 180) {
    if (angle < angle1) {
      circumfrence = angle + (360 - angle1);
    } else {
      circumfrence = angle1 + (360 - angle);
    }
  }
  let colRatio = circumfrence / 180;

  let colour = lerpColor(colourA, colourB, colRatio);
  
  fill(colour);
  circle(posX, posY, shotSize);
}

function drawEndPoint() {

  // console.log('here');
  
  // get driving angle
  let drivingAngle = getAngle();

  // draw blast
  for(let i=0; i<shots; i++) {

    // pick random angle
    let angle = random(0, 360);

    // pick random distance with a standard deviation
    let dist = randomGaussian(0, spread);
    // all distances less than 0 are flipped
    if (dist < 0) {
      dist *= -1;
    }

    // find the point using the angle and distance
    let posX = currPoint.x + (dist * cos(angle));
    let posY = currPoint.y - (dist * sin(angle));

    // pick the colour Alpha based on how far the angle is anticlockwise from the driving angle
    let circumfrence = angle - drivingAngle;
    if (angle < drivingAngle) {
      circumfrence = (360 - drivingAngle) + angle; 
    }

    let colourRatio = circumfrence / 360;

    // pick alpha
    let alpha = colourRatio;
    if (colourRatio > 0.5) {
      alpha = 1-colourRatio;
    }

    colourA.setAlpha(alpha);
    colourA.setAlpha(alpha);

    let colour = lerpColor(colourA, colourB, colourRatio);
    
    fill(colour);
    circle(posX, posY, shotSize);
  }
}

///////////////////////

function advancePointCircle() {
  prevPoint.x = currPoint.x;
  prevPoint.y = currPoint.y;

  currPoint.x = (width*0.3) * cos(frameCount * 0.5) + width/2;
  currPoint.y = (height*0.3) * sin(frameCount * 0.5) + height/2;
}

function advancePointInfinity() {
  prevPoint.x = currPoint.x;
  prevPoint.y = currPoint.y;

  currPoint.x = (width*0.38) * cos(step * 0.4) + width/2;
  currPoint.y = (height*0.25) * sin(step * 0.8) + height/2;
}

function advancePointHourglass() {
  prevPoint.x = currPoint.x;
  prevPoint.y = currPoint.y;

  currPoint.x = (width*0.25) * sin(frameCount * 0.8) + width/2;
  currPoint.y = (height*0.38) * cos(frameCount * 0.4) + height/2;
}


function advanceHue() {

  hueA = (hueA + hueChange) % 360;
  let satA = 40 + (noise(frameCount/100, 1) * 50);
  let brigthA = 80 + (noise(frameCount/100, 1) * 20);
  colourA = color((hueA) % 360, satA, brigthA, 0.5);
  // colourA = color((hueA + (noise(frameCount/400, 1) * 150)) % 360, 100, 100, 0.5);

  hueB = (hueB + hueChange) % 360;
  let satB = 40 + (noise(frameCount/100, 5) * 60);
  let brightB = 50 + (noise(frameCount/100, 5) * 40);
  colourB = color((hueB) % 360, satB, brightB, 0.5);
  // colourB = color((hueB + (noise(frameCount/400, 2) * 150)) % 360, 100, 100, 0.5);

}