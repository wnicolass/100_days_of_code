//the main difference between console.log and console.dir is that the .log displays the object in its string representation and .dir recognizes the object as an object and outputs its properties
// console.dir(document);

// document.body.children[1].children[0].href = "https://google.com";

let anchorElement = document.getElementById("external-link");
anchorElement.href = "https://google.com";

// anchorElement = document.querySelector("#external-link");
anchorElement = document.querySelector("p a");
anchorElement.href = "https://academind.com";
