import {
  openPlayerConfig,
  closePlayerConfig,
  backdropElement,
} from "./config.js";

const editPlayerBtns = document.querySelectorAll(".edit-player-btn");
const cancelConfigurationBtn = document.getElementById("cancel-config-btn");

cancelConfigurationBtn.addEventListener("click", closePlayerConfig);
backdropElement.addEventListener("click", closePlayerConfig);
editPlayerBtns.forEach((playerBtn) => {
  playerBtn.addEventListener("click", openPlayerConfig);
});
