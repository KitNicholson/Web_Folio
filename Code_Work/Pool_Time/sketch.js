// ===================== Variables ===================== //

let font;

let word_1 = [];
let word_2 = [];
let words = [];

let ambiance;

// ===================== Setup Functions ===================== //

function preload() {

  font = loadFont('Satoshi-Black.otf');
  ambiance = loadSound('Pool_Ambience.wav');

}


function setup() {
  createCanvas(windowWidth - 1, windowHeight - 1);

  word_1 = font.textToPoints(
    'Relaxing', 
    width*0.17, 
    height*0.19, 
    130,
    {sampleFactor: 0.12}
  );

  word_2 = font.textToPoints(
    'in', 
    width*0.28, 
    height*0.48, 
    90,
    {sampleFactor: 0.14}
  );

  word_3 = font.textToPoints(
    'the', 
    width*0.5, 
    height*0.4, 
    90,
    {sampleFactor: 0.14}
  );
  
  word_4 = font.textToPoints(
    'Pool', 
    width*0.43, 
    height*0.73, 
    150, 
    {sampleFactor: 0.12}
  );

  words = [word_1, word_2, word_3, word_4];

}

// ===================== Main Functions ===================== //

function draw() {
  background(0, 170, 255);

  // start ambiant audio
  if (frameCount === 1) {
    ambiance.loop();
    // console.log(ambiance);
  }


  // text points

  stroke(255);
  strokeWeight(5);

  // for each word
  for (let j=0; j<words.length; j++) {

    let word = words[j];

    // get every point
    for (let i=0; i<word.length; i++) {

      // draw every point
      let xPos = word[i].x;
      let yPos = word[i].y;
      let coordinate = wobblePoint(xPos, yPos, 10, 25);
      point(coordinate.xPos, coordinate.yPos);
    }
  }

  // lines

  stroke(255);
  strokeWeight(2.5);

  // horizontal lines
  for (let y = -2; y< height; y+= 300) {
    for (let x = -5; x<width; x+=20) {

      let coordinate = wobblePoint(x, y, 8, 40);
      point(coordinate.xPos, coordinate.yPos);
    }
  }

  // vertical lines
  for (let x = 150; x<width; x+=300) {
    for (let y = -50; y<height; y+= 20) {
      let coordinate = wobblePoint(x, y, 15, 40);
      point(coordinate.xPos, coordinate.yPos);
    }
  }

}

// ===================== Helper Functions ===================== //

function wobblePoint(x, y, xRange, yRange) {

  // wobble the y point acording to sine wave
  y += (sin(frameCount/25 + x/20 + y/50) * yRange/4) + sin(frameCount/25 + x/100) * yRange/2;

  // add some noise for variety
  y += noise(frameCount/300, x/200, y/100) * 4*yRange;

  // wobble the x point acording to sine wave
  x += (sin(frameCount/30 + y/20 + x/50) * xRange/4);

  // add some noise for variety
  x += noise(frameCount/300, y/200, x/100) * 3*xRange;

  return {xPos: x, yPos: y};
}