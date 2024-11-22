// ======================== Global Variabls ======================== //

var canvas

let centre;

let imgScale = 0.4;

let hair;
let mouth;
let nose;
let eyeLeft;
let eyeRight;

let randomness = 555; // how far the features can move

// ======================== Main Functions ======================== //

function preload() {

  let rand = round(random(1,5)); // one less than number of possible options
  let hairPath = 'About/Hair/Hair_' + rand + '.png';
  hair = loadImage(hairPath);

  rand = round(random(1,5)); // one less than number of possible options
  let mouthPath = 'About/Mouths/Mouth_' + rand + '.png';
  mouth = loadImage(mouthPath);

  rand = round(random(1,5)); // one less than number of possible options
  let nosePath = 'About/Noses/Nose_' + rand + '.png';
  nose = loadImage(nosePath);

  rand = round(random(1,5)); // one less than number of possible options
  let eyeLeftPath = 'About/Eyes/Eye_Left_' + rand + '.png';
  eyeLeft = loadImage(eyeLeftPath);

  rand = round(random(1,5)); // one less than number of possible options
  let eyeRightPath = 'About/Eyes/Eye_Right_' + rand + '.png';
  eyeRight = loadImage(eyeRightPath);

}

function setup() {
  canvas = createCanvas(windowWidth-30, windowHeight-1);
  canvas.position(0,0);

  centre = width*2/3;
}

function draw() {

  erase();
  rect(-10, -10, width+20, width+20);
  noErase();

  // fill(255,0,0);
  // noStroke();
  // circle(centre-5, height/2, 10);

  drawFeature(hair, 100, -40, 0);

  drawFeature(nose, 30, 280, 2);

  drawFeature(mouth, 30, 580, 1);

  drawFeature(eyeLeft, -200, 0, 3);

  drawFeature(eyeRight, 200, 0, 4);



}

// ======================== Helper Functions ======================== //

function windowResized() {
  resizeCanvas(windowWidth, windowHeight-1);
  background(ringColour);
}

function drawFeature(feature, distX, distY, num) {
  // draws the given facial feature (img) to the canvas, 
  // relative to center point (2/3*width 1/2*height)

  let randOffsetX = noise(0, frameCount/250, num) * randomness;
  let randOffsetY = noise(frameCount/250, 0 , num) * randomness;

  let featureWidth = feature.width * imgScale;
  let featureHeight = feature.height * imgScale;
  let featureX = centre - featureWidth/2 + (distX+randOffsetX) * imgScale;
  let featureY = height/3 - featureHeight/2 + (distY+randOffsetY) * imgScale;
  image(feature, featureX, featureY, featureWidth, featureHeight);
}