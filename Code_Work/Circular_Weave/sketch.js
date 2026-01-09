// ================= variables ================= //

let focusPoints = [];
let numFocusPoints;

let spacingGuide = 15;

let minRipples = 1;
let maxRipples = 15;

let minspeed = 0.2;
let maxspeed = 1.5;

let minWidth = 1;
let maxWidth = 50;

let backgroundColour;

let colourA;
let colourB;
let A_limit = 0;
let B_limit = 1;

let screenSize;
let spawnArea; // distance from one corner of spawn area to the other

// ================= Setup Functions ================= //

function setup() {
  createCanvas(windowWidth-50, windowHeight);
  frameRate(60);
  pickSketchColours();

  // console.log(width + ' ' + height);

  // find screen size, distance from one corner to the opposite corner
  screenSize = Math.sqrt(width*width + height*height);
  // console.log('screen size = ' + screenSize);

  // find spawn area
  spawnArea = Math.sqrt(Math.pow(1.4*width, 2) + Math.pow(1.6*height, 2));
  // console.log('spawn area = ' + spawnArea);

  // spawn focus points
  numFocusPoints = random(2, 6);
  for (let i=0; i < numFocusPoints; i++) {
    focusPoints.push(new FocusPoint(random(width*-0.2, width*1.2), random(height*-0.2, height*1.2)));
  }
  // console.log(focusPoints);

  focusPoints[0].spawnRipples(-1);

  // skip to something interesting
  for (let i=0; i<2000; i++) {

    for (let j=0; j<focusPoints.length; j++) {
      // focusPoints[j].drawRipples();      
      focusPoints[j].updateRipples();
    } 

    makeRipples(focusPoints);
  }

}

function pickSketchColours() {

  let num = random(8);

  if (num < 2.5) {
    // colour combo 2 ~ 70s beige
    backgroundColour = color(255, 252, 235);
    colourA = color(104,74,30);
    // colourA = color(81,51,7);
    colourB = color(126,125,76);

  } else if (num < 3.5) {
    // colour combo 2.1 ~ brown background light
    backgroundColour = color(104,74,30);
    colourA = color(139,140,88);
    colourB = color(255, 252, 235);

  } else if (num < 4.5) {
    // colour combo 2.2 ~ brown background dark
    backgroundColour = color(104,74,30);
    colourA = color(104,74,30);
    colourB = color(139,140,88);
    A_limit = 0.3;

  } else if (num < 5.5) {
    // colour combo 2.3 ~ green background dark
    backgroundColour = color(126,125,76);
    colourA = color(104,74,30);
    colourB = color(255, 252, 235);
    A_limit=0.3;
    
  } else if (num < 8) {
    // colour combo 3 ~ beige + reds
    backgroundColour = color(255, 252, 235);
    colourA = color(177, 1, 73); 
    colourB = color(240, 114, 1);

  }

  // // colour combo 4 ~ green with neon red
  // backgroundColour = color(125, 123.6, 55.5);
  // colourA = color(177, 1, 73); 
  // colourB = color(240, 114, 1);
  // A_limit = 0.2;

}

// ================= Main Function ================= //

function draw() {
  background(backgroundColour);

  // update and draw ripples
  for (let i=0; i<focusPoints.length; i++) {
    focusPoints[i].drawRipples();
    focusPoints[i].updateRipples();
  } 

  makeRipples(focusPoints);
  deleteRipples();


}

// ================= Helper Functions ================= //

function makeRipples(focusPoints) {

  // for each focus point
  for (let i=0; i < focusPoints.length; i++) {

    let screenVariation = (1600/screenSize)+1;
    // let screenVariation = 1;

    // random chance that ripples will be spawned
    if (random(140 * numFocusPoints) < 1) { // spawn rate is tied to screen size and number of points

      // randomly pick the direction of the ripples
      if (random(2) < 1) {
        focusPoints[i].spawnRipples(1);
        // console.log('grow');
      } else {
        focusPoints[i].spawnRipples(-1);
        // console.log('shrink');
      }
    }
  }
}

function deleteRipples() {
// FIX THIS FUNCTION

  // for each focus point
  for (let i=0; i < focusPoints.length; i++) {

    // work backwards through the arrary, deleting ripples that are out of bounds
    for (let j = focusPoints[i].ripples.length-1; j > 0; j--) {

      if ((focusPoints[i].ripples[j].direction < 0) 
        & (focusPoints[i].ripples[j].diameter < 0)) {

        // console.log('deletion of shrink = ' + focusPoints[i].ripples[j-1].diameter);
        // console.log(focusPoints[i].ripples);
        focusPoints[i].ripples.splice(j,1);
        // console.log(focusPoints[i].ripples);
      }

      if ((focusPoints[i].ripples[j].direction > 0) 
        & (focusPoints[i].ripples[j].diameter/2 > spawnArea)) {

          // console.log('deletion of growth = ' + focusPoints[i].ripples[j-1].diameter/2);
          // console.log(focusPoints[i].ripples);
          focusPoints[i].ripples.splice(j,1);
          // console.log(focusPoints[i].ripples);
      }
    }

  }

}

function pickColour() {
  return random(A_limit, B_limit);
}

// ================= Object Constructors ================= //

function FocusPoint(x, y) {
  this.x = x;
  this.y = y;
  this.ripples = [];

  this.spawnRipples = function(direction) {

    let rippleWidth = randomGaussian(1, 7);
    if (rippleWidth < 1) {
      rippleWidth = 1;
    }

    let numRipples = random(minRipples, maxRipples);

    let rippleSpeed = random(minspeed, maxspeed);

    let spacing = spacingGuide * rippleWidth;

    if (rippleWidth > 5) {
      numRipples = random(0, 2);
      spacing = random(3, spacingGuide*6) * rippleWidth
    }

    let colour = pickColour();

    let radius = 0;
    if (direction < 0) {
      radius = spawnArea * 1;
    }

    for (let i=0; i < numRipples; i++) {

      this.ripples.push(new Ripple(radius, direction, rippleSpeed, rippleWidth, colour))

      if (direction > 0) {
        radius -= spacing;
      } else if (direction < 0){
        radius += spacing;
      }

    }
  };

  this.drawRipples = function() {

    noFill();
    
    for (let i=0; i < this.ripples.length; i++) {
      
      if (this.ripples[i].diameter > 0) {

        let colour = lerpColor(colourA, colourB, this.ripples[i].colour);
        stroke(colour);
        strokeWeight(this.ripples[i].rippleWidth);

        circle(this.x, this.y, this.ripples[i].diameter);
      }
    }
  };

  this.updateRipples = function() {

    for (let i = 0; i < this.ripples.length; i++) {
      this.ripples[i].diameter += this.ripples[i].speed * this.ripples[i].direction
    }
  };
}

function Ripple(radius, direction, speed, rippleWidth, colour) {
  this.diameter = 2*radius;
  this.direction = direction; // direction can be 1 or -1
  this.speed = speed;
  this.rippleWidth = rippleWidth;
  this.colour = colour; // value from 0 to 1;
}