// run

const cycles = 20;
const minScale = 0.1;
const maxScale = 5;


const circle = document.querySelector("#app .circle");
// 0 = right, 90 = down, 180 = left, 270 = up
const direction = [0, 90, 180, 270];
const factor = 0.5;

initProgress(cycles);
initPregame(cycles);

function initPregame(cycles) {
  const hintsContainer = document.querySelector("#app .hints");
  const hint = document.createElement("p");
  hint.innerText = `
    Please try to move your screen away until you just can see the open circle in the middle. Hold this position for the entire training.

    Use your "a" "w" "d" "s" keys to tell, on which side the circle is open.
    
    When the circle does get really small and you can't tell on which side the circle is open, try to focus with your eyes at least for one minute.

    If you are ready, press any key.
  `;
  hintsContainer.appendChild(hint);

  const circle = document.querySelector("#app .circle");
  let random = {
    value: 0
  };

  transform(minScale * (1 + 2 * factor), random);

  document.addEventListener(
    "keyup",
    () => {
      hintsContainer.innerText = "";
      initGame(cycles);
    },
    { once: true }
  );
}

function initGame(cycles) {

  let scale = 1;
  let random = {
    value: 0
  };

  transform(scale, random);

  let finishedCycles = 0;

  document.addEventListener("keyup", (e) => {
    const button = e.key;
    let didSucceed = false;

    switch (button) {
      case "d": 
      case "ArrowRight":
        if (direction[random.value] === 0) didSucceed = true;
        break;
      case "s": 
      case "ArrowDown":
        if (direction[random.value] === 90) didSucceed = true;
        break;
      case "a": 
      case "ArrowLeft":
        if (direction[random.value] === 180) didSucceed = true;
        break;
      case "w": 
      case "ArrowUp":
        if (direction[random.value] === 270) didSucceed = true;
        break;
    }

    if (didSucceed) {
      scale = scale * (1 - factor);
    } else {
      scale = scale * (1 + factor);
    }
    transform(scale, random);
    colorProgress(didSucceed, finishedCycles);
    finishedCycles++;
    if (finishedCycles > 19) finishGame();
  });
}

function initProgress(progressBlocks) {
  const progressContainer = document.querySelector("#app .progress");
  for (let i = 0; i < progressBlocks; i++) {
    const progressGroup = document.createElement("div");
    for (let n = 0; n < 10; n++, i++) {
      const progressItem = document.createElement("span");
      progressItem.classList.add("material-symbols-rounded");
      progressItem.classList.add("progress-item");
      progressItem.classList.add("neutral");
      progressItem.innerText = "crop_square";
      progressGroup.appendChild(progressItem);
    }
    progressContainer.appendChild(progressGroup);
  }
}

function colorProgress(didSucceed, indexOfProgressItem) {
  const allProgressItems = document.querySelectorAll("#app .progress-item");
  const specificProgressItem = allProgressItems[indexOfProgressItem];
  specificProgressItem.classList.remove("neutral");
  if (didSucceed) {
    specificProgressItem.classList.add("succeed");
  } else {
    specificProgressItem.classList.add("failed");
  }
}

function transform(scale, random) {
  if (scale < minScale) scale = minScale;
  if (scale > maxScale) scale = maxScale;
  const min = 0,
    max = 3;
  random.value = Math.floor(Math.random() * (max - min + 1)) + min;
  circle.style.transform = `scale(${scale}) rotate(${direction[random.value]}deg)`;
}

function finishGame() {
  alert("finish");
}
