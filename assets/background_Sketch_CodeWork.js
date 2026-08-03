// ======================== Global Variabls ======================== //

let noiseSpeed = 0.005;
let trigSPeed = 0.5;

let img;
let cursors = [];
let rangeExpansion = 500;

var canvas

// ======================== Main Functions ======================== //

function preload() {

  img = loadImage('assets/cursor.png');
}

function setup() {
  
  canvas = createCanvas(windowWidth-1, windowHeight);
  canvas.position(0,0);
  canvas.parent('sketch-holder');
  frameRate(30);
  angleMode(DEGREES);
  imageMode(CENTER);

  
  if (width > 500) {
    img = loadImage('assets/cursor_BIG.png');
  } else {
    img.resize(50,0);
  }


  for (let i=0; i< 20; i++) {
    cursors.push(new Cursor());
  }
}

function draw() {

  blendMode(BLEND);

  // remove previous frame
  erase();
  fill(255);
  rect(-10,-10, width + 20, height + 20);
  noErase();

  drawCursors(cursors);

  updateCursors(cursors);


  blendMode(MULTIPLY);
  background(119, 151, 146);

}

// ======================== Helper Functions ======================== //

function windowResized() {
  resizeCanvas(windowWidth, windowHeight-1);
}

function drawCursors(cursors) {
  
  for (let i=0; i<cursors.length; i ++) {
    let x = cursors[i].x;
    let y = cursors[i].y;

    image(img, x, y);

    // fill(255,0,0);
    // circle(x, y, 3);
  }
}

function updateCursors(cursors) {
  
  for (let i=0; i<cursors.length; i ++) {

    let rangeX = noise(1, i, frameCount*noiseSpeed);
    rangeX += 0.5 * (sin(frameCount*trigSPeed + (i*20)) + 1);
    let posX = map(rangeX, 0, 2, 0 - rangeExpansion, width + rangeExpansion);
    cursors[i].x = posX;
    // cursors[i].x = width/2;

    let rangeY = noise(2, i, frameCount*noiseSpeed);
    rangeY += 0.5 * (cos(frameCount*trigSPeed + (i*13)) + 1);
    let posY = map(rangeY, 0, 2, 0 - rangeExpansion, height + rangeExpansion);
    cursors[i].y = posY;

  }
}


// ======================== constructors ======================== //

function Cursor() {
  this.x = random(0, width);
  this.y = random(0, height);

}