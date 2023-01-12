import * as Config from "./config.js";

const editPlayerBtns = document.querySelectorAll(".edit-player-btn");
const cancelConfigurationBtn = document.getElementById("cancel-config-btn");

Config.formElement.addEventListener("submit", Config.savePlayerConfig);
cancelConfigurationBtn.addEventListener("click", Config.closePlayerConfig);
Config.backdropElement.addEventListener("click", Config.closePlayerConfig);
editPlayerBtns.forEach((playerBtn) => {
  playerBtn.addEventListener("click", Config.openPlayerConfig);
});
