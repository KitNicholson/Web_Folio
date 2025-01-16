// ===================== Global Variables ===================== //

let prevY = 0;
let distance = 230; // how 'far away' the mountian is. far is 255 (white) close is 0 (black)
let bckColours = [];
let numDots = 0;
let maxDots = 5;


// ===================== Settup Function ===================== //

function setup() {
  canvas = createCanvas(windowWidth-30, windowHeight-1);
  canvas.position(0,0);
  noiseDetail(8, 0.4);

  // add colour options for background
  bckColours.push(color(0)); // night
  bckColours.push(color(255,170,0)); // sunset
  bckColours.push(color(0,136,204)); // clear day
  bckColours.push(color(240,230,230)); // clouds
}

// ===================== Main Funciton ===================== //

function draw() {
  //background(240,230,230);
  background(random(bckColours));

  // add holy geometry behind mountains
  // for (let i=0; i<random(3); i++) {
  //   fill(random(255),random(255),random(255));
  //   noStroke();
  //   circle(random(40, width-40), random(40, height-40), random(50, height/3));
  // }

  // drawMountain(100, 100);
  // drawMountain(250, 200);

  drawManyMountains();
  // drawManyMountainsRand();

  noLoop();
}

// ===================== Helper Functions ===================== //

function drawHalfMountain(xOrigin, yOrigin, dirction) {
  // draws half of the mountain outline from an initial point (the peak)
  // x and y Origin are the start point / peak
  // direction can either be -1 to indicate left, or 1 to indicate right

  let y = yOrigin;
  prevY = y+1; // +1 so that there is still an outline at the origin/peak

  for (let x=xOrigin; 0 < x && x < width; x += dirction) {

    // fill beneath outline, column by column
    let brightness = map(yOrigin, 0, height, 255, 0);
    noStroke();
    fill(distance);
    rect(x,y, 1, height-y);

    // add noise to mountain fill
    // for (let i=y; i<height; i++) {
    //   fill(random(distance-50, distance));
    //   rect(x,i, 1, 1);
    // }

    if (distance > 0) {

      // add snow to mountain top
      let snowColLength = noise(x/40, y/40, distance) * (height-y) * 0.5
      fill(distance+30);
      //rect(x,y, 1, snowColLength);

      for (let i=0; i<snowColLength; i++) {
        let shadeNoise = noise(x/30, (y+i)/60, distance);
        let shadeIndex = 0;
        if (shadeNoise > (y/((height*1.7)-y))) {
          shadeIndex = 1;
        }
        let shades = [distance, distance*1.3];
        fill(shades[shadeIndex]);
        rect(x,y+i, 1, 2);
      }

    }

    // update y to make outline mountains
    prevY = y;
    let descent = noise(x/13, yOrigin);  
    // y += map(descent, 0, 1, -1, 2); // realistic shallow
    y += map(descent, 0, 1, -(height-yOrigin)/300, (height-yOrigin)/150); // realistic shallow
  }
}

function drawMountain(x, y) {
  // draws a mountain given a point (x,y)

  // add holy geometry to peak
  if (random(3) < 1 && numDots < maxDots) {
    fill(random(255),random(255),random(255));
    noStroke();
    circle(x, y, random(50, height/2));
    numDots++;
  }

  drawHalfMountain(x, y, 1);
  drawHalfMountain(x, y, -1);

  distance -= random(40,100);

}

function drawManyMountains() {
  // at random intervals from top to bottom, 
  // a mountain is drawn at a random x point

  for (let y = random(height/50, height/3); y<height; y += random(height/17, height/4)) {
    fill(255,0,0);
    //rect(10, y, 10, 10);


    // add holy geometry
    if (random(4.5) < 1  && numDots < maxDots) {
      fill(random(255),random(255),random(255));
      noStroke();
      circle(random(40, width-40), random(40, height-40), random(50, height/3));
      numDots++;
    }
    

    let r = round(random(width));
    drawMountain(r,y);   
    
  }
}

function drawManyMountainsRand() {
  for (let i=0; i < 3; i++) {
    drawMountain(round(random(width)), round(random(height)));
  }
}


