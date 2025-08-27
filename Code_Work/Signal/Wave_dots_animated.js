// ==================== Global Variables ==================== //

let rowHeight = 0;
let hue = 0;

let rowSteps = 3.7;
let hueSteps = 7;

let waveSpeed = 4;
let noiseSpeed = 0.015;

let ambience;

// ==================== Setup Functions ==================== //

function preload() {
  ambience = loadSound('Ambience.wav');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30);
  angleMode(DEGREES)
  noiseDetail(2, 0.5);

  setGlobalVariables();
}

function setGlobalVariables() {
  rowHeight = height*0.24;
  hue = -10
}

// ==================== Main Functions ==================== //

function draw() {

  background(0);

  if (frameCount === 1) {
    ambience.loop();
  }

  while (rowHeight < height) {
    drawRow ();

    // update variables

    rowHeight += rowSteps

    if (rowHeight < height*0.54) {
      hue += hueSteps;
    } else {
      hue -= hueSteps;
    }

    // check early exit condition

    if (hue < 0 && rowHeight > height*0.5) {
      break;
    }
  }

  setGlobalVariables();

}

function drawRow() {
  //background(220, 2);

  // if there is something to draw, draw it
  if (hue > 0) {
    for (let x=30; x<width; x += 40) {

      let yOffset = 0;

      // random offset portion
      yOffset += (height*0.5) * (noise(x/300, rowHeight/110, frameCount*noiseSpeed)-0.5);

      // wave offset 1
      yOffset += (height*0.03) * sin((x*0.5) + waveSpeed*frameCount);

      // wave offset 2
      yOffset += (height*0.03) * sin((x*0.25) + waveSpeed*frameCount);

      drawDot(x, rowHeight + yOffset);
    }
  }

}

function drawDot(x, y) {

  // noStroke();
  // fill(255, hue);

  stroke(255, hue);
  strokeWeight(2);

  point(x, y);
}