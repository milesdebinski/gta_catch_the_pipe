// Display Data
const trans_data = document.querySelector(".trans_data");
// Get elements
const pipe = document.getElementById("pipe");
const green = document.getElementById("green");
// Computed Values to get data
const transPipe = getComputedStyle(pipe, null);
const transGreen = getComputedStyle(green, null);
// Get specific properties
let pipeY = transPipe.getPropertyValue("margin");
let greenY = transGreen.getPropertyValue("margin");
// Global variable to keep score
let score = 0;

// Stop The Pipe on keydown - SPACE
const stopThePipeLister = (greenWidth, greenMargin, pipeSpeed) => {
  window.addEventListener("keydown", (action) => {
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
        pipe.style.margin = "0px 0px 0px 0px";
        pipe.style.transition = "all 0s linear 0s";
      }, 900);
      setTimeout(() => {
        window.removeEventListener("keydown", () => {
          return false;
        });
        start(greenWidth, greenMargin, pipeSpeed);
      }, 1000);

      // Add/Substract Score
      if (marginP > marginG && marginP < greenMargin + greenWidth) {
        score++;
        console.log(score);
      } else {
        score--;
        console.log(score);
      }
      trans_data.textContent = `${score}`;
    }
  });
};

// Start
const start = (greenWidth, greenMargin, pipeSpeed) => {
  // Assign css values
  green.style.width = `${greenWidth}px`;
  green.style.margin = `0px 0px 0px ${greenMargin}px`;
  pipe.style.transition = `all ${pipeSpeed}s linear 0s`;
  pipe.style.margin = "0px 0px 0px 600px";
  // Display Data
  // trans_data.textContent = `${score}`;

  stopThePipeLister(greenWidth, greenMargin, pipeSpeed);
};

start(100, 300, 3);
