////////////////////////////////// Variables ////////////////////////////////// 

// canvas size
let sizeX = 1366;
let sizeY =736;

let edgeDist = 250;
let mid = 368;
let alph = 0;
let FR = 30;

////////////////////////////////// CIRCLES //////////////////////////////////

const LCircle = {
  // position
  X: edgeDist, defaultX: edgeDist,
  Y: mid, defaultY: mid,
  Pos: 1, //indicates which shift transform will be used for flipshift
  mouseControled: false,

  //shape
  Xsize: 250, // initial size if animating
  Xchange: -1,
  Xspeed: .06,
  Xmin: 30, Xmax: 250,

  Ysize: 250, // initial size if animating
  Ychange: -1,
  Yspeed: 0.04,
  Ymin: 30, Ymax: 250,
}

const RCircle = {
  // position
  X: sizeX - edgeDist, defaultX: sizeX - edgeDist,
  Y: mid, defaultY: mid,
  Pos: -1, //indicates which shift transform will be used for flipshift
  mouseControled: false,

  //shape
  Xsize: 250, // initial size if animating
  Xchange: -1,
  Xspeed: .043,
  Xmin: 30, Xmax: 250,

  Ysize: 250, // initial size if animating
  Ychange: -1,
  Yspeed: .023,
  Ymin: 30, Ymax: 250,
}

const MCircle = {
  // position
  X: 520, defaultX: 520,
  Y: 230, defaultY: 230,
  Pos: -1, //indicates which shift transform will be used for flipshift
  mouseControled: false,

  //shape
  Xsize: 100, // initial size if animating
  Xchange: -1,
  Xspeed: 0.005,
  Xmin: 80, Xmax: 100,

  Ysize: 100, // initial size if animating
  Ychange: -1,
  Yspeed: 0.005,
  Ymin: 80, Ymax: 100,
}

////////////////////////////////// LINKS //////////////////////////////////

const Link1 ={
  start: LCircle,
  end: RCircle,

  doFlipX: 0,
  doFlipY: 1,

  steps: 50,
  speed: .15,
  curFrame: 0,
}

const Link2 ={
  start: RCircle,
  end: MCircle,

  doFlipX: 0,
  doFlipY: 1,

  steps: 30,
  speed: .05,
  curFrame: 0,
}

const Link3 = {
  start: MCircle,
  end: LCircle,

  doFlipX: 0,
  doFlipY: 0,

  steps: 20,
  speed: .03,
  curFrame: 0,
}

////////////////////////////////// MAIN FUNCTIONS //////////////////////////////////

function setup() {
  canvas = createCanvas(windowWidth-30, windowHeight-1);
  canvas.position(0,0);

  frameRate(FR)

  setupCircles();
}

function setupCircles() {
  LCircle.X = 50 + (LCircle.Xsize)/2;
  LCircle.defaultX = 0;
  LCircle.Y = height*2/3;
  LCircle.defaultY = height*2/3;

  RCircle.X = width-50 - (RCircle.Xsize)/2;
  RCircle.defaultX = width-50 - (RCircle.Xsize)/2;
  RCircle.Y = height*2/3;
  RCircle.defaultY = height*2/3;

  MCircle.X = width*3/7;
  MCircle.defaultX = width*3/7;
  MCircle.Y = height/3;
  MCircle.defaultY = height/3;

  console.log('circles set');
}

function draw() {
  background(200);

  fill(0);

  // draws the edge/main circles 
  drawEllipse(LCircle);
  drawEllipse(RCircle);
  drawEllipse(MCircle);

  // draws links between circles
  CircleBeam(Link1);
  CircleBeam(Link2);
  CircleBeam(Link3);

  shapeTransform(LCircle);
  flipShift(LCircle);

  shapeTransform(RCircle);
  flipShift(RCircle);

  shapeTransform(MCircle);

}

////////////////////////////////// OTHER FUNCTIONS //////////////////////////////////

function drawEllipse(circle) {
  ellipse(circle.X, circle.Y, circle.Xsize, circle.Ysize);
}


function CircleBeam(Link) {

  // calculates the amount of change between each step

  let unitDistX = (Link.end.X - Link.start.X) / (Link.steps + 1);
  let unitDistY = (Link.end.Y - Link.start.Y) / (Link.steps + 1);

  let frameShiftX = (unitDistX/(FR+ 1)) * Link.curFrame;
  let frameShiftY = (unitDistY/(FR + 1)) * Link.curFrame;
  
  if (Link.doFlipX == 0) {
    var sizeDiffX = Link.end.Xsize - Link.start.Xsize;
  }
  else {
    var sizeDiffX = (Link.end.Xsize + Link.start.Xsize) * -1;
  }

  if (Link.doFlipY == 0) {
    var sizeDiffY = Link.end.Ysize - Link.start.Ysize;
  }
  else {
    var sizeDiffY = (Link.end.Ysize + Link.start.Ysize) * -1;
  }
    
  // sets opacity for step circles
  fill(255, 255, 255, alph);
  
  // draws each step
  for (i=0; i<=Link.steps; i++) {
    // position
    let posX = Link.start.X + (i*unitDistX) + frameShiftX;
    let posY = Link.start.Y + (i*unitDistY) + frameShiftY;
    
    let distFromStart = EuclideanDistance(Link.start.X, Link.start.Y, posX, posY);
    let distStartToEnd = EuclideanDistance(Link.start.X, Link.start.Y, Link.end.X, Link.end.Y);
    let distRatio = distFromStart / distStartToEnd;

    // size
    let Xsize = Link.start.Xsize + (distRatio * sizeDiffX);
    let Ysize = Link.start.Ysize + (distRatio * sizeDiffY);
  
    ellipse(posX, posY, Xsize, Ysize);
    }

  if (Link.curFrame < FR) {
    Link.curFrame += 1 * deltaTime * Link.speed;
  }
  else if (Link.curFrame >= FR) {
    Link.curFrame = 0;
  }
}

function EuclideanDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2-x1,2) + Math.pow(y2-y1,2))
}

function shapeTransform(circle) {
  // alters the shapes of the circles

  // controls the X changes
  if (circle.Xchange > 0 && circle.Xsize < circle.Xmax) {
    circle.Xsize += 1*deltaTime*(circle.Xspeed)
  }
  else if (circle.Xchange > 0 && circle.Xsize >= circle.Xmax) {
    circle.Xchange = -1;
  }
  else if (circle.Xchange < 0 && circle.Xsize > circle.Xmin) {
    circle.Xsize -= 1*deltaTime*(circle.Xspeed)
  }
  else if (circle.Xchange < 0 && circle.Xsize <= circle.Xmin) {
    circle.Xchange = +1;
  }

  // controls the Y changes
  if (circle.Ychange > 0 && circle.Ysize <= circle.Ymax) {
    circle.Ysize += 1*deltaTime*(circle.Yspeed)
  }
  else if (circle.Ychange > 0 && circle.Ysize > circle.Ymax) {
    circle.Ychange = -1;
    circle.Ysize = circle.Ymax;
  }
  else if (circle.Ychange < 0 && circle.Ysize >= circle.Ymin) {
    circle.Ysize -= 1*deltaTime*(circle.Yspeed)
  }
  else if (circle.Ychange < 0 && circle.Ysize < circle.Ymin) {
    circle.Ychange = +1;
    circle.Ysize = circle.Ymin;
  }

}

function shiftTransformTop(circle) {
  // moves the position of the circle, leaving the top
  // in the same position

  let top = circle.defaultY - (circle.Ymax / 2);
  circle.Y = top + (circle.Ysize / 2);
}

function shiftTransformBot(circle) {
  // moves the position of the circle, leaving the top
  // in the same position, unless controled by the mouse
  
  let bot = circle.defaultY + (circle.Ymax / 2);
  circle.Y = bot - (circle.Ysize / 2);
}

function flipShift(circle) {
  // alternates the circle between shiftTransformTop and shiftTransformBot

  if (circle.Ymax > 0 && circle.Ysize >= circle.Ymax) {
    circle.Pos *= -1;
  }

  if (circle.Pos == 1) {
    shiftTransformTop(circle);
  }
  else if (circle.Pos == -1) {
    shiftTransformBot(circle);
  }
}

function windowResized() {
  resizeCanvas(windowWidth-30, windowHeight-1);
  background(0);
  setupCircles();
}