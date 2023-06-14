// select the elements we need
const cellBtns = document.querySelectorAll(".cell");
const restartBtn = document.querySelector(".restart");
const winnerText = document.querySelector(".winner");

const cellObjects = ["X", "O"];

// getRandomPlayer() to get a random number between 0 and 1
// so when we start the game we get a random player X or O
let currentPlayer = cellObjects[getRandomPlayer()];

// Rest the game Board
let gameBoard = ["", "", "", "", "", "", "", "", ""];

const winingCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellClick(event) {
  // to get the specific button element that was clicked
  const cellBtn = event.target;
  //to find the index of the clicked button in the cellBtns array
  const index = Array.from(cellBtns).indexOf(cellBtn);

  // check if the cell is already occupied or no
  if (gameBoard[index] !== "") {
    return;
  }

  // if not we change the cell text
  gameBoard[index] = currentPlayer;
  cellBtn.innerText = currentPlayer;

  // Now we need to check if its win or draw or we continue
  if (checkForWin() || checkForDraw()) {
    endGame();
  } else {
    // switch to the other player
    // condition ? valueIfTrue : valueIfFalse
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

// function to check if ts a win
function checkForWin() {
  for (let i = 0; i < winingCombos.length; i++) {
    const [a, b, c] = winingCombos[i];
    if (
      // check if the gameBoard[a] is empty
      // if not continue verifying
      gameBoard[a] !== "" &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[b] === gameBoard[c]
    ) {
      winnerText.innerText = `🏆 ${currentPlayer} wins!`;
      cellBtns[a].classList.add("winning-cell");
      cellBtns[b].classList.add("winning-cell");
      cellBtns[c].classList.add("winning-cell");
      return true;
    }
  }
  return false;
}

// function to check if ts a draw
function checkForDraw() {
  for (let i = 0; i < winingCombos.length; i++) {
    const [a, b, c] = winingCombos[i];
    if (
      // check if the gameBoard[a] is empty
      // if not continue verifying
      gameBoard[a] === "" ||
      gameBoard[b] === "" ||
      gameBoard[c] === ""
    ) {
      return false;
    }
  }
  // if its not a win and all cells are not empty so its a draw
  if (!checkForWin()) {
    winnerText.innerText = `Its a drow`;
    return true;
  }
}

// to get a randomnumber between 0 and 1
// to use it on cellObjects[]
function getRandomPlayer() {
  const random = Math.floor(Math.random() * 2);
  return random;
}

// add click event listener to all cells
cellBtns.forEach((cellBtn) => {
  cellBtn.addEventListener("click", handleCellClick);
});

// REST Event listner
restartBtn.addEventListener("click", () => {
  cellBtns.forEach((cellbtn) => {
    // reset the game state
    cellbtn.innerText = "";
    cellbtn.classList.remove("winning-cell");
  });
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = cellObjects[getRandomPlayer()];
  winnerText.innerText = ``;
  cellBtns.forEach((cellBtn) => {
    cellBtn.addEventListener("click", handleCellClick);
  });
});

// remove click event listener from all cells
function endGame() {
  cellBtns.forEach((cellBtn) => {
    cellBtn.removeEventListener("click", handleCellClick);
  });
}
