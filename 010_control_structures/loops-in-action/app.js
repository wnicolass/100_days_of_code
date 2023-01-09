const computeBtn = document.querySelector("#calculator button");
const highlightBtn = document.querySelector("#highlight-links button");
const userDataBtn = document.querySelector("#user-data button");
const statisticsBtn = document.querySelector("#statistics button");

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

const displayUserData = () => {
  const output = document.getElementById("output-user-data");
  output.textContent = "";
  const randomUserData = {
    firstName: "Nic",
    lastName: "Lim",
    age: 24,
  };

  for (data in randomUserData) {
    const li = document.createElement("li");
    li.textContent = `${data}: ${randomUserData[data]}`.toUpperCase();
    output.appendChild(li);
  }
};

const roll = () => Math.floor(Math.random() * 6) + 1;

const rollDice = () => {
  const targetNumInputElement = document.getElementById("user-target-number");
  const diceRollsListElement = document.getElementById("dice-rolls");
  const userNumber = +targetNumInputElement.value;

  diceRollsListElement.textContent = "";

  let hasRolledTargetNumber = false;
  let totalRolls = 0;

  while (!hasRolledTargetNumber) {
    const rolledNumber = roll();
    totalRolls++;
    console.log(rolledNumber);

    const newRollListItem = document.createElement("li");
    newRollListItem.textContent = `Roll ${totalRolls}: ${rolledNumber}`;
    diceRollsListElement.appendChild(newRollListItem);

    hasRolledTargetNumber = rolledNumber === userNumber;
  }

  const outputTotalRolls = document.getElementById("output-total-rolls");
  const outputTargetNumber = document.getElementById("output-targer-numbber");

  outputTargetNumber.textContent = userNumber;
  outputTotalRolls.textContent = totalRolls;
};

statisticsBtn.addEventListener("click", rollDice);
userDataBtn.addEventListener("click", displayUserData);
highlightBtn.addEventListener("click", highlightLinks);
computeBtn.addEventListener("click", calculateSumUpToUserNumber);
