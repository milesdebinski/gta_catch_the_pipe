// const bar = document.querySelector(".bar");
const trans_data = document.querySelector(".trans_data");
// Move pipe & stop pipe & get pipe location
const pipe = document.querySelector(".pipe");
const trans = getComputedStyle(pipe, null);
let pipeY = trans.getPropertyValue("transform");

window.addEventListener("keydown", (event) => {
  if (
    event.keyCode === 32 &&
    trans.getPropertyValue("transform") == "matrix(1, 0, 0, 1, 0, 0)"
  ) {
    pipe.classList.add("goPipe");

    // Show current state of transform
    console.log(trans.getPropertyValue("transform"));
    trans_data.textContent = `${pipeY}`;
  } else if (event.keyCode === 32) {
    pipeY = trans.getPropertyValue("transform");
    pipe.style.transform = pipeY;

    // Show current state of transform
    console.log(pipeY);
    trans_data.textContent = `${pipeY}`;
  }
});
