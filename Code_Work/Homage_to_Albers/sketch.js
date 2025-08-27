// ================ Global Variables ================ //

// colour settings
// change these to change sketch behaviour

let lightVar = 600;
let lightRange = 100;
let satVar = 600;
let satRange = 100;

let maxHueStep = 0.8;


// display variables

let minLeangth;

// colour variables

let hueMode; // has 2 set states, LINEAR or OPPOSITE

let hue1Angle;
let hue1Offset;
let hue1A;
let hue1B;

let hue2Angle;
let hue2AngleOffset
let hue2Offset;
let hue2A;
let hue2B;

let modeTrigger;
let newloop;


// ================ Setup Functions ================ //

function setup() {
  createCanvas(windowWidth-40, windowHeight-1);
  frameRate(60);

  strokeCap(SQUARE);

  angleMode(DEGREES);
  colorMode(HSL);

  minLeangth = findMinLeangth();
  console.log(minLeangth);

  setupColourVariables();

}

function setupColourVariables() {
  // gives the colour variables an initial value

  hueMode = 'LINEAR'

  hue1Angle = 0;
  hue2AngleOffset = 0;

  hue1Offset = 0;
  hue1A = 0;
  hue1B = 0;

  hue2Angle = 0;
  hue2Offset = 0;
  hue2A = 0;
  hue2B = 0;

  modeTrigger = 360; 
  newloop = true;
}

// ================ Main Functions ================ //

function draw() {

  updateColour();
  noStroke();


  // console.log(hue1Angle);

  background(hue1Angle, 25, 20);
  // background(hue1Angle, 50, 50);

  // square 1
  fill(hue1A, saturationVariation(1), lightVariation(1));
  rect(centerWidth(minLeangth), centerHeight(minLeangth), minLeangth, minLeangth);

  // square 2
  fill(hue1B, saturationVariation(2), lightVariation(2));
  rect(centerWidth(minLeangth*0.8), alignHeight(minLeangth*0.15), minLeangth*0.8, minLeangth*0.8);

  // square 3
  fill(hue2A, saturationVariation(3), lightVariation(3));
  rect(centerWidth(minLeangth*0.6), alignHeight(minLeangth*0.3), minLeangth*0.6, minLeangth*0.6);

  // square 4
  fill(hue2B, saturationVariation(4), lightVariation(4));
  rect(centerWidth(minLeangth*0.4), alignHeight(minLeangth*0.45), minLeangth*0.4, minLeangth*0.4);

}

function updateColour() {
  // updates the colours for each of the squares

  // set hue for arm 1 randomly
  // hue1Angle += (noise(1, frameCount/500)-0.4) * 5;   /// random movement around the circle
  hue1Angle += 0.6;

  // every second loop hold inner colours
  if (hue1Angle > modeTrigger && newloop) {

    if (hueMode === 'LINEAR') {
      hueMode = 'RANDOM'
      console.log('RANDOM');
    } else {
      hueMode = 'LINEAR'
      console.log('linear');
    }

    modeTrigger -= 41;
    modeTrigger = loopHue(modeTrigger);

    newloop = false;
  }

  if (hue1Angle > 360) {
    newloop = true;
  }
  hue1Angle = loopHue(hue1Angle);
  

  // hue 2 angle, and hue offsets, depends on hueMode

  if (hueMode === 'LINEAR') {

    hue2AngleOffset = noise(2, frameCount/150) * 100;
    // hue2AngleOffset = 10;
    hue2Angle = hue1Angle + hue2AngleOffset;

    let angleDiff = hue2Angle - hue1Angle;
    if (angleDiff < 0) {
      angleDiff *= -1;
    }

    hue2Angle = loopHue(hue2Angle); // hue2Anle MUST BE LOOPED AFTER andgleDiff is calculated

    hue1Offset = (angleDiff) / 3;
    hue2Offset = hue1Offset;

    hue1A = stepHue(hue1A, hue1Angle, hue1Offset, 'NEG');
    hue1B = stepHue(hue1B, hue1Angle, hue1Offset, 'POS');
    hue2A = stepHue(hue2A, hue2Angle, hue2Offset, 'NEG');
    hue2B = stepHue(hue2B, hue2Angle, hue2Offset, 'POS');

    // // set each individual hue
    // hue1A = hue1Angle - hue1Offset;
    // hue1A = loopHue(hue1A);
    // hue1B = hue1Angle + hue1Offset;
    // hue1B = loopHue(hue1B);

    // hue2A = hue2Angle - hue2Offset;
    // hue2A = loopHue(hue2A);
    // hue2B = hue2Angle + hue2Offset;
    // hue2B = loopHue(hue2B);

  } else if (hueMode === 'RANDOM') {

    // hue2Angle is not calculated, and so stays the same as it was
    
    hue1Offset = noise(1, frameCount/200) * 60;
    // console.log(hue1Offset);

    hue1A = stepHue(hue1A, hue1Angle, hue1Offset, 'NEG');
    hue1B = stepHue(hue1B, hue1Angle, hue1Offset, 'POS');

    hue2Offset = noise(2, frameCount/200) * 60;

    hue2A = stepHue(hue2A, hue2Angle, hue2Offset, 'NEG');
    hue2B = stepHue(hue2B, hue2Angle, hue2Offset, 'POS');


  }

  
}

function stepHue(currentHue, baseAngle, offset, direction) {

  let targetHue = 0;

  // find targetHue
  if (direction === 'NEG') {
    targetHue = baseAngle - offset;
  } else {
    targetHue = baseAngle + offset;
  }

  // find the difference between the current hue, and the target hue
  let hueDiff = currentHue - targetHue;
  // make all negative differences positive
  if (hueDiff < 0) {
    hueDiff *= -1;
  }

  // if the difference is less than the maximum a hue can change,
  // make the current hue the same as the target hue
  // console.log(hueDiff + ' ' + maxHueStep);
  if (hueDiff < maxHueStep) {
    currentHue = targetHue;
    // console.log('all fine');
    
    // else take the maximum step in the direction of the target hue

  } else if ((targetHue + 180) < currentHue) {
    // in this case the shortest distance is to go around the circle and loop up
    currentHue += maxHueStep;
    // console.log('LOOP UP');

  } else if ((targetHue - 180) > currentHue) {
    // in this case the shortest distance is to go around the circle and loop sown
    currentHue -= maxHueStep;
    // console.log('LOOP DOWN');

  } else if (currentHue < targetHue) {
    currentHue += maxHueStep;
    // console.log('UP');

  } else if (currentHue > targetHue){
    currentHue -= maxHueStep;
    // console.log('DOWN');
  }

  // make sure the new hue sits within bounds
  currentHue = loopHue(currentHue);

  return currentHue;

}

// ================ Helper Functions ================ //

function loopHue(angle) {
  // loops the given number between 0 and 360;

  if (angle > 360) {
    angle -= 360;
  } else if (angle < 0) {
    angle += 360;
  }

  return angle;
}

function lightVariation(noiseSeed) {
  return (noise(noiseSeed, frameCount/lightVar)-0.5)*lightRange + 50;
}

function saturationVariation(noiseSeed) {
  return (noise(noiseSeed, frameCount/satVar)-0.5)*satRange + 50;
}

function findMinLeangth() {
  // returns the smallest side of the window

  if (width > height) {
    return height;
  }

  return width;
}

function centerWidth(shapeWidth) {
  return (width-shapeWidth) / 2;
}

function centerHeight(shapeHeight) {
  return (height-shapeHeight) / 2;
}

function alignHeight(topOffset) {
  let top = (height-minLeangth) / 2;
  return top + topOffset;
}

// ================ Control Functions ================ //

function keyPressed() {

  if (key === 'l') {
    console.log('linear');
    hueMode = 'LINEAR';
  }

  if (key === 'o') {
    console.log('RANDOM');
    hueMode = 'RANDOM';
  }
}