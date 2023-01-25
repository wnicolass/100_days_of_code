//default parameter value
const person = {
  //   name: "John",
  idade: 24,
};

function greetUser(person, username = "User") {
  console.log(`Hello ${person?.name ?? username}`);
}

// greetUser(person);
// greetUser(person, "Nicolas");

//rest parameters
function sumUp(...numbers) {
  let result = 0;

  for (let number of numbers) {
    result += number;
  }

  return result;
}

const inputNumbers = [1, 2, 3, 4, 5, 6];

//spread
console.log(sumUp(...inputNumbers));
