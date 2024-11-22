var sketch = function(p) {

  p.canvas

  p.centre;

  p.imgScale;

  p.hair;
  p.mouth;
  p.nose;
  p.eyeLeft;
  p.eyeRight;

  p.randomness = 555; // how far the features can move

  // ======================== Main Functions ======================== //

  p.preload = function() {

    p.rand = p.round(p.random(1,5)); // one less than number of possible options
    p.hairPath = 'About/Hair/Hair_' + p.rand + '.png';
    p.hair = p.loadImage(p.hairPath);

    p.rand = p.round(p.random(1,5)); // one less than number of possible options
    p.mouthPath = 'About/Mouths/Mouth_' + p.rand + '.png';
    p.mouth = p.loadImage(p.mouthPath);

    p.rand = p.round(p.random(1,5)); // one less than number of possible options
    p.nosePath = 'About/Noses/Nose_' + p.rand + '.png';
    p.nose = p.loadImage(p.nosePath);

    p.rand = p.round(p.random(1,5)); // one less than number of possible options
    p.eyeLeftPath = 'About/Eyes/Eye_Left_' + p.rand + '.png';
    p.eyeLeft = p.loadImage(p.eyeLeftPath);

    p.rand = p.round(p.random(1,5)); // one less than number of possible options
    p.eyeRightPath = 'About/Eyes/Eye_Right_' + p.rand + '.png';
    p.eyeRight = p.loadImage(p.eyeRightPath);

  }

  p.setup = function() {
    p.canvas = p.createCanvas(p.windowWidth-30, p.windowHeight-1);
    p.canvas.position(0,0);

    p.getCenterPos();
    console.log(p.height);

    p.imgScale = p.height * 0.0005;
  }

  p.draw = function() {

    p.erase();
    p.rect(-10, -10, p.width+20, p.width+20);
    p.noErase();

    // fill(255,0,0);
    // noStroke();
    // circle(centre-5, height/2, 10);

    p.drawFeature(p.hair, 100, -40, 0);

    p.drawFeature(p.nose, 30, 280, 2);

    p.drawFeature(p.mouth, 30, 580, 1);

    p.drawFeature(p.eyeLeft, -200, 0, 3);

    p.drawFeature(p.eyeRight, 200, 0, 4);

  }

  // ======================== Helper Functions ======================== //

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight-1);
    p.getCenterPos;
  }

  p.getCenterPos = function() {
    p.centre = p.width*3/5;
  }

  p.drawFeature = function(feature, distX, distY, num) {
    // draws the given facial feature (img) to the canvas, 
    // relative to center point (2/3*width 1/2*height)
  
    p.randOffsetX = p.noise(0, p.frameCount/250, num) * p.randomness;
    p.randOffsetY = p.noise(p.frameCount/250, 0 , num) * p.randomness;
  
    p.featureWidth = feature.width * p.imgScale;
    p.featureHeight = feature.height * p.imgScale;
    p.featureX = p.centre - p.featureWidth/2 + (distX+p.randOffsetX) * p.imgScale;
    p.featureY = p.height/3 - p.featureHeight/2 + (distY+p.randOffsetY) * p.imgScale;
    p.image(feature, p.featureX, p.featureY, p.featureWidth, p.featureHeight);
  }

}

var faceSketch = new p5(sketch);