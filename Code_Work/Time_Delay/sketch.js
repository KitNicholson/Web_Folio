var video
let vHistory = [];
let scale = 1.5;

var yOffset = 0;

let w = 40 *scale;
let h = 96 *scale;
let lastFrameIndex = 642;

function setup() {
  canvas = createCanvas(windowHeight*1.4, windowHeight-1);
  canvas.position(0,0);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  background(0);

  w = width/16;
  h = height/5;
}

function draw() {
  //background(220);
  //image(video, 0,0);

  //spliceVideo();
  //HalfNHalf();
  faceSlice();

  // console.log(vHistory.length);
}

function saveFrame() {
  vHistory.unshift(video.get());

  if (vHistory.length>lastFrameIndex+1) {
    vHistory.pop();
  }
}

function spliceVideo() {
  // call in draw to show live video split the wrong quadrants 

  video.loadPixels();
  copy(video, 0,0,320,240, 320,240, 320,240);
  copy(video, 0,240,320,240, 320,0, 320,240);
  copy(video, 240,0,320,240, 0,240, 320,240);
  copy(video, 320,240,320,240, 0,0, 320,240);
}

function HalfNHalf() {
  video.loadPixels();
  saveFrame();

  if (vHistory.length>1) {
    copy(vHistory[vHistory.length-1], 0,0,video.width/2, video.height, 0,0,video.width/2,video.height);
  }
  copy(video, video.width/2,0,video.width/2, video.height, video.width/2,0,video.width/2,video.height);
}

function faceSlice() {
  video.loadPixels();
  saveFrame();

  let frameIndex = 0;

  for (let i=0; i<5; i++) {
    for (let j=0; j<16; j++) {
      
      let posY = i*h;
      let posX = j*w;


      if (frameIndex<vHistory.length) {
        copy(vHistory[frameIndex], posX,posY,w,h, posX,posY,w,h);
      }
      frameIndex+=8;
    }
  }
  
}

// function mousePressed() {
//   saveFrame();
// }
