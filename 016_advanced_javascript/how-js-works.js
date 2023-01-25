const hobbies = ["sports", "cooking"]; // a pointer to the array is stored
const age = 32; //the value itself is stored

hobbies.push("reading"); //the address of the array doesn't change

// hobbies = ["Coding", "Sleeping"]; //error

// console.log(hobbies);

//privitive types: null, undefined, boolean, Number, BigInt, String, Symbol
//reference types: Objects

const person = { age: 24 };
// const person2 = { ...person };

function getAdultYears(p) {
  p.age -= 18;
  return p.age;
  //   return p.age - 18;
}

console.log(getAdultYears({ ...person }), person);
