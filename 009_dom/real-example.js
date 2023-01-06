const inputEl = document.getElementById("product");
const inputLength = document.getElementById("length");
const maxInputLength = inputEl.maxLength;

const computeInputLength = (e) => {
  let inputValueLength = e.target.value.length;
  let remainingCharacters = maxInputLength - inputValueLength;
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
