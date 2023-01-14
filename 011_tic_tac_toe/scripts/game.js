import { players } from "./config.js";

const gameAreaElement = document.getElementById("active-game");
const activePlayerNameElement = document.getElementById("active-player-name");
const gameOverElement = document.getElementById("game-over");
const gameData = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
let activePlayer = 0;
let currentRound = 1;
const totalRounds = 9;
let isGameOver = false;

const resetGameStatus = () => {
  isGameOver = false;
  activePlayer = Math.floor(Math.random() * 2) + 1 - 1;
  currentRound = 1;
  gameOverElement.firstElementChild.innerHTML = `You won, <span id="winner-name">PLAYERNAME</span>!`;
  gameOverElement.style.display = "none";

  let gameBoardIndex = 0;
  for (let i = 0; i < gameData.length; i++) {
    for (let j = 0; j < gameData.length; j++) {
      gameData[i][j] = 0;
      let gameBoardItem =
        gameAreaElement.lastElementChild.children[gameBoardIndex];

      gameBoardItem.textContent = "";
      gameBoardItem.classList.remove("disabled");
      gameBoardIndex++;
    }
  }
};

export const startNewGame = () => {
  if (!players[0].name || !players[1].name) {
    alert("Please set custom player names.");
    return;
  }

  resetGameStatus();

  activePlayerNameElement.textContent = players[activePlayer].name;
  gameAreaElement.style.display = "block";
};

const switchPlayer = () => {
  activePlayer = activePlayer === 0 ? 1 : 0;
  activePlayerNameElement.textContent = players[activePlayer].name;
};

const checkForGameOver = () => {
  // Checking rows
  for (let i = 0; i < gameData.length; i++) {
    if (
      gameData[i][0] > 0 &&
      gameData[i][0] === gameData[i][1] &&
      gameData[i][1] === gameData[i][2]
    ) {
      return gameData[i][0];
    }
  }

  // Checking columns
  for (let i = 0; i < gameData.length; i++) {
    if (
      gameData[0][i] > 0 &&
      gameData[0][i] === gameData[1][i] &&
      gameData[0][i] === gameData[2][i]
    ) {
      return gameData[0][i];
    }
  }

  // Diagonal top-left to bottom-right
  if (
    gameData[0][0] > 0 &&
    gameData[0][0] === gameData[1][1] &&
    gameData[1][1] === gameData[2][2]
  ) {
    return gameData[0][0];
  }

  // Diagonal top-right to bottom-left
  if (
    gameData[0][2] > 0 &&
    gameData[0][2] === gameData[1][1] &&
    gameData[1][1] === gameData[2][0]
  ) {
    return gameData[0][2];
  }

  // Checking for draw
  if (currentRound === totalRounds) {
    return -1;
  }

  return 0;
};

const endGame = (winnerId) => {
  isGameOver = true;
  gameOverElement.style.display = "block";

  if (winnerId > 0) {
    const winnerElement = document.getElementById("winner-name");
    winnerElement.textContent = players[winnerId - 1].name;
  } else {
    gameOverElement.firstElementChild.textContent = "It's a draw!";
  }
};

export const selectGameField = (event) => {
  const selectedField = event.target;
  if (selectedField.classList.contains("disabled") || isGameOver) {
    return;
  }

  selectedField.textContent = players[activePlayer].symbol;
  selectedField.classList.add("disabled");

  const selectedColumn = +selectedField.dataset.col;
  const selectedRow = +selectedField.dataset.row;

  gameData[selectedRow][selectedColumn] = activePlayer + 1;

  const winnerId = checkForGameOver();

  winnerId !== 0 ? endGame(winnerId) : false;

  currentRound++;
  switchPlayer();
};
