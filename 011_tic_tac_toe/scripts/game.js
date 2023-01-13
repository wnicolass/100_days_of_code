import { players } from "./config.js";

const gameAreaElement = document.getElementById("active-game");
const activePlayerNameElement = document.getElementById("active-player-name");
const gameData = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
let activePlayer = 0;

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
  console.log(gameData);

  switchPlayer();
};
