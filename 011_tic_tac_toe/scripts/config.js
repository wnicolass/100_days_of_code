export const backdropElement = document.getElementById("backdrop");
export const formElement = document.querySelector("form");
export const players = [
  { name: "", symbol: "X" },
  { name: "", symbol: "O" },
];

const playerConfigOverlay = document.getElementById("config-overlay");
const errorsOutputElement = document.getElementById("config-errors");
let editedPlayer = 0;

export const openPlayerConfig = (event) => {
  editedPlayer = +event.target.dataset.playerid;
  playerConfigOverlay.style.display = "block";
  backdropElement.style.display = "block";
};

export const closePlayerConfig = () => {
  playerConfigOverlay.style.display = "none";
  backdropElement.style.display = "none";
  formElement.firstElementChild.classList.remove("error");
  errorsOutputElement.textContent = "";
  formElement.firstElementChild.lastElementChild.value = "";
};

export const savePlayerConfig = (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const enteredPlayerName = formData.get("playername").trim();

  if (!enteredPlayerName) {
    event.target.firstElementChild.classList.add("error");
    errorsOutputElement.textContent = "Please enter a valid name!";
    return;
  }

  const updatedPlayerData = document.getElementById(
    `player-${editedPlayer}-data`
  );

  updatedPlayerData.children[1].textContent = enteredPlayerName;

  players[editedPlayer - 1].name = enteredPlayerName;
  closePlayerConfig();
};
