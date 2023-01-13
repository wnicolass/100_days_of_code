import * as Config from "./config.js";
import * as GameConfig from "./game.js";

const editPlayerBtns = document.querySelectorAll(".edit-player-btn");
const cancelConfigurationBtn = document.getElementById("cancel-config-btn");
const startGameBtn = document.getElementById("start-game");
const gameFieldElements = document.querySelectorAll("#game-board li");

startGameBtn.addEventListener("click", GameConfig.startNewGame);
Config.formElement.addEventListener("submit", Config.savePlayerConfig);
cancelConfigurationBtn.addEventListener("click", Config.closePlayerConfig);
Config.backdropElement.addEventListener("click", Config.closePlayerConfig);
editPlayerBtns.forEach((playerBtn) => {
  playerBtn.addEventListener("click", Config.openPlayerConfig);
});
gameFieldElements.forEach((field) =>
  field.addEventListener("click", GameConfig.selectGameField)
);
