
// =================== VARIABLES =================== //

let centerX;
let centerY;

let FR = 60; // frame rate
let frame = 0;

// images
let facePNG;

// typefaces
let amTypeLight;
let amTypeMedItal;

// ==== FOR FACE EXPRESSIONS ==== //

// colours
let colourHair;
let colourFaceHair;

// Blinking Eyes
let isEyesShut = 0; // DO NOT CHANGE TO 1, idk why but it breaks the code
let eyeTime = 0;
let maxShutTime = 0.5;
let minShutTime = 0.2;
let tooLongNoBlink = 5; // in seconds
let noBlinkCount = 0;

// Expression change
let expression = 0; // 1 = smile, 0 = calm
let noExpressionChange = 0;
let maxNoExpressionChange = 5;

// Look At Mouse
const leftEyePos = {
  X: -110,
  Y: -30,
}

const rightEyePos = {
  X: 55,
  Y: -25,
}

let maxRangeX = 14;
let maxRangeY = 7;

const leftPupil = {
  X: 0,
  Y: 0,
}

const rightPupil = {
  X: 0,
  Y: 0,
}

// Switch Gaze
let gazePhaseCount = 0;
let minGazePhases = 3;
let maxGazePhases = 8;

let gazeOnMouse = 0;
let gazeDefaultPos = 1;
let switchSpeed = 100;

// Waving Hair
let maxStrandAngle = 1;
let setHairSpeed = 0.2; // set's consits speed for hair waves, if used turn of randomHairSpeed in waveHair();
let minHairSpeed = 0.0;
let maxHairSpeed = 0.12;
let right = 0;
let left = 1;

const strand1 = {
  angle: -1,
  direction: 0,
}

const strand2 = {
  angle: -1,
  direction: 1,
}

const strand3 = {
  angle: 0,
  direction: 0,
}

const strand4 = {
  angle: 0,
  direction: 1,
}

const strand5 = {
  angle: 1,
  direction: 0,
}

// =================== FUNCTIONS =================== //

function preload() {
  amTypeLight = loadFont('data/AmericanTypewriterStd_Light.ttf');
  amTypeMedItal = loadFont('data/ITC_American_Typewriter_Std_Medium_Italic.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  frameRate(FR);
  
  // set variables
  centerX = width/2;
  centerY = height/2;
  
  // faceWidth = facePNG.width/4;
  // faceHeight = facePNG.height/4;
  
  // define colours
  // colourFill = color(64, 54, 24); // grey fill
  // colourFill = color(56, 47, 21); // grey fill
  // colourFill = color(48, 43, 24); // base colour
  // colourFill = color(51, 42, 0); // base colour
  colourFill = color(67, 44, 26); // base colour
  
  // colourHair = color(90, 20, 20); // dark brown hair
  // colourHair = color(105, 90, 40); // light brown hair
  // colourHair = color(220, 69, 130); // pink hair
  colourHair = color(113, 86, 0); // light brown hair

  
  // colourFaceHair = color(60,15,15); // dark beard
  // colourFaceHair = color(130,100,70); // mid beard
  // colourFaceHair = color(130,95,54); // mid beard
  // colourFaceHair = color(77, 54, 42); // GOOOOOOD
  // colourFaceHair = color(89, 61, 50); // GOOOOOOD
  colourFaceHair = color(101, 52, 14); // GOOOOOOD
}


function draw() {
  background(242,229,218);
  // background(214,247,42); // LIME
  // background(218,240,105); // GREEN
  // background(255,190,99); // PEACHY
  background(255, 219, 181); // off white
  
  // referance image
  //image(facePNG, centerX - faceWidth/2, centerY - faceHeight/2, faceWidth, faceHeight);
  
  //Text style
  fill(colourFill);
  
  // Draw Hair
  //drawQuiff();
  drawMovingQuiff();
  drawHairLine();
  
  // Draw Eyes
  drawBrows();
  blinkingEyes();
  //drawEyes(0,0);
  
  // switchGaze(leftPupil, rightPupil); WORK IN PROGRESS FUNCTION
  lookAtMouse(leftPupil, rightPupil);
  drawFaceDetails();
  
  // Draw nose
  drawNose();
  
  // Draw Mouth
  drawMouth();
  randomiseSmile();
  
  // Draw Goatee
  drawGoatee();
  
  // Draw Cheek
  drawCheek();
  
  // Draw Ear
  drawEar();
  
  // update frame count
  if (frame == FR) {
    // reset count
    frame = 0;
  }
  else {
    frame += 1;
  }
  
}

// =================== ANIMATION LOGIC =================== //

function randomiseSmile() {
  //rect(frame, 0, 10, 10);
  
  // runs every second
  if (frame == FR) {
    
    // if smiling for too long change
    if ((expression) && (noExpressionChange == (maxNoExpressionChange-1)) ) {
      expression = !expression;
      noExpressionChange = 0;
    }
    // else randomise chance of changing expression
    else {
      fill(colourFill);
      //rect (0,0,10,10);
      let rand = random(8)
      if (rand < 1) {
        //rect(20,0,10,10);
        expression = !expression;
        noExpressionChange = 0;
      }
      else {
      noExpressionChange += 1;
      }
    }
  }
}

function blink(shutTime) {
  // a countdown timer, measured in seconds
  if (eyeTime < shutTime) {
    eyeTime += deltaTime/1000; // div by 1000 converts to seconds
    isEyesShut = 1;
  }
  else {
    isEyesShut = 0;
    eyeTime = 0;
  }
  
}

// =================== ANIMATED FACE FEATURES =================== //

function drawMovingQuiff() {
  // draws the hair with slight wind motion
  
  // set typeface
  textFont(amTypeLight);
  textAlign(RIGHT,BOTTOM);
  
  // set text size
  textSize(160);
  
  // draw hair strands
  drawStrand(strand1, -148, -130);
  drawStrand(strand2, -85, -150);
  drawStrand(strand3, -23, -155);
  drawStrand(strand4, 40, -150);
  drawStrand(strand5, 110, -130);
}

function waveHair(strand) {
  
  randomHairSpeed = random(maxHairSpeed-minHairSpeed) + minHairSpeed;
  
  if (strand.direction == right) {
    if (strand.angle < maxStrandAngle) {
      strand.angle += randomHairSpeed;
    }
    else {
      strand.direction = left;
    }
  }
  else if (strand.direction == left) {
    if (strand.angle > -maxStrandAngle) {
      strand.angle -= randomHairSpeed;
    }
    else {
      strand.direction = right;
    }
  }
  
}

function lookAtMouse(pupilLeft, pupilRight) {
  
  pupilLeft.X = (mouseX - centerX - leftEyePos.X)/(width/2) *  maxRangeX;
  pupilRight.X = ((mouseX - centerX - leftEyePos.X)/(width/2) *  maxRangeX) - 2;
  
  pupilLeft.Y = ((mouseY - centerY - leftEyePos.Y)/(height/2) *  maxRangeY)+2;
  pupilRight.Y = ((mouseY - centerY - leftEyePos.Y)/(height/2) *  maxRangeY)+3;
  
  /*
  pupilLeft.X = ((mouseX - centerX)/(width/2) * maxRangeX);
  pupilRight.X = ((mouseX - centerX)/(width/2) * maxRangeX);
  
  pupilLeft.Y = ((mouseY - centerY)/(width/2) * maxRangeY+7)-4;
  pupilRight.Y = ((mouseY - centerY)/(height/2) * maxRangeY)+3;
  */
}

function blinkingEyes() {
  //randomly makes the characte blink
  
  // Chance of blinking every second
  if (noBlinkCount == tooLongNoBlink) {
    // Force blink 
    shutTime = random(maxShutTime) + minShutTime;
    blink(shutTime);
    noBlinkCount = 0;
    
  }
  else if ((frame == FR) & (noBlinkCount != tooLongNoBlink)) {
    // roll for blink
    let rand = random(4);
    if (rand < 1) {
      shutTime = random(maxShutTime-minShutTime) + minShutTime;
      blink(shutTime);
      noBlinkCount = 0;
    }
    else {
      noBlinkCount += 1;
    }
  }

  //rect(frame,0,10,10);
  //rect(noBlinkCount * 20, 10,10,10)
  
  if (isEyesShut) {
    drawEyes(0,0);
    blink(shutTime);
  }
  else {
    drawEyes(1,1);
  }
  
}

// =================== RAW DRAW FUNCTIONS =================== //

function drawQuiff() {
  
  // set typeface
  textFont(amTypeLight);
  
  // set text size
  textSize(160);
  
  // draw text
  textAlign(CENTER,CENTER);
  push();
  scale(1,1.05);
  text('(', centerX-180, centerY-235);
  text('(', centerX+78, centerY-235);
  text('(((', centerX-54, centerY-260);
  pop();
}

function drawStrand(strand, posX, posY) {
  // draw hair strand
  push();
  fill(colourHair);
  scale(1,1.05);
  translate(centerX + posX, centerY + posY);
  rotate(strand.angle);
  text('(',0,0);
  pop();
  // set angle for next frame
  waveHair(strand);
}

function drawHairLine() {
  
  // set typeface
  textFont(amTypeLight);
  textAlign(CENTER,CENTER);
  
  // draw text
  
  push();
  fill(colourHair);
  textSize(250);
  translate(centerX + 188, centerY-233);
  scale(1,1.1);
  rotate(65);
  text('~', 0,0);
  pop();
  
  push();
  fill(colourHair);
  textSize(142);
  translate(centerX + 205, centerY-95);
  rotate(27);
  text('\\', 0,0);
  pop();
  
}

function drawBrows() {
  
  // set typeface
  textFont(amTypeLight);
  textAlign(CENTER,CENTER);
  
  // draw left brow
  textSize(217);
  push();
  fill(colourFaceHair);
  translate(centerX - 132, centerY - 94);
  rotate(1.8);
  text('~',0,0);
  pop();
  
  // draw right brow
  textSize(217);
  push();
  fill(colourFaceHair);
  translate(centerX + 54, centerY - 95);
  rotate(-7);
  text('~',0,0);
  pop();
}

function drawEyes(leftEyeOpen = 1, rightEyeOpen = 1) {
  
  // set typeface
  textFont(amTypeLight);
  textAlign(CENTER,CENTER);
  
  // draw left eye
  textSize(95);
  push();
  translate(centerX + leftEyePos.X, centerY + leftEyePos.Y);
  rotate(90);
  scale(0.8,1);
  if (leftEyeOpen) {
    text('(',-7,-2);
  }
  text(')',8,-5);
  pop();
  
  if (leftEyeOpen) {
    drawPupil(-121, -33, leftPupil.X, leftPupil.Y, -87); 
  }
  
  // draw right eye
  textSize(95);
  push();
  translate(centerX + rightEyePos.X, centerY + rightEyePos.Y);
  rotate(90);
  scale(0.8,1);
  if (rightEyeOpen) {
    text('(',-10,5);
  }
  scale(0.9,1);
  text(')',5,-5);
  pop();
  
  if (rightEyeOpen) {
    drawPupil(39, -31, rightPupil.X, rightPupil.Y, -88)
  }

}

function drawPupil(posX, posY, shiftX, shiftY, rotation) {
  // draws the pupil of the eye, with the option to look at the mouse
  push();
  textSize(50);
  textFont(amTypeMedItal);
  translate(centerX + posX + shiftX, centerY + posY + shiftY);
  rotate(rotation);
  text('e',0,0);
  pop();
  
}

function drawFaceDetails() {
  
  // set typeface
  textFont(amTypeLight);
  textAlign(CENTER,CENTER);
  
  /* draw mole
  textSize(120);
  push();
  translate(centerX - 160, centerY + 91);
  rotate(0);
  text('.', 0, 0);
  pop(); */
  
  // draw upper piercing
  textSize(120);
  push();
  translate(centerX - 160, centerY - 90);
  rotate(0);
  text('.', 0, 0);
  pop();
  
  // draw lower piercing
  textSize(100);
  push();
  translate(centerX - 162, centerY - 45);
  rotate(0);
  text('.', 0, 0);
  pop();
}

function drawNose() {
  
  // set typeface
  textFont(amTypeLight);
  textAlign(CENTER,CENTER);
  
  // draw Nose
  textSize(150);
  push();
  translate(centerX - 50, centerY + 34);
  rotate(180);
  scale(1,1.1)
  text('7',0,0);
  pop();
  
  
  // draw left nose hole
  textSize(130);
  push();
  translate(centerX - 120, centerY + 86);
  rotate(-90);
  text(',',0,0);
  pop();
  
  // draw right nose hole
  textSize(130);
  push();
  translate(centerX + 20, centerY + 72);
  rotate(74);
  text(',',0,0);
  pop();
  
  
}

function drawMouth() {
  
  // set typeface
  textFont(amTypeLight);
  textAlign(CENTER,CENTER);
  
  if (!expression) {
  // draw mouth closed
  push();
  textSize(198);
  translate(centerX - 41, centerY + 161);
  rotate(90);
  text('I',0,0);
  pop();
  }
  
  if (expression) {
  // draw mouth open smile
  push();
  textSize(198);
  translate(centerX - 41, centerY + 188);
  rotate(90);
  scale(.8,1)
  text('D',0,0);
  pop();
  }
  
  // draw 'stache
  push();
  textSize(230);
  fill(colourFaceHair);
  translate(centerX - 20, centerY + 130);
  rotate(90);
  text('{',0,0);
  pop();
  
}

function drawGoatee() {
  // set typeface
  textFont(amTypeLight);
  textAlign(CENTER,CENTER);
  
  if (!expression) {
  // draw chin stubble
  textSize(120);
  push();
  fill(colourFaceHair);
  translate(centerX - 40, centerY + 194);
  scale(1,-1);
  rotate(180);
  text(',', 96, -19);
  text(',',65,-2);
  text(',',45,-2);
  text(',',15,1);
  text(',',-5,1);
  text(',',-35,-2);
  text(',',-57,-2);
  text(',', -88, -18);
  pop();
  }
  
  if (expression) {
  // draw chin stubble
  textSize(120);
  push();
  fill(colourFaceHair);
  translate(centerX - 40, centerY + 219);
  scale(1,-1);
  rotate(180);
  text(',', 96, -19);
  text(',',65,-2);
  text(',',45,-2);
  text(',',15,1);
  text(',',-5,1);
  text(',',-35,-2);
  text(',',-57,-2);
  text(',', -88, -18);
  pop();
  }
}

function drawCheek() {
  
  // set typeface
  textFont(amTypeLight);
  textAlign(CENTER,CENTER);
  
  // draw cheek
  textSize(402);
  push();
  translate(centerX + 122, centerY + 24);
  rotate(7.5);
  text('}', 0, 0);
  pop();
  
}

function drawEar() {
  
  // set typeface
  textFont(amTypeLight);
  textAlign(CENTER,CENTER);
  
  // draw ear
  textSize(315);
  push();
  translate(centerX + 163, centerY - 120);
  rotate(0);
  text(',', 0, 0);
  pop();
  
  // draw top piercing
  textSize(200);
  push();
  translate(centerX + 163, centerY - 120);
  rotate(0);
  text('.', 0, 0);
  pop();
  
  // draw lobe piercing
  textSize(120);
  push();
  translate(centerX + 147, centerY + 1);
  rotate(0);
  text('.', 0, 0);
  pop();
}
