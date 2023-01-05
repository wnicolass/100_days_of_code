let paragraphEl = document.querySelector("p");
let inputEl = document.querySelector("input");

function changeParagraphText(e) {
  paragraphEl.textContent = "Clicked!";
  console.log(e);
}

function showInputValue(event) {
  // let enteredText = inputEl.value;
  let enteredText = event.target.value;
  //   let enteredText = event.data; -> This is different
  console.log(enteredText);
  console.log(event);
}

//event with callback function
paragraphEl.addEventListener("click", changeParagraphText);
inputEl.addEventListener("input", showInputValue);
