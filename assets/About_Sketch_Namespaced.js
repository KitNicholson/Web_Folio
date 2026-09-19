var sketch = function(p) {

  p.canvas

  p.centreX;
  p.centreY;

  p.imgScale;

  p.randomness = 555; // how far the features can move

  p.frameChange = 2;

  p.firstFrame = true;

  // ======================== Main Functions ======================== //

  p.preload = function() {

    p.headshot = loadImage('assets/AboutSketch_images/Headshot.png');

    p.rand = p.round(p.random(1,10)); // one less than number of possible options
    p.eye1Path = 'assets/AboutSketch_images/eye_' + p.rand + '.png';
    p.eye1 = p.loadImage(p.eye1Path);

    p.rand = p.round(p.random(1,10)); // one less than number of possible options
    p.eye2Path = 'assets/AboutSketch_images/eye_' + p.rand + '.png';
    p.eye2 = p.loadImage(p.eye2Path);

    p.rand = p.round(p.random(1,10)); // one less than number of possible options
    p.eye3Path = 'assets/AboutSketch_images/eye_' + p.rand + '.png';
    p.eye3 = p.loadImage(p.eye3Path);

  }

  p.setup = function() {

    p.canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    p.canvas.position(0,0);
    p.imageMode(CENTER);
    p.frameRate(1.4);
    // p.frameRate(30);
    p.count = 0;

    p.getCenterPos();

    p.euclidDist = Math.sqrt(p.width*p.width + p.height*p.height);

    // p.imgScale = p.height * 0.0006;   
    p.imgScale = p.euclidDist * 0.00025;   

  }

  p.draw = function() {

    if (p.width < 700) { // 700 is when mobile styles activate
      return
    }

    // make the background transparent
    p.erase();
    p.rect(-10, -10, p.width+20, p.height+20);
    p.noErase();

    // draw head shot
    p.drawFeature(p.headshot, 0, 0, 0, 1.4, 0.3);

    // add extra eyes
    p.drawFeature(p.eye1, 450, 200, 1, 1.01, 1);
    p.drawFeature(p.eye2, -550, -200, 2, 1.01, 1);
    // p.drawFeature(p.eye3, 200, -500, 3, 1.01, 1);

    // randomly change some features
    p.changeFeature();

  }

  // ======================== Helper Functions ======================== //

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight-1);
    p.getCenterPos;
    p.setImgScale;
  }

  p.getCenterPos = function() {

    p.centreX = p.width*0.7;
    p.centreY = p.height/2;

    if (width < 700) {
      p.centreX = p.width/2;
    }
  }

  p.drawFeature = function(feature, distX, distY, num, scale, animateScale) {
    // draws the given facial feature (img) to the canvas, 
    // relative to center point (2/3*width 1/2*height)

    p.count = p.frameCount;
    if (p.frameCount % 2 === 1) {
      p.count = p.frameCount - 1;
    }

    // p.randOffsetX = 0;
    // p.randOffsetY = 0;
  
    p.randOffsetX = p.noise(0, p.count/p.frameChange, num) * p.randomness;
    p.randOffsetX = (p.randOffsetX-(p.randomness/2)) * animateScale;
    p.randOffsetY = p.noise(p.count/p.frameChange, 0 , num) * p.randomness;
    p.randOffsetY = (p.randOffsetY-(p.randomness/2))   * animateScale;
  
    // p.featureX = p.centreX - p.featureWidth/2 + (distX+p.randOffsetX) * p.imgScale;
    p.featureX = p.centreX + (distX + p.randOffsetX) * p.imgScale;
    // p.featureY = p.height*0.45 - p.featureHeight/2 + (distY+p.randOffsetY) * p.imgScale;
    p.featureY = p.centreY + (distY + p.randOffsetY) * p.imgScale;
    p.image(feature, p.featureX, p.featureY, feature.width * p.imgScale * scale, feature.height * p.imgScale * scale);
  }

  p.changeFeature = function() {
    // randomly change one feature

    p.rand = p.random(0,5); // one less than number of possible options
    // console.log(p.rand);

    if (p.random(10) < 1) {

      // change eye 1
      p.rand = p.round(p.random(1,10)); // one less than number of possible options
      p.eye1Path = 'assets/AboutSketch_images/eye_' + p.rand + '.png';
      p.eye1 = p.loadImage(p.eye1Path);
    } 
    
    if (p.random(10) < 1) {

      // change eye 2
      p.rand = p.round(p.random(1,10)); // one less than number of possible options
      p.eye2Path = 'assets/AboutSketch_images/eye_' + p.rand + '.png';
      p.eye2 = p.loadImage(p.eye2Path);      
    }

    if (p.random(10) < 1) {

      // change eye 2
      p.rand = p.round(p.random(1,10)); // one less than number of possible options
      p.eye3Path = 'assets/AboutSketch_images/eye_' + p.rand + '.png';
      p.eye3 = p.loadImage(p.eye3Path);      
    }
    
  }

}

var faceSketch = new p5(sketch);