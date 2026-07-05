let tendrils = [];

let variation = 300;
let speed = 250; // lower is faster

let tendrilColour;

let armLength = 10; // this is only the initial value, using the left and right arrows will change it
let numPoints = 20;
let nScale = 0.08;

function setup() {
  canvas = createCanvas(windowWidth - 1 , windowHeight);
  canvas.position(0,0);  frameRate(30);

  makeOTendrils((windowWidth/2) - 15, windowHeight/2, 120, 120);

  armLength = windowWidth*0.017

  background(255);

}

function draw() {

  background(0, 20);

  fill(255, 50);
  noStroke();
  circle((windowWidth/2) - 15, windowHeight/2, 140);
  circle((windowWidth/2) - 15, windowHeight/2, 135);
  circle((windowWidth/2) - 15, windowHeight/2, 130);
  circle((windowWidth/2) - 15, windowHeight/2, 125);
  // circle((windowWidth/2) - 15, windowHeight/2, 120);
  // circle((windowWidth/2) - 15, windowHeight/2, 115);
  // circle((windowWidth/2) - 15, windowHeight/2, 110);
  // circle((windowWidth/2) - 15, windowHeight/2, 105);

  redrawTendrils(tendrils);
  
  tendrilControls();
  
}

function redrawTendrils(tendrilArray) {
  for (let i=0; i<tendrilArray.length; i++) {
    tendrilArray[i].updateTendril(i);
    //tendrilArray[i].drawTendril();
    tendrilArray[i].drawTendrilFade();
  }
}

function tendrilControls() {
  // change variation based on key input
  if (keyIsDown(UP_ARROW)) {
    if (variation > 1) {
      variation -= 0.5;
    }
    console.log(variation);
  } else if (keyIsDown(DOWN_ARROW)) {
    variation += 0.5;
    console.log(variation);
  }

  // change armlegnth
  if (keyIsDown(LEFT_ARROW)) {
    if (armLength> 1) {
      armLength-= 0.2;
    }
    console.log(armLength);
  } else if (keyIsDown(RIGHT_ARROW)) {
    armLength+= 0.2;    
    console.log(armLength);
  }

  // add or remove points
  if (keyIsDown(65)) { // 65 is the keyCode for "a"

    for (let i=0; i<tendrils.length; i++) {
      tendrils[i].addPoint();
    }

  } else if (keyIsDown(83)) { // 83 is the keyCode for "s"

    for (let i=0; i<tendrils.length; i++) {
      tendrils[i].removePoint();
    }

  }
  
}


class Tendril {
  constructor(x, y, armLength, pointsArray) {
    this.origin = [x,y];
    this.length = armLength
    this.points = pointsArray;
    this.angles = [0, 0, 0];
    this.colour = 255;
  }

  drawTendril() {
    // draws the tendril

    noFill();
    stroke(this.colour,50);
    strokeWeight(1)
    beginShape();

    vertex(this.points[0][0], this.points[0][1]);
    curveVertex(this.points[0][0], this.points[0][1]);

    for (let i=1; i<this.points.length; i++) {
      curveVertex(this.points[i][0], this.points[i][1]);
    }

    endShape();
  }

  drawTendrilFade() {
    // draws the tendril

    noFill();
    stroke(this.colour, 80);
    strokeWeight(2)

    // draw first curve of tendril
    if (this.points.length>3) {
    beginShape ()
    curveVertex(this.points[0][0], this.points[0][1]);
    curveVertex(this.points[0][0], this.points[0][1]);
    curveVertex(this.points[1][0], this.points[1][1]);
    curveVertex(this.points[2][0], this.points[2][1]);
    endShape()
    }

    // draw the rest of the curves
    for (let i=3; i<this.points.length; i++) {

      stroke(this.colour, 80 - (i*4));

      beginShape();
      curveVertex(this.points[i-3][0], this.points[i-3][1]);
      curveVertex(this.points[i-2][0], this.points[i-2][1]);
      curveVertex(this.points[i-1][0], this.points[i-1][1]);
      curveVertex(this.points[i][0], this.points[i][1]);
      endShape();
    }

  }

  updateTendril() {
    // animates the tendril

    let Xpos = this.points[0][0];
    let Ypos = this.points[0][1];

    for(let i=0; i<this.points.length; i++) {

      var n = noise(Xpos/variation, Ypos/variation, (i*nScale)+(frameCount/speed));
      var mn = map(n, 0, 1, 0, 720);

      var pointPosX = this.points[i][0];
      var pointPosY = this.points[i][1];

      this.angles[i] = radians(mn);
      this.length = armLength;

      if (i+1 < this.points.length) {
        //console.log(i);
        //console.log(this.points[i+1]);
        this.points[i+1][0] = pointPosX + this.length*cos(this.angles[i]);
        this.points[i+1][1] = pointPosY + this.length*sin(this.angles[i]);
      }
      
    }
  }

  addPoint() {
    // get the indec of the last point in the array
    let index = this.points.length-1;

    //get the x and y values of the last point
    let x = this.points[index][0];
    let y = this.points[index][1];

    // add the last point to the points array
    this.points.push([x,y]);
  }

  removePoint() {
    if (this.points.length>2) {
      this.points.pop()
    }
  }
}

function spawnTendril(Xpos, Ypos, armLength, numPoints) {
  // returns a new tendril at point (Xpos, Ypos), 
  // with points armLength apart
  // and as many points as numPoints

  let pointsArray = [];
  for (let i=0; i<numPoints; i++) {
    pointsArray.push([Xpos,Ypos]);
  }

  return tendril = new Tendril(Xpos, Ypos, armLength, pointsArray);
}

function makeOTendrils(Xpos, Ypos, numTenticles, radius) {
  // creat a ring of tentacles around coordinate (Xpos, Ypos)

  for (let i = 0; i < numTenticles; i++) {
		let theta = map(i, 0, numTenticles, -PI, PI);
    let x_ = Xpos + radius*cos(theta);
    let y_ = Ypos + radius*sin(theta);

    tendrils.push(new spawnTendril(x_, y_, armLength, numPoints));
  }
}