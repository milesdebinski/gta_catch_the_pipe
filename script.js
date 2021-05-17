// Audio files
let audioSuccess = new Audio("mp3/success.mp3");
let audioFail = new Audio("mp3/fail.mp3");

// Display Data
const trans_data = document.querySelector(".trans_data");
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
let gameInProgress;
// Initial values greenWidth, greenMargin, pipeSpeed
let gw = Math.floor(Math.random() * (80 - 20) + 20);
let gm = Math.floor(Math.random() * (400 - 250) + 250);
let ps = Math.random() * (2 - 0.7) + 0.7;
// FIX THIS - RANDOMIZE NUMBERS!!
// const randomizeNumbers = (gw, gm, ps) => {
//   gw = Math.floor(Math.random() * (80 - 20) + 20);
//   gm = Math.floor(Math.random() * (400 - 250) + 250);
//   ps = Math.random() * (2 - 0.7) + 0.7;
// };
// randomizeNumbers();
// GAME LOOP
const gameLoop = (greenWidth, greenMargin, pipeSpeed) => {
  gameInProgress = true;
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
  }, 950);

  setTimeout(() => {
    // Randomize values each time start is run

    gw = Math.floor(Math.random() * (80 - 20) + 20);
    gm = Math.floor(Math.random() * (400 - 150) + 150);
    ps = Math.random() * (2 - 0.7) + 0.7;

    start(gw, gm, ps);
  }, 1000);

  // Add Score & check pipe position
  if (marginP > marginG && marginP < greenMargin + greenWidth) {
    audioSuccess.play();
    score++;
    games++;
    green.style.background = "var(--green-color-second)";
    pipe.style.background = "var(--pipe-color-green)";
    pipe.style.transition = "all 0s linear 0s";
  } else {
    gameInProgress = false;
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

let greenWidthG;
let greenMarginG;
let pipeSpeedG;

const spaceListenerCallback = (action) => {
  if (action.keyCode === 32) {
    window.removeEventListener("keydown", spaceListenerCallback);
    resetTimer();
    gameLoop(greenWidthG, greenMarginG, pipeSpeedG);
  } else {
    console.log("press spacebar!");
  }
};

// Stop The Pipe on keydown - SPACE
const stopThePipeLister = (greenWidth, greenMargin, pipeSpeed) => {
  greenWidthG = greenWidth;
  greenMarginG = greenMargin;
  pipeSpeedG = pipeSpeed;
  window.addEventListener("keydown", spaceListenerCallback);
};

// Start
const start = (greenWidth, greenMargin, pipeSpeed, difficultyLevel) => {
  // Assign css values
  green.style.width = `${greenWidth}px`;
  green.style.margin = `0px 0px 0px ${greenMargin}px`;
  pipe.style.transition = `all ${pipeSpeed}s linear 0s`;
  pipe.style.margin = "0px 0px 0px 600px";
  green.style.display = "block";

  // Display Data
  trans_data.textContent = `${score}`;
  // How many games do you wanna play?
  if (games >= setGames) {
    alert(`Game over. Your score: ${score}.`);
    return console.log(`Your score was: ${score}`);
  }
  inactivityTime();
  stopThePipeLister(greenWidth, greenMargin, pipeSpeed);
};

// How many games do you wanna play?
let setGames = 3;
// set difficulty lvl between 1 and 5 (1 easy - 5 super hard)
let difficulty = 1;

// start the game!
window.onload = function () {
  setTimeout(() => {
    start(gw, gm, ps);
  }, 1500);
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


let time;
const resetTimer = () => {
  clearTimeout(time);
  time = setTimeout(nextGame, 2000);
  console.log("Reset Timer");
};

const nextGame = () => {
  if (games !== setGames) {
    window.removeEventListener("keydown", spaceListenerCallback);
    console.log("Next Game");
    gameLoop();
  }
};

// TIMER - Progress when player inactive
const inactivityTime = () => {
  console.log("START");
  window.onload = resetTimer;
  window.onkeypress = resetTimer;
  resetTimer();
};
