const gridSize = 5;
const mineCount = 5;
let minePositions = [];
let gameOver = false;

const grid = document.getElementById("grid");
const resetBtn = document.getElementById("resetBtn");
const message = document.getElementById("message");

function initGame() {
  gameOver = false;
  message.textContent = "";
  grid.innerHTML = "";
  minePositions = generateMines();

  for (let i = 0; i < gridSize * gridSize; i++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.dataset.index = i;
    tile.addEventListener("click", handleClick);
    grid.appendChild(tile);
  }
}

function generateMines() {
  const positions = new Set();
  while (positions.size < mineCount) {
    const rand = Math.floor(Math.random() * gridSize * gridSize);
    positions.add(rand);
  }
  return Array.from(positions);
}

function handleClick(e) {
  if (gameOver) return;

  const tile = e.target;
  const index = Number(tile.dataset.index);

  if (minePositions.includes(index)) {
    tile.classList.add("mine");
    tile.textContent = "💣";
    message.textContent = "Game Over! You hit a mine.";
    gameOver = true;
    revealAllMines();
  } else {
    tile.classList.add("clicked");
    tile.textContent = '💎';
    tile.removeEventListener("click", handleClick);
  }
}

function revealAllMines() {
  const tiles = document.querySelectorAll(".tile");
  minePositions.forEach(index => {
    const tile = tiles[index];
    tile.classList.add("mine");
    tile.textContent = "💣";
  });
}

resetBtn.addEventListener("click", initGame);

// Initialize game on page load
initGame();
