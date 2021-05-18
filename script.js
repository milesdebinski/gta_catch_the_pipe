// Audio files
let audioSuccess = new Audio("mp3/success.mp3");
let audioFail = new Audio("mp3/fail.mp3");
// Display Data
const trans_data = document.querySelector(".trans_data");
// Get difficulti level buttons
// const easyBtn = document.getElementById("easy");
// const mediumBtn = document.getElementById("medium");
// const hardBtn = document.getElementById("hard");
// Get elements
const pipe = document.getElementById("pipe");
const green = document.getElementById("green");
const bar = document.getElementById("bar");
const button = document.getElementById("button");
// Computed Values to get data
const transPipe = getComputedStyle(pipe, null);
const transGreen = getComputedStyle(green, null);
// Get specific properties
let pipeY = transPipe.getPropertyValue("margin");
let greenY = transGreen.getPropertyValue("margin");
// Global variable to keep score
let score = 0;
let games = 0;

// Difficulty levels
// Easy
const easy = () => {
  gwMax = 100;
  gwMin = 60;
  psMax = 2;
  psMin = 1.3;
};
// Medium
const medium = () => {
  gwMax = 70;
  gwMin = 30;
  psMax = 1.3;
  psMin = 0.8;
};
// Hard
const hard = () => {
  gwMax = 40;
  gwMin = 20;
  psMax = 0.8;
  psMin = 0.5;
};
// Initial values greenWidth, greenMargin, pipeSpeed, speed for timeout
let gw;
let gm;
let ps;
let speedMS;
//Difficulty Randomizer - variables
let gwMax, gwMin, psMax, psMin;
// Difficulty Randomizer - randomize
const randomizeNumbers = () => {
  console.log([gwMax, gwMin, psMax, psMin]);
  gw = Math.floor(Math.random() * (gwMax - gwMin) + gwMin);
  gm = Math.floor(Math.random() * (400 - 150) + 150);
  ps = Math.random() * (psMax - psMin) + psMin;
  speedMS = Math.round(ps * 1000 + 100);
};

// GAME LOOP
const gameLoop = (greenWidth, greenMargin, pipeSpeed) => {
  console.log(games + 1);
  // Update "pipe" margin value
  pipeY = transPipe.getPropertyValue("margin");
  // Assign new "pipe" margin value
  pipe.style.margin = pipeY;

  // Destructuring margin values for the next If statement
  if (pipeY === "0px") pipeY = "0px 0px 0px 0px";
  let marginP = +pipeY.split(" ")[3].replace("px", "");
  if (greenY === "0px") greenY = "0px 0px 0px 0px";
  let marginG = +greenY.split(" ")[3].replace("px", "");
  // Uptade "green" margin value
  marginG = greenMargin;

  // Reset the 'pipe'
  setTimeout(() => {
    // Pipe to the starting point.
    pipe.style.transition = "all 0s linear 0s";
    pipe.style.margin = "0px 0px 0px 0px";
    // Reset styles
    pipe.style.background = "var(--pipe-color-first)";
    green.style.background = "var(--green-color-first)";
    bar.style.background = "var(--bar-color-first)";
  }, 450);

  setTimeout(() => {
    // Randomize values each time start is run
    randomizeNumbers();
    start(gw, gm, ps);
  }, 500);

  // Add Score & check pipe position
  if (marginP > marginG && marginP < greenMargin + greenWidth) {
    audioSuccess.play();
    score++;
    games++;
    green.style.background = "var(--green-color-second)";
    pipe.style.background = "var(--pipe-color-green)";
    pipe.style.transition = "all 0s linear 0s";
  } else {
    audioFail.play();
    games++;
    bar.style.background = "var(--bar-color-second)";
    pipe.style.background = "var(--pipe-color-bar)";
    pipe.style.transition = "all 0s linear 0s";
  }

  trans_data.textContent = `${score}`;
  // Smooth Exit
  if (games >= setGames) {
    bar.style.transition = `all 1000ms linear 0s`;
    bar.style.opacity = "0";
    pipe.style.opacity = "0.7";
  }
  return;
};

const spaceListenerCallback = (action) => {
  if (action.keyCode === 32) {
    window.removeEventListener("keydown", spaceListenerCallback);
    resetTimer();
    gameLoop(gw, gm, ps);
  } else {
    console.log("press spacebar!");
  }
};

// Stop The Pipe on keydown - SPACE
const stopThePipeLister = () => {
  window.addEventListener("keydown", spaceListenerCallback);
};

// Start - Initial game loop
const start = (greenWidth, greenMargin, pipeSpeed) => {
  // Assign css values
  green.style.width = `${greenWidth}px`;
  green.style.margin = `0px 0px 0px ${greenMargin}px`;
  pipe.style.transition = `all ${pipeSpeed}s linear 0s`;
  pipe.style.margin = "0px 0px 0px 600px";
  green.style.display = "block";

  // Display Data
  trans_data.textContent = `${score}`;
  // Final alert after the last game
  if (games >= setGames) {
    alert(`Game over. Your score: ${score}.`);
    return console.log(`Your score was: ${score}`);
  }
  inactivityTime();
  stopThePipeLister();
};
// Clear Timeout for next game when inactive
let time;
const resetTimer = () => {
  clearTimeout(time);
  time = setTimeout(nextGame, speedMS);
  console.log("Reset Timer");
};
// Progress to the next game
const nextGame = () => {
  if (games !== setGames) {
    window.removeEventListener("keydown", spaceListenerCallback);
    console.log("Next Game");
    gameLoop();
  }
};

// Reset timer when keypress or reload
const inactivityTime = () => {
  console.log("START");
  window.onload = resetTimer;
  window.onkeypress = resetTimer;
  resetTimer();
};

// Restart Button
button.addEventListener("click", () => {
  if (games === setGames || games === 0) {
    setTimeout(() => {
      games = 0;
      score = 0;
      bar.style.transition = `all 0s linear 0s`;
      pipe.style.transition = `all 0s linear 0s`;
      pipe.style.margin = "0px 0px 0px 0px";
      bar.style.opacity = "1";
    }, 100);
    setTimeout(() => {
      pipe.style.margin = "0px 0px 0px 600px";
      pipe.style.transition = `all ${ps}s linear 0s`;
    }, 200);
    if (games >= setGames) {
      setTimeout(() => {
        start(gw, gm, ps);
      }, 400);
    }
  }
});

// Set how many games do you wanna play: Any number.
let setGames = 10;
// start the game!
window.onload = () => {
  setTimeout(() => {
    // Set difficulty level:  easy(), medium(), hard()
    easy();
    randomizeNumbers();
    start(gw, gm, ps);
  }, 500);
};
