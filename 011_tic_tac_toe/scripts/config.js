export const backdropElement = document.getElementById("backdrop");
const playerConfigOverlay = document.getElementById("config-overlay");
const errorsOutputElement = document.getElementById("config-errors");
export const formElement = document.querySelector("form");

export const openPlayerConfig = () => {
  playerConfigOverlay.style.display = "block";
  backdropElement.style.display = "block";
  formElement.firstElementChild.classList.remove("error");
  errorsOutputElement.textContent = "";
};

export const closePlayerConfig = () => {
  playerConfigOverlay.style.display = "none";
  backdropElement.style.display = "none";
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
};
