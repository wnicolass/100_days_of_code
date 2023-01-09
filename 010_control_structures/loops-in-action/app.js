const computeBtn = document.querySelector("#calculator button");

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

computeBtn.addEventListener("click", calculateSumUpToUserNumber);
