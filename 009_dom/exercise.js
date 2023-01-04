let titleLevelOne = document.body.children[0];
console.log(titleLevelOne.parentElement);
console.log(titleLevelOne.nextElementSibling);

titleLevelOne = document.getElementById("title");
console.log(titleLevelOne);

let paragraph = document.querySelector(".text");
console.log(paragraph);
paragraph.textContent = "Hellooooooo";
