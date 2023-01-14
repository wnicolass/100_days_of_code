import { players } from "./config.js";

const gameAreaElement = document.getElementById("active-game");
const activePlayerNameElement = document.getElementById("active-player-name");
const gameData = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
let activePlayer = 0;
let currentRound = 1;
const totalRounds = 9;

export const startNewGame = () => {
  if (!players[0].name || !players[1].name) {
    alert("Please set custom player names.");
    return;
  }
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

export const selectGameField = (event) => {
  const selectedField = event.target;
  if (selectedField.classList.contains("disabled")) {
    alert("Please select an empty field!");
    return;
  }
  selectedField.textContent = players[activePlayer].symbol;
  selectedField.classList.add("disabled");

  const selectedColumn = +selectedField.dataset.col;
  const selectedRow = +selectedField.dataset.row;

  gameData[selectedRow][selectedColumn] = activePlayer + 1;

  const winnerId = checkForGameOver();
  console.log(winnerId);

  currentRound++;
  switchPlayer();
};
