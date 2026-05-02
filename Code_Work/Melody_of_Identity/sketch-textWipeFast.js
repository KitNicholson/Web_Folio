// ===================== Variables ===================== //

let nuagesGris;

let liszt;

let portraits = [];

let availablePortraits = [];
let activePortraits = [];
let maxPortraits = 3;

let alphaIncriment = 0.3;

let countDown = 0;
let minWait = 5000; // in mili seconds
let maxWait = 13000; // in mili seconds

class PortraitPointer {
  constructor(pIndex) {
    this.pIndex = pIndex;
    this.alpha = 0;
    this.targetAlpha = 255;
  }
}

let sentances = [[],[],[]]; // three arrays for three sentances
let loosePhrases = [];
let allPhrases = [];
let jumbledPhrases = [];

let textScale = 0.08;
let phrasePointer = -1; // pointer starts at -1 so when it is first incrimiented it points to the 0 index
let switchCountDown; // counter, when it reaches 0 incriments phrasePointer
let minSwitch = 5000; // minimum wait time for switchCountdown (in miliseconds)
let maxSwitch = 15000; // maximum wait time for switchCountDown (in miliseconds)
let minPhraseDuration = 10000; // how long the annotations apears in miliseconds
let maxPhraseDuration = 20000; // how long the annotations apears in miliseconds

class Phrase {
  constructor(phrase) {
    this.phrase = phrase;
    this.X; // randomly assinged during resizing
    this.Y; // randomly assinged during resizing
    this.visibility = 0;
    this.fade = 0; // three possible states, 1 is fade in, -1 is fade out, 0 is no fade
    this.countDown = 0; // begins counting when phrase fades in, when it hits 0 phrase begins to fade out
  }
}

let sheetMusic = [];
let page1_y;
let page2_y;
let pageScrollIncriment = 0.5;

// ===================== Setup ===================== //

function preload() {

  nuagesGris = loadSound('assets/Nuages_Gris.MP3');

  liszt = loadImage('assets/Liszt.jpg');

  // add images to portraits
  portraits.push( loadImage('assets/Lady.png') );
  portraits.push( loadImage('assets/Girl.png') );
  portraits.push( loadImage('assets/Sitting_Lady.png') );
  portraits.push( loadImage('assets/Boy.png') );
  portraits.push( loadImage('assets/Old_Man.png') );
  portraits.push( loadImage('assets/Gentleman.jpg') );
  portraits.push( loadImage('assets/Stern_Girl.png') );
  portraits.push( liszt);

  // add indexes to availablePortraits
  for (let i=0; i<portraits.length; i++) {
    availablePortraits.push(i);
  }

  // load sheet music
  sheetMusic.push( loadImage('assets/Nuages_Gris_1.jpg'));
  sheetMusic.push( loadImage('assets/Nuages_Gris_2.jpg'));

  // load hand writing
  sentances[0].push( new Phrase( loadImage('assets/Alice_1_1.jpg')));
  sentances[0].push( new Phrase( loadImage('assets/Alice_1_2.jpg')));
  sentances[0].push( new Phrase( loadImage('assets/Alice_1_3.jpg')));

  sentances[1].push( new Phrase( loadImage('assets/Alice_2_1.jpg')));
  sentances[1].push( new Phrase( loadImage('assets/Alice_2_2.jpg')));
  
  sentances[2].push( new Phrase( loadImage('assets/Alice_3_1.jpg')));
  sentances[2].push( new Phrase( loadImage('assets/Alice_3_2.jpg')));

  loosePhrases.push( new Phrase( loadImage('assets/DG1.1_her_eyes.jpg')));
  loosePhrases.push( new Phrase( loadImage('assets/DG1.2_her_eyes.jpg')));
  loosePhrases.push( new Phrase( loadImage('assets/DG2.1_then_closed.jpg')));
  loosePhrases.push( new Phrase( loadImage('assets/DG2.2_then_closed.jpg')));
  loosePhrases.push( new Phrase( loadImage('assets/DG3.1_when_they.jpg')));
  loosePhrases.push( new Phrase( loadImage('assets/DG3.2_when_they.jpg')));

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30);
  imageMode(CENTER); // due to using copy() annotations are still drawn from the top left corner

  countDown = 2000;
  switchCountDown = random(minSwitch, maxSwitch);

  // resize images to fit the screen
  for (let i=0; i<portraits.length; i++) {
    portraits[i].resize(0, height);
  }

  // resize phrases
  resizePhrases(loosePhrases);
  resizePhrases(sentances[0]);
  resizePhrases(sentances[1]);
  resizePhrases(sentances[2]);
  randomizePhrasePositions(loosePhrases);
  randomizePhrasePositions(sentances[0]);
  randomizePhrasePositions(sentances[1]);
  randomizePhrasePositions(sentances[2]);

  // make array of all phrases
  for (let i=0; i<loosePhrases.length; i++) {
    allPhrases.push(loosePhrases[i]);
  }
  allPhrases.push(sentances[0]);
  allPhrases.push(sentances[1]);
  allPhrases.push(sentances[2]);

  // jumble up phrases
  jumbledPhrases = jumbleArray(allPhrases);

  // resize sheetMusic
  for (let i=0; i<sheetMusic.length; i++) {
    sheetMusic[i].resize(width, 0);
  }

  // position sheet music
  page1_y = height + (sheetMusic[0].height * 0.35);
  page2_y = height + (sheetMusic[1].height * 1.3);

}

// ===================== Main ===================== //
function draw() {

  // start audio
  if (frameCount === 1) {
    nuagesGris.loop();
  }

  blendMode(BLEND);
  tint(255, 130);
  background(35,29,25);
  // background(80,71,62);
  // background(92,82,73);

  
  manageSheetMusic();
  
  managePortraits()

  manageAnnotations();
  
}

// ===================== Helpers ===================== //

function resizePhrases(phrases) {
  // takes an array of phrases, and resizes the image of the phrase

  for (let i=0; i<phrases.length; i++) {
    phrases[i].phrase.resize(0, height*textScale);

    
  }
}

function randomizePhrasePositions(phrases) {
  // takes an array of phrases and randomises their position, within screen bounds
  // only repositions phrases that are not currently visible, for smoothness

  for (let i=0; i<phrases.length; i++) {

    if (phrases[i].visibility === 0) {

      let w = phrases[i].phrase.width;
      phrases[i].X = random(0, width-(phrases[i].phrase.width));

      let h = phrases[i].phrase.height;
      phrases[i].Y = random(0, height-(phrases[i].phrase.height));

    }
  }

}

function jumbleArray(array) {

  // make array of available indexes
  let availableIndexes = [];
  for (let i=0; i<array.length; i++) {
    availableIndexes.push(i);
  }

  let jumbledArray = [];

  while (availableIndexes.length > 0) {

    // select a random index
    let i = random(availableIndexes);

    // add the phrase at the random index to junbledArray
    if (array[i].length > 0) {
      // if it is a sentace add all parts of the sentance to junbled array in order
      for (let j=0; j<array[i].length; j++) {
        jumbledArray.push(array[i][j]);
      }
    } else {
      // add the phrase to the jumbled array
      jumbledArray.push(array[i])
    }

    // remove that used index to prevent duplicated phrases
    let index = availableIndexes.indexOf(i);
    if (index !== -1) {
      availableIndexes.splice(index, 1);
    }
  }

  return jumbledArray;
}

function managePortraits() {
  // controls fade in, and out of portraits

  blendMode(BLEND);

  // once the countdown ends activate a change, else keep counting down
  if (countDown <= 0) {
    
    // ADD NEW IMAGE

    // check that the limit on active portraits has not been reached
    if (activePortraits.length < maxPortraits) {

      // select 1 image from those available
      let selectedImage = random(availablePortraits);
      
      // make a pointer for that image
      activePortraits.push( new PortraitPointer(selectedImage));

      // remove that image index from array of available ones
      let index = availablePortraits.indexOf(selectedImage);
      if (index !== -1) {
        availablePortraits.splice(index, 1);
      }

    }

    // reset the counter
    countDown = random(minWait, maxWait);
  } else {
    // advance counter
    countDown -= deltaTime;
  }

  // DRAW PORTRAITS
  for (let i=0; i<activePortraits.length; i++) {
    let pIndex = activePortraits[i].pIndex

    // set transparency
    tint(255, activePortraits[i].alpha)

    // draw the portrait
    image(portraits[pIndex], width/2, height/2);
  
  }

  // UPDATE PORTRAITS
  for (let i=0; i<activePortraits.length; i++) {
    let pIndex = activePortraits[i].pIndex

    // advance current alpha
    if (activePortraits[i].alpha < activePortraits[i].targetAlpha) {
      activePortraits[i].alpha += alphaIncriment;
    } else if (activePortraits[i].alpha > activePortraits[i].targetAlpha) {
      activePortraits[i].alpha -= 5 * alphaIncriment;
    }


    // if portrait hits target alpha (255), begin to remove portrait
    if (activePortraits[i].alpha > 250) {
      activePortraits[i].targetAlpha = -1;
    }


    // remove portraits with negitive alpha
    if (activePortraits[i].alpha < 0) {

      // return the image to available portraits
      availablePortraits.push(activePortraits[i].pIndex);

      // remove portrait from activePortraits
      activePortraits.splice(i, 1);

      //set back 'i' one
      i--;

    }

  }

  

}

function manageSheetMusic() {

  // draw pages
  blendMode(LIGHTEST);
  image(sheetMusic[0], width*0.5, page1_y);
  image(sheetMusic[1], width*0.5, page2_y);

  // update their position
  page1_y -= pageScrollIncriment;
  page2_y -= pageScrollIncriment;

  // loop pages when the leave the screen
  if (page1_y + (sheetMusic[0].height * 0.5) < 0) {
    page1_y = sheetMusic[0].height * 1.45;
  }

  if (page2_y + (sheetMusic[1].height *0.6) < 0) {
    page2_y = sheetMusic[1].height * 1.35;
  }
}

function manageAnnotations() {

  // draw phrases
  blendMode(LIGHTEST);
  tint(255);
  for (let i=0; i<jumbledPhrases.length; i++) {

    if (jumbledPhrases[i].visibility > 0 && jumbledPhrases[i].fade === 1) {
      // fade in left to right

      // display the image
      let displaywidth = jumbledPhrases[i].phrase.width * jumbledPhrases[i].visibility;
      copy(jumbledPhrases[i].phrase, 
        0, 0, displaywidth, jumbledPhrases[i].phrase.height, 
        jumbledPhrases[i].X, jumbledPhrases[i].Y, displaywidth, jumbledPhrases[i].phrase.height
      );

    } else if (jumbledPhrases[i].visibility > 0 && jumbledPhrases[i].fade === -1) {
      // fade out right to left

      // display the image
      let displaywidth = jumbledPhrases[i].phrase.width * jumbledPhrases[i].visibility;
      let leftBound = jumbledPhrases[i].phrase.width - displaywidth;
      copy(jumbledPhrases[i].phrase, 
        leftBound, 0, displaywidth, jumbledPhrases[i].phrase.height, 
        jumbledPhrases[i].X + leftBound, jumbledPhrases[i].Y, displaywidth, jumbledPhrases[i].phrase.height
      );

    }

  }

  // move pointer through jumbled array
  if (switchCountDown < 0) {

    // when switchcountDown ends move the pointer forwards one
    phrasePointer = phrasePointer+1; // magic number '13' is the total number of phrases

    // when reaching the end of the array, reset the pointer and shuffle the arrary
    if (phrasePointer === jumbledPhrases.length) {
      phrasePointer = 0;
      jumbledPhrases = jumbleArray(allPhrases);
      randomizePhrasePositions(jumbledPhrases);
    }

    // trigger fade in and countdown 
    jumbledPhrases[phrasePointer].fade = 1;
    jumbledPhrases[phrasePointer].countDown = random(minPhraseDuration, maxPhraseDuration);

    // reset switchCountDown
    switchCountDown = random(minSwitch, maxSwitch);

  } else {
    // else reduce countdown
    switchCountDown -= deltaTime;

  }

  // update phrases (fade in, fade out)
  for (let i=0; i<jumbledPhrases.length; i++) {
    
    // update visibility
    if (jumbledPhrases[i].fade != 0) {
      jumbledPhrases[i].visibility += 0.03 * jumbledPhrases[i].fade // amount * direction
    }

    // cap max visiblity at one
    if (jumbledPhrases[i].visibility > 1) {
      jumbledPhrases[i].visibility = 1;
    }

    // if the phrase is no longer visible set it's fade to 'none' and cap minimum visibility at 0
    if (jumbledPhrases[i].visibility <= 0) {
      jumbledPhrases[i].fade = 0;
      jumbledPhrases[i].visibility = 0;
    }

    // incriment any countdowns, when they hit 0 begin to fade phrase out
    if (jumbledPhrases[i].countDown <= 0 && jumbledPhrases[i].fade === 1) {
      jumbledPhrases[i].fade = -1
      jumbledPhrases[i].countDown = 0;

    } else if (jumbledPhrases[i].countDown > 0) {
      jumbledPhrases[i].countDown -= deltaTime;
    }

  }

}