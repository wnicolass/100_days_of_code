import { players } from "./config.js";

const gameAreaElement = document.getElementById("active-game");
const activePlayerNameElement = document.getElementById("active-player-name");
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
  event.target.textContent = players[activePlayer].symbol;
  event.target.classList.add("disabled");
  switchPlayer();
};
