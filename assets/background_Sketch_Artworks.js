// ======================== Global Variabls ======================== //

let possibleItems = [];

let skull;
let wastePaper;
let sharpener;
let pencil;
let paperclip;
let ducky;

let imageSize = 160;

let thrownItems = [];
let numThrown = 20;

let gravityRatio = 0.0004;

var canvas
let canvasOffset = 100;

// ======================== Main Functions ======================== //

function preload() {

  skull = loadImage('assets/Skull2.png');
  wastePaper = loadImage('assets/WastePaper.png');
  sharpener = loadImage('assets/Sharpener.png');
  paperclip = loadImage('assets/Paperclip.png');
  pencil = loadImage('assets/Pencil.png');
  ducky = loadImage('assets/Duck.png');



  possibleItems = [wastePaper, paperclip, pencil, sharpener, wastePaper, paperclip, pencil, sharpener, skull, ducky];
  // possibleItems = [skull, waste, mail];

}

function setup() {
  
  canvas = createCanvas(windowWidth-1, windowHeight);
  canvas.position(0,0);
  canvas.parent('sketch-holder');
  frameRate(30);
  angleMode(DEGREES);
  imageMode(CENTER);

  //set gravity
  gravity = height*gravityRatio;
  
  //resize all images
  for (let i=0; i < possibleItems.length; i++) {
    possibleItems[i].resize(imageSize, 0);
  }

  // spawn all thrown items
  for (let i=0; i < numThrown; i++) {
    thrownItems.push(new Item);
  }
  
  // For each item thrown
  for (let i=0; i < thrownItems.length; i++) {

    // update it a few times for an random start
    for (let j=0; j < 200; j++) {
      thrownItems[i].update();
    }
  }

}

function draw() {

  // translate the origin from top left to bottom left
  translate(-canvasOffset, height);
  scale(1, -1);

  blendMode(BLEND);

  // remove previous frame
  erase();
  fill(255);
  background(255);
  noErase();

  // For each item thrown
  for (let i=0; i < thrownItems.length; i++) {

    // draw the item
    thrownItems[i].draw();

    // update it for the next frame
    thrownItems[i].update();
    
  }

  blendMode(MULTIPLY);
  background(149, 120, 142);

}

// ======================== Helper Functions ======================== //

function windowResized() {
  resizeCanvas(windowWidth, windowHeight-1);
}


// ======================== constructors ======================== //

class Item {

  constructor() {

    this.img = random(possibleItems);

    this.x = random(0, width+canvasOffset);
    this.step = random(1,3);
    this.direction = random([1, -1]);

    this.y = 0;
    this.yStep = 0;
    this.baseline = random(height*0, height*0.2);
    this.upForce = random(height*0.018, height*0.032);

    this.angle = 0;
    this.angleStep = random(-4,4);
  }

  draw() {

    push()

    translate(this.x, this.y);
    rotate(this.angle);

    image(this.img, 0, 0);

    pop();
  }

  drawOLD() {
    image(this.img, this.x, this.y);
  }

  update() {

    // update x position
    this.x += this.step * this.direction;

    // loop back around if out of bounds on X axis
    if (this.direction > 0) {
      this.x = this.x % (width + (2*canvasOffset));
    } else {
      if (this.x < 0) {
        this.x = width + (2*canvasOffset);
      }
    }

    //update y position
    this.y += this.yStep;
    this.yStep -= gravity;

    // if below screen, reapply force
    if (this.y < 0-this.baseline) {
      this.yStep = this.upForce;
    }

    // update angle
    this.angle += this.angleStep;

  }

}