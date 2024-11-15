/* 

SOUND
Scene Default: Deer Heart: Bathed in Her - Tilman Robinson
Scene Full:    Tessellatum: Part EE - Nadia Sirota
Scene Tall:    Solaris: You Mean More To Me Than Any Scientific Truth - Ben Frost & Daníel Bjarnason
Scene Weave:   Treatise (1963 - 1967) I - Cornelius Cardew
							 Liminal Sleep: Sleep 6 - Sigur Ros

TYPFACES
twoPoint H - MuirMcNeil
twoStroke A44 - MuirMcNeil
twoBar mono thin - MuirMcNeil
twoBlock C regular - MuirMcNeil

*/

// CONSTANTS
let MILLISECONDS = 0.001;

// admin and constants
let posNeg = [-1,1];

let userControl = false;
let userControlTimeOut = 0;
let timeOutWait = 20;

let typeFaceArray = [];

// scene controls

let timeLeftInScene = 5;
let currentScene = 0;
let globalSceneDuration = 0;
let holdScene = false;

// scene ID is from position in this array
let setupFunctions = [
  setupDefault,
  setupFull,
  setupTall,
  setupWeave,
];

// the order in which secens will be cycled through
let switchOptions = [
  setupFull,
  setupWeave,
  setupTall,
  setupDefault,
]

let nextSceneIndex = 0;

// Styles and Effects

// accent
let accentOn = true;

// frame rate controls
let fr = 24;
let maxFR = 120;
let frIncrement = 1;

// fade
let fadeOn = false;
let opacity = 0.7;

// colours
let backgroundColr;
let accentColr1;
let accentColr2;

let white;
let grey;
let black;

let red;
let gold;
let silver;

// text controls
let globalFont;

let globalTextSize = 50;
let textSizeIncrement = 1;
let minTextSize = 2;
let maxTextSize = 600;

let animateTextSize = false;
let grow = true;
let shrink = false;
let switchWhenSmall = false;

let minTextSpeed = 10;

// text displays
let strokeOn = false;
let fillOn = true;

// typefaces
let twoPointH;
let twoStrokeA44;
let twoBarMonoThin;
let twoBlockCReg;

let savedText = [];

// scene audio
let audioDefault;
let audioFull;
let audioTall;
let audioWeave1;

let audioSting;

let allMusic = [];

// Midi variables
let numKeysDown = 0;
let sizeFromVelocity = true;
let speedFromVelocity = true;


// ================= Main Functions ================= //

function preload() {

  // load typefaces
  twoPointH = loadFont('Data/TwoPointH-128Medium.otf');
  twoStrokeA44 = loadFont('Data/TwoStrokeA44.otf');
  twoBarMonoThin = loadFont('Data/TwoBar_Mono_016_Thin.otf');
  twoBlockCReg = loadFont('Data/TwoBlock_C_096_Regular.otf');

  // put typefaces into an array
  typeFaceArray = [twoPointH, twoBarMonoThin, twoStrokeA44, twoBlockCReg];

  // load audio
  audioDefault = loadSound("Data/SceneDefault_Audio_20s.mp3");
  audioFull = loadSound("Data/SceneFull_Audio_20s.mp3");
  audioTall = loadSound("Data/SceneTall_Audio_20s.mp3");
  audioWeave1 = loadSound("Data/SceneWeaveV2_Audio_Ambient.mp3");
  
  audioWeave2 = loadSound("Data/SceneWeaveV2_Audio_20s_Intensity.mp3");
  audioSting = loadSound("Data/Sting.mp3");

  
  // put audio elements into an array
  allMusic = [audioDefault, audioFull, audioTall, audioWeave1, audioWeave2];
}

function setup() {
  // Set colour variables
  black = color(0);
  white = color(255);
  grey = color(200);

  turquise = color(56, 148, 130)
  red = color(255,0,0);
  gold = color(220,175,65);
  silver = color(140,146,152);


  accentColr1 = gold;
  accentColr2 = turquise;

  // Setup Canvas
  canvas = createCanvas(windowWidth - 50, windowHeight-1);
  canvas.position(0,0);
  frameRate(fr);
  audioSting.playMode("sustain");

  backgroundColr = grey;
  background(backgroundColr);

  // chose relevant scene setup based on the current scene
  setupFunctions[currentScene]();
  background(backgroundColr);
}

function draw() {

  // chose scene to play
  if (currentScene === 0) {
    sceneDefault();
  } else if (currentScene === 1) {
    sceneFull();
  } else if (currentScene === 2) {
    sceneTall();
  } else if (currentScene === 3) {
    sceneWeave();
  } else {
    // in event of faliure show black screen
    background(black);
  }

  // update countdowns
  if (userControlTimeOut) {
    //console.log(userControlTimeOut);
    userControlTimeOut = countDown(userControlTimeOut);
  } else {
    userControl = false;
    timeLeftInScene = countDown(timeLeftInScene);
    //console.log(timeLeftInScene);
  }

  autoChangeScene();

}

// ================= Scene Functions ================= //

function setupDefault() {
  //console.log("D");

  // mark which scene is playing
  currentScene = 0;

  minTextSpeed = 20;
  maxTextSpeed = 150;
  
  // set styles

  // set scenes background colour
  backgroundColr = 255;

  fr = 24;
  fadeOn = false;
  strokeOn = false;
  fillOn = true;

  globalFont = random([twoPointH, twoBlockCReg, twoStrokeA44]);
  globalTextSize = 50;
  minTextSize = 5;
  maxTextSize = 45;
  textAlign(LEFT,LEFT);

  animateTextSize = true;
  switchWhenSmall = false;

  // set how long the scene lasts
  setSceneDuration(30);

  // play scenes music
  audioDefault.loop();

  // set voume
  audioSting.setVolume(1);

  // spawn text

  spawnAccentInconsistent();
  spawnTextFight();
  if (random(2) > 1) {
    spawnTextFight();
  }
}

function sceneDefault() {

  // controlss effects
  updateEffects();

  // manual text controls
  controls();

  // draw and move saved text
  for (let i=0; i<savedText.length; i++) {
    type = savedText[i]

    drawText(type.textStr, type.posX, type.posY, type.colr);
    moveTextEdgeBounce(type);
  }

}

function setupFull() {
  //console.log("F");

  // mark which scene is playing
  currentScene = 1;

  // spawn text

  spawnAccentInconsistent()

  // between 2 and 5 text agents will spawn
  let randNum1 = random(5-2) + 2;
  for(let i=0; i < randNum1; i++) {
    spawnTextYinYang();
  }

  // set styles

  minTextSpeed = 50;
  maxTextSpeed = 150;

  // set scenes background colour
  backgroundColr = white;

  // 1 in 2 chance of spawning favourite type over random type
  let randNum2 = random(2);
  if (randNum2 > 1) {
    globalFont = random([twoPointH, twoBarMonoThin, twoBarMonoThin, twoBarMonoThin, twoStrokeA44]);
  } else {
  globalFont = twoBarMonoThin;
  }
  globalTextSize = 750; 
  textAlign(CENTER,CENTER);

  // 1 in 3 chance of have unified movement
  let randNum3 = random(3)
  if (randNum3 > 3 - 1) {
    unifyTextMovement();
  }

  //randomise typeface
  globalFont = random([twoPointH, twoBarMonoThin, twoStrokeA44]);

  fr = maxFR;
  fadeOn = false;
  strokeOn = false;
  fillOn = true;

  animateTextSize = false;

  // set how long the scene lasts
  if (globalFont != twoBarMonoThin) {
    setSceneDuration(30);
  } else {
    setSceneDuration(60);
  }

  // play scenes music
  audioFull.loop();
  audioFull.rate(.7);
  
  // set voume
  audioSting.setVolume(1);
}

function sceneFull() {

  // controlss effects
  updateEffects();

  // manual text controls
  controls();

  // draw and move saved text
  for (let i=0; i<savedText.length; i++) {
    type = savedText[i]

    drawText(type.textStr, type.posX, type.posY, type.colr);
    moveTextOverhang(type);
  }
}

function setupTall() {
  //console.log("T");

  // mark which scene is playing
  currentScene = 2;

  // set how long the scene lasts
  setSceneDuration(50);

  // spawn text

  spawnAccentInconsistent();

  // 50/50 chance of spawning mess or alinged
  if (random(2) > 1) {
    // between up to 2 text agents will spawn
    let randNum1 = random(2);
    for(let i=0; i < randNum1; i++) {
      spawnTextYinYang();
    }
  
    // between up to 2 text agents will spawn
    let randNum2 = random(2);
    for(let i=0; i < randNum2; i++) {
      spawnTextCenterX();
    }

  } else {
    // between 1 and 3 text agents will spawn
    let randNum2 = random(3-1) + 1;
    for(let i=0; i < randNum2; i++) {
      spawnTextCenterX();
    }
  }

  // set styles

  // set the scenes background colour
  backgroundColr = black;

  fr = maxFR;
  fadeOn = false;
  strokeOn = false;
  fillOn = true;

  globalTextSize = random([285, 150, 75]);
  // 1 in 2 chance of spawning favourite type over random type
  let randNum = random(2);
  if (randNum > 1) {
    globalFont = random([twoPointH, twoBarMonoThin, twoBlockCReg]);
  } else {
  globalFont = twoBlockCReg;
  }

  // text settings
  textAlign(CENTER, CENTER);

  minTextSpeed = 15;
  maxTextSpeed = 150;

  // animation settings
  animateTextSize = false;

  // play scenes music
  audioTall.loop();

  // set voume
  audioSting.setVolume(0.8);
}

function sceneTall() {

  // controlss effects
  updateEffects();

  // manual text controls
  controls();
  
  for (let i=0; i<savedText.length; i++) {
    type = savedText[i]

    drawText(type.textStr, type.posX, type.posY, type.colr);
    moveTextVertical(type);
  }
}

function setupWeave() {
  //console.log("W");

  // mark which scene is playing
  currentScene = 3;

  // spawn text

  //spawnAccentInconsistent();

  // spawn random amount of text elemetns
  numElements =random([1,1,2,3]);
  for (let i=0; i < numElements; i++) {
    spawnTextOverlaid();
  }

  // set styles

  // set the scenes background colour
  backgroundColr = black;

  fr = 60;
  fadeOn = false;
  strokeOn = false;
  fillOn = true;

  globalFont = random(typeFaceArray);
  globalTextSize = random([10,120,200]);
  minTextSize = 2;
  maxTextSize = 600;

  textAlign(CENTER, CENTER);

  // set how long the scene lasts
  setSceneDuration(60);

  // animation settings

  // radnomise size animation
  if (random(2) > 1) {
    animateTextSize = true;
  } else {
    animateTextSize = false;
  }

  grow = true;
  shrink = false;
  switchWhenSmall = true;

  minTextSpeed = 50;
  maxTextSpeed = 200;

  // play scenes music
  audioWeave1.loop();
  audioWeave2.loop();
  audioWeave2.setVolume(.6);

  // set voume
  audioSting.setVolume(1);

  // remove ugly edge combiation of elements
  if ((globalFont === twoBarMonoThin) && !animateTextSize && globalTextSize < 20) {
    globalTextSize = random([120,200]);
    //console.log("got bad combination of elements");
  }
}

function sceneWeave() {

  // controlss effects
  updateEffects();

  // manual text controls
  controls();

  // draw and move saved text
  for (let i=0; i<savedText.length; i++) {
    type = savedText[i]

    drawText(type.textStr, type.posX, type.posY, type.colr);
    moveTextOverhang(type);
  }
  
}

// ================= Effects Functions ================= //

function updateEffects() {

   // toggles bakcground fade
   if (fadeOn) {
    background(200, opacity);
  }

  // controls frame rate
  frameRate(fr);
  //console.log("fr = " + fr);

  // toggles text size animation
  if (animateTextSize) {
    sizeAnimation();
  }
}

function toggleOutline() {
  strokeOn = !strokeOn;
}

function toggleFill () {
  fillOn = !fillOn;
}

function toggleHoldScene() {
  holdScene = !holdScene;
}

// ================= Style Functions ================= //

function chooseGlobalTypefaceKey() {
  // Identifies keys to change/set current font
  let num = parseInt(key);

  if (1 <= num && num <= typeFaceArray.length) {
    globalFont = typeFaceArray[parseInt(key - 1)];
  }
}

function chooseGlobalTypeface(intFont) {
  globalFont = typeFaceArray[intFont];
}

// ================= Control Functions ================= //

function controls() {

  // left arrow decreases frame rate
  if (keyIsDown(LEFT_ARROW)) {
    if (fr > frIncrement) {
      fr -= frIncrement;
    }
  } 
  
  // right arrow increases frame rate
  if (keyIsDown(RIGHT_ARROW)) {
    if (fr < maxFR) {
      fr += frIncrement;
    }
  } 
  
  // up arrow increases text size
  if (keyIsDown(UP_ARROW)) {
    globalTextSize += textSizeIncrement;
  } 
  
  // down arrow decreases text size if it's greater than 0
  if (keyIsDown(DOWN_ARROW)) {
    if (globalTextSize > minTextSize) {
      globalTextSize -= textSizeIncrement;
    }
  }

}

function keyPressed() {
  // Uses key down as the trigger to for effects

  // register that the user has control
  userControl = true;
  userControlTimeOut = timeOutWait;

  //console.log(key);
  if (key === "Backspace") {
    // reset screen

    deletText();

  } else if (key === "Enter"){
    // spawn default words for each scene

    if (currentScene === 0) {
      spawnAccentInconsistent();
      spawnTextFight();
    } else if (currentScene === 1) {
      spawnTextYinYang();
    } else if (currentScene === 2) {
      spawnTextCenterX();
    }else if (currentScene === 3) {
      spawnTextOverlaid();
    }

    playStingPitch(1);

  } else if (key === "y") {
    // spawn text

    spawnTextYinYang();

  } else if (key === "f") {
    // f triggers fade

    fadeOn = !fadeOn;

  } else if (key == "r") {
    
    randomiseMovement();
    playStingPitch(random([1.4, 1.6, 1.8]));

  } else if (key == "u") {
    
    unifyTextMovement();
    playStingPitch(random([2, 2.2, 2.4]));

  } else if (key === "o") {
    // draws an outline
    toggleOutline();

  } else if (key === "a") {
    // a triggers animation

    animateTextSize = !animateTextSize;

  } else if (key === "l") {
    accentOn = !accentOn;

  } else if (key === "h") {
    toggleHoldScene();
  } else if (key === "z") {
    accentColr1 = red;
  } else if (key === "x") {
    accentColr1 = gold;
  } else if (key === "c") {
    accentColr1 = turquise;
  }

  selectSceneKey();
  // uses keys 6-9

  chooseGlobalTypefaceKey();
  // uses keys 1-4

}

// ================= Scene Control Functions ================= //

function selectSceneKey(scene) {
  if (6 <= key && key <= 9) {
    endScene();
    setupFunctions[key-6]();
    background(backgroundColr);
  }
}

function selectScene(Scene) {
  endScene();
  setupFunctions[Scene]();
  background(backgroundColr);
}

function autoChangeScene() {
  // after a pre-set amount of time has passed, change to a random scene

  if (timeLeftInScene === 0 && !userControl && !holdScene) {
    
    // mark scene change in console
    //console.log("scene change");

    // select next scene
    let nextScene = switchOptions[nextSceneIndex];

    endScene();
    nextScene();
    background(backgroundColr);

    // update the indext for the next scene
    if (nextSceneIndex + 1 < switchOptions.length) {
      nextSceneIndex++;
    } else {
      nextSceneIndex = 0;
    }


  }
}

function setSceneDuration(time) {
  // if no global scene duration is set take the pre-set time
  if (!globalSceneDuration) {
    timeLeftInScene = time;
  } else {
    timeLeftInScene = globalSceneDuration;
  }
}

function endScene() {
  // to be used to clean up a scene on a scene change
  endAllMusic();
  removeAllText();
}

// ================= Helper Functions ================= //

function endAllMusic() {
  // stop all music
  audioDefault.stop();
  audioFull.stop();
  audioTall.stop();
  audioWeave1.stop();
  audioWeave2.stop();
}

function removeAllText() {
  savedText.length = 0;
}

function countDown(time) {
  if (time > 0) {
    time = time - (deltaTime * MILLISECONDS);
  } else if (time < 0) {
    time = 0;
  }

  return time;
}

function deletText() {
  savedText.length = 0;
  background(backgroundColr);
}

// ================= Text Functions ================= //

function drawText(str, posX, posY, colr) {
  // set colour
  if (colr) {

    if (fillOn) {
      fill(colr);
    } else {
      noFill();
    }

    if (strokeOn) {
    stroke(accentColr1);
    strokeWeight(2);
    }
    else {
      noStroke();
    }
  }

  // set text style
  textFont(globalFont);
  textSize(globalTextSize);

  // draw text
  text(str, posX, posY);
}

function saveText(str, col) {
  
  // need this line to get acurate textwidth() result
  textSize(globalTextSize);

  // randomise X spawn position, responding to current scene
  let X = 0;
  if (currentScene === 0) {
    X = random(0, width - textWidth(str));
  } else {
    X = random(width);
  }

  savedText.push({
    // saves text string
    textStr: str,

    colr: col,

    // saves initial position
    posX: X,
    posY: random(height),

    // sets direction and speed/rate of movement
    directX: random(posNeg),
    directY: random(posNeg),

    // speed in pixels per second
    speedX: random(maxTextSpeed - minTextSpeed) + minTextSpeed,
    speedY: random(maxTextSpeed - minTextSpeed) + minTextSpeed,
  })

  //console.log('array size = ' + savedText.length);
}

function saveTextPosSpeed(str, col, Xpos, Ypos, Yspeed) {

  savedText.push({
    // saves text string
    textStr: str,

    colr: col,

    // saves initial position
    posX: Xpos,
    posY: Ypos,

    // sets direction and speed/rate of movement
    directX: random(posNeg),
    directY: 1,

    // speed in pixels per second
    speedX: random(80) + 20,
    speedY: Yspeed,
  })

  //console.log('array size = ' + savedText.length);
}

// ================= Spawn Text Functions ================= //

function spawnAccentInconsistent() {
  // 1 in 3 chance of not spawning highlight
  if (random(3) > 1) {
    saveText("TrIST", accentColr1);
  }
}

function spawnAccentConsistent() {
  saveText("CONsT", accentColr1);
}

function spawnTextFight() {
  saveText('WHOA WHAT WHEN WHERE', white);
  saveText('YOU THIS NOW HERE', black);
  saveText('innow', white);
  saveText('othow', black);
}

function spawnTextYinYang() {
  //saveText('WHITE WHITE WHITE', white);
  saveText('PUREITY OFTHE DEVILE', white);
  //saveText('BLACK BLACK BLACK', black);
  saveText('DASRKNE OFTHE PURED', black);
}

function spawnTextOverlaid() {
  let randomSpeed = random(250-40) + 40;
  let Y = random(height);

  if (accentOn) {
    if (random(3) > 1) {
      saveTextPosSpeed('TRIST - CONST - FECHT - CONST - TRIST', accentColr1, random(width), Y, randomSpeed);
    }
  }

  saveTextPosSpeed('WOR DSIN THEPU LSETHATW EAVEANDPULS EANDBREATHMORE WOR DSINTHEPLUSE', white, random(width), Y, randomSpeed);
  saveTextPosSpeed('WORDSI NTHEPUL SETHAT WEAVEAN DPULSEANDBREA THMO REWORDSI NTHEPLUSE', black, random(width), Y, randomSpeed);
}

function spawnTextCenterX () {
  saveTextPosSpeed('In Sile n ceWe', white, width/2, random(height), random(maxTextSpeed-minTextSpeed-50) + minTextSpeed + 50);
  saveTextPosSpeed('He arTh e Uth', black, width/2, random(height), random(maxTextSpeed-minTextSpeed-50) + minTextSpeed + 50);
}

// ================= Text Animation Functions ================= //

function sizeAnimation() {
  // controls animation of text size, and a random font change when less than min font size
  if (animateTextSize) {
    if (grow && globalTextSize > maxTextSize) {
      grow = false;
      shrink = true;

      if (currentScene === 0) {
        playStingPitch(0.3);
      } else if (currentScene === 3) {
        playStingPitch(0.1);
      }

    } else if (shrink && globalTextSize < minTextSize) {
      grow = true;
      shrink = false;

      if (currentScene === 0) {
        playStingPitch(0.5);
      } else if (currentScene === 3) {
        playStingPitch(0.5);
      }

      // change typeface when small
      if (switchWhenSmall) {
        globalFont = random(typeFaceArray);
      } 

    } else if (grow) {
      globalTextSize += textSizeIncrement 

    } else if (shrink) {
      globalTextSize -= textSizeIncrement 
    }
  }
}

function moveTextEdgeBounce(type) {
  
  // finds the current edge of the text
  let leftEdge = type.posX;
  let rightEdge = type.posX + textWidth(type.textStr);

  let pan = type.posX + textWidth(type.textStr)/2;
  pan = map(pan, 0, width - textWidth(type.textStr)/2, -1, 1, true);

  // move on X-axis within screen at rate speed
  if (type.directX > 0 && rightEdge <= width) {
    // positive direction in bounds
    type.posX += type.speedX * deltaTime * .001;
  } else if(type.directX > 0 && rightEdge > width) {
    // positive direction out of bounds
    type.directX = -1;
  } else if (type.directX < 0 && leftEdge >= 0) {
    // negative direction in bounds
    type.posX -= type.speedX * deltaTime * .001;
  } else if(type.directX < 0 && leftEdge < 0) {
    // negative direction out of bounds
    type.directX = +1;
  }

  // move on Y-axis within screen at rate speed
  if (type.directY > 0 && type.posY <= height) {
    // positive direction in bounds
    type.posY += type.speedY * deltaTime * .001;
  } else if(type.directY > 0 && type.posY > height) {
    // positive direction out of bounds
    type.directY = -1;
  } else if (type.directY < 0 && type.posY >= 0) {
    // negative direction in bounds
    type.posY -= type.speedY * deltaTime * .001;
  } else if(type.directY < 0 && type.posY < 0) {
    // negative direction out of bounds
    type.directY = +1;
  }
}

function moveTextOverhang(type) {

  // make top boarder higher if the text is really big to accomodate the off center centerline
  topLineOffset = textSize()/12;

  // move on X-axis within screen at rate speed
  if (type.directX > 0 && type.posX <= width) {
    // positive direction in bounds
    type.posX += type.speedX * deltaTime * .001;
  } else if(type.directX > 0 && type.posX > width) {
    // positive direction out of bounds
    type.directX = -1;

    // play sound effect for scene 3 on bounce
    if (currentScene === 3) {
      playStingPitch(random([0.15, 0.17]));
    }

  } else if (type.directX < 0 && type.posX >= 0) {
    // negative direction in bounds
    type.posX -= type.speedX * deltaTime * .001;
  } else if(type.directX < 0 && type.posX < 0) {
    // negative direction out of bounds
    type.directX = +1;

    // play sound effect for scene 3 on bounce
    if (currentScene === 3) {
      playStingPitch(random([0.16, 0.18]));
    }
  }

  // move on Y-axis within screen at rate speed
  if (type.directY > 0 && type.posY <= height) {
    // positive direction in bounds
    type.posY += type.speedY * deltaTime * .001;
  } else if(type.directY > 0 && type.posY > height) {
    // positive direction out of bounds
    type.directY = -1;

    // play sound effect for scene 3 on bounce
    if (currentScene === 3) {
      playStingPitch(random([0.2, 0.21]));
    }
    
  } else if (type.directY < 0 && type.posY >= 0 - topLineOffset) {
    // negative direction in bounds
    type.posY -= type.speedY * deltaTime * .001;
  } else if(type.directY < 0 && type.posY < 0 - topLineOffset) {
    // negative direction out of bounds
    type.directY = +1;

    // play sound effect for scene 3 on bounce
    if (currentScene === 3) {
      playStingPitch(random([0.2, 0.21]));
    }
  }
}

function moveTextVertical(type) {

  // make top boarder higher if the text is really big to accomodate the off center centerline
  topLineOffset = textSize()/12;

  // move on Y-axis within screen at rate speed
  if (type.directY > 0 && type.posY <= height) {
    // positive direction in bounds
    type.posY += type.speedY * deltaTime * .001;
  } else if(type.directY > 0 && type.posY > height) {
    // positive direction out of bounds
    type.directY = -1;
    playStingLow();
  } else if (type.directY < 0 && type.posY >= 0 - topLineOffset) {
    // negative direction in bounds
    type.posY -= type.speedY * deltaTime * .001;
  } else if(type.directY < 0 && type.posY < 0 - topLineOffset) {
    // negative direction out of bounds
    type.directY = +1;
    playStingLow();
  }
}

function randomiseMovement() {
  // randomise direction of movement

  for (let i=0; i<savedText.length; i++) {
    type = savedText[i]

    //type.directX = random(posNeg);
    //type.directY = random(posNeg);

    type.speedX = random(200);
    type.speedY = random(200);
  }
}

function unifyTextMovement() {
  // make all text move the same in a random direction

  let dirctX = random(posNeg);
  let dirctY = random(posNeg);

  let randSpeed = random(maxTextSpeed - minTextSpeed) + minTextSpeed;

  for (let i=0; i<savedText.length; i++) {
    type = savedText[i]

    type.directX = dirctX;
    type.directY = dirctY;

    type.speedX = randSpeed;
    type.speedY = randSpeed;
  }
}

// ================= Sound Functions ================= //

function playStingLow() {
  audioSting.rate(random([.3, .35, .4, .5]));
  audioSting.play();
}

function playStingPitch(pitch) {
  audioSting.rate(pitch);
  audioSting.play();
}

function playStingLowPan(pan) {

  audioSting.rate(random([.3, .4, .5, .6, .7,]));
  audioSting.pan(pan);

  audioSting.play();
}