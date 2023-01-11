export const backdropElement = document.getElementById("backdrop");
const playerConfigOverlay = document.getElementById("config-overlay");

export const openPlayerConfig = () => {
  playerConfigOverlay.style.display = "block";
  backdropElement.style.display = "block";
};

export const closePlayerConfig = () => {
  playerConfigOverlay.style.display = "none";
  backdropElement.style.display = "none";
};
