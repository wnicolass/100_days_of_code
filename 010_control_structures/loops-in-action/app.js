const computeBtn = document.querySelector("#calculator button");
const highlightBtn = document.querySelector("#highlight-links button");

const calculateSumUpToUserNumber = () => {
  const userNumber = document.getElementById("user-number");
  const num = +userNumber.value;
  let total = 0;

  for (let i = 0; i <= num; i++) {
    total += i;
  }

  computeBtn.nextElementSibling.style.display = "block";
  computeBtn.nextElementSibling.textContent = total;
};

const highlightLinks = () => {
  const anchorElements = document.querySelectorAll("#highlight-links p a");

  for (let anchor of anchorElements) {
    anchor.classList.toggle("highlight");
  }
};

highlightBtn.addEventListener("click", highlightLinks);
computeBtn.addEventListener("click", calculateSumUpToUserNumber);
