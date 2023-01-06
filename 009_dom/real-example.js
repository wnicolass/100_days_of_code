let inputEl = document.getElementById("product");
let inputLength = document.getElementById("length");
const totalLength = 60;

const computeInputLength = (e) => {
  let inputValueLength = e.target.value.length;
  let remainingCharacters = totalLength - inputValueLength;
  inputLength.textContent = remainingCharacters;

  if (remainingCharacters <= 10) {
    inputLength.classList.add("warning");
    inputEl.classList.add("warning");
  } else {
    inputLength.classList.remove("warning");
    inputEl.classList.remove("warning");
  }
};

inputEl.addEventListener("input", computeInputLength);
