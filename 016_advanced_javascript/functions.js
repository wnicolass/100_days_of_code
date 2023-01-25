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
