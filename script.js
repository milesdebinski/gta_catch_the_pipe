// Audio files
let audioSuccess = new Audio("mp3/success.mp3");
let audioFail = new Audio("mp3/fail.mp3");

// Display Data
const trans_data = document.querySelector(".trans_data");
// Get elements
const pipe = document.getElementById("pipe");
const green = document.getElementById("green");
const bar = document.getElementById("bar");
// Computed Values to get data
const transPipe = getComputedStyle(pipe, null);
const transGreen = getComputedStyle(green, null);
// Get specific properties
let pipeY = transPipe.getPropertyValue("margin");
let greenY = transGreen.getPropertyValue("margin");
// Global variable to keep score
let score = 0;
let games = 0;
// Initial values greenWidth, greenMargin, pipeSpeed
let gw = Math.floor(Math.random() * (80 - 20) + 20);
let gm = Math.floor(Math.random() * (400 - 100) + 100);
let ps = Math.floor(Math.random() * (4 - 0.5) + 0.5);
// Stop The Pipe on keydown - SPACE
const stopThePipeLister = (greenWidth, greenMargin, pipeSpeed) => {
  const spaceListenerCallback = (action) => {
    window.removeEventListener("keydown", spaceListenerCallback);
    if (action.keyCode === 32) {
      // Update "pipe" margin value
      pipeY = transPipe.getPropertyValue("margin");
      // Assign new "pipe" margin value
      pipe.style.margin = pipeY;
      // Display "pipe" location - margin value

      // Destructuring margin values for the next If statement
      let marginP = +pipeY.split(" ")[3].replace("px", "");
      let marginG = +greenY.split(" ")[3].replace("px", "");
      // Uptade "green" margin value
      marginG = greenMargin;

      // Reset the 'pipe'
      setTimeout(() => {
        // Pipe to the starting point.
        pipe.style.transition = "all 0s linear 0s";
        pipe.style.margin = "0px 0px 0px 0px";
        // Reset styles
        pipe.style.background = "rgba(216, 202, 5, 0.8)";
        green.style.background = "rgba(90, 148, 129, 0.95)";
        bar.style.background = "rgba(107, 38, 38, 0.65)";
      }, 950);
      // How many games?

      setTimeout(() => {
        // Randomize values each time start is run
        gw = Math.floor(Math.random() * (80 - 20) + 20);
        gm = Math.floor(Math.random() * (400 - 200) + 200);
        ps = Math.random() * (2 - 0.7) + 0.7;

        start(gw, gm, ps);
      }, 1000);

      // Add/Substract Score
      if (marginP > marginG && marginP < greenMargin + greenWidth) {
        audioSuccess.play();
        score++;
        games++;
        green.style.background = "rgba(0, 150, 105, 0.95)";
        pipe.style.background = "rgba(0, 150, 105, 0.95)";
        pipe.style.transition = "all 0s linear 0s";
      } else {
        audioFail.play();
        games++;
        bar.style.background = "rgba(105, 9, 9, 0.808)";
        pipe.style.background = "rgba(105, 9, 9, 0.808)";
        pipe.style.transition = "all 0s linear 0s";
      }
      trans_data.textContent = `${score}`;
      // Smooth Exit
      if (games >= setGames) {
        bar.style.transition = `all 1000ms linear 0s`;
        bar.style.opacity = "0";
      }
    }
  };

  window.addEventListener("keydown", spaceListenerCallback);
};

// Start
const start = (greenWidth, greenMargin, pipeSpeed) => {
  // Assign css values
  green.style.width = `${greenWidth}px`;
  green.style.margin = `0px 0px 0px ${greenMargin}px`;
  pipe.style.transition = `all ${pipeSpeed}s linear 0s`;
  pipe.style.margin = "0px 0px 0px 600px";
  pipe.style.background = "rgb(255, 196, 0)";
  // Display Data
  trans_data.textContent = `${score}`;
  // How many games do you wanna play?
  if (games >= setGames) {
    return console.log(`Your score was: ${score}`);
  }

  stopThePipeLister(greenWidth, greenMargin, pipeSpeed);
};
// how many games do you wanna play?
let setGames = 3;
// start the game!
start(gw, gm, ps);
