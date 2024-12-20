/*
 * 👋 Hello! This is an ml5.js example made and shared with ❤️.
 * Learn more about the ml5.js project: https://ml5js.org/
 * ml5.js license and Code of Conduct: https://github.com/ml5js/ml5-next-gen/blob/main/LICENSE.md
 *
 * This example demonstrates face tracking on live video through ml5.faceMesh.
 */

let faceMesh;
let video;
let faces = [];
let options = { maxFaces: 1, refineLandmarks: false, flipHorizontal: false };

// canvas and image scale
let IScale = 1.3

// typefaces
let amTypeLight;
let amTypeMedItal;

// logic
let loading = true;

showDot = true;

function preload() {
  // Load the faceMesh model
  faceMesh = ml5.faceMesh(options);

  // Load typefaces
  amTypeLight = loadFont('Data/AmericanTypewriterStd_Light.ttf');
  amTypeMedItal = loadFont('Data/ITC_American_Typewriter_Std_Medium_Italic.otf');

}

function setup() {
  canvas = createCanvas(windowWidth-30, windowHeight-1);
  canvas.position(0,0);
  angleMode(DEGREES);
  // Create the webcam video and hide it
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  // Start detecting faces from the webcam video
  faceMesh.detectStart(video, gotFaces);
}

function draw() {

  background(200);

  if (loading) {
    frameRate(3);
    textFont(amTypeLight);
    textSize(width/5);
    textAlign(CENTER, CENTER);
    text('Loading', width/2 - 20, height*0.65);
    if (showDot) {
      text('             .', width/2 - 20, height*0.65);
    }
    showDot = !showDot;
  } else {
    scale(-1,1);
    translate(-width,0);
    //image(video, 0, 0, width, height);
    background(200, 0);
  }

  //drawKeypoints();
  drawFace();
}

// Callback function for when faceMesh outputs data
function gotFaces(results) {
  // Save the output to the faces variable
  faces = results;

  loading = false;
  frameRate(30);
}

function drawKeypoints() {
  // Draw all the tracked face points
  for (let i = 0; i < faces.length; i++) {
    let face = faces[i];
    for (let j = 0; j < face.keypoints.length; j++) {
      let keypoint = face.keypoints[j];
      fill(0, 255, 0);
      noStroke();
      circle(keypoint.x, keypoint.y, 5);
    }
  }
}

function drawFace() {
  for (let i = 0; i < faces.length; i++) {

    fill(i, 1*10, i*5);

    // get face key points (keypoints[j])
    let face = faces[i];

    // left eye
    const leftEyeL = face.keypoints[246];
    //ellipse(leftEyeL.x, leftEyeL.x, 5, 5);

    const leftEyeR = face.keypoints[173];
    //ellipse(leftEyeR.x, leftEyeR.x, 5, 5);

    drawEye(leftEyeL.x, leftEyeL.y, leftEyeR.x, leftEyeR.y);

    // left eye brow
    const leftEyeBrowL = face.keypoints[71];
    // ellipse(leftEyeBrowL.x, leftEyeBrowL.x, 5, 5);

    const leftEyeBrowR = face.keypoints[107];
    // ellipse(leftEyeBrowR.x, leftEyeBrowR.x, 5, 5);

    drawBrowLeft(leftEyeBrowL, leftEyeBrowR);

    // right eye
    const rightEyeL = face.keypoints[398];
    //ellipse(rightEyeL.x, rightEyeL.x, 5, 5);

    const rightEyeR = face.keypoints[466];
    //ellipse(rightEyeR.x, rightEyeR.x, 5, 5);

    drawEye(rightEyeL.x, rightEyeL.y, rightEyeR.x, rightEyeR.y);
    
    // right eye brow
    const rightEyeBrowL = face.keypoints[336];
    // ellipse(rightEyeBrowL.x, rightEyeBrowL.x, 5, 5);

    const rightEyeBrowR = face.keypoints[301];
    // ellipse(rightEyeBrowR.x, rightEyeBrowR.x, 5, 5);

    drawBrowRight(rightEyeBrowL, rightEyeBrowR);

    //nose
    const noseB = face.keypoints[0];
    // ellipse(noseB.x, noseB.x, 5, 5);

    const noseT = face.keypoints[6];
    // ellipse(noseT.x, noseT.x, 5, 5);

    drawNose(noseT, noseB);

    // mouth
    const mouthL = face.keypoints[78];
    //ellipse(mouthL.x, mouthL.x, 5, 5);

    const mouthR = face.keypoints[306];
    //ellipse(mouthR.x, mouthR.x, 5, 5);

    const mouthT = face.keypoints[13];
    //ellipse(mouthT.x, mouthT.x, 5, 5);

    const mouthB = face.keypoints[14];
    //ellipse(mouthB.x, mouthB.x, 5, 5);

    drawMouth(mouthL, mouthR, mouthT, mouthB);
  }
}

function drawEye(lx, ly, rx, ry, side) {
  // draws one eye given a left and right point

  // get eye width
  let distx = rx-lx;
  let disty = ry-ly;

  // put eye in position
  push();
  translate(lx + distx/2, ly + disty/2);
  rotate(90);

  // draw pupil
  push();
  textSize(distx/1.2);
  textFont(amTypeMedItal);
  text('e',0,0);
  pop();

  // draw eye lids
  textFont(amTypeLight);
  textAlign(CENTER,CENTER);
  textSize(95);
  scale(0.8 * distx/70, 1 * distx/70);
  text('(',-7,-2);
  text(')',8,-5);
  pop();
  
}

function drawBrowLeft(l, r) {

  // get brow width and center measurements
  let distx = r.x - l.x;
  let disty = r.y - l.y;

  // draw left brow
  textSize(170);
  push();
  translate(l.x + distx/2, l.y + disty/2);
  rotate(1.8);
  scale(1*distx/70, 1*distx/70);

  text('~', 0, -15);
  fill(0,255,0);
  // circle(0, 0, 5);
  pop();
}

function drawBrowRight(l, r) {

  // get brow width and center measurements
  let distx = r.x - l.x;
  let disty = r.y - l.y;

  // draw right brow
  textSize(170);
  push();
  translate(l.x + distx/2, l.y + disty/2);
  rotate(1.8);
  scale(1*distx/70, 1*distx/70);

  rotate(-7);
  text('~',0, -15);
  pop();
}

function drawMouth(l, r, t, b) {
  // set typeface
  textFont(amTypeLight);
  textAlign(CENTER, CENTER);

  // get mouth measurments
  let distx = r.x - l.x;
  let disty = b.y - t.y;
  
  // draw mouth open smile
  push();
  textSize(108);
  translate(t.x, l.y);
  rotate(90);
  scale(.8 * distx/70, 1 * distx/70)
  
  if (disty > distx/7) {
    text('D', 0, 0);
  } else {
    text('I', 0, 0);
  }
  drawGoatee(distx);

  pop();
}

function drawNose(t, b) {

  //get distances
  distx = b.x - t.x;
  disty = b.y - t.y;

  // draw Nose
  textSize(110);
  push();
  translate(t.x + distx/2, t.y + disty/2);
  rotate(180);
  scale(.6 *disty/70, .7*disty/70)
  text('7',0,10);

  // fill(0,0,255);
  // circle(0,0,5);
  // fill(0);

  pop();
}

function drawGoatee() {
  textSize(100);
  push();
  translate(70,0);
  scale(0.55, -0.55);
  rotate(-90);
  text(',', 92, -50);

  text(',',65,-20);
  text(',',45,-20);

  text(',',15,-14);
  text(',',-5,-14);

  text(',',-35,-20);
  text(',',-57,-20);

  text(',', -82, -49);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight-1);
  background(200);
}
