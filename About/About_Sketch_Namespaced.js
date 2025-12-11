var sketch = function(p) {

  p.canvas

  p.centre;

  p.imgScale;

  p.head;
  p.mouth;
  p.nose;
  p.eyeLeft;
  p.eyeRight;

  p.randomness = 555; // how far the features can move

  p.frameChange = 2;

  // ======================== Main Functions ======================== //

  p.preload = function() {

    p.rand = p.round(p.random(1,5)); // one less than number of possible options
    p.headPath = 'About/Heads/Head_' + p.rand + '.png';
    p.head = p.loadImage(p.headPath);

    p.rand = p.round(p.random(1,5)); // one less than number of possible options
    p.mouthPath = 'About/Mouths/Mouth_' + p.rand + '.png';
    p.mouth = p.loadImage(p.mouthPath);

    p.rand = p.round(p.random(1,5)); // one less than number of possible options
    p.nosePath = 'About/Noses/Nose_' + p.rand + '.png';
    p.nose = p.loadImage(p.nosePath);

    p.rand = p.round(p.random(1,5)); // one less than number of possible options
    p.eyeLeftPath = 'About/Left_eyes/Left_eye_' + p.rand + '.png';
    p.eyeLeft = p.loadImage(p.eyeLeftPath);

    p.rand = p.round(p.random(1,5)); // one less than number of possible options
    p.eyeRightPath = 'About/Right_eyes/Right_eye_' + p.rand + '.png';
    p.eyeRight = p.loadImage(p.eyeRightPath);

  }

  p.setup = function() {
    p.canvas = p.createCanvas(p.windowWidth-30, p.windowHeight-1);
    p.canvas.position(0,0);
    p.frameRate(1.2);
    // p.frameRate(30);
    p.count = 0;

    p.getCenterPos();
    // console.log(p.height);

    p.setImgScale();

  }

  p.draw = function() {

    // make the background transparent
    p.erase();
    p.rect(-10, -10, p.width+20, p.height+20);
    p.noErase();

    // fill(255,0,0);
    // noStroke();
    // circle(centre-5, height/2, 10);

    // draw the face

    p.drawFeature(p.head, 100, -40, 0, 2.6);

    p.drawFeature(p.nose, 30, 280, 2, 1);

    p.drawFeature(p.mouth, 30, 580, 1, 1);

    p.drawFeature(p.eyeLeft, -200, 0, 3, 1);

    p.drawFeature(p.eyeRight, 200, 0, 4, 1);

    console.log(p.frameCount)
    if (p.frameCount % 2 === 0) {

      // every so often change one of the features
      if (random(0, 4) < 1) {
        p.changeFeature();
        // console.log('here');
      }

    }

  }

  // ======================== Helper Functions ======================== //

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight-1);
    p.getCenterPos;
    p.setImgScale;
  }

  p.getCenterPos = function() {
    p.centre = p.width*3/5;
  }

  p.setImgScale = function() {
    p.imgScale = p.height * 0.0006;
  }

  p.drawFeature = function(feature, distX, distY, num, scale) {
    // draws the given facial feature (img) to the canvas, 
    // relative to center point (2/3*width 1/2*height)

    p.count = p.frameCount;
    if (p.frameCount % 2 === 1) {
      p.count = p.frameCount - 1;
    }
  
    p.randOffsetX = p.noise(0, p.count/p.frameChange, num) * p.randomness;
    p.randOffsetY = p.noise(p.count/p.frameChange, 0 , num) * p.randomness;
  
    p.featureWidth = feature.width * p.imgScale * scale;
    p.featureHeight = feature.height * p.imgScale * scale;
    p.featureX = p.centre - p.featureWidth/2 + (distX+p.randOffsetX) * p.imgScale;
    p.featureY = p.height/3 - p.featureHeight/2 + (distY+p.randOffsetY) * p.imgScale;
    p.image(feature, p.featureX, p.featureY, p.featureWidth, p.featureHeight);
  }

  p.changeFeature = function() {
    // randomly change one feature

    p.rand = p.random(0,5); // one less than number of possible options
    // console.log(p.rand);

    if (p.rand < 1) {

      // change head
      p.rand = p.round(p.random(1,5)); // one less than number of possible options
      p.headPath = 'About/Heads/Head_' + p.rand + '.png';
      p.head = p.loadImage(p.headPath);
      console.log('changed head');

    } else if (p.rand < 2) {

      // change mouth
      p.rand = p.round(p.random(1,5)); // one less than number of possible options
      p.mouthPath = 'About/Mouths/Mouth_' + p.rand + '.png';
      p.mouth = p.loadImage(p.mouthPath);
      console.log('changed mouth');

    } else if (p.rand < 3) {

      // change nose
      p.rand = p.round(p.random(1,5)); // one less than number of possible options
      p.nosePath = 'About/Noses/Nose_' + p.rand + '.png';
      p.nose = p.loadImage(p.nosePath);
      console.log('changed nose');

    } else if (p.rand < 4) {

      // change left eye
      p.rand = p.round(p.random(1,5)); // one less than number of possible options
      p.eyeLeftPath = 'About/Left_eyes/Left_eye_' + p.rand + '.png';
      p.eyeLeft = p.loadImage(p.eyeLeftPath);

      console.log('changed left eye');

    } else {

      // change right eye
      p.rand = p.round(p.random(1,5)); // one less than number of possible options
      p.eyeRightPath = 'About/Right_eyes/Right_eye_' + p.rand + '.png';
      p.eyeRight = p.loadImage(p.eyeRightPath);

      console.log('changed right eye');
      
    }
    
  }

}

var faceSketch = new p5(sketch);