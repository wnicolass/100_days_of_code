// const job = {
//   title: "Developer",
//   location: "New York",
//   salary: 50000,
// };

// console.log(new Date().toISOString());

class Job {
  constructor(title, location, salary) {
    this.title = title;
    this.location = location;
    this.salary = salary;
  }

  describe() {
    console.log(
      `I'm a ${this.title}, I work in ${this.location} and I earn ${this.salary}`
    );
  }
}

const dev = new Job("developer", "lisbon", 60000);
const cook = new Job("Cook", "Munich", 35000);
dev.describe();
cook.describe();
