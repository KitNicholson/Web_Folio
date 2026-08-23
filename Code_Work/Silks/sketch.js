let tendrils = [];
let numTendrilSegments = 35;

let spacing = 5;

let variation = 450;
let speed = 200;

let armLength = 10; // this is only the initial value, using the left and right arrows will change it
let armColour;
let backColour;

let cornerDist;

function setup() {
  canvas = createCanvas(windowWidth -1 , windowHeight);
  canvas.position(0,0);
  frameRate(60);

  cornerDist = Math.sqrt((width**2) + (height**2));
  // console.log(cornerDist);

  //makeOTendrils(windowWidth/2, windowHeight/2, 400, 200);
  makeLTendrils();

  armLength = cornerDist*0.014

  armColour = color(0, 60, 175, 22);
  backColour = color(230, 230, 50, 8);
  // backColour = color(220, 10);

  background(0,60,175);
  

}

function draw() {

  background(backColour);

  redrawTendrils(tendrils);
  
  tendrilControls();
  
}

function redrawTendrils(tendrilArray) {
  for (let i=0; i<tendrilArray.length; i++) {
    tendrilArray[i].updateTendril(i);
    tendrilArray[i].drawTendril(armColour);
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

    if (useTT) {
      testTendril.addPoint();
    }

    for (let i=0; i<tendrils.length; i++) {
      tendrils[i].addPoint();
    }

  } else if (keyIsDown(83)) { // 83 is the keyCode for "s"

    if (useTT) {
      testTendril.removePoint()
    }

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
  }

  drawTendril(strokeCol) {
    // draws the tendril

    noFill();
    stroke(strokeCol);
    strokeWeight(3)
    beginShape();

    vertex(this.points[0][0], this.points[0][1]);
    curveVertex(this.points[0][0], this.points[0][1]);

    for (let i=1; i<this.points.length; i++) {
      curveVertex(this.points[i][0], this.points[i][1]);
    }

    endShape();
  }

  updateTendril() {
    // animates the tendril

    let Xpos = this.points[0][0];
    let Ypos = this.points[0][1];

    for(let i=0; i<this.points.length; i++) {

      var n = noise(Xpos/variation, Ypos/variation, (i*0.03)-(frameCount/speed));
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

function makeLTendrils() {

  let length = cornerDist*0.13;

  // left side of square
  for (let i=0; i <= length; i+=spacing) {
    tendrils.push(new spawnTendril(width*0.25, (height*0.3)+i, armLength, numTendrilSegments));
  }

  // top side of square
  for (let i=0; i<length; i+=spacing) {
    tendrils.push(new spawnTendril((width*0.25)+i, height*0.3, armLength, numTendrilSegments));
  }

  // right side of squareleft
  for (let i=spacing; i <= length; i+=spacing) {
    tendrils.push(new spawnTendril(width*0.68 - length, height*0.7 - i, armLength, numTendrilSegments));
  }

  // bottom side of square
  for (let i=spacing; i<length; i+=spacing) {
    tendrils.push(new spawnTendril(width*0.68 - i, height*0.7, armLength, numTendrilSegments));
  }
}

function makeOTendrils(Xpos, Ypos, numTenticles, radius) {
  // creat a ring of tentacles around coordinate (Xpos, Ypos)

  for (let i = 0; i < numTenticles; i++) {
		let theta = map(i, 0, numTenticles, -PI, PI);
    let x_ = Xpos + radius*cos(theta);
    let y_ = Ypos + radius*sin(theta);

    tendrils.push(new spawnTendril(x_, y_, armLength, 25));
  }
}