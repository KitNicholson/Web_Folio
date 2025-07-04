var sketch = function(g){

  // ============== Variables ============== //

  // values
  g.minLength;
  g.numRadials = 5;
  g.radialSpacing; // defined relative to minLength in setup()

  // shape variables

  g.shape1 = [];
  g.shape1Center; // dictionary with x and y as keys for position
  g.wobblyCenter1; // optional shape center that can animate relative to shapeCenter
  g.radials1 = [];

  g.shape2 = [];
  g.shape2Center;
  g.wobblyCenter2;
  g.radials2 = [];

  g.canvas;

  // ============== Setup Functions ============== //

  g.setup = function() {
    g.canvas = g.createCanvas(g.windowWidth-15, g.windowHeight*1.2);
    g.canvas.parent('back-graphic');
    g.canvas.style('z-index', '-1');

    g.angleMode(g.DEGREES);
    g.curveTightness(0);
    g.frameRate(20);

    // make the minimum leangth the window height, unless the width is smaller
    g.minLength = g.windowHeight
    if (g.windowWidth < g.windowHeight) {
      g.minLength = g.windowWidth;
    }

    // set radial spacing
    g.radialSpacing = 0.3*g.minLength;

    // set up shapes

    g.shape1Center = {x:1.5, y: 0.68};
    g.populateShape1(g.shape1, g.shape1Center);
    g.centerAlignShape(g.shape1, g.shape1Center);
    g.spawnRadials(g.shape1, g.shape1Center, g.radials1);
    g.wobblyCenter1 = {x:0, y: 0};

    g.shape2Center = {x:-0.8, y: 0.68};
    g.populateShape2(g.shape2, g.shape2Center);
    g.centerAlignShape(g.shape2, g.shape2Center);
    g.spawnRadials(g.shape2, g.shape2Center, g.radials2);
    g.wobblyCenter2 = {x:0, y: 0};
  }

  g.populateShape1 = function(shape, shapeCenter) {
    // use this funciton to give initial points to shape, and assign a center

    // assign points
    shape.push({x: 1.2, y: 0.7})

    shape.push({x: 1.33, y: 0.62})
    shape.push({x: 1.4, y: 0.73})

    shape.push({x: 1.3, y: 0.76})

    g.scalePoints(shape, shapeCenter);

  }

  g.populateShape2 = function(shape, shapeCenter) {
    // use this funciton to give initial points to shape, and assign a center

    // assign points
    shape.push({x: -0.5, y: 0.68})

    shape.push({x: 0, y: 0.5})

    shape.push({x: -0.12, y: 0.75})
    shape.push({x: -0.28, y: 0.75})

    g.scalePoints(shape, shapeCenter);
  }

  g.centerAlignShape = function(shape, shapeCenter) {
    // after the shape has been populated with points, 
    // it can optionally be alinged with the center (unless minLength is
    // equal to heigt, where it will already be centered)

    for (let i=0; i<shape.length; i++) {
      shape[i].x += (g.width -g.minLength)/2;
    }

    shapeCenter.x += (g.width - g.minLength)/2;
  }

  g.scalePoints = function(shape, shapeCenter) {
    // scales the points relative to the canvas

    for (let i=0; i<shape.length; i++) {
      shape[i].x = shape[i].x * g.minLength;
      shape[i].y = shape[i].y * g.minLength;
    }

    // scale center point
    shapeCenter.x = shapeCenter.x * g.minLength;
    shapeCenter.y = shapeCenter.y * g.minLength;
  }

  // ============== Main Function ============== //

  g.draw = function() {

    // clear previous frame
    g.erasePrevFrame();

    g.animateShapeCenter(g.shape1Center, g.wobblyCenter1, 0, 0, 1);
    g.animateShapeCenter(g.shape2Center, g.wobblyCenter2, 0, 0, 1);

    // update raidals
    g.updateRadials(g.shape1, g.wobblyCenter1, g.radials1);
    g.updateRadials(g.shape2, g.wobblyCenter2, g.radials2);
    

    // set stroke styles
    g.stroke(255,230,0, 200);
    g.strokeWeight(0.8);
    // noStroke();

    // set colour for shape 1, and then draw the radials for shape 1
    for (let i=0; i<g.numRadials; i++) {
      g.fill(255, 0, 0, 15+i*10);
      g.drawRadialsWoble(g.radials1[i], g.shape1Center);
    }

    // set colour for shape 2, and then draw the radials for shape 2
    for (let i=0; i<g.numRadials; i++) {
      g.fill(230, 150, 0, 15+i*6);
      g.drawRadialsWoble(g.radials2[i], g.shape2Center);
    }    
  }

  // ============== Draw Functions ============== //

  g.drawShape = function(shape) {
    // draws a custom shape, using curves, from a given array indicating points (shape).
    // make sure the array (shape) is expected to have at least 4 points 

    g.lastPoint = shape.length - 1;

    g.beginShape();

    g.curveVertex(shape[g.lastPoint].x, shape[g.lastPoint].y);

    for (let i=0; i<shape.length; i++) {
      g.curveVertex(shape[i].x, shape[i].y);
    }

    g.curveVertex(shape[0].x, shape[0].y);
    g.curveVertex(shape[1].x, shape[1].y);

    g.endShape();
  }

  g.drawRadialsWoble = function(shape, shapeCenter) {
    // draws a custom shape from a given array indicating key points (shape).
    // the points will be drawn near where they actualy are in a 'wiggle' effect
    // make sure the array (shape) is expected to have at least 4 points 

    g.lastPoint = shape.length - 1;

    g.beginShape();

    g.curveVertex(shape[g.lastPoint].x, shape[g.lastPoint].y);

    for (let i=0; i<shape.length; i++) {
      g.dist = g.euclideanDist(shapeCenter, shape[i].x, shape[i].y);
      g.curveVertex(shape[i].x + g.getDeviNonLin(shape[i].x, g.dist), shape[i].y + g.getDeviNonLin(shape[i].y, g.dist));
    }

    g.dist0 = g.euclideanDist(shapeCenter, shape[0].x, shape[0].y);
    g.curveVertex(shape[0].x + g.getDeviNonLin(shape[0].x, g.dist0), shape[0].y + g.getDeviNonLin(shape[0].y, g.dist0));
    g.dist1 = g.euclideanDist(shapeCenter, shape[1].x, shape[1].y);
    g.curveVertex(shape[1].x + g.getDeviNonLin(shape[1].x, g.dist1), shape[1].y + g.getDeviNonLin(shape[1].y, g.dist1));

    g.endShape();
  }

  g.erasePrevFrame = function() {
    // instead of drawing a solid background each frame, the previous frame is removed
    
    g.erase();
    g.rect(-10, -10, g.width+20, g.height+20); // 10px overlap around the edge of the canvas
    g.noErase();
  }

  // ============== Helper Functions ============== //

  g.spawnRadials = function(shape, shapeCenter, radials) {
    // updates the position of each point in the radials
    // radials does not need to be pupolated with points before this function is called

    // spawn the correct number of radials
    for (let i=0; i<g.numRadials; i++) {
      radials.push([]);

      // for the current radial, spawn the correct number of points
      for (let j=0; j<shape.length; j++) {
        radials[i].push({x:shapeCenter.x, y:shapeCenter.y});
      }
    }
  };

  g.updateRadials = function(shape, shapeCenter, radials) {
    // updates the position of each point in the radials as related to the center
    // spawnRadials should be called first

    // for every point in the shape
    for (let i=0; i<shape.length; i++) {

      // find the angle between the center and that point.
      g.distX = shape[i].x - shapeCenter.x;
      g.distY = shape[i].y - shapeCenter.y;
      g.theta = g.calcAngle(g.distY, g.distX);

      g.direcX = 1;
      g.direcY = 1;
      if (g.distX < 0) {
        g.direcX = -1;
        g.direcY = -1;
      }

      g.posX = shape[i].x;
      g.posY = shape[i].y;

      g.unitX = g.radialSpacing * Math.cos(g.theta);
      g.unitY = g.radialSpacing * Math.sin(g.theta);

      // update all points in each radial that are based on the current point in the shape
      for (let j=0; j<g.numRadials; j++) {

        // update the relevant point within the radial
        g.posX += g.unitX * (2**((j-4)/2.5)) * g.direcX;
        g.posY += g.unitY * (2**((j-4)/2.5)) * g.direcY;

        radials[j][i].x = g.posX;
        radials[j][i].y = g.posY;
      }
    }
  };

  g.animateShapeCenter = function(shapeCenter, wobblyCenter, xRange, yRange, speed) {
    // moves wobblyCenter around shapeCenter, according to xRange, yRange, and speed

    g.xOffset = g.noise(1, g.frameCount* 0.006 * speed) * 2*xRange;
    g.xOffset -= xRange;
    wobblyCenter.x = shapeCenter.x + g.xOffset;

    g.yOffset = g.noise(3, g.frameCount * 0.006 * speed) * 2*yRange;
    g.yOffset -= yRange;
    wobblyCenter.y = shapeCenter.y + g.yOffset;

  }

  g.calcAngle = function(opposite, adjacent) {
    return Math.atan(opposite / adjacent);
  }

  g.getDeviNonLin = function(pos, dist) {
    // gives a deviation that scales non-linearly based on distance (dist)
    g.deviation = g.noise(pos/120, g.frameCount/120);
    g.deviation -= 0.5; // change range of deviation from (0,1), to (-0.5, 0.5);
    g.deviation *= ((dist**1.1)/3) *0.8;
    return g.deviation;
  }

  g.euclideanDist = function(shapeCenter, radX, radY) {
    // finds the distance between two points, shapeCenter, and the point described by radX, radY
    
    g.distX = shapeCenter.x - radX;
    g.distY = shapeCenter.y - radY;

    g.hypSquared = (g.distX**2) + (g.distY**2);
    g.hypot = Math.sqrt(g.hypSquared);

    return g.hypot;
  }

}

var CoverSketch = new p5(sketch);