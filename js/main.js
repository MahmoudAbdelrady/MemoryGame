document.querySelector(".control-buttons span").onclick = function () {
  let yourName = prompt("Whats Your Name?");
  if (yourName == null || yourName == "") {
    document.querySelector(".name span").innerHTML = "Unknown";
  } else {
    document.querySelector(".name span").innerHTML = yourName;
  }
  document.querySelector(".control-buttons").remove();
};

let duration = 1000;
let gameContainer = document.querySelector(".game-container");
let blocks = Array.from(gameContainer.children);
let orderRange = [...Array.from(blocks.length).keys()];
// Another Method
// let orderRange = Array.from(Array.from(blocks.length).keys());
shuffle(orderRange);
blocks.forEach((block, idx) => {
  block.style.order = orderRange[idx];
  block.addEventListener("click", function () {
    flipBlock(block);
  });
});

// Flip Block Function
function flipBlock(selectedBlock) {
  selectedBlock.classList.add("flipped");
  let flippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("flipped")
  );
  if (flippedBlocks.length === 2) {
    stopClicking();
    checkMatchedBlocks(flippedBlocks[0], flippedBlocks[1]);
  }
}

// Stop Clicking Function
function stopClicking() {
  gameContainer.classList.add("no-clicking");
  setTimeout(() => {
    gameContainer.classList.remove("no-clicking");
  }, duration);
}

// Check Matched Blocks Function
function checkMatchedBlocks(firstBlock, secondBlock) {
  let triesElement = document.querySelector(".tries span");
  if (firstBlock.dataset.tech === secondBlock.dataset.tech) {
    firstBlock.classList.remove("flipped");
    secondBlock.classList.remove("flipped");

    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
    setTimeout(() => {
      firstBlock.classList.remove("flipped");
      secondBlock.classList.remove("flipped");
    }, duration);
  }
}

// Shuffle Function
function shuffle(array) {
  let current = array.length,
    temp,
    random;
  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;
    temp = array[current];
    array[current] = array[random];
    array[random] = temp;
  }
  return array;
}
