let courseName = "Web Development Bootcamp";
let price = 9.99;
let objectives = [
  "Get hired",
  "Learn more about JS",
  "Build an e-commerce project",
];

let onlineCourse = {
  name: courseName,
  price: price,
  objectives: objectives,
};

alert(onlineCourse.name);
alert(onlineCourse.price);
alert(onlineCourse.objectives);
alert(onlineCourse.objectives[1]);

function showGoal(listOfGoals, goal) {
  return listOfGoals[goal];
}

let myGoal = showGoal(objectives, 2);
alert(myGoal);
